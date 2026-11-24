'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  analyzeAgentDrift,
  DRIFT_PRESETS,
  MAX_DIAGNOSTIC_INPUT_CHARS,
  type DriftAnalysisReport,
  type DriftFinding,
} from '@/lib/driftSlopAnalyzer';
import { trackGa4Conversion } from '@/lib/analytics';
import {
  appendUtmParams,
  getEffectiveUtmParams,
  mergeUtmParams,
  type UtmParams,
} from '@/lib/attribution';

function renderHighlightedSegments(text: string, findings: DriftFinding[]): ReactNode[] {
  if (!text) return [];
  const spans = findings
    .filter((f) => f.end > f.start && f.ruleId !== 'LOW_BURSTINESS_CV' && f.ruleId !== 'EXCESS_PASSIVE_VOICE')
    .map((f) => ({ start: f.start, end: f.end, severity: f.severity, ruleId: f.ruleId }));

  if (spans.length === 0) {
    return [<span key="plain-all">{text}</span>];
  }

  // Merge overlapping spans while keeping BLOCK priority over WARN.
  const sorted = [...spans].sort((a, b) => a.start - b.start || (a.severity === 'BLOCK' ? -1 : 1));
  const merged: typeof sorted = [];
  for (const seg of sorted) {
    const prev = merged[merged.length - 1];
    if (prev && seg.start < prev.end) {
      if (seg.end > prev.end) prev.end = seg.end;
      if (seg.severity === 'BLOCK') prev.severity = 'BLOCK';
    } else {
      merged.push({ ...seg });
    }
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;
  merged.forEach((seg, idx) => {
    if (seg.start > cursor) {
      nodes.push(<span key={`t-${idx}-${cursor}`}>{text.slice(cursor, seg.start)}</span>);
    }
    const snippet = text.slice(seg.start, seg.end);
    const isBlock = seg.severity === 'BLOCK';
    nodes.push(
      <mark
        key={`m-${idx}-${seg.start}`}
        title={seg.ruleId}
        className={
          isBlock
            ? 'rounded bg-red-500/25 px-1 py-0.5 text-red-200 ring-1 ring-red-400/50'
            : 'rounded bg-amber-500/20 px-1 py-0.5 text-amber-200 ring-1 ring-amber-400/40'
        }
      >
        {snippet}
      </mark>
    );
    cursor = seg.end;
  });

  if (cursor < text.length) {
    nodes.push(<span key={`tail-${cursor}`}>{text.slice(cursor)}</span>);
  }
  return nodes;
}

export default function DriftGuardDiagnostic() {
  const defaultPreset = DRIFT_PRESETS[0];
  const [inputText, setInputText] = useState<string>(defaultPreset.sampleText);
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [report, setReport] = useState<DriftAnalysisReport>(() =>
    analyzeAgentDrift(defaultPreset.sampleText)
  );
  const [hasUserRun, setHasUserRun] = useState<boolean>(false);
  const [clientUtms, setClientUtms] = useState<UtmParams>({});

  useEffect(() => {
    setClientUtms(getEffectiveUtmParams());
  }, []);

  const emitSimulatorEvent = (nextReport: DriftAnalysisReport, presetId: string) => {
    const blockerCount = nextReport.findings.filter((f) => f.severity === 'BLOCK').length;
    trackGa4Conversion('gate_simulator_run', {
      simulator_id: 'drift_guard_diagnostic',
      preset_id: presetId,
      verdict: nextReport.metrics.verdict,
      score: nextReport.metrics.score,
      word_count: nextReport.metrics.wordCount,
      finding_count: nextReport.findings.length,
      blocker_count: blockerCount,
    });
  };

  const handleRun = () => {
    const nextReport = analyzeAgentDrift(inputText);
    setReport(nextReport);
    setHasUserRun(true);
    emitSimulatorEvent(nextReport, activePresetId || 'custom');
  };

  const handlePreset = (presetId: string) => {
    const preset = DRIFT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setInputText(preset.sampleText);
    const nextReport = analyzeAgentDrift(preset.sampleText);
    setReport(nextReport);
    setHasUserRun(true);
    emitSimulatorEvent(nextReport, preset.id);
  };

  const handleClear = () => {
    setActivePresetId('custom');
    setInputText('');
    setReport(analyzeAgentDrift(''));
    setHasUserRun(false);
  };

  const pilotHref = useMemo(() => {
    const baseUtms = mergeUtmParams(clientUtms, {
      utm_source: 'cosmocrat_web',
      utm_medium: 'interactive_tool',
      utm_campaign: 'drift_guard_diagnostic',
      utm_content: activePresetId || 'custom',
    });
    return appendUtmParams('/waitlist', baseUtms);
  }, [activePresetId, clientUtms]);

  const highlightedNodes = useMemo(
    () => renderHighlightedSegments(inputText, report.findings),
    [inputText, report.findings]
  );

  const { metrics, findings } = report;
  const blockersCount = findings.filter((f) => f.severity === 'BLOCK').length;
  const warningsCount = findings.filter((f) => f.severity === 'WARN').length;

  const verdictBadgeClass =
    metrics.verdict === 'PASS'
      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
      : metrics.verdict === 'WARN'
        ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
        : 'border-red-500/40 bg-red-500/15 text-red-200';

  return (
    <section
      id="diagnostic"
      className="py-16 border-b border-[#233047] bg-[#090f1d]"
      aria-labelledby="drift-diagnostic-heading"
    >
      <div className="wrap max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="eyebrow justify-center">Interactive Client-Side Diagnostic</div>
          <h2 id="drift-diagnostic-heading" className="text-3xl font-semibold text-white mt-3 mb-3">
            Agent Drift &amp; Slop Gate Diagnostic
          </h2>
          <p className="text-sm sm:text-base text-[#b2c0d4] leading-relaxed">
            Paste any agent output, release note, or workflow draft to inspect deterministic drift
            signals locally in your browser. Nothing is stored or sent to a model endpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input & Controls */}
          <div className="lg:col-span-6 rounded-xl border border-[#233047] bg-[#121b2e]/85 p-5 sm:p-6 space-y-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a] mb-2">
                Load Sample Output
              </div>
              <div className="flex flex-wrap gap-2">
                {DRIFT_PRESETS.map((preset) => {
                  const isActive = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      data-drift-preset={preset.id}
                      onClick={() => handlePreset(preset.id)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? 'border-[#f0b66a] bg-[#d97706]/20 text-white'
                          : 'border-[#334563] bg-[#0b1120] text-[#cbd5e1] hover:border-[#f0b66a]/60 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="drift-guard-input" className="text-xs font-medium text-[#cbd5e1]">
                  Draft or Agent Output
                </label>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  {inputText.length}/{MAX_DIAGNOSTIC_INPUT_CHARS} chars
                </span>
              </div>
              <textarea
                id="drift-guard-input"
                value={inputText}
                maxLength={MAX_DIAGNOSTIC_INPUT_CHARS}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setActivePresetId('custom');
                }}
                rows={8}
                placeholder="Paste agent prose, summary text, or markdown to scan for drift and AI slop signals..."
                className="w-full rounded-lg border border-[#334563] bg-[#0b1120] px-3.5 py-3 text-sm text-[#e2e8f0] placeholder-[#64748b] focus:border-[#f0b66a] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  data-drift-run
                  onClick={handleRun}
                  className="button button-primary"
                >
                  <Play size={14} aria-hidden="true" />
                  Run Diagnostic
                </button>
                <button
                  type="button"
                  data-drift-clear
                  onClick={handleClear}
                  className="button button-outline"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  Clear
                </button>
              </div>

              <span className="font-mono text-[11px] text-[#94a3b8]">
                {hasUserRun ? 'Updated from active input' : 'Showing initial sample scan'}
              </span>
            </div>

            {/* Highlighted Preview */}
            <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8]">
                  Inline Phrase Highlights
                </span>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  Red = Blocker · Amber = Warning
                </span>
              </div>
              <div
                data-drift-highlight-preview
                className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-wrap break-words min-h-[72px]"
              >
                {inputText.trim() ? (
                  highlightedNodes
                ) : (
                  <span className="text-[#64748b]">
                    Paste text above and select Run Diagnostic to inspect phrase highlights.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Transparent Metrics & Findings */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#233047]">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8]">
                    Deterministic Gate Readout
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span data-drift-score className="text-3xl font-bold text-white font-mono">
                      {metrics.score}/100
                    </span>
                    <span className="text-xs text-[#94a3b8]">
                      {metrics.wordCount} words · {metrics.sentenceCount} sentences
                    </span>
                  </div>
                </div>
                <div
                  data-drift-verdict={metrics.verdict}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold ${verdictBadgeClass}`}
                >
                  {metrics.verdict === 'PASS' ? (
                    <CheckCircle2 size={14} aria-hidden="true" />
                  ) : metrics.verdict === 'WARN' ? (
                    <AlertTriangle size={14} aria-hidden="true" />
                  ) : (
                    <ShieldAlert size={14} aria-hidden="true" />
                  )}
                  <span>
                    {metrics.verdict} ({blockersCount} block / {warningsCount} warn)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">Long Dashes</div>
                  <div
                    data-metric="long-dashes"
                    className={`mt-1 font-mono text-lg font-semibold ${
                      metrics.longDashCount > 0 ? 'text-red-300' : 'text-emerald-300'
                    }`}
                  >
                    {metrics.longDashCount}
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">Target: 0 (U+2013/14/15)</div>
                </div>

                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
                    Slop + Kobak Terms
                  </div>
                  <div
                    data-metric="slop-kobak"
                    className={`mt-1 font-mono text-lg font-semibold ${
                      metrics.hardSlopCount > 0 || metrics.kobakExcessCount >= 3
                        ? 'text-red-300'
                        : metrics.kobakExcessCount > 0
                          ? 'text-amber-200'
                          : 'text-emerald-300'
                    }`}
                  >
                    {metrics.hardSlopCount} + {metrics.kobakExcessCount}
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">Hard + Kobak cluster &lt; 3</div>
                </div>

                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
                    Neg. Parallelism
                  </div>
                  <div
                    data-metric="negative-parallelism"
                    className={`mt-1 font-mono text-lg font-semibold ${
                      metrics.negativeParallelismCount > 0 ? 'text-red-300' : 'text-emerald-300'
                    }`}
                  >
                    {metrics.negativeParallelismCount}
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">Not just X, it&apos;s Y</div>
                </div>

                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
                    Burstiness CV
                  </div>
                  <div
                    data-metric="burstiness-cv"
                    className={`mt-1 font-mono text-lg font-semibold ${
                      metrics.sentenceCount >= 4 && metrics.burstinessCv < 0.42
                        ? 'text-red-300'
                        : 'text-emerald-300'
                    }`}
                  >
                    {metrics.burstinessCv.toFixed(3)}
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">
                    Target &gt;= 0.42 (avg {metrics.meanSentenceWords}w)
                  </div>
                </div>

                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
                    Passive Voice
                  </div>
                  <div
                    data-metric="passive-ratio"
                    className={`mt-1 font-mono text-lg font-semibold ${
                      metrics.sentenceCount >= 3 && metrics.passiveRatioPct >= 12
                        ? 'text-red-300'
                        : metrics.passiveRatioPct > 0
                          ? 'text-amber-200'
                          : 'text-emerald-300'
                    }`}
                  >
                    {metrics.passiveRatioPct.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">Target: &lt; 12% sentences</div>
                </div>

                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
                    Cliches / Fog / Anchors
                  </div>
                  <div data-metric="cliches-fog" className="mt-1 font-mono text-lg font-semibold text-white">
                    {metrics.thrillerClicheCount} / {metrics.vagueAbstractionCount} /{' '}
                    <span className="text-emerald-300">{metrics.concreteAnchorCount}</span>
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">Cliches / Fog / Evidence</div>
                </div>
              </div>
            </div>

            {/* Findings & Fix Hints */}
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-semibold text-white m-0">
                  Detected Findings &amp; Rewrite Guidance
                </h3>
                <span className="font-mono text-xs text-[#94a3b8]">
                  {findings.length} {findings.length === 1 ? 'hit' : 'hits'}
                </span>
              </div>

              {findings.length === 0 ? (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                  No deterministic slop, cadence, or abstraction flags triggered on this text.
                </div>
              ) : (
                <ul data-drift-findings className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1 list-none p-0 m-0">
                  {findings.map((finding) => (
                    <li
                      key={finding.id}
                      className="rounded-lg border border-[#233047] bg-[#0b1120] p-3 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="font-mono font-semibold text-white">
                          <span
                            className={
                              finding.severity === 'BLOCK'
                                ? 'text-red-300 mr-2'
                                : 'text-amber-300 mr-2'
                            }
                          >
                            [{finding.severity}]
                          </span>
                          {finding.ruleId}
                        </span>
                        <span className="font-mono text-[11px] text-[#94a3b8]">
                          L{finding.line}:C{finding.col} · &quot;{finding.span}&quot;
                        </span>
                      </div>
                      <p className="text-[#cbd5e1] m-0 mb-1">{finding.message}</p>
                      <p className="text-[#f0b66a] m-0">Fix: {finding.fixHint}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pilot / Waitlist CTA */}
            <div className="rounded-xl border border-[#f0b66a]/35 bg-[#121b2e] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#f0b66a] mb-1">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Enforce Drift Checks in CI &amp; Runtime</span>
                </div>
                <p className="text-sm text-[#e2e8f0] m-0">
                  Ready to pair deterministic checks with admission receipts across your workflows?
                </p>
              </div>
              <Link
                href={pilotHref}
                data-drift-pilot-cta
                className="button button-primary whitespace-nowrap shrink-0"
              >
                Request Pilot Access <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
