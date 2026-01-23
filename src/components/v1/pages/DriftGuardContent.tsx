'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Shield,
  Search,
  Bell,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

// Simulated drift metric line chart component
const DriftChart = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([0.12, 0.14, 0.11, 0.13, 0.15, 0.12, 0.14]);
  const [anomalyIndex, setAnomalyIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const newPoints = [...prev.slice(1)];
        const isAnomaly = Math.random() < 0.15; // 15% chance of anomaly
        const newValue = isAnomaly
          ? prev[prev.length - 1] + 0.15 + Math.random() * 0.1 // Drift spike
          : prev[prev.length - 1] + (Math.random() - 0.5) * 0.03; // Normal fluctuation

        const clampedValue = Math.max(0.05, Math.min(0.5, newValue));
        newPoints.push(clampedValue);

        if (isAnomaly) {
          setAnomalyIndex(newPoints.length - 1);
          setTimeout(() => setAnomalyIndex(null), 2000);
        }

        return newPoints;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const maxVal = 0.5;
  const threshold = 0.25;

  return (
    <div className="w-full h-48 relative bg-slate-900/50 rounded-lg border border-slate-800 p-4">
      {/* Threshold Line */}
      <div
        className="absolute left-0 right-0 border-t border-dashed border-red-500/50"
        style={{ top: `${(1 - threshold / maxVal) * 100}%` }}
      >
        <span className="absolute -top-3 right-2 text-[10px] text-red-400 bg-slate-900 px-1">
          Threshold
        </span>
      </div>

      {/* Chart */}
      <svg className="w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
        {/* Grid Lines */}
        <line x1="0" y1="50" x2="280" y2="50" stroke="#1e293b" strokeWidth="1" />

        {/* Line Path */}
        <path
          d={`M ${dataPoints
            .map((v, i) => `${(i / (dataPoints.length - 1)) * 280},${(1 - v / maxVal) * 100}`)
            .join(' L ')}`}
          fill="none"
          stroke={anomalyIndex !== null ? '#ef4444' : '#d97706'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Data Points */}
        {dataPoints.map((v, i) => (
          <circle
            key={i}
            cx={(i / (dataPoints.length - 1)) * 280}
            cy={(1 - v / maxVal) * 100}
            r={i === anomalyIndex ? 6 : 3}
            fill={i === anomalyIndex ? '#ef4444' : '#d97706'}
            className={i === anomalyIndex ? 'animate-ping' : ''}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 flex items-center gap-4 text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div> Drift Score
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div> Anomaly Detected
        </span>
      </div>
    </div>
  );
};

// Alert Card Component
const AlertCard = ({
  type,
  title,
  time,
  policy,
}: {
  type: 'critical' | 'warning' | 'info';
  title: string;
  time: string;
  policy: string;
}) => {
  const colors = {
    critical: 'border-red-500 bg-red-500/5',
    warning: 'border-amber-500 bg-amber-500/5',
    info: 'border-blue-500 bg-blue-500/5',
  };
  const icons = {
    critical: <AlertTriangle className="text-red-500" size={16} />,
    warning: <AlertCircle className="text-amber-500" size={16} />,
    info: <Bell className="text-blue-500" size={16} />,
  };

  return (
    <div className={`border-l-4 ${colors[type]} p-4 rounded-r-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icons[type]}
          <span className="font-bold text-white text-sm">{title}</span>
        </div>
        <span className="text-xs text-slate-500">{time}</span>
      </div>
      <div className="text-xs text-slate-400">
        Policy: <span className="text-slate-300">{policy}</span>
      </div>
    </div>
  );
};

export default function DriftGuardContent() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans text-slate-200">
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        {/* Radar Pulse Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-amber-500/10 pulse-slow"></div>
          <div
            className="absolute inset-[100px] rounded-full border border-amber-500/10 pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute inset-[200px] rounded-full border border-amber-500/10 pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-cosmo-accent mb-6 uppercase tracking-widest">
            <Activity size={14} />
            Integrity Monitoring
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Drift Guard.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            Detect when AI behavior diverges from policy intent. <br />
            Continuous integrity monitoring for governed systems.
          </p>
          <p className="text-lg text-amber-500 font-medium">
            Drift detection turns governance from a point-in-time check into a continuous guarantee.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is Drift Guard?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Drift Guard is Cosmocrat&apos;s integrity monitoring layer. It continuously analyzes
              the relationship between policy expectations and actual AI behavior, identifying when
              authorized intent begins to decouple from real-world execution.
            </p>
            <p>
              By consuming the stream of{' '}
              <Link
                href="/chronicle-receipts"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Chronicle Receipts
              </Link>
              , Drift Guard builds a statistical baseline of normal operation. It then flags
              deviations: a sudden spike in escalations, an unexpected pattern of tool usage, or a
              gradual change in decision distribution.
            </p>
            <p>
              This is distinct from{' '}
              <Link
                href="/runtime-governance"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Runtime Governance
              </Link>
              , which enforces policy at the moment of decision. Drift Guard operates post-hoc,
              analyzing trends over time to ensure the system remains aligned with its original
              governance contract.
            </p>
            <p>
              Drift Guard is essential for long-term AI safety because it addresses a fundamental
              risk: systems that pass all gates today may subtly shift tomorrow. Without continuous
              monitoring, you only discover drift after an incident.
            </p>
          </div>
        </div>
      </section>

      {/* Live Drift Visualization */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Chart */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
              <h3 className="text-xl font-bold text-white">Real-Time Drift Score</h3>
            </div>
            <DriftChart />
            <p className="text-xs text-slate-500 mt-4 italic">
              Simulated drift metric. In production, this would reflect actual policy evaluation
              patterns.
            </p>
          </div>

          {/* Right: Alert Stream */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-amber-500" size={20} />
              <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
            </div>
            <div className="space-y-4">
              <AlertCard
                type="critical"
                title="Behavioral Anomaly Detected"
                time="2m ago"
                policy="finance.transfers.l2"
              />
              <AlertCard
                type="warning"
                title="Escalation Rate Elevated"
                time="15m ago"
                policy="support.escalations"
              />
              <AlertCard
                type="info"
                title="New Baseline Established"
                time="1h ago"
                policy="ops.deployments"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How Drift Guard Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Continuous analysis of governance records to detect behavioral divergence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <BarChart3 className="text-amber-500" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">1. Baseline</h3>
            <p className="text-sm text-slate-400">
              Establishes normal patterns from historical receipts.
            </p>
          </div>

          <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <Search className="text-amber-500" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">2. Monitor</h3>
            <p className="text-sm text-slate-400">
              Continuously analyzes incoming receipts for deviations.
            </p>
          </div>

          <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-amber-500" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">3. Detect</h3>
            <p className="text-sm text-slate-400">
              Flags anomalies, trends, and threshold breaches.
            </p>
          </div>

          <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <Zap className="text-amber-500" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">4. Act</h3>
            <p className="text-sm text-slate-400">
              Alerts operators, triggers policy reviews, or auto-tightens limits.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Drift */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Types of Drift</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Drift Guard monitors for multiple categories of behavioral divergence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <TrendingUp className="text-red-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Volume Drift</h3>
              <p className="text-slate-400 text-sm">
                Sudden spikes or drops in action frequency. An agent making 10x more API calls than
                baseline triggers an alert.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <Activity className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Distribution Drift</h3>
              <p className="text-slate-400 text-sm">
                Changes in the mix of actions. If an agent starts favoring one tool over others, the
                distribution shift is detected.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <Shield className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Policy Drift</h3>
              <p className="text-slate-400 text-sm">
                Gradual erosion of policy effectiveness. If denial rates drop unexpectedly, it may
                indicate policy loosening or circumvention.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <AlertTriangle className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Escalation Drift</h3>
              <p className="text-slate-400 text-sm">
                Changes in human authorization patterns. Rising escalation rates may indicate
                miscalibrated risk thresholds.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <Search className="text-green-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Context Drift</h3>
              <p className="text-slate-400 text-sm">
                Changes in memory retrieval patterns. If agents start accessing different data
                sources, it may indicate context contamination.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-xl border border-slate-700">
              <Bell className="text-orange-400 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Temporal Drift</h3>
              <p className="text-slate-400 text-sm">
                Time-based anomalies. Actions occurring at unusual times or with unusual latency
                patterns are flagged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drift Detection Matters */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Why Drift Detection Matters</h2>
            <p className="text-lg text-slate-400 mb-8">
              AI systems that pass all gates today may subtly shift tomorrow. Without continuous
              monitoring, you only discover drift after an incident.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-white font-bold">Model Updates:</span>
                  <span className="text-slate-400 ml-2">
                    Provider changes (e.g., GPT-4.1) can subtly alter behavior.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-white font-bold">Policy Creep:</span>
                  <span className="text-slate-400 ml-2">
                    Small policy adjustments can compound into significant drift.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-white font-bold">Data Distribution Shift:</span>
                  <span className="text-slate-400 ml-2">
                    Changing inputs (customer queries, market conditions) affect outputs.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-white font-bold">Adversarial Probing:</span>
                  <span className="text-slate-400 ml-2">
                    Bad actors testing system boundaries over time.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px]"></div>
            <h3 className="text-white font-bold text-xl mb-6 relative z-10">
              Without Drift Detection
            </h3>
            <div className="space-y-4 relative z-10 font-mono text-sm">
              <div className="text-slate-500">Day 1: Agent approved. All gates pass.</div>
              <div className="text-slate-500">Day 30: Minor policy adjustment.</div>
              <div className="text-slate-500">Day 60: Model provider update.</div>
              <div className="text-slate-500">Day 90: Unusual escalation pattern emerges.</div>
              <div className="text-red-400 font-bold">Day 91: Incident. Root cause unclear.</div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800 relative z-10">
              <p className="text-sm text-slate-400">
                Drift Guard would have flagged the escalation pattern at Day 90—or earlier—giving
                operators time to investigate before an incident occurred.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-2">
              <FaqItem
                question="Is Drift Guard the same as model monitoring?"
                answer="No. Model monitoring typically tracks output quality (hallucinations, toxicity). Drift Guard tracks governance alignment—whether the system's behavior matches the policy intent over time."
              />
              <FaqItem
                question="How fast does Drift Guard detect anomalies?"
                answer="Detection latency depends on configuration. For high-risk policies, alerts can fire within minutes. For trend analysis, baselines are updated hourly or daily."
              />
              <FaqItem
                question="Can Drift Guard automatically tighten policies?"
                answer="Yes, with operator approval. When drift is detected, Drift Guard can propose policy adjustments (e.g., lowering thresholds, adding human-in-the-loop requirements) that operators can approve or reject."
              />
              <FaqItem
                question="What data does Drift Guard analyze?"
                answer="Drift Guard consumes Chronicle Receipts—the same governance records that power audit trails. It does not analyze raw model outputs or customer data directly."
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
              Related Platform Concepts
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/memory-infrastructure"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Memory as Infrastructure
              </Link>
              <Link
                href="/decision-exhaust"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Decision Exhaust
              </Link>
              <Link
                href="/runtime-governance"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Runtime Governance
              </Link>
              <Link
                href="/gate-system"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Gate System
              </Link>
              <Link
                href="/chronicle-receipts"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Chronicle Receipts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
