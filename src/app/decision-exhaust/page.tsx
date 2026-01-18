import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Decision Exhaust | Cosmocrat",
  description:
    "Cosmocrat is the control plane for decision exhaust—governing prompts, tool calls, approvals, escalations, rollbacks, and outcomes under policy with receipts and replay.",
  alternates: { canonical: "/decision-exhaust" },
  openGraph: {
    title: "Decision Exhaust | Cosmocrat",
    description:
      "Govern and prove every AI + human decision with policy, receipts, and replay.",
    url: "/decision-exhaust",
    images: [
      {
        url: "/decision-exhaust/og.png",
        width: 1200,
        height: 630,
        alt: "Decision Exhaust — the control plane for policy, receipts, rollback, and replay.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decision Exhaust | Cosmocrat",
    description:
      "The control plane for decision exhaust—policy, receipts, rollback, replay.",
    images: ["/decision-exhaust/og.png"],
  },
};

type CardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      {props.eyebrow ? (
        <div className={styles.cardEyebrow}>{props.eyebrow}</div>
      ) : null}
      <h3 className={styles.cardTitle}>{props.title}</h3>
      <div className={styles.cardBody}>{props.children}</div>
    </div>
  );
}

type IconProps = { title: string };

function IconShield({ title }: IconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
    >
      <path
        d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.5 12.2l2.2 2.2L15.8 9.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconReceipt({ title }: IconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
    >
      <path
        d="M7 2h10v20l-2-1-2 1-2-1-2 1-2-1-2 1V2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 7h6M9 11h6M9 15h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconReplay({ title }: IconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
    >
      <path
        d="M7 7v4H3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.2 11A9 9 0 1 0 6 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThreeBoxDiagram() {
  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 980 240"
      role="img"
      aria-label="Three-box diagram: Data Exhaust to Decision Exhaust to Business Apps"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M0,0 L12,6 L0,12 Z" fill="currentColor" />
        </marker>
      </defs>

      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="20" y="40" width="280" height="160" rx="16" />
        <rect x="350" y="40" width="280" height="160" rx="16" />
        <rect x="680" y="40" width="280" height="160" rx="16" />

        <path d="M300 120h40" markerEnd="url(#arrow)" />
        <path d="M630 120h40" markerEnd="url(#arrow)" />
      </g>

      <g fill="currentColor" fontFamily="ui-sans-serif, system-ui" fontSize="22" fontWeight="700">
        <text x="60" y="92">Data Exhaust</text>
        <text x="390" y="92">Decision Exhaust</text>
        <text x="720" y="92">Business Apps</text>
      </g>

      <g fill="currentColor" fontFamily="ui-sans-serif, system-ui" fontSize="16" opacity="0.85">
        <text x="60" y="122">Logs • Metrics • Traces • Events</text>
        <text x="60" y="150">Question: What happened?</text>

        <text x="390" y="122">Prompts • Tool calls • Approvals</text>
        <text x="390" y="150">Escalations • Rollbacks • Outcomes</text>

        <text x="720" y="122">Agents • Workflows • Humans</text>
        <text x="720" y="150">Systems that act (safely)</text>
      </g>

      <g fill="currentColor" fontFamily="ui-sans-serif, system-ui" fontSize="14" opacity="0.7">
        <text x="60" y="182">ClickHouse: store & query events</text>
        <text x="390" y="182">Cosmocrat: govern & prove decisions</text>
      </g>
    </svg>
  );
}

