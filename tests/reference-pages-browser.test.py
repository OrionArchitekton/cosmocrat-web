"""Manual anonymous local journey for story, getting-started and governance overview."""
import json
import os
from pathlib import Path
import subprocess
import urllib.parse
import uuid
origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4197').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Reference checks require an explicitly local HTTP server.')
artifacts = os.environ.get('SITE_TEST_ARTIFACT_DIR')
if artifacts:
    Path(artifacts).mkdir(parents=True, exist_ok=True)
commands = []
for width, height in [(1440, 1000), (390, 844)]:
    commands.append(['set', 'viewport', str(width), str(height)])
    for route in ['about', 'docs', 'platform']:
        commands.extend([
            ['open', origin + '/' + route],
            ['eval', f'(()=>{{if(location.origin !== {json.dumps(origin)} || location.pathname !== {json.dumps("/" + route)})throw Error("Reference route identity");return true}})()'],
            ['eval', 'document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))'],
            ['eval', 'window.scrollTo(0,0)'],
            ['eval', '(()=>{const h=document.querySelector("main h1").getBoundingClientRect(),header=document.querySelector("header").getBoundingClientRect();if(document.documentElement.scrollWidth>innerWidth||h.left<0||h.right>innerWidth||h.top<header.bottom-1)throw Error("Reference heading/navigation layout");return {route:location.pathname,width:innerWidth,heading:document.querySelector("main h1").textContent.trim(),headingTop:h.top,headerBottom:header.bottom,overflow:false}})()'],
        ])
        if artifacts:
            commands.append(['screenshot', str(Path(artifacts) / f'reference-{route}-{width}.png')])
        commands.append(['errors'])
commands.extend([
    ['open', origin + '/docs'],
    ['click', 'main a[href="/tools"]'],
    ['wait', '--fn', 'location.pathname === "/tools"'],
    ['eval', '(()=>{if(document.querySelectorAll("[data-tool]").length!==10)throw Error("Reference catalog destination");return "Getting started reaches the ten-tool catalog"})()'],
    ['errors'],
])
environment = os.environ.copy()
for name in ('AGENT_BROWSER_AUTO_CONNECT', 'AGENT_BROWSER_PROFILE', 'AGENT_BROWSER_STATE', 'AGENT_BROWSER_SESSION_NAME', 'AGENT_BROWSER_PROVIDER', 'AGENT_BROWSER_CDP'):
    environment.pop(name, None)
base = ['agent-browser', '--session', 'cosmocrat-reference-' + uuid.uuid4().hex[:10]]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands), capture_output=True, text=True, env=environment, timeout=150)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    assert result.returncode == 0, 'Reference browser command failed'
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(item['success'] for item in records)
    assert all(item['result']['errors'] == [] for item in records if item['command'][0] == 'errors')
    print(f'PASS: {len(commands)} reference browser commands')
finally:
    subprocess.run(base + ['close'], env=environment, capture_output=True, timeout=20)
