const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmocrat.ai';
const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const aboutUrl = `${baseUrl}/about`;
const logoUrl = `${baseUrl}/brand/cosmocrat-wordmark.svg`;
const description = 'Cosmocrat is a Governed AI Operating System that provides governed memory and controlled execution with auditability, authority, and fail-closed enforcement.';

export const metadata = {
  title: 'About',
  description,
  alternates: {
    canonical: aboutUrl,
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#org`,
      name: 'Cosmocrat',
      url: baseUrl,
      logo: logoUrl,
      parentOrganization: {
        '@id': 'https://www.orionapexcapital.com/#org',
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Cosmocrat',
      publisher: {
        '@id': `${baseUrl}/#org`,
      }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/#software`,
      name: 'Cosmocrat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description,
      url: baseUrl,
      publisher: {
        '@id': `${baseUrl}/#org`,
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        url: `${baseUrl}/waitlist`
      }
    }
  ]
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">About Cosmocrat</h1>
        <p className="text-[var(--muted)]">
          {description}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What Cosmocrat Is</h2>
        <p className="text-[var(--muted)]">
          An AI Operating System is the layer that manages how AI systems retain memory, make decisions, and execute actions across tools and workflows. It defines the runtime environment for AI, much like an operating system coordinates resources and enforces rules for software on a computer. Cosmocrat provides that layer for organizations that need durable AI memory and controlled execution across systems, not just isolated tasks.
        </p>
        <p className="text-[var(--muted)]">
          Cosmocrat extends the AI Operating System concept with governance at the OS layer. That means the operating system itself is responsible for control, not an external policy wrapper. Governance includes auditability, authority boundaries, and fail-closed execution so that actions are accountable and bounded by policy. This design keeps governance as a first-class requirement rather than a downstream afterthought.
        </p>
        <p className="text-[var(--muted)]">
          Governed memory is central to that design. Rather than treating memory as a loose cache or a simple vector store, Cosmocrat treats memory as a controlled resource with policy-defined access and retention. This allows organizations to preserve continuity and context while ensuring that memory usage remains aligned with authority and compliance requirements.
        </p>
        <p className="text-[var(--muted)]">
          Controlled execution is the counterpart to governed memory. The system defines how and when AI can act, what it is allowed to do, and which resources it can access. By keeping the execution layer governed alongside memory and decisioning, Cosmocrat defines a complete operating system boundary for AI rather than a set of isolated tools.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Governed Execution by Design</h2>
        <p className="text-[var(--muted)]">
          In Cosmocrat, execution cannot outrun governance. Every action is evaluated against authority constraints before it runs, and the system is designed to fail closed when requirements are not met. This creates a predictable boundary for AI behavior and prevents silent escalation or unauthorized execution.
        </p>
        <p className="text-[var(--muted)]">
          Governed execution includes run records and auditability at the operating system level. The system preserves traceable run records of decisions and actions so operators can review what happened and why, without relying on ad-hoc logging. Details of specific implementation are documented elsewhere, but the top-level principle is consistent: execution is always within verifiable governance.
        </p>
        <p className="text-[var(--muted)]">
          This approach emphasizes human oversight without requiring constant manual intervention. Governance is designed into the system so that approvals, authority checks, and execution boundaries are enforced as part of the runtime. When a task falls outside permitted authority, the system stops and records the reason rather than attempting to continue or improvise.
        </p>
        <p className="text-[var(--muted)]">
          The result is a governed operating environment where the provenance of AI actions can be inspected and audited. Organizations can evaluate behavior at the level of runs and decisions rather than reconstructing activity from scattered logs. Cosmocrat is intended for environments where accountability and traceability are baseline requirements, not optional additions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Operated by Orion Apex Capital</h2>
        <p className="text-[var(--muted)]">
          Cosmocrat is originated, operated, and validated by Orion Apex Capital. Orion Apex Capital is an operating and systems architecture firm focused on the design and operation of technical systems. Cosmocrat is maintained as part of that operating scope and evaluated for consistent governance characteristics.
        </p>
        <p className="text-[var(--muted)]">
          The relationship is operational rather than purely financial. Orion Apex Capital is responsible for ongoing system stewardship, including the definition of governing requirements and the maintenance of the operating environment. This ensures Cosmocrat is maintained as a governed AI operating system with clear accountability for its design and operation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Name Disambiguation</h2>
        <p className="text-[var(--muted)]">
          Cosmocrat, as used here, is a product name and technical system. It is unrelated to historical or theological uses of the term “cosmocrat,” and the organization does not claim affiliation with those meanings.
        </p>
      </section>
    </div>
  );
}
