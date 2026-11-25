"""Actual local media-source failure/recovery; no production or form requests."""
import json
import os
import subprocess
import urllib.parse
import uuid

origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4192').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Player checks require an explicitly local integrated homepage.')

def check(expression, label):
    return ['eval', f'(()=>{{if(!({expression}))throw Error({json.dumps(label)});return {json.dumps(label)};}})()']

pattern = origin + '/media/cosmocrat/*.mp4'
commands = [
    ['set', 'viewport', '1440', '1000'], ['set', 'media', 'dark', 'reduced-motion'],
    ['network', 'route', pattern, '--abort'], ['open', origin + '/'],
    ['wait', 'button[aria-label="Play introduction"]'],
    ['eval', 'document.querySelector(".motion-control").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', 'button[aria-label="Play introduction"]'],
    ['wait', '--fn', '!!document.querySelector("video") && document.querySelector("video").networkState === 3'], ['wait', '400'],
    check('!!document.querySelector(".motion-fallback") && !!document.querySelector("#static-site h1")', 'Source exhaustion explains failure and retains static content'),
    ['network', 'unroute', pattern], ['set', 'viewport', '390', '844'],
    ['wait', '--fn', 'document.querySelector("video").readyState >= 2 && document.querySelector("video").videoHeight === 1440'],
    ['wait', 'button[aria-label="Play introduction"]'],
    check('!document.querySelector(".motion-fallback")', 'Playable recovery clears the unavailable message'),
    ['eval', 'document.querySelector(".motion-control").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', 'button[aria-label="Play introduction"]'],
    ['wait', '--fn', 'document.querySelector("video").currentTime > .2'],
    ['eval', 'document.querySelector("video").currentTime = 7.5'],
    ['wait', '--fn', '!document.querySelector("video").seeking'],
    ['eval', 'document.querySelector("[data-motion-welcome]").scrollIntoView({block:"center",behavior:"instant"})'],
    ['eval', 'window.beforeResize = document.querySelector("video").currentTime'],
    ['set', 'viewport', '1440', '1000'],
    ['wait', '--fn', 'document.querySelector("video").currentSrc.includes("desktop.mp4") && document.querySelector("video").readyState >= 2 && !document.querySelector("video").seeking'],
    check('!document.querySelector("video").paused && document.querySelector("video").currentTime >= window.beforeResize - .15', 'Playing resize preserves position and playback'),
    ['wait', 'button[aria-label="Pause introduction"]'],
    ['eval', 'document.querySelector(".motion-control").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', 'button[aria-label="Pause introduction"]'],
    ['wait', 'button[aria-label="Play introduction"]'],
    ['eval', 'window.beforePausedResize = document.querySelector("video").currentTime'],
    ['set', 'viewport', '390', '844'],
    ['wait', '--fn', 'document.querySelector("video").currentSrc.includes("mobile.mp4") && document.querySelector("video").readyState >= 2 && !document.querySelector("video").seeking'],
    check('document.querySelector("video").paused && Math.abs(document.querySelector("video").currentTime - window.beforePausedResize) < .15', 'Paused resize preserves position without restarting'),
    ['network', 'route', origin + '/media/cosmocrat/cosmocrat-welcome-mobile.mp4*', '--abort'],
    ['eval', '(()=>{const v=document.querySelector("video");window.partialUnavailable=false;new MutationObserver(()=>{if(document.querySelector(".motion-fallback"))window.partialUnavailable=true}).observe(document.querySelector("[data-motion-welcome]"),{childList:true,subtree:true});v.querySelectorAll("source").forEach(s=>s.src += "?fallback-check=1");v.load();})()'],
    ['wait', '--fn', 'document.querySelector("video").currentSrc.includes("desktop.mp4") && document.querySelector("video").readyState >= 2'],
    ['wait', 'button[aria-label="Play introduction"]'],
    check('document.querySelector("video").videoWidth === 1920 && !document.querySelector(".motion-fallback") && !window.partialUnavailable', 'A failed portrait source can fall back without reporting total failure'),
]
for width in ('320', '390'):
    commands.extend([
        ['set', 'viewport', width, '844'], ['open', origin + '/?t=11'],
        ['wait', '--fn', 'document.querySelector("video").readyState >= 2 && Math.abs(document.querySelector("video").currentTime - 11) < .1'],
        check('document.querySelector("video").paused && document.querySelector(".motion-chapter-btn[aria-current]").textContent.includes("Access & Practices")', 'A reduced-motion visitor lands on the requested chapter'),
        check('document.documentElement.scrollWidth <= innerWidth', 'The theater fits the mobile viewport'),
        check('Array.from(document.querySelectorAll(".motion-deck-title,.motion-chapter-title")).every(el => el.scrollWidth <= el.clientWidth + 1)', 'The header and all four chapter titles fit without truncation'),
        ['focus', 'input[aria-label="Seek preview video timeline"]'], ['press', 'End'], ['press', 'Home'], ['press', 'ArrowRight'],
        ['wait', '--fn', 'Math.abs(document.querySelector("video").currentTime - .1) < .01'],
        check('document.querySelector("video").paused', 'Keyboard scrubbing keeps a paused video paused'),
        ['eval', 'document.querySelectorAll(".motion-chapter-btn")[3].scrollIntoView({block:"center",behavior:"instant"})'],
        ['click', '.motion-chapter-btn:nth-child(4)'],
        ['wait', '--fn', 'document.querySelector("video").currentTime >= 17 && !document.querySelector("video").paused'],
        check('document.querySelector(".motion-chapter-btn[aria-current]").textContent.includes("Explicit Boundaries")', 'Tapping the chapter selects its real time range'),
    ])
commands.append(['errors'])
environment = os.environ.copy()
for name in ('AGENT_BROWSER_AUTO_CONNECT', 'AGENT_BROWSER_PROFILE', 'AGENT_BROWSER_STATE',
             'AGENT_BROWSER_SESSION_NAME', 'AGENT_BROWSER_PROVIDER', 'AGENT_BROWSER_CDP'):
    environment.pop(name, None)
session = 'cosmocrat-player-' + uuid.uuid4().hex[:10]
base = ['agent-browser', '--session', session]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands),
                            capture_output=True, text=True, env=environment, timeout=120)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    assert result.returncode == 0, 'Player browser command failed'
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(record['success'] for record in records)
    assert records[-1]['result']['errors'] == [], records[-1]
    print(f'PASS: {len(commands)} player browser checks')
finally:
    subprocess.run(base + ['close'], env=environment, capture_output=True, timeout=20)
