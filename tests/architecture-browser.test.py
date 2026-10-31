"""Manual GET-only architecture journey with separately installed agent-browser/Chrome."""
import json
import os
from pathlib import Path
import subprocess
import urllib.parse
import uuid

origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4196').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Architecture checks require an explicitly local HTTP server.')
artifacts = os.environ.get('SITE_TEST_ARTIFACT_DIR')
if artifacts:
    Path(artifacts).mkdir(parents=True, exist_ok=True)
commands = []
routes = ['runtime-governance', 'gate-system', 'memory-infrastructure', 'decision-exhaust', 'chronicle-receipts', 'drift-guard']
for width, height in [(1440, 1000), (390, 844)]:
    commands.append(['set', 'viewport', str(width), str(height)])
    for route in routes:
        commands.extend([
            ['open', origin + '/' + route],
            ['eval', f'(()=>{{if(location.origin !== {json.dumps(origin)} || location.pathname !== {json.dumps("/" + route)})throw Error("Architecture route identity");return true}})()'],
            ['eval', 'document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))'],
            ['eval', 'window.scrollTo(0,0)'],
            ['eval', '(()=>{const h=document.querySelector("header"),s=document.querySelector(".governance-context");const hb=h.getBoundingClientRect(),sb=s.getBoundingClientRect();const a=[...s.querySelectorAll("a")].find(a=>a.pathname==="/tools");if(innerWidth<=390 && ![...h.querySelectorAll("button,summary")].some(e=>e.getBoundingClientRect().height>0))throw Error("Mobile menu missing");if(document.documentElement.scrollWidth>innerWidth||sb.top+1<hb.bottom||!a||!h.contains(document.elementFromPoint(40,20)))throw Error("Architecture notice/navigation visibility or overflow");return {route:location.pathname,width:innerWidth,headerBottom:hb.bottom,noticeTop:sb.top,noticeVisible:sb.height>0,catalogLink:!!a,overflow:false}})()'],
        ])
        if artifacts:
            commands.append(['screenshot', str(Path(artifacts) / f'architecture-{route}-{width}.png')])
        commands.append(['errors'])
environment = os.environ.copy()
for name in ('AGENT_BROWSER_AUTO_CONNECT', 'AGENT_BROWSER_PROFILE', 'AGENT_BROWSER_STATE', 'AGENT_BROWSER_SESSION_NAME', 'AGENT_BROWSER_PROVIDER', 'AGENT_BROWSER_CDP'):
    environment.pop(name, None)
base = ['agent-browser', '--session', 'cosmocrat-architecture-' + uuid.uuid4().hex[:10]]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands), capture_output=True, text=True, env=environment, timeout=180)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    assert result.returncode == 0, 'Architecture browser command failed'
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(item['success'] for item in records)
    assert all(item['result']['errors'] == [] for item in records if item['command'][0] == 'errors')
    print(f'PASS: {len(commands)} architecture browser commands')
finally:
    subprocess.run(base + ['close'], env=environment, capture_output=True, timeout=20)
