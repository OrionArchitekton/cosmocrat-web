import {
  getEffectiveUtmParams,
  isBrowserDebugMode,
  type UtmParams,
} from './attribution';

type LegacyConversion =
  | { event: 'waitlist_success' | 'starter_simulator_complete' }
  | { event: 'copy_command' | 'github_release_click'; tool_id: string };

export type Ga4ConversionEventName =
  | 'newsletter_signup'
  | 'gate_simulator_run'
  | 'missed_call_calc_run'
  | 'affiliate_outbound_click';

export type Ga4Scalar = string | number | boolean;
export type Ga4EventParams = Record<string, Ga4Scalar | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function compactParams(params: Record<string, unknown>): Record<string, Ga4Scalar> {
  const clean: Record<string, Ga4Scalar> = {};
  for (const [key, value] of Object.entries(params)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      if (typeof value === 'string' && value.length === 0) continue;
      clean[key] = value;
    }
  }
  return clean;
}

export function buildGa4EventPayload(opts: {
  event: Ga4ConversionEventName;
  pagePath: string;
  utms: UtmParams;
  debugMode: boolean;
  params?: Ga4EventParams;
}): Record<string, Ga4Scalar> {
  const merged = compactParams({
    ...(opts.params ?? {}),
    utm_source: opts.utms.utm_source,
    utm_medium: opts.utms.utm_medium,
    utm_campaign: opts.utms.utm_campaign,
    utm_content: opts.utms.utm_content,
    utm_term: opts.utms.utm_term,
    page_path: opts.pagePath,
    ...(opts.debugMode ? { debug_mode: true } : {}),
  });
  return {
    event: opts.event,
    ...merged,
  };
}

// Legacy GTM conversions keep their exact key shape for tests/conversion-browser.test.py.
export function trackConversion(conversion: LegacyConversion) {
  try {
    (window.dataLayer ??= []).push({ ...conversion, page_path: window.location.pathname });
  } catch {
    // A blocked or read-only data layer must not interfere with navigation, copying or signup.
  }
}

export function trackGa4Conversion(
  event: Ga4ConversionEventName,
  params?: Ga4EventParams
): void {
  if (typeof window === 'undefined') return;
  try {
    const utms = getEffectiveUtmParams();
    const debugMode = isBrowserDebugMode();
    const payload = buildGa4EventPayload({
      event,
      pagePath: window.location.pathname,
      utms,
      debugMode,
      params,
    });
    (window.dataLayer ??= []).push(payload);
    if (typeof window.gtag === 'function') {
      const { event: _ev, ...eventParams } = payload;
      window.gtag('event', event, eventParams);
    }
  } catch {
    // Tracker failures must never block user interactions.
  }
}

export function syncAttributionToDataLayer(utms: UtmParams, debugMode: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const context = compactParams({
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
      page_path: window.location.pathname,
      ...(debugMode ? { debug_mode: true } : {}),
    });
    if (Object.keys(context).length <= 1 && !debugMode) return;
    (window.dataLayer ??= []).push({
      event: 'attribution_context',
      ...context,
    });
    if (typeof window.gtag === 'function' && debugMode) {
      window.gtag('set', { debug_mode: true });
    }
  } catch {
    // Ignore read-only dataLayer environments.
  }
}
