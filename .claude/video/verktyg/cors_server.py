# Liten filserver som låter YouTube Studio hämta en film från den här datorn
# (fetch + DataTransfer i uppladdningsrutan, se produktion.md, steg 10).
#   python -I cors_server.py <mapp> [port]      (standard 8765; upptagen: ta 8766)
import http.server, sys, os
os.chdir(sys.argv[1])
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8765
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        super().end_headers()
    def do_OPTIONS(self):
        self.send_response(204); self.end_headers()
http.server.ThreadingHTTPServer(('127.0.0.1', PORT), H).serve_forever()
