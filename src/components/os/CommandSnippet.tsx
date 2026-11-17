'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { trackConversion } from '@/lib/analytics';
import { toolDownloadUrl, type ToolDefinition } from '@/lib/toolCatalog';

type CommandTool = Pick<ToolDefinition, 'id' | 'name' | 'release' | 'source' | 'asset'>;

function quickstart(tool: CommandTool) {
  const download = toolDownloadUrl(tool);
  const { asset } = tool;
  if (!download || !asset) {
    const tag = tool.release?.split('/').pop();
    return {
      label: 'Clone the source',
      command: `git clone${tag ? ` --branch ${tag}` : ''} --depth 1 ${tool.source}.git`,
      note: 'Run in a working folder with Git, then follow the repository’s setup instructions.',
    };
  }

  const verify = `curl -fLO '${download}' &&\nprintf '%s  %s\\n' '${asset.sha256}' '${asset.name}' | sha256sum -c -`;
  const prerequisites = 'Start in an empty folder with curl and sha256sum';
  if (tool.id === 'orion-starter') {
    const directory = asset.name.replace(/\.zip$/, '');
    return {
      label: 'Verify the Starter profile',
      command: `${verify} &&\npython3.11 -m zipfile -e '${asset.name}' . &&\ncd '${directory}' &&\npython3.11 -I -B scripts/check_profile.py`,
      note: `${prerequisites} and CPython 3.11. After the profile check, follow the matching guide.`,
    };
  }
  if (tool.id === 'orion-pm' || tool.id === 'orion-handoff') {
    const versionCheck = tool.id === 'orion-pm' ? 'version' : '--version';
    return {
      label: 'Install and check the CLI',
      command: `${verify} &&\ntest ! -e .venv && python3.11 -m venv .venv &&\n.venv/bin/python -m pip install --no-index --no-deps './${asset.name}' &&\n.venv/bin/${tool.id} --json ${versionCheck}`,
      note: `${prerequisites} and CPython 3.11 with venv support.`,
    };
  }
  return {
    label: 'Download and verify the wheel',
    command: verify,
    note: `${prerequisites}. Follow the release instructions after verification.`,
  };
}

export default function CommandSnippet({ tool }: { tool: CommandTool }) {
  const [status, setStatus] = useState<'ready' | 'copied' | 'manual'>('ready');
  const code = useRef<HTMLElement>(null);
  const { label, command, note } = quickstart(tool);

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
        <span className="text-xs font-semibold text-[#d5deea]">{label}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy command for ${tool.name}`}
          className="inline-flex min-h-9 items-center gap-1.5 text-xs font-medium text-[#f0b66a]"
        >
          {status === 'copied' ? (
            <Check size={13} aria-hidden="true" />
          ) : (
            <Copy size={13} aria-hidden="true" />
          )}
          {status === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${tool.name} command`}
        className="m-0 max-w-full overflow-x-auto pb-2 text-[11px] leading-relaxed text-[#cbd5e1]"
      >
        <code ref={code}>{command}</code>
      </pre>
      <div className="text-[11px] leading-relaxed text-[#94a3b8]">{note}</div>
      <span role="status" className={status === 'manual' ? 'text-xs text-[#f0b66a]' : 'sr-only'}>
        {status === 'manual'
          ? 'Clipboard unavailable. Copy the selected command manually.'
          : status === 'copied'
            ? 'Command copied to clipboard.'
            : ''}
      </span>
    </div>
  );
}
