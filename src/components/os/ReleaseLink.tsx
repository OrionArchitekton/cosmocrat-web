'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { trackConversion } from '@/lib/analytics';

type ReleaseLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'onClick' | 'onAuxClick'> & {
  href: string;
  toolId: string;
};

export default function ReleaseLink({ toolId, ...props }: ReleaseLinkProps) {
  const track = () => trackConversion({ event: 'github_release_click', tool_id: toolId });

  return (
    <a
      {...props}
      data-release-tool={toolId}
      onClick={track}
      onAuxClick={(event) => { if (event.button === 1) track(); }}
    />
  );
}
