"""GET-only local catalog journey; requires separately installed agent-browser/Chrome."""
import json
import os
import subprocess
import urllib.parse
import uuid

origin = os.environ.get('SITE_TEST_ORIGIN', 'http://127.0.0.1:4196').rstrip('/')
target = urllib.parse.urlsplit(origin)
if target.scheme != 'http' or target.hostname not in ('127.0.0.1', 'localhost', '::1'):
    raise ValueError('Catalog checks require an explicitly local HTTP server.')

def check(expression, label):
    return ['eval', f'(()=>{{if(!({expression}))throw Error({json.dumps(label)});return {json.dumps(label)};}})()']

commands = [
    ['set', 'viewport', '1440', '1000'], ['open', origin + '/tools'],
    check('document.querySelectorAll("[data-tool]").length === 10', 'All ten tools render'),
    ['wait', '--fn', '!document.querySelector("[data-filter-controls]").hidden'],
    ['click', '[data-filter="access"]'],
    ['fill', 'input[type="search"]', 'Android'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 1'],
    check('!document.querySelector("#orion-phone").hidden && document.querySelector("[data-result-count]").textContent.startsWith("1 of")', 'Category, search and count compose'),
    check('[...document.querySelectorAll("[data-tool][hidden]")].every(e=>getComputedStyle(e).display === "none") && getComputedStyle(document.querySelector("[data-empty-state]")).display === "none"', 'Filtered cards and the empty state are visually hidden'),
    ['fill', 'input[type="search"]', 'no-matching-tool-712'],
    ['wait', '--fn', '!document.querySelector("[data-empty-state]").hidden'],
    ['click', '[data-reset-filters]'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 10'],
    check('document.activeElement.type === "search"', 'Reset returns search focus'),
    ['focus', '[data-filter="continuity"]'], ['press', 'Enter'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 2'],
    ['eval', 'document.querySelector("#orion-handoff summary").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', '#orion-handoff summary'],
    check('document.querySelector("#orion-handoff details").open', 'Native boundary disclosure opens'),
    ['focus', '[data-filter="all"]'], ['press', 'Enter'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 10'],
    check('document.documentElement.scrollWidth <= innerWidth', 'Desktop catalog has no overflow'),
    ['set', 'viewport', '390', '844'],
    check('document.documentElement.scrollWidth <= innerWidth', '390px catalog has no overflow'),
    ['set', 'viewport', '320', '750'],
    check('document.documentElement.scrollWidth <= innerWidth', '320px catalog has no overflow'),
    ['fill', 'input[type="search"]', 'Watch that guide’s companion'],
    check('!document.querySelector("#orion-starter").hidden', 'A visible Starter profile can be searched'),
    ['fill', 'input[type="search"]', 'preview'],
    check('!document.querySelector("#orion-starter").hidden && !document.querySelector("#orion-results").hidden', 'Search includes visible readiness badges'),
    ['fill', 'input[type="search"]', 'v0.1.1'],
    check('!document.querySelector("#orion-pm").hidden', 'Search includes visible release versions'),
    ['set', 'viewport', '768', '1000'],
    check('(()=>{const h=document.querySelector("header").getBoundingClientRect();return [...document.querySelectorAll("header a,header button,header summary")].every(e=>{const b=e.getBoundingClientRect();return !b.height || (b.top>=h.top && b.bottom<=h.bottom && b.right<=innerWidth)}) && document.documentElement.scrollWidth<=innerWidth})()', 'Tablet navigation stays inside the header'),
    ['set', 'viewport', '900', '1000'],
    check('(()=>{const h=document.querySelector("header").getBoundingClientRect();return [...document.querySelectorAll("header a,header button,header summary")].every(e=>{const b=e.getBoundingClientRect();return !b.height || (b.top>=h.top && b.bottom<=h.bottom && b.right<=innerWidth)}) && document.documentElement.scrollWidth<=innerWidth})()', 'Intermediate navigation stays inside the header'),
    ['set', 'viewport', '1024', '1000'],
    check('(()=>{const h=document.querySelector("header").getBoundingClientRect();return [...document.querySelectorAll("header a,header button,header summary")].every(e=>{const b=e.getBoundingClientRect();return !b.height || (b.top>=h.top && b.bottom<=h.bottom && b.right<=innerWidth)}) && document.documentElement.scrollWidth<=innerWidth})()', 'Desktop navigation stays inside the header'),
    ['set', 'viewport', '390', '844'],
    ['open', origin + '/tools'],
    ['wait', '--fn', '!document.querySelector("[data-filter-controls]").hidden'],
    ['click', '[data-filter="access"]'],
    ['eval', 'document.querySelector("[data-tool-matcher] > summary").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', '[data-tool-matcher] > summary'],
    ['click', '[data-tool-matcher] label:nth-child(1) input'],
    check("""!!document.querySelector('[data-tool-matcher] a[href="#orion-pm"]') && !!document.querySelector('[data-tool-matcher] a[href="#orion-worktree-report"]')""", 'Collision answer recommends ownership and overlap evidence'),
    ['click', '[data-tool-matcher] label:nth-child(2) input'],
    ['click', '[data-tool-matcher] label:nth-child(3) input'],
    check('document.querySelectorAll("[data-tool-matcher] a").length === 5', 'Three answers combine all five matching tools'),
    ['click', '[data-tool-matcher] a[href="#orion-pm"]'],
    ['wait', '--fn', 'location.hash === "#orion-pm" && !document.querySelector("#orion-pm").hidden'],
    check('document.querySelector("[data-filter=all]").getAttribute("aria-pressed") === "true"', 'Choosing a recommendation reveals a previously filtered tool'),
    ['eval', 'Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text}}})'],
    ['eval', 'document.querySelector("#orion-pm button").scrollIntoView({block:"center",behavior:"instant"})'],
    ['click', '#orion-pm button'],
    ['wait', '--fn', 'window.__copied === document.querySelector("#orion-pm pre code").textContent && window.dataLayer.some(e=>e.event==="copy_command" && e.tool_id==="orion-pm" && e.page_path==="/tools")'],
    ['eval', 'navigator.clipboard.writeText=async()=>{throw new Error("Clipboard denied")}'],
    ['click', '#orion-pm button'],
    ['wait', '--fn', 'document.querySelector("#orion-pm [role=status]").textContent.includes("manually")'],
    check('getSelection().toString() === window.__copied && window.dataLayer.filter(e=>e.event==="copy_command").length === 1', 'Clipboard denial selects the command and records no extra conversion'),
    ['open', origin + '/docs#starting-paths'],
    ['wait', '--fn', '!!document.querySelector("#starting-paths pre code")'],
    check('document.querySelector("#starting-paths code").textContent.includes("orion-starter-0.3.0-rc.1.zip")', 'Development evidence uses the 0.3 archive'),
    ['click', '[role=tablist] > button:nth-child(3)'],
    check('document.querySelector("#starting-paths code").textContent.includes("orion-starter-0.2.0-rc.1.zip")', 'Continuity uses its own verified archive'),
    ['click', '[role=tablist] > button:nth-child(4)'],
    check('!document.querySelector("#starting-paths code")', 'Architecture reading path has no installation command'),
    ['errors'],
]
environment = os.environ.copy()
for name in ('AGENT_BROWSER_AUTO_CONNECT', 'AGENT_BROWSER_PROFILE', 'AGENT_BROWSER_STATE',
             'AGENT_BROWSER_SESSION_NAME', 'AGENT_BROWSER_PROVIDER', 'AGENT_BROWSER_CDP'):
    environment.pop(name, None)
session = 'cosmocrat-catalog-' + uuid.uuid4().hex[:10]
base = ['agent-browser', '--session', session]
try:
    result = subprocess.run(base + ['batch', '--bail', '--json'], input=json.dumps(commands),
                            capture_output=True, text=True, env=environment, timeout=120)
    print(result.stdout)
    if result.stderr:
        print(result.stderr)
    assert result.returncode == 0, 'Catalog browser command failed'
    records = json.loads(result.stdout)
    assert len(records) == len(commands) and all(record['success'] for record in records)
    assert records[-1]['result']['errors'] == [], records[-1]
    print(f'PASS: {len(commands)} catalog browser checks')
finally:
    subprocess.run(base + ['close'], env=environment, capture_output=True, timeout=20)
