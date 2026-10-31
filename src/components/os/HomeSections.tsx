import Image from 'next/image';
import Link from 'next/link';
import { tools } from '@/lib/toolCatalog';

const resultsTool = tools.find((tool) => tool.id === 'orion-results');
const starterTool = tools.find((tool) => tool.id === 'orion-starter');

export default function HomeSections() {
  return (
    <div className="os-page" id="static-site" tabIndex={-1}>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Cosmocrat OS · Human-directed AI</div>
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
                  Explore the tools{' '}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M4 12h15m-6-6 6 6-6 6" />
                  </svg>
                </Link>
                <a
                  className="text-link"
                  href="https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm"
                  rel="noreferrer"
                >
                  Start with one task{' '}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M4 12h15m-6-6 6 6-6 6" />
                  </svg>
                </a>
              </div>
              <p className="availability">
                <strong>Independent tools are available today.</strong> Starter combinations are
                previews. The full operating environment is still taking shape.
              </p>
            </div>
            <div className="emblem-stage" aria-hidden="true">
              <span className="orbit-label orbit-top">HUMAN DIRECTION</span>
              <span className="orbit-label orbit-left">PRESERVED CONTEXT</span>
              <Image
                className="hero-emblem"
                src="/brand/cosmocrat-sigil.svg"
                alt=""
                width={885}
                height={952}
                unoptimized
              />
              <span className="orbit-label orbit-right">EXPLICIT AUTHORITY</span>
              <span className="orbit-label orbit-bottom">TRUST, BUILT THROUGH EVIDENCE</span>
            </div>
          </div>
          <div className="hero-note">
            Intelligence should extend your agency. Authority stays in your hands.
          </div>
        </div>
      </section>

      <section className="section">
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
              Explore the catalog{' '}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="tools-overview">
            <Link className="tool-teaser" href="/tools#orion-pm">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="17" rx="2" />
                    <path d="M8 2v5m8-5v5M8 11h8m-8 5h5" />
                  </svg>
                </span>
                <span className="teaser-number">01</span>
              </div>
              <h3>Orion PM</h3>
              <p>Give a local task an explicit owner and keep evidence as work moves forward.</p>
              <span className="teaser-bottom">
                Coordinate work{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className="tool-teaser" href="/tools#orion-browser">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 9h20m-16-3h.01M10 6h.01" />
                  </svg>
                </span>
                <span className="teaser-number">02</span>
              </div>
              <h3>Orion Browser</h3>
              <p>Persistent Chrome identities and a browser lease for each cooperating agent.</p>
              <span className="teaser-bottom">
                Share browser access{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className="tool-teaser" href="/tools#orion-phone">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M10 5h4m-3 14h2" />
                  </svg>
                </span>
                <span className="teaser-number">03</span>
              </div>
              <h3>Orion Phone</h3>
              <p>Android phones for agents, with action records and an operator-unlocked tier.</p>
              <span className="teaser-bottom">
                Give an agent a phone{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className="tool-teaser" href="/tools#orion-handoff">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h14m-4-4 4 4-4 4M20 17H6m4-4-4 4 4 4" />
                  </svg>
                </span>
                <span className="teaser-number">04</span>
              </div>
              <h3>Orion Handoff</h3>
              <p>Carry the intended task, its observed state, and what remains uncertain.</p>
              <span className="teaser-bottom">
                Keep the thread{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className="tool-teaser" href="/tools#orion-results">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8m-8 4h6" />
                  </svg>
                </span>
                <span className="teaser-number">05</span>
              </div>
              <h3>
                Orion Results{' '}
                {resultsTool?.status === 'PREVIEW' && (
                  <span className="tag tag-preview">{resultsTool.status}</span>
                )}
              </h3>
              <p>Store the complete result. Pass a bounded view. Recover the original.</p>
              <span className="teaser-bottom">
                Keep the full result{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className="tool-teaser" href="/tools#orion-worktree-report">
              <div className="teaser-top">
                <span className="tool-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="6" cy="4" r="2" />
                    <circle cx="6" cy="20" r="2" />
                    <circle cx="18" cy="8" r="2" />
                    <path d="M6 6v12m0-4h5a7 7 0 0 0 7-4" />
                  </svg>
                </span>
                <span className="teaser-number">06</span>
              </div>
              <h3>Orion Worktree Report</h3>
              <p>See overlapping uncommitted paths, with missing coverage kept visible.</p>
              <span className="teaser-bottom">
                Observe the work{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="starter">
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
            <p>
              <span className="tag tag-preview">{starterTool?.version} · {starterTool?.status}</span>
              <br />A manually invoked local example. The written guide is available; its video
              companion is in preparation.
            </p>
            <a
              className="text-link"
              href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
              rel="noreferrer"
            >
              Follow the development-evidence guide{' '}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </a>
            <br />
            <Link className="text-link" href="/tools#orion-starter">
              Explore the Starter preview ↗
            </Link>
          </div>
          <div className="profile-flow">
            <div className="flow-title">
              <span>FOUR ROLES, ONE WORKFLOW</span>
              <span className="tag tag-preview">PREVIEW</span>
            </div>
            <div className="flow-step">
              <span className="step-dot">1</span>
              <div>
                <strong>Establish who owns the task</strong>
                <p>Orion PM · A claim with a bounded scope.</p>
              </div>
            </div>
            <div className="flow-step">
              <span className="step-dot">2</span>
              <div>
                <strong>Carry the intended context forward</strong>
                <p>Orion Handoff · Observations and uncertainty.</p>
              </div>
            </div>
            <div className="flow-step">
              <span className="step-dot">3</span>
              <div>
                <strong>Recover the original evidence</strong>
                <p>Orion Results · Exact text by reference.</p>
              </div>
            </div>
            <div className="flow-step">
              <span className="step-dot">4</span>
              <div>
                <strong>Check what is true now</strong>
                <p>Orion Worktree Report · An independent observation.</p>
              </div>
            </div>
          </div>
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
          </div>
          <div>
            <div className="principle">
              <span>01</span>
              <div>
                <h3>Humans retain sovereignty.</h3>
                <p>
                  AI can work within the scope you give it. Decisions about purpose, permission, and
                  consequential actions remain yours.
                </p>
              </div>
            </div>
            <div className="principle">
              <span>02</span>
              <div>
                <h3>Memory is infrastructure.</h3>
                <p>
                  Intent and context deserve continuity, provenance, and deliberate boundaries.
                  Today’s continuity tools are steps toward that larger ambition.
                </p>
              </div>
            </div>
            <div className="principle">
              <span>03</span>
              <div>
                <h3>Trust is the product.</h3>
                <p>
                  Make claims inspectable. See what was observed, what was authorized, and what
                  still needs checking.
                </p>
              </div>
            </div>
            <div className="principle">
              <span>04</span>
              <div>
                <h3>Context has boundaries.</h3>
                <p>
                  Personal, business, and account contexts carry different permissions. Scope is
                  explicit; cooperative limits are documented.
                </p>
              </div>
            </div>
            <div className="principle">
              <span>05</span>
              <div>
                <h3>Reliability should feel ordinary.</h3>
                <p>
                  Clear ownership, recoverable results, and visible uncertainty keep work moving
                  when something stops halfway through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="our-story">
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
                Read the guides{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </a>
              <Link className="text-link" href="/tools">
                Find a walkthrough{' '}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
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
        <div className="wrap faq">
          <div>
            <div className="eyebrow">Before you start</div>
            <h2>
              A clear place
              <br />
              to begin.
            </h2>
          </div>
          <div>
            <details>
              <summary>Is this a replacement for Linux, Windows, or macOS?</summary>
              <p>
                Cosmocrat is an operating environment for AI work: coordination, continuity, tool
                access, and human direction. The individual tools run on the host environments
                documented in their releases.
              </p>
            </details>
            <details>
              <summary>Can I use a single Orion tool?</summary>
              <p>
                Yes. Pick the tool that solves your immediate problem. Each has its own release,
                instructions, and boundaries. You can add a composition when it becomes useful.
              </p>
            </details>
            <details>
              <summary>Can I install the whole system?</summary>
              <p>
                Today you can install individual components and try selected Starter profiles. There
                is no complete Cosmocrat OS installer or universal support promise.
              </p>
            </details>
            <details>
              <summary>Does everything stay private and local?</summary>
              <p>
                Many tools keep operating state in local stores. Browser accounts, connected
                services, model providers, and agent permissions have their own data boundaries.
                Check the selected workflow before using sensitive information.
              </p>
            </details>
            <details>
              <summary>Where should I begin?</summary>
              <p>
                Try the Orion PM guide to see two local workers coordinate one task. It is a
                concrete starting point before adding browser or phone access.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <h2>Build on work you can inspect.</h2>
            <p>Choose one tool, follow its guide, and see what it does in your environment.</p>
          </div>
          <Link className="button button-primary" href="/tools">
            Find your starting point{' '}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
