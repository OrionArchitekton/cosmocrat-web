"""Local, keyless motion source: python3 tools/cosmocrat-intro/serve.py.
Only the two fixed render filenames can be written. Nothing is published.
"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/media/cosmocrat'
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        route = self.path.split('?', 1)[0]
        paths = {'/': (ROOT/'tools/cosmocrat-intro/renderer.html','text/html'),
                 '/brand/cosmocrat-wordmark.png': (ROOT/'public/brand/cosmocrat-wordmark.png','image/png'),
                 '/brand/cosmocrat-sigil.svg': (ROOT/'public/brand/cosmocrat-sigil.svg','image/svg+xml'),
                 '/fonts/inter-latin.woff2': (ROOT/'src/styles/fonts/inter-latin.woff2','font/woff2')}
        if route not in paths: self.send_error(404); return
        path, kind = paths[route]; data = path.read_bytes()
        self.send_response(200); self.send_header('Content-Type',kind); self.send_header('Content-Length',str(len(data))); self.end_headers(); self.wfile.write(data)
    def do_POST(self):
        if self.path not in ['/save/desktop.webm','/save/mobile.webm']: self.send_error(404); return
        try: size = int(self.headers.get('Content-Length','0'))
        except ValueError: self.send_error(400); return
        if not 0 < size <= 64*1024*1024: self.send_error(413); return
        OUT.mkdir(parents=True,exist_ok=True); target=OUT/('cosmocrat-welcome-'+self.path.rsplit('/',1)[1])
        if target.exists(): self.send_error(409,'Preserve the existing render'); return
        body=self.rfile.read(size)
        if len(body)!=size or body[:4]!=bytes.fromhex('1a45dfa3'): self.send_error(400); return
        with target.open('xb') as f: f.write(body)
        self.send_response(201); self.end_headers()
    def log_message(self,*args): pass
if __name__=='__main__':
    print('Motion source on http://127.0.0.1:4190/',flush=True)
    ThreadingHTTPServer(('127.0.0.1',4190),Handler).serve_forever()
