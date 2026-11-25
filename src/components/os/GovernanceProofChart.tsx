'use client';

import { useEffect, useId, useRef, useState } from 'react';

interface GateStageMetric {
  id: string;
  stage: string;
  shortStage: string;
  latencyMs: number;
  coveragePct: number;
  controlNote: string;
}

const GATE_STAGE_METRICS: readonly GateStageMetric[] = [
  {
    id: 'g0',
    stage: 'G0 Request Validation',
    shortStage: 'G0 Validation',
    latencyMs: 3.1,
    coveragePct: 100,
    controlNote: 'Normalizes caller identity, action shape, and requested mutation before downstream evaluation.',
  },
  {
    id: 'g1',
    stage: 'G1 Context & Lane Scope',
    shortStage: 'G1 Lane Scope',
    latencyMs: 5.4,
    coveragePct: 100,
    controlNote: 'Checks enrolled lane policy so unrelated personal, legal, or tenant context is excluded.',
  },
  {
    id: 'g2',
    stage: 'G2 Decision Formation',
    shortStage: 'G2 Decision',
    latencyMs: 7.8,
    coveragePct: 100,
    controlNote: 'Forms structured proposed decisions while keeping proposal generation separate from execution permission.',
  },
  {
    id: 'g3',
    stage: 'G3 Execution Eligibility',
    shortStage: 'G3 Eligibility',
    latencyMs: 9.2,
    coveragePct: 100,
    controlNote: 'Evaluates execution mode, risk class, and policy limits before allowing promotion toward action.',
  },
  {
    id: 'g4',
    stage: 'G4 Explicit Human Auth',
    shortStage: 'G4 Human Auth',
    latencyMs: 11.4,
    coveragePct: 100,
    controlNote: 'Pauses high-impact mutations at the operator plane and denies fail-closed when authorization is missing.',
  },
  {
    id: 'g5',
    stage: 'G5 Boundary Dispatch',
    shortStage: 'G5 Dispatch',
    latencyMs: 6.5,
    coveragePct: 100,
    controlNote: 'Dispatches admitted actions outside the narrow kernel with permission boundaries recorded.',
  },
  {
    id: 'g6',
    stage: 'G6 Outcome & Receipt',
    shortStage: 'G6 Receipt',
    latencyMs: 4.9,
    coveragePct: 100,
    controlNote: 'Binds policy hash, input digest, and observed external outcome into an attributable Chronicle receipt.',
  },
] as const;

type MetricMode = 'latency' | 'coverage';

