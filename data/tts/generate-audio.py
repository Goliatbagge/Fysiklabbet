# ============================================================
# Genererar uppläsnings-MP3 + tidsstämpel-JSON med edge-tts.
#
#   python data/tts/generate-audio.py            # allt som saknas/ändrats
#   python data/tts/generate-audio.py fy1-7.9    # bara angivna id:n
#
# Läser manus från data/tts/manus/teori.json (byggs av build-manus.js)
# och skriver:
#   audio/tts/teori/<id>.mp3 + <id>.json
# (Nyhetsartiklar har ingen uppläsning — borttaget 2026-07-18.)
#
# JSON-formatet: { id, voice, hash, dur, segments: [{ t, s, e }] }
# där s/e är start-/sluttid i sekunder för varje mening (segment),
# härledda ur edge-tts boundary-händelser (Sentence-/WordBoundary).
# Klienten (tts.js) använder dem för att markera aktuell mening.
#
# Inkrementellt: ett dokument hoppas över om dess .json redan har
# samma hash (sha1 av röst + manustext). Ändras manus-lib.js eller
# en text → kör build-manus.js först, sedan detta skript.
# ============================================================

import asyncio
import hashlib
import json
import re
import sys
from pathlib import Path

import edge_tts

VOICE = "sv-SE-SofieNeural"
CONCURRENCY = 3
RETRIES = 3

ROOT = Path(__file__).resolve().parents[2]
MANUS_DIR = Path(__file__).resolve().parent / "manus"
AUDIO_ROOT = ROOT / "audio" / "tts"

WORD_RE = re.compile(r"[0-9a-zåäöé]+", re.IGNORECASE)


def norm(s: str) -> str:
    """Normalisera text för ordmatchning: gemener, bara bokstäver/siffror."""
    return "".join(WORD_RE.findall(s.lower()))


def full_text(segments) -> str:
    """Sammanfoga segmenten till manustexten som skickas till rösten.

    Varje segment avslutas med skiljetecken och inleds med versal —
    annars slår talsyntesen ihop intilliggande meningar (t.ex. formler
    som börjar med gemen: "... strömmen I. effekten P ...") till en enda
    boundary-händelse, och markeringen tappar upplösning.
    """
    parts = []
    for seg in segments:
        t = seg["t"].strip()
        if t and t[-1] not in ".!?:":
            t += "."
        if t:
            t = t[0].upper() + t[1:]
        parts.append(t)
    return " ".join(parts)


def doc_hash(segments) -> str:
    return hashlib.sha1((VOICE + "|" + full_text(segments)).encode("utf-8")).hexdigest()


def align(segments, words):
    """Koppla WordBoundary-händelser (offset, duration, text) till segment.

    Bygger en normaliserad sträng av hela manuset med segmentgränser och
    letar upp varje ords position i tur och ordning — robust mot att
    talsyntesen delar/slår ihop ord annorlunda än vi.
    """
    spans = []  # (startchar, endchar) i den normaliserade helheten
    big = ""
    for seg in segments:
        n = norm(seg["t"])
        spans.append((len(big), len(big) + len(n)))
        big += n

    times = [[None, None] for _ in segments]  # [start, end] i sekunder
    cursor = 0
    for offset, duration, text in words:
        w = norm(text)
        if not w:
            continue
        idx = big.find(w, cursor, cursor + max(80, len(w) + 40))
        if idx < 0:
            idx = big.find(w, cursor)
            if idx < 0:
                continue
        cursor = idx + len(w)
        t0 = offset / 1e7
        t1 = (offset + duration) / 1e7
        for si, (a, b) in enumerate(spans):
            if idx < b and cursor > a:
                if times[si][0] is None:
                    times[si][0] = t0
                times[si][1] = t1

    # Fyll luckor: segment utan träffar får grannarnas tider
    prev_end = 0.0
    for si, (s, e) in enumerate(times):
        if s is None:
            times[si] = [prev_end, prev_end]
        else:
            prev_end = e
    return times


async def synthesize(doc, out_dir, sem):
    doc_id = doc["id"]
    segs = doc["segments"]
    text = full_text(segs)
    h = doc_hash(segs)
    mp3_path = out_dir / f"{doc_id}.mp3"
    json_path = out_dir / f"{doc_id}.json"

    if json_path.exists() and mp3_path.exists():
        try:
            old = json.loads(json_path.read_text(encoding="utf-8"))
            if old.get("hash") == h:
                return "skip"
        except (json.JSONDecodeError, OSError):
            pass

    async with sem:
        last_err = None
        for attempt in range(1, RETRIES + 1):
            try:
                audio = bytearray()
                words = []
                communicate = edge_tts.Communicate(text, VOICE)
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        audio.extend(chunk["data"])
                    elif chunk["type"] in ("SentenceBoundary", "WordBoundary"):
                        words.append((chunk["offset"], chunk["duration"], chunk["text"]))
                if not audio:
                    raise RuntimeError("tomt ljud")

                times = align(segs, words)
                dur = max((e for _, e in times), default=0.0)
                meta = {
                    "id": doc_id,
                    "voice": VOICE,
                    "hash": h,
                    "dur": round(dur, 2),
                    "segments": [
                        {"t": seg["t"], "s": round(s, 2), "e": round(e, 2)}
                        for seg, (s, e) in zip(segs, times)
                    ],
                }
                mp3_path.write_bytes(bytes(audio))
                json_path.write_text(
                    json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8"
                )
                return "ok"
            except Exception as e:  # noqa: BLE001 — nätverksfel m.m., försök igen
                last_err = e
                await asyncio.sleep(2 * attempt)
        print(f"  FEL {doc_id}: {last_err}")
        return "fail"


async def main():
    only = set(sys.argv[1:])
    jobs = []
    # Nyhetsartiklar har ingen uppläsning (borttaget 2026-07-18) — bara teori.
    for kind in ("teori",):
        manus_path = MANUS_DIR / f"{kind}.json"
        if not manus_path.exists():
            print(f"Hoppar {kind}: {manus_path} saknas (kör build-manus.js).")
            continue
        docs = json.loads(manus_path.read_text(encoding="utf-8"))
        out_dir = AUDIO_ROOT / kind
        out_dir.mkdir(parents=True, exist_ok=True)
        for doc in docs:
            if only and doc["id"] not in only:
                continue
            jobs.append((doc, out_dir))

    print(f"{len(jobs)} dokument, röst {VOICE}, {CONCURRENCY} parallella ...")
    sem = asyncio.Semaphore(CONCURRENCY)
    done = {"ok": 0, "skip": 0, "fail": 0}

    async def run(doc, out_dir, n, total):
        r = await synthesize(doc, out_dir, sem)
        done[r] += 1
        if r == "ok":
            print(f"  [{n}/{total}] {doc['id']}")
        return r

    await asyncio.gather(
        *(run(doc, out_dir, i + 1, len(jobs)) for i, (doc, out_dir) in enumerate(jobs))
    )
    print(f"Klart: {done['ok']} genererade, {done['skip']} oförändrade, {done['fail']} fel.")
    if done["fail"]:
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
