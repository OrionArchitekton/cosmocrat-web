"""User-initiated conversion events on a loopback build. No external release, signup or mail requests."""
import json
import os
import subprocess
import urllib.parse
import uuid

origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4180').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Conversion checks require a local HTTP server.')


def events(expected):
    # Strict shape checks ensure that queries, commands and form fields stay outside analytics.
    return ['eval', f"""(() => {{
      const found = (window.dataLayer || []).filter(e => e && [
        'copy_command','github_release_click','starter_simulator_complete','waitlist_success'
      ].includes(e.event));
      const expected = {json.dumps(expected)};
      if (found.length !== expected.length || !found.every((e,i) =>
        Object.keys(e).length === Object.keys(expected[i]).length &&
        Object.keys(expected[i]).every(key => e[key] === expected[i][key])))
        throw Error('Unexpected conversions: ' + JSON.stringify(found));
      return found;
    }})()"""]


def milestone(name, path, tool=None):
    result = {'event': name, 'page_path': path}
    if tool:
        result['tool_id'] = tool
    return result


commands = [
    ['set', 'media', 'dark', 'reduced-motion'],
    ['set', 'viewport', '320', '750'], ['open', origin + '/tools?source=private-test'],
    ['wait', '--fn', '!document.querySelector("[data-filter-controls]").hidden'], events([]),
    ['eval', """Object.defineProperty(navigator, 'clipboard', {configurable: true,
      value: {writeText: async text => { window.__copiedCommand = text; }}})"""],
    ['click', '#orion-pm button[aria-label^="Copy command"]'],
    ['wait', '--fn', 'typeof window.__copiedCommand === "string"'],
    ['eval', """(() => {if (window.__copiedCommand !== document.querySelector('#orion-pm pre code').textContent)
      throw Error('Copied command differs from the visible command'); return true;})()"""],
]
copied = milestone('copy_command', '/tools', 'orion-pm')
release = milestone('github_release_click', '/tools', 'orion-pm')
commands.extend([
    events([copied]),
    ['eval', """navigator.clipboard.writeText = async () => {throw Error('Clipboard denied')}"""],
    ['click', '#orion-pm button[aria-label^="Copy command"]'],
    ['wait', '--fn', "window.getSelection().toString() === window.__copiedCommand"],
    events([copied]),
    ['eval', """document.addEventListener('click', e => {
      if(e.target.closest('a[data-release-tool]')) e.preventDefault();
    }, {once:true, capture:true})"""],
    ['click', '#orion-pm a[data-release-tool="orion-pm"]'], events([copied, release]),
    ['open', origin + '/'], ['wait', '.sim-steps [role=tab]'], events([]),
    ['click', '.sim-steps button:nth-child(4)'], events([]),
    ['click', '.sim-steps button:nth-child(2)'], events([]),
    ['click', '.sim-steps button:nth-child(3)'],
    events([milestone('starter_simulator_complete', '/')]),
    ['click', '.sim-steps button:nth-child(1)'],
    events([milestone('starter_simulator_complete', '/')]),
])

for fixture in ({'ok': True, 'duplicate': False}, {'ok': True, 'duplicate': True}, {'ok': True}):
    commands.extend([
        ['open', origin + '/waitlist?utm_source=private-test'],
        ['wait', '#waitlist-email'], events([]),
        ['eval', f"""(() => {{
          const original = window.fetch;
          window.fetch = (url, options) => url === '/api/waitlist'
            ? Promise.resolve(Response.json({json.dumps(fixture)})) : original(url, options);
        }})()"""],
        ['fill', '#waitlist-email', 'synthetic@example.invalid'], ['fill', '#waitlist-company', 'Synthetic'],
        ['fill', '#waitlist-role', 'Reviewer'], ['click', 'form button[type=submit]'],
        ['wait', '--fn', '''[...document.querySelectorAll("h2")].some(h=>h.textContent.includes("on the list"))'''],
        events([milestone('waitlist_success', '/waitlist')] if fixture.get('duplicate') is False else []),
    ])

commands.append(['errors'])
session = 'cosmocrat-conversions-' + uuid.uuid4().hex[:10]
env = os.environ.copy()
for key in ('AUTO_CONNECT', 'PROFILE', 'STATE', 'SESSION_NAME', 'PROVIDER', 'CDP'):
    env.pop('AGENT_BROWSER_' + key, None)
base = ['agent-browser', '--session', session]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands),
                            capture_output=True, text=True, env=env, timeout=180)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    result.check_returncode()
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(r['success'] for r in records)
    assert records[-1]['result']['errors'] == [], records[-1]
    print(f'PASS: {len(commands)} conversion browser checks')
finally:
    subprocess.run(base + ['close'], env=env, capture_output=True, timeout=20)