export default function GovernanceProofChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<MetricMode>('latency');
  const [selectedId, setSelectedId] = useState<string>(GATE_STAGE_METRICS[4].id);
  const [showTable, setShowTable] = useState(false);
  const headingId = useId();

  const selectedStage =
    GATE_STAGE_METRICS.find((item) => item.id === selectedId) ?? GATE_STAGE_METRICS[0];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || showTable) return;
    let cancelled = false;
    let mountedChart: Element | null = null;
    let observer: ResizeObserver | null = null;
    let lastRenderedWidth = 0;

    const renderPlot = () => {
      const target = containerRef.current;
      if (cancelled || !target) return;
      const measured = target.clientWidth || 640;
      const chartWidth = Math.max(280, Math.min(640, measured));
      if (mountedChart && Math.abs(chartWidth - lastRenderedWidth) < 8) return;
      lastRenderedWidth = chartWidth;
      const compact = chartWidth < 520;
      const plotData = GATE_STAGE_METRICS.map((item) => ({
        stage: compact ? item.shortStage : item.stage,
        value: mode === 'latency' ? item.latencyMs : item.coveragePct,
        selected: item.id === selectedId,
      }));

      void import('@observablehq/plot').then((Plot) => {
        if (cancelled || !containerRef.current) return;
        const chart = Plot.plot({
          width: chartWidth,
          height: 270,
          marginLeft: compact ? 118 : 175,
          marginRight: compact ? 20 : 36,
          marginTop: 16,
          marginBottom: 34,
          style: {
            background: 'transparent',
            color: '#E2E8F0',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? '11px' : '12px',
          },
          x: {
            label: mode === 'latency' ? 'Median gate check (ms)' : 'Fail-closed assertion rate (%)',
            grid: true,
            domain: mode === 'latency' ? [0, 14] : [0, 100],
          },
          y: {
            label: null,
          },
          marks: [
            Plot.barX(plotData, {
              x: 'value',
              y: 'stage',
              fill: (d) => (d.selected ? '#FBBF24' : '#F59E0B'),
              fillOpacity: (d) => (d.selected ? 1 : 0.72),
              rx: 4,
              sort: null,
            }),
            Plot.ruleX([0], { stroke: '#64748B' }),
          ],
        });

        target.innerHTML = '';
        for (const group of chart.querySelectorAll('g[aria-label]')) {
          group.removeAttribute('aria-label');
        }
        chart.setAttribute('aria-hidden', 'true');
        target.appendChild(chart);
        mountedChart = chart;
      });
    };

    renderPlot();
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => renderPlot());
      observer.observe(el);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      mountedChart?.remove();
    };
  }, [mode, selectedId, showTable]);

  return (
    <section
      aria-labelledby={headingId}
      className="proof-chart-card rounded-[10px] border border-[#334563] bg-[#151F32] p-5 text-[#E2E8F0]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="eyebrow mb-1">Interactive Verification Profile</div>
          <h3 id={headingId} className="text-lg font-semibold text-[#E2E8F0] m-0">
            Gate evaluation profile by stage
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Chart display controls">
          <button
            type="button"
            onClick={() => setMode('latency')}
            aria-pressed={mode === 'latency'}
            className={`min-h-[44px] rounded-[6px] border px-3 py-2 font-mono text-xs transition-colors ${
              mode === 'latency'
                ? 'border-[#F59E0B] bg-[#F59E0B] font-semibold text-[#0B1120]'
                : 'border-[#64748B] bg-[#1E293B] text-[#E2E8F0] hover:border-[#FBBF24]'
            }`}
          >
            Latency (ms)
          </button>
          <button
            type="button"
            onClick={() => setMode('coverage')}
            aria-pressed={mode === 'coverage'}
            className={`min-h-[44px] rounded-[6px] border px-3 py-2 font-mono text-xs transition-colors ${
              mode === 'coverage'
                ? 'border-[#F59E0B] bg-[#F59E0B] font-semibold text-[#0B1120]'
                : 'border-[#64748B] bg-[#1E293B] text-[#E2E8F0] hover:border-[#FBBF24]'
            }`}
          >
            Fail-Closed (%)
          </button>
          <button
            type="button"
            onClick={() => setShowTable((prev) => !prev)}
            aria-expanded={showTable}
            className="min-h-[44px] rounded-[6px] border border-[#64748B] bg-[#1E293B] px-3 py-2 font-mono text-xs text-[#E2E8F0] hover:border-[#FBBF24]"
          >
            {showTable ? 'Show chart' : 'View data table'}
          </button>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 mb-4"
        role="group"
        aria-label="Inspect gate stage tooltip details"
      >
        {GATE_STAGE_METRICS.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              onFocus={() => setSelectedId(item.id)}
              aria-pressed={active}
              className={`min-h-[44px] rounded-[6px] border px-3 py-2 font-mono text-xs transition-colors ${
                active
                  ? 'border-[#FBBF24] bg-[#0B1120] text-[#FBBF24]'
                  : 'border-[#334563] bg-[#0B1120] text-[#94A3B8] hover:text-[#E2E8F0]'
              }`}
            >
              {item.stage}
            </button>
          );
        })}
      </div>

      {!showTable ? (
        <div
          ref={containerRef}
          role="img"
          aria-label={`Gate evaluation ${mode === 'latency' ? 'latency in milliseconds' : 'fail-closed coverage percentage'} across seven governance gates`}
          className="w-full overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto"
        />
      ) : null}

      <div className={showTable ? 'w-full overflow-x-auto mt-2' : 'sr-only'}>
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Cosmocrat gate evaluation stages</caption>
          <thead>
            <tr className="border-b border-[#64748B]">
              <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase text-[#94A3B8]">
                Stage
              </th>
              <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase text-[#94A3B8]">
                Median Latency (ms)
              </th>
              <th scope="col" className="py-2 font-mono text-xs uppercase text-[#94A3B8]">
                Fail-Closed Rate (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {GATE_STAGE_METRICS.map((item) => (
              <tr key={item.id} className="border-b border-[#334563]">
                <td className="py-2 pr-4 font-medium text-[#E2E8F0]">{item.stage}</td>
                <td className="py-2 pr-4 font-mono tabular-nums text-[#E2E8F0]">{item.latencyMs}</td>
                <td className="py-2 font-mono tabular-nums text-[#E2E8F0]">{item.coveragePct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-[6px] border border-[#334563] bg-[#0B1120] px-4 py-3 text-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[#FBBF24] mb-1">
          <span>{selectedStage.stage}</span>
          <span className="tabular-nums">
            {selectedStage.latencyMs} ms | {selectedStage.coveragePct}% fail-closed
          </span>
        </div>
        <p className="m-0 text-[#94A3B8] leading-relaxed">{selectedStage.controlNote}</p>
      </div>
    </section>
  );
}
