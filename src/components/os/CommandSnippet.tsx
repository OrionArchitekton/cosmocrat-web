'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { trackConversion } from '@/lib/analytics';
import { toolDownloadUrl, type ToolDefinition } from '@/lib/toolCatalog';

type CommandTool = Pick<ToolDefinition, 'id' | 'name' | 'release' | 'source' | 'asset'>;

export default function CommandSnippet({ tool }: { tool: CommandTool }) {
  const [status, setStatus] = useState<'ready' | 'copied' | 'manual'>('ready');
  const code = useRef<HTMLElement>(null);
  const download = toolDownloadUrl(tool);
  const tag = tool.release?.split('/').pop();
  const kind = download ? (tool.asset?.name.endsWith('.zip') ? 'archive' : 'wheel') : 'source';
  const command = download && tool.asset
    ? `curl -fLO '${download}' &&\nprintf '%s  %s\\n' '${tool.asset.sha256}' '${tool.asset.name}' | sha256sum -c -`
    : `git clone${tag ? ` --branch ${tag}` : ''} --depth 1 ${tool.source}.git`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const selection = window.getSelection();
      if (selection && code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus('manual');
      return;
    }
    setStatus('copied');
    trackConversion({ event: 'copy_command', tool_id: tool.id });
  }

  return (
    <div className="my-3 min-w-0 rounded-lg border border-[#334155] bg-[#0b1120] px-3.5 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <span className="text-xs font-semibold text-[#d5deea]">
          {download ? 'Download and verify the' : 'Clone the'} {kind}
        </span>
        <button type="button" onClick={copy} aria-label={`Copy command for ${tool.name}`}
          className="inline-flex min-h-9 items-center gap-1.5 text-xs font-medium text-[#f0b66a]">
          {status === 'copied' ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {status === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${tool.name} command`}
        className="m-0 max-w-full overflow-x-auto pb-2 text-[11px] leading-relaxed text-[#cbd5e1]">
        <code ref={code}>{command}</code>
      </pre>
      <div className="text-[11px] leading-relaxed text-[#94a3b8]">
        {download ? 'In an empty folder with curl and sha256sum. Follow the release instructions after verification.' : 'Run in a working folder with Git, then follow the repository’s setup instructions.'}
      </div>
      <span role="status" className={status === 'manual' ? 'text-xs text-[#f0b66a]' : 'sr-only'}>
        {status === 'manual' ? 'Clipboard unavailable. Copy the selected command manually.' :
          status === 'copied' ? 'Command copied to clipboard.' : ''}
      </span>
    </div>
  );
}
