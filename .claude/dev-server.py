"""Utvecklingsserver för Fysiklabbet.

Som `python -m http.server` men med Cache-Control: no-store på alla svar,
så att webbläsaren aldrig serverar gamla kopior av HTML/JS/CSS efter en
redigering. Start: python .claude/dev-server.py [port]
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class NoCacheHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    print(f'Serverar {ROOT} på http://localhost:{PORT} (cache avstängd)')
    # Lyssna endast på localhost — annars exponeras hela projektmappen
    # för alla på samma nätverk.
    ThreadingHTTPServer(('127.0.0.1', PORT), NoCacheHandler).serve_forever()
