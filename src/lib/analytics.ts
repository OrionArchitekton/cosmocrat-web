type Conversion =
  | { event: 'waitlist_success' | 'starter_simulator_complete' }
  | { event: 'copy_command' | 'github_release_click'; tool_id: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// GTM consumes this queue only in production. Keep tracker failures outside the user action.
export function trackConversion(conversion: Conversion) {
  try {
    (window.dataLayer ??= []).push({ ...conversion, page_path: window.location.pathname });
  } catch {
    // A blocked or read-only data layer must not interfere with navigation, copying or signup.
  }
}
