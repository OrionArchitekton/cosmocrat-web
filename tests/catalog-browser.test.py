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
    ['fill', 'input[type="search"]', 'no-matching-tool-712'],
    ['wait', '--fn', '!document.querySelector("[data-empty-state]").hidden'],
    ['click', '[data-reset-filters]'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 10'],
    check('document.activeElement.type === "search"', 'Reset returns search focus'),
    ['focus', '[data-filter="continuity"]'], ['press', 'Enter'],
    ['wait', '--fn', 'document.querySelectorAll("[data-tool]:not([hidden])").length === 2'],
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
