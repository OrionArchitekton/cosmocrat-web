import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowRightLeft,
  ClipboardList,
  FileText,
  GitBranch,
  PanelsTopLeft,
  Smartphone,
} from 'lucide-react';
import HeroEmblemStage from '@/components/os/HeroEmblemStage';
import StarterSimulator from '@/components/os/StarterSimulator';
import { homeFaq } from '@/lib/faqs';
import { tools } from '@/lib/toolCatalog';

const resultsTool = tools.find((tool) => tool.id === 'orion-results');
const starterTool = tools.find((tool) => tool.id === 'orion-starter');

const featuredCards = [
  {
    id: 'orion-pm',
    num: '01',
    name: 'Orion PM',
    kind: 'Task ownership',
    description:
      'Give a local task an explicit owner, retain revisions, and keep inspectable evidence as work moves forward.',
    cta: 'Coordinate work',
    icon: ClipboardList,
    featured: true,
  },
  {
    id: 'orion-browser',
    num: '02',
    name: 'Orion Browser',
    kind: 'Browser access',
    description: 'Persistent Chrome identities and a browser lease for each cooperating agent.',
    cta: 'Share browser access',
    icon: PanelsTopLeft,
    featured: false,
  },
  {
    id: 'orion-phone',
    num: '03',
    name: 'Orion Phone',
    kind: 'Android access',
    description: 'Android phones for agents, with action records and an operator-unlocked tier.',
    cta: 'Give an agent a phone',
    icon: Smartphone,
    featured: false,
  },
  {
    id: 'orion-handoff',
    num: '04',
    name: 'Orion Handoff',
    kind: 'Session continuity',
    description: 'Carry the intended task, its observed state, and what remains uncertain.',
    cta: 'Keep the thread',
    icon: ArrowRightLeft,
    featured: false,
  },
  {
    id: 'orion-results',
    num: '05',
    name: 'Orion Results',
    kind: 'Recoverable results',
    description: 'Store the complete result. Pass a bounded view. Recover the original by reference.',
    cta: 'Keep the full result',
    icon: FileText,
    featured: false,
    isPreview: resultsTool?.status === 'PREVIEW',
  },
  {
    id: 'orion-worktree-report',
    num: '06',
    name: 'Orion Worktree Report',
    kind: 'Development evidence',
    description:
      'Observe registered git worktrees and surface overlapping uncommitted paths while keeping partial or unavailable coverage visible.',
    cta: 'Observe the work',
    icon: GitBranch,
    featured: true,
  },
] as const;

const principles = [
  {
    num: '01',
    title: 'Humans retain sovereignty.',
    body: 'AI can work within the scope you give it. Decisions about purpose, permission, and consequential actions remain yours.',
  },
  {
    num: '02',
    title: 'Memory is infrastructure.',
    body: 'Intent and context deserve continuity, provenance, and deliberate boundaries. Today’s continuity tools are steps toward that larger ambition.',
  },
  {
    num: '03',
    title: 'Trust is the product.',
    body: 'Make claims inspectable. See what was observed, what was authorized, and what still needs checking.',
  },
  {
    num: '04',
    title: 'Context has boundaries.',
    body: 'Personal, business, and account contexts carry different permissions. Scope is explicit; cooperative limits are documented.',
  },
  {
    num: '05',
    title: 'Reliability should feel ordinary.',
    body: 'Clear ownership, recoverable results, and visible uncertainty keep work moving when something stops halfway through.',
  },
] as const;

