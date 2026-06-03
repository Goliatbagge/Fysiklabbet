#!/usr/bin/env python3
"""
Generate images using Google's Gemini API ("nano banana").

Uses the official google-genai SDK and a free Gemini API key from
https://aistudio.google.com/apikey (read from GEMINI_API_KEY, e.g. in a
.env file). Supports both text-to-image and image-to-image.
"""

import argparse
import mimetypes
import os
import sys

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai not installed. Run: pip install google-genai")
    sys.exit(1)

DEFAULT_MODEL = "gemini-3-pro-image"  # högsta kvalitet (dyrare); byt med --model gemini-2.5-flash-image för billigare


def get_client():
    """Create a Gemini API client from GEMINI_API_KEY (or GOOGLE_API_KEY)."""
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("ERROR: GEMINI_API_KEY not set.")
        print("Get a free key at https://aistudio.google.com/apikey and put it")
        print("in .env:  GEMINI_API_KEY=...")
        sys.exit(1)
    return genai.Client(api_key=api_key)


def mime_for(path: str) -> str:
    mt, _ = mimetypes.guess_type(path)
    return mt or "image/png"


def save_image(response, output_path: str) -> bool:
    """Find the inline image part in the response and write it to disk."""
    cand = response.candidates[0] if getattr(response, "candidates", None) else None
    if not cand or not getattr(cand, "content", None) or not cand.content.parts:
        print("ERROR: No content in response")
        return False
    for part in cand.content.parts:
        if getattr(part, "text", None):
            print(f"Model: {part.text}")
        inline = getattr(part, "inline_data", None)
        if inline and inline.data:
            out_dir = os.path.dirname(output_path)
            if out_dir:
                os.makedirs(out_dir, exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(inline.data)
            print(f"SUCCESS: Image saved to {output_path}")
            return True
    print("ERROR: No image in response (model returned text only). "
          "Try a more visual/explicit prompt, e.g. start with 'Skapa en bild av ...'.")
    return False


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Google's Gemini API (nano banana)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Text-to-image:
  python generate_image.py -p "Skapa en bild av en pendel som svanger" -o pendel.png

  # Image-to-image:
  python generate_image.py -i skiss.png -p "Gor om till en ren vektorillustration" -o ren.png

Environment:
  GEMINI_API_KEY   Free key from https://aistudio.google.com/apikey (required)
        """,
    )
    parser.add_argument("--prompt", "-p", required=True, help="Text prompt")
    parser.add_argument("--output", "-o", default="generated_image.png",
                        help="Output file path (default: generated_image.png)")
    parser.add_argument("--input", "-i", help="Optional input image (image-to-image)")
    parser.add_argument("--model", "-m", default=DEFAULT_MODEL,
                        help=f"Model (default: {DEFAULT_MODEL})")
    args = parser.parse_args()

    client = get_client()

    if args.input:
        if not os.path.exists(args.input):
            print(f"ERROR: Input image not found: {args.input}")
            sys.exit(1)
        print(f"Generating from image: {args.input}")
        print(f"Prompt: {args.prompt[:100]}...")
        with open(args.input, "rb") as f:
            img_bytes = f.read()
        contents = [args.prompt,
                    types.Part.from_bytes(data=img_bytes, mime_type=mime_for(args.input))]
    else:
        print(f"Generating from prompt: {args.prompt[:100]}...")
        contents = [args.prompt]

    try:
        response = client.models.generate_content(model=args.model, contents=contents)
    except Exception as e:
        print(f"ERROR: API call failed: {e}")
        sys.exit(1)

    sys.exit(0 if save_image(response, args.output) else 1)


if __name__ == "__main__":
    main()
