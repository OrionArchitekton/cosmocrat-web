"""Local built-site checks. Requires the separately installed agent-browser and Chrome.

The background-tab case supplies document.hidden before hydration through a
GET-only loopback fixture. Media and application code come from the built site.
No credentials, production targets, dependency installation or forms are used.
"""
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import subprocess
import threading
import urllib.error
import urllib.parse
import urllib.request
import uuid

origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4180').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Browser tests require an explicitly local HTTP server.')

fixture = b'''<script>
window.__fixtureHidden = true;
Object.defineProperty(document, 'hidden', {configurable: true,
  get: () => window.__fixtureHidden});
window.__showFixture = () => {window.__fixtureHidden = false;
  document.dispatchEvent(new Event('visibilitychange'));};
</script>'''

class Fixture(BaseHTTPRequestHandler):
    def do_GET(self):
        # Never interpret an incoming request target as a new upstream origin.
        if not self.path.startswith('/') or self.path.startswith('//'):
            self.send_error(400)
            return
        try:
            response = urllib.request.urlopen(origin + self.path, timeout=30)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            body = response.read()
            kind = response.headers.get('Content-Type', 'application/octet-stream')
            if self.path == '/' and response.status == 200:
                body = body.replace(b'<head>', b'<head>' + fixture, 1)
            self.send_response(response.status)
            self.send_header('Content-Type', kind)
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    def log_message(self, *args):
        pass

def check(expression, label):
    return ['eval', f'(()=>{{if(!({expression}))throw Error({json.dumps(label)});return {json.dumps(label)};}})()']

server = ThreadingHTTPServer(('127.0.0.1', 0), Fixture)
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}'
session = 'cosmocrat-test-' + uuid.uuid4().hex[:10]
environment = os.environ.copy()
for name in ('AGENT_BROWSER_AUTO_CONNECT', 'AGENT_BROWSER_PROFILE', 'AGENT_BROWSER_STATE',
             'AGENT_BROWSER_SESSION_NAME', 'AGENT_BROWSER_PROVIDER', 'AGENT_BROWSER_CDP'):
    environment.pop(name, None)
environment['AGENT_BROWSER_DEFAULT_TIMEOUT'] = '30000'
base = ['agent-browser', '--session', session]

commands = [
    ['set', 'viewport', '1440', '1000'], ['open', url + '/'],
    ['wait', 'button[aria-label="Play introduction"]'], ['wait', '500'],
    check('document.querySelector("video").paused && document.querySelector("video").currentTime === 0', 'Hidden initial page stays paused'),
    ['eval', 'window.__showFixture()'],
    ['wait', '--fn', 'document.querySelector("video").currentTime > .2'],
    check('!document.querySelector("video").paused && document.querySelector("video").currentTime > 0.2', 'First visibility starts the intro without scrolling'),
    ['click', 'button[aria-label="Pause introduction"]'],
    check('document.querySelector("video").paused', 'Pause works'),
    ['wait', 'button[aria-label="Play introduction"]'],
    ['click', 'button[aria-label="Play introduction"]'],
    ['wait', '--fn', 'document.querySelector("video").currentTime > 1'],
    ['eval', 'document.querySelector("video").currentTime = document.querySelector("video").duration - .15'],
    ['wait', '--fn', 'document.querySelector("video").ended'],
    ['wait', 'button[aria-label="Replay introduction"]'],
    ['click', 'button[aria-label="Replay introduction"]'],
    ['wait', '--fn', 'document.querySelector("video").currentTime > .2'],
    check('document.querySelector("video").currentTime < 3', 'Replay restarts'),
    ['click', 'a[href="#static-site"]'],
    check('location.hash === "#static-site" && document.querySelector("video").paused', 'Continue reaches static content and pauses'),
    ['open', url + '/tools'], ['wait', '--fn', '!document.querySelector("[data-filter-controls]").hidden'],
    ['click', '[data-filter="access"]'], ['fill', 'input[type="search"]', 'Android'],
    check('document.querySelectorAll("[data-tool]:not([hidden])").length === 1 && !document.querySelector("#orion-phone").hidden', 'Category and search compose'),
    ['fill', 'input[type="search"]', 'no-matching-tool-712'],
    check('!document.querySelector("[data-empty-state]").hidden', 'Empty state is visible'),
    ['click', '[data-reset-filters]'],
    check('document.querySelectorAll("[data-tool]:not([hidden])").length === 10 && document.activeElement.type === "search"', 'Reset restores all and search focus'),
    ['focus', '[data-filter="continuity"]'], ['press', 'Enter'],
    check('document.querySelectorAll("[data-tool]:not([hidden])").length === 2', 'Keyboard activates category'),
    ['click', '#orion-handoff summary'],
    check('document.querySelector("#orion-handoff details").open', 'Native scope disclosure opens'),
    ['set', 'viewport', '390', '844'], ['eval', 'window.scrollTo(0,0)'],
    check('document.documentElement.scrollWidth <= innerWidth', '390px catalog has no overflow'),
    ['click', '.mobile-nav > summary'], ['press', 'Escape'],
    check('!document.querySelector(".mobile-nav").open && document.activeElement.tagName === "SUMMARY"', 'Escape closes mobile menu and restores focus'),
    ['set', 'viewport', '320', '750'],
    check('document.documentElement.scrollWidth <= innerWidth', '320px catalog has no overflow'),
    ['set', 'media', 'dark', 'reduced-motion'], ['open', url + '/'],
    ['wait', 'button[aria-label="Play introduction"]'], ['eval', 'window.__showFixture()'], ['wait', '500'],
    check('document.querySelector("video").paused && document.querySelector("video").currentTime === 0', 'Reduced motion suppresses autoplay'),
    ['click', 'button[aria-label="Play introduction"]'],
    ['wait', '--fn', 'document.querySelector("video").currentTime > .2'],
    check('document.querySelector("video").videoHeight === 1440', 'Portrait media plays on explicit request'),
    check('document.documentElement.scrollWidth <= innerWidth', '320px welcome has no overflow'),
    ['errors'],
]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands),
                            capture_output=True, text=True, env=environment, timeout=150)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    assert result.returncode == 0, 'Browser command failed'
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(record['success'] for record in records)
    assert records[-1]['result']['errors'] == [], records[-1]
    print(f'PASS: {len(commands)} local browser checks')
finally:
    subprocess.run(base + ['close'], env=environment, capture_output=True, timeout=20)
    server.shutdown()
    server.server_close()
