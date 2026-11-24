'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureBrowserAttribution, isBrowserDebugMode } from '@/lib/attribution';
import { syncAttributionToDataLayer } from '@/lib/analytics';

export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  useEffect(() => {
    const utms = captureBrowserAttribution();
    const debugMode = isBrowserDebugMode();
    syncAttributionToDataLayer(utms, debugMode);
  }, [pathname, queryKey]);

  return null;
}
