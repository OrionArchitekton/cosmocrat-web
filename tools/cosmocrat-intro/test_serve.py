"""Loopback renderer write-boundary tests; no browser, real media or user files."""
import http.client
import importlib.util
from pathlib import Path
import tempfile
import threading
import unittest

spec = importlib.util.spec_from_file_location('intro_server', Path(__file__).with_name('serve.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class WriteBoundaryTest(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.previous = module.OUT
        module.OUT = Path(self.folder.name)
        self.server = module.ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.origin = f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        module.OUT = self.previous
        self.folder.cleanup()

    def post(self, *, origin=None, path='/save/desktop.webm', body=b'\x1a\x45\xdf\xa3fixture', host=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=5)
        headers = {'Origin': self.origin if origin is None else origin}
        if host is not None:
            headers['Host'] = host
        connection.request('POST', path, body=body, headers=headers)
        response = connection.getresponse()
        status = response.status
        response.read()
        connection.close()
        return status

    def test_foreign_site_cannot_write_a_render(self):
        self.assertEqual(self.post(origin='https://foreign.example'), 403)
        self.assertEqual(list(module.OUT.iterdir()), [])

    def test_rebound_host_cannot_write_a_render(self):
        self.assertEqual(self.post(host='foreign.example'), 403)
        self.assertEqual(list(module.OUT.iterdir()), [])

    def test_same_origin_render_preserves_existing_bytes(self):
        self.assertEqual(self.post(), 201)
        original = (module.OUT / 'cosmocrat-welcome-desktop.webm').read_bytes()
        self.assertEqual(self.post(body=b'\x1a\x45\xdf\xa3replacement'), 409)
        self.assertEqual((module.OUT / 'cosmocrat-welcome-desktop.webm').read_bytes(), original)

    def test_bad_format_and_unlisted_destination_are_refused(self):
        self.assertEqual(self.post(body=b'not-webm'), 400)
        self.assertEqual(self.post(path='/save/other.webm'), 404)
        self.assertEqual(list(module.OUT.iterdir()), [])

if __name__ == '__main__':
    unittest.main()
