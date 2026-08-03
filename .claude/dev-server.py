"""Utvecklingsserver för Fysiklabbet.

Som `python -m http.server` men med Cache-Control: no-store på alla svar,
så att webbläsaren aldrig serverar gamla kopior av HTML/JS/CSS efter en
redigering.

    python .claude/dev-server.py [port] [adress]

Adressen är 127.0.0.1 som standard — servern syns då bara på den här
datorn. Ange 0.0.0.0 för att nå sidan från telefon och surfplatta i
hemmanätverket (http://<datorns IP>:<port>). Då gäller också
LOKALA_MAPPAR nedan: mappar som aldrig ska lämna datorn (upphovsrätts-
skyddade PDF:er, .git, Obsidian-valvet) svarar 404 i stället för att
serveras ut på nätverket.
"""
import os
import socket
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
BIND = sys.argv[2] if len(sys.argv) > 2 else '127.0.0.1'

# Bara relevant när servern är öppen mot nätverket. Namnen matchas mot
# sökvägens första led, skiftlägesokänsligt.
LOKALA_MAPPAR = {
    'genomgångar', 'uppgifter', 'kursprovsuppgifter', 'np',
    'docs-vault', '.git',
}


class NoCacheHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

    def _sparrad(self):
        if BIND in ('127.0.0.1', 'localhost'):
            return False
        forsta = self.path.lstrip('/').split('/', 1)[0].split('?', 1)[0]
        return unquote(forsta).lower() in LOKALA_MAPPAR

    def send_head(self):
        if self._sparrad():
            self.send_error(404, 'Not Found')
            return None
        return super().send_head()


def lokal_ip():
    """Datorns adress i hemmanätverket (ingen trafik skickas)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('192.168.1.1', 1))
        return s.getsockname()[0]
    except OSError:
        return socket.gethostbyname(socket.gethostname())
    finally:
        s.close()


if __name__ == '__main__':
    print(f'Serverar {ROOT} på http://localhost:{PORT} (cache avstängd)')
    if BIND not in ('127.0.0.1', 'localhost'):
        print(f'Nätverket: http://{lokal_ip()}:{PORT}  '
              f'(spärrade mappar: {", ".join(sorted(LOKALA_MAPPAR))})')
    ThreadingHTTPServer((BIND, PORT), NoCacheHandler).serve_forever()
