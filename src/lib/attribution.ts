export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const UTM_STORAGE_SLOT = 'cosmocrat_utm_attribution_v1';
const DEBUG_STORAGE_FLAG = 'cosmocrat_ga_debug_mode_v1';
const MAX_UTM_LEN = 200;

export function sanitizeUtmValue(raw: string | null | undefined): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > MAX_UTM_LEN) return undefined;
  // Drop values carrying email-like PII before storage or analytics emission.
  if (trimmed.includes('@')) return undefined;
  return trimmed;
}

export function extractUtmParams(searchOrUrl: string): UtmParams {
  if (!searchOrUrl) return {};
  let query = searchOrUrl;
  if (/^[a-z][a-z0-9+.-]*:/i.test(searchOrUrl) || searchOrUrl.includes('/')) {
    try {
      const parsed = new URL(searchOrUrl, 'https://www.cosmocrat.ai');
      query = parsed.search;
    } catch {
      return {};
    }
  }
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const clean = sanitizeUtmValue(params.get(key));
    if (clean) out[key] = clean;
  }
  return out;
}

export function mergeUtmParams(current: UtmParams, stored: UtmParams): UtmParams {
  const merged: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = current[key] ?? stored[key];
    if (value) merged[key] = value;
  }
  return merged;
}

export function appendUtmParams(href: string, params: UtmParams): string {
  const keys = UTM_KEYS.filter((key) => Boolean(params[key]));
  if (keys.length === 0) return href;

  const isAbsolute = /^[a-z][a-z0-9+.-]*:/i.test(href);
  const hashIdx = href.indexOf('#');
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : '';
  const baseHref = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const qIdx = baseHref.indexOf('?');
  const pathname = qIdx >= 0 ? baseHref.slice(0, qIdx) : baseHref;
  const existingQuery = qIdx >= 0 ? baseHref.slice(qIdx + 1) : '';
  const searchParams = new URLSearchParams(existingQuery);

  for (const key of keys) {
    const value = params[key];
    if (value && !searchParams.has(key)) {
      searchParams.set(key, value);
    }
  }

  const nextQuery = searchParams.toString();
  if (isAbsolute) {
    return `${pathname}${nextQuery ? `?${nextQuery}` : ''}${hash}`;
  }
  return `${pathname}${nextQuery ? `?${nextQuery}` : ''}${hash}`;
}

export interface DebugModeContext {
  search?: string;
  hostname?: string;
  nodeEnv?: string;
  siteEnv?: string;
  vercelEnv?: string;
  storedDebug?: boolean;
}

export function isLocalOrPreviewHost(hostname: string | undefined): boolean {
  if (!hostname) return false;
  const host = hostname.trim().toLowerCase();
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    host.endsWith('.vercel.app')
  );
}

export function hasDebugQueryFlag(search: string | undefined): boolean | null {
  if (!search) return null;
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const raw = params.get('debug_mode');
  if (raw === '1' || raw === 'true') return true;
  if (raw === '0' || raw === 'false') return false;
  return null;
}

export function resolveDebugMode(ctx: DebugModeContext): boolean {
  const explicit = hasDebugQueryFlag(ctx.search);
  if (explicit === false) return false;
  if (explicit === true || ctx.storedDebug) return true;
  if (ctx.nodeEnv && ctx.nodeEnv !== 'production') return true;
  if (ctx.siteEnv && ctx.siteEnv !== 'production') return true;
  if (ctx.vercelEnv && ctx.vercelEnv !== 'production') return true;
  if (isLocalOrPreviewHost(ctx.hostname)) return true;
  return false;
}

export function readStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_SLOT);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: UtmParams = {};
    for (const key of UTM_KEYS) {
      const clean = sanitizeUtmValue(
        typeof parsed[key] === 'string' ? (parsed[key] as string) : undefined
      );
      if (clean) out[key] = clean;
    }
    return out;
  } catch {
    return {};
  }
}

export function captureBrowserAttribution(): UtmParams {
  if (typeof window === 'undefined') return {};
  const fromUrl = extractUtmParams(window.location.search);
  const stored = readStoredUtmParams();
  const merged = mergeUtmParams(fromUrl, stored);

  try {
    if (Object.keys(merged).length > 0) {
      window.sessionStorage.setItem(UTM_STORAGE_SLOT, JSON.stringify(merged));
    }
    const debugFlag = hasDebugQueryFlag(window.location.search);
    if (debugFlag === true) {
      window.sessionStorage.setItem(DEBUG_STORAGE_FLAG, '1');
    } else if (debugFlag === false) {
      window.sessionStorage.removeItem(DEBUG_STORAGE_FLAG);
    }
  } catch {
    // Ignore storage failures in restricted browser modes.
  }

  return merged;
}

export function getEffectiveUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  return mergeUtmParams(extractUtmParams(window.location.search), readStoredUtmParams());
}

export function isBrowserDebugMode(): boolean {
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV !== 'production';
  }
  let storedDebug = false;
  try {
    storedDebug = window.sessionStorage.getItem(DEBUG_STORAGE_FLAG) === '1';
  } catch {
    storedDebug = false;
  }
  return resolveDebugMode({
    search: window.location.search,
    hostname: window.location.hostname,
    nodeEnv: process.env.NODE_ENV,
    siteEnv: process.env.NEXT_PUBLIC_SITE_ENV,
    vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
    storedDebug,
  });
}