export default function HomeSections({
  welcomeSection,
  proofChartSection,
}: {
  welcomeSection?: ReactNode;
  proofChartSection?: ReactNode;
} = {}) {
  return (
    <div className="os-page" id="static-site" tabIndex={-1}>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Cosmocrat OS | Human-directed AI</div>
              <h1>
                An AI operating system
                <br />
                you remain <em>in charge of.</em>
              </h1>
              <p className="lead">
                Keep the tools you use. Give your agents a shared way to coordinate, carry context
                forward, and show what happened.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href="/tools">
                  Explore the tools <ArrowRight aria-hidden="true" />
                </Link>
                <a
                  className="text-link"
                  href="https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm"
                  rel="noreferrer"
                >
                  Start with one task <ArrowRight aria-hidden="true" />
                </a>
              </div>
              <p className="availability">
                <strong>Independent tools are available today.</strong> Starter combinations are
                previews. The full operating environment is still taking shape.
              </p>
            </div>

            <HeroEmblemStage />
          </div>

          <div className="hero-note">
            <span className="hero-note-bar" aria-hidden="true" />
            <span>Intelligence should extend your agency. Authority stays in your hands.</span>
          </div>
        </div>
      </section>

      {welcomeSection}

      <section className="section section-surface" id="foundation">
        <div className="wrap intro-grid">
          <div>
            <div className="eyebrow">The foundation</div>
            <h2>
              Work continues.
              <br />
              The context should, too.
            </h2>
          </div>
          <div className="body-copy">
            <p>
              One agent starts a task. Another takes over. A browser belongs to an account. A result
              is too large to carry into every conversation. A session ends before the work does.
            </p>
            <p>
              Each moment needs something durable: a clear owner, the right context, an explicit
              boundary, or a result you can recover and inspect. These are the pieces we are
              building and releasing through Cosmocrat.
            </p>
            <div className="intro-highlights">
              <div className="intro-stat">
                <strong>Modular releases</strong>
                <span>Use one Orion component or combine them on your own machine</span>
              </div>
              <div className="intro-stat">
                <strong>Explicit boundaries</strong>
                <span>Every tool documents its supported environment and control limits</span>
              </div>
            </div>
            {proofChartSection ? <div className="mt-8">{proofChartSection}</div> : null}
          </div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">The Orion tools</div>
              <h2>Start with the part you need.</h2>
            </div>
            <Link className="text-link" href="/tools">
              Explore the catalog (10 tools) <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="tools-bento">
            {featuredCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  className={`tool-teaser${card.featured ? ' tool-teaser-featured' : ''}`}
                  href={`/tools#${card.id}`}
                >
                  <div className="teaser-top">
                    <span className="tool-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="teaser-meta">
                      <span>{card.kind}</span>
                      <span aria-hidden="true">·</span>
                      <span>{card.num}</span>
                    </span>
                  </div>
                  <h3>
                    <span>{card.name}</span>
                    {'isPreview' in card && card.isPreview && (
                      <span className="tag tag-preview">PREVIEW</span>
                    )}
                  </h3>
                  <p>{card.description}</p>
                  <span className="teaser-bottom">
                    {card.cta} <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-surface" id="starter">
        <div className="wrap composition">
          <div>
            <div className="eyebrow">Orion Starter · Development evidence</div>
            <h2>
              Keep the evidence.
              <br />
              Check the work again.
            </h2>
            <p>
              Orion Starter brings Orion PM, Orion Worktree Report, Orion Results and Orion Handoff
              together in a development-evidence preview. Each tool keeps its own name, release and
              boundaries.
            </p>
            <p>
              One worker saves the original observation. The next recovers it, claims the task, and
              makes a fresh check before deciding whether this demonstration can finish.
            </p>
            <p className="text-xs text-slate-400">
              <span className="tag tag-preview mr-2">
                {starterTool?.version} · {starterTool?.status}
              </span>
              A manually invoked local example. The written guide is available; its video companion
              is in preparation.
            </p>
            <div className="flex flex-col items-start gap-1 mt-4">
              <a
                className="text-link"
                href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
                rel="noreferrer"
              >
                Follow the development-evidence guide <ArrowRight aria-hidden="true" />
              </a>
              <Link className="text-link" href="/tools#orion-starter">
                Explore the Starter preview ↗
              </Link>
            </div>
          </div>

          <StarterSimulator />
        </div>
      </section>

      <section className="section" id="principles">
        <div className="wrap principles-grid">
          <div className="principle-intro">
            <div className="eyebrow">The original philosophy</div>
            <h2>Human agency is the foundation.</h2>
            <p>
              Cosmocrat began with a belief that intelligence should preserve a person’s intent over
              time while remaining under that person’s authority.
            </p>
            <p>
              The ambition stays with the work. Each tool describes the controls it actually
              provides.
            </p>
            <div className="mt-6">
              <Link className="text-link" href="/platform">
                Explore the governance architecture <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="principle-list">
            {principles.map((p) => (
              <div className="principle-item" key={p.num}>
                <span className="principle-idx">{p.num}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface" id="our-story">
        <div className="wrap origin">
          <div>
            <div className="eyebrow">Built through operation</div>
            <h2>
              From an idea
              <br />
              to the way we work.
            </h2>
            <div className="signature">DAN MERCEDE / FOUNDER</div>
          </div>
          <div>
            <p>
              The Orion Estate is where we put the Cosmocrat question to work: Dan Mercede’s
              operating environment for software, agents, media, and business workflows.
            </p>
            <p>
              Lessons from running it become independent tools, technical guides, and demonstrations
              others can inspect and use. Public releases have their own versions and support
              boundaries. The private environment continues to evolve alongside them.
            </p>
            <div className="button-row">
              <a className="text-link" href="https://www.danmercede.com/guides" rel="noreferrer">
                Read the guides <ArrowRight aria-hidden="true" />
              </a>
              <Link className="text-link" href="/tools">
                Find a walkthrough <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-link" href="/about">
                Read our story <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="governance-note">
              <p>
                <strong>Governance keeps its own boundary.</strong> Cosmocrat’s governance work
                concerns policy, authority, and decision evidence. Membership in the tool family
                does not imply kernel enforcement or that every action is impossible to bypass.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq" id="faq">
          <div>
            <div className="eyebrow">Before you start</div>
            <h2>
              A clear place
              <br />
              to begin.
            </h2>
          </div>
          <div>
            {homeFaq.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <h2>Build on work you can inspect.</h2>
            <p>Choose one tool, follow its guide, and see what it does in your environment.</p>
          </div>
          <div className="button-row">
            <Link className="button button-primary" href="/tools">
              Find your starting point <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/waitlist">
              Request Early Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