function IconGate({ title }: IconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
    >
      <path
        d="M6 3h12v18H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M10 12h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M15 9l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRollback({ title }: IconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
    >
      <path
        d="M8 7H4v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.3 11.2A8.5 8.5 0 1 0 7 6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DecisionExhaustPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Decision Exhaust</div>
              <h1 className={styles.h1}>
                ClickHouse governs data exhaust.
                <br />
                Cosmocrat governs decision exhaust.
              </h1>
              <p className={styles.lead}>
                Cosmocrat is the control plane for policy, receipts, and rollback—capturing every AI +
                human action with audit-grade run records and replay.
              </p>

              <div className={styles.ctaRow}>
                <Link className={styles.primaryButton} href="/waitlist">
                  Request Early Access
                </Link>
                <Link className={styles.secondaryButton} href="/docs">
                  Docs
                </Link>
              </div>

              <div className={styles.microcopy}>
                Runs in your environment. Your keys. Your data.
              </div>
            </div>

            <div className={styles.heroArt} aria-hidden="true">
              <Image
                src="/decision-exhaust/cosmocrat-sigil.webp"
                alt=""
                width={420}
                height={420}
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Two exhausts. Two responsibilities.</h2>
          <p className={styles.p}>
            Modern systems emit constant telemetry. Modern AI systems emit something new: decisions.
            ClickHouse is best-in-class for the first stream. Cosmocrat is purpose-built for the second.
          </p>

          <div className={styles.cards2}>
            <Card title="Data Exhaust" eyebrow="ClickHouse">
              <div className={styles.cardMedia}>
                <Image
                  src="/decision-exhaust/data-turbine.webp"
                  alt=""
                  width={360}
                  height={120}
                />
              </div>
              <ul className={styles.list}>
                <li>Logs, metrics, traces, events</li>
                <li>Built for visibility, analytics, and incident investigation</li>
                <li>
                  Answers: <strong>What happened?</strong>
                </li>
              </ul>
            </Card>

            <Card title="Decision Exhaust" eyebrow="Cosmocrat">
              <div className={styles.cardMedia}>
                <Image
                  src="/decision-exhaust/decision-gavel.webp"
                  alt=""
                  width={360}
                  height={110}
                />
              </div>
              <ul className={styles.list}>
                <li>Prompts, tool calls, approvals/denials</li>
                <li>Retries, escalations, rollbacks, outcomes</li>
                <li>
                  Answers: <strong>What was decided—and was it allowed?</strong>
                </li>
              </ul>
            </Card>
          </div>

          <div className={styles.callout}>
            Data tells you the car crashed. Governance prevents the crash.
          </div>

          <ThreeBoxDiagram />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>The governance gap is now a runtime problem</h2>
          <p className={styles.p}>
            When AI starts calling tools, mutating state, and touching money, “audit later” becomes
            “incident now.” You need controls that fail-closed in the moment.
          </p>

          <div className={styles.bulletsGrid}>
            <div className={styles.bullet}>
              <div className={styles.bulletTitle}>AI actions move faster than controls</div>
              <div className={styles.bulletBody}>
                Stateless assistants can generate text. Agentic systems can execute.
              </div>
            </div>
            <div className={styles.bullet}>
              <div className={styles.bulletTitle}>Bolted-on guardrails don’t prove authority</div>
              <div className={styles.bulletBody}>
                If you can’t show who authorized what, you don’t have governance—just hope.
              </div>
            </div>
            <div className={styles.bullet}>
              <div className={styles.bulletTitle}>Without receipts, you can’t replay</div>
              <div className={styles.bulletBody}>
                Logs show symptoms. Receipts show intent, policy, and chain-of-custody.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>How Cosmocrat governs decision exhaust</h2>
          <p className={styles.p}>
            A single runtime path for every action: evaluate policy, enforce outcomes, write a receipt,
            and keep the system replayable.
          </p>

          <div className={styles.stepsGrid}>
            <Card title="Policy" eyebrow="1">
              <div className={styles.stepRow}>
                <IconShield title="Policy" />
                <div>
                  Evaluate authority, limits, and context before execution.
                  <div className={styles.mini}>Fail-closed by default.</div>
                </div>
              </div>
            </Card>

            <Card title="Enforce" eyebrow="2">
              <div className={styles.stepRow}>
                <IconGate title="Enforce" />
                <div>
                  Permit, block, retry, or escalate—across every tool and lane.
                  <div className={styles.mini}>No silent failures.</div>
                </div>
              </div>
            </Card>

            <Card title="Receipt" eyebrow="3">
              <div className={styles.stepRow}>
                <IconReceipt title="Receipt" />
                <div>
                  Produce an audit-grade record bound to inputs, policy, and outputs.
                  <div className={styles.mini}>Cryptographically attributable.</div>
                </div>
              </div>
            </Card>

            <Card title="Rollback + Replay" eyebrow="4">
              <div className={styles.stepRow}>
                <IconRollback title="Rollback" />
                <div>
                  Reconstruct the full decision path and tighten policy from outcomes.
                  <div className={styles.mini}>Continuous governance improvement.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Receipts you can audit (and replay)</h2>
          <p className={styles.p}>
            Every governed action produces an execution receipt: who/what/why, what policy evaluated,
            what state transitions occurred, and what actually happened.
          </p>

          <div className={styles.receiptGrid}>
            <div className={styles.codeBlock}>
              <div className={styles.codeTitle}>Data exhaust: a log line</div>
              <pre className={styles.pre}>
                <code>{`2026-01-18T05:12:44Z tool_call=refund_user amount=42.00\nstatus=200 provider=stripe latency_ms=183`}</code>
              </pre>
              <div className={styles.codeHint}>
                Useful for debugging. Not sufficient to prove authority.
              </div>
            </div>

            <div className={styles.receiptCard} aria-label="Example execution receipt">
              <div className={styles.receiptTitle}>Decision exhaust: an execution receipt</div>
              <dl className={styles.receiptDl}>
                <div className={styles.receiptRow}>
                  <dt>Status</dt>
                  <dd>
                    <strong>APPROVED</strong> (fail-closed policy)
                  </dd>
                </div>
                <div className={styles.receiptRow}>
                  <dt>Policy</dt>
                  <dd>finance.refunds.l1 — limit: $50</dd>
                </div>
                <div className={styles.receiptRow}>
                  <dt>Actor</dt>
                  <dd>SupportBot-01 (authority: L1)</dd>
                </div>
                <div className={styles.receiptRow}>
                  <dt>Action</dt>
                  <dd>refund_user(user_id=U-1872, amount=$42)</dd>
                </div>
                <div className={styles.receiptRow}>
                  <dt>Outcome</dt>
                  <dd>stripe.refunds.create → ok (id=rf_9K2…)</dd>
                </div>
                <div className={styles.receiptRow}>
                  <dt>Receipt</dt>
                  <dd>hash=9d7b… • replayable</dd>
                </div>
              </dl>
              <div className={styles.receiptFoot}>
                Receipts make governance provable—not just observable.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Pricing that matches the risk surface</h2>
          <p className={styles.p}>
            Don’t pay for queries. Pay for safety: verified, governed actions executed under policy.
          </p>

          <div className={styles.cards2}>
            <Card title="Verified & Governed Action (VGA)" eyebrow="Billing unit">
              <p className={styles.p}>
                <strong>1 VGA =</strong> one action evaluated under policy, resulting in an allowed,
                blocked, retried, or escalated outcome—recorded with a receipt.
              </p>
              <ul className={styles.list}>
                <li>Tool call</li>
                <li>Human approval / denial</li>
                <li>Automated remediation step</li>
                <li>Escalation or rollback</li>
              </ul>
            </Card>

            <Card title="Operational outcomes" eyebrow="What you unlock">
              <ul className={styles.list}>
                <li>
                  <strong>Prove</strong> compliance with audit-grade run records
                </li>
                <li>
                  <strong>Replay</strong> incidents to find root cause fast
                </li>
                <li>
                  <strong>Tighten</strong> policy as outcomes arrive (continuous control)
                </li>
                <li>
                  <strong>Fail-closed</strong> where it matters: money, auth, and data
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Fits your stack</h2>
          <p className={styles.p}>
            Cosmocrat sits between your AI workflows and your systems—governing tools, lanes, and
            memory without taking your data.
          </p>

          <div className={styles.chips} aria-label="Example integrations">
            <span className={styles.chip}>AWS</span>
            <span className={styles.chip}>GCP</span>
            <span className={styles.chip}>Azure</span>
            <span className={styles.chip}>Slack</span>
            <span className={styles.chip}>GitHub</span>
            <span className={styles.chip}>ServiceNow</span>
            <span className={styles.chip}>Salesforce</span>
            <span className={styles.chip}>ClickHouse</span>
            <span className={styles.chip}>Postgres</span>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2 className={styles.h2}>Start governing decision exhaust</h2>
            <p className={styles.p}>
              We’re onboarding a small number of teams for pilot deployments in regulated environments.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryButton} href="/waitlist">
                Request Early Access
              </Link>
              <Link className={styles.secondaryButton} href="/docs">
                Read Docs
              </Link>
            </div>
          </div>

          <div className={styles.legalNote}>
            ClickHouse is a trademark of ClickHouse, Inc. Used here for descriptive purposes.
          </div>
        </div>
      </section>
    </main>
  );
}
