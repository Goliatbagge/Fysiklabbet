#!/usr/bin/env python3
"""Lokal utvecklingsserver för Fysiklabbet.

Som vanliga `python -m http.server`, men skickar `Cache-Control: no-cache`
på varje svar. Det gör att webbläsaren alltid hämtar färska HTML-sidor och
data — annars kan den servera gamla (cachade) versioner av t.ex.
katalog.html efter att filer ändrats, vilket ser ut som att ändringar
"inte slår igenom".

Kör:  python serve.py        (port 8000)
       python serve.py 8080   (annan port)
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with ThreadingHTTPServer(("", port), NoCacheHandler) as httpd:
        print(f"Fysiklabbet dev-server (no-cache) på http://localhost:{port}/")
        httpd.serve_forever()
