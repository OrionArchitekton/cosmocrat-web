export const homeFaq = [
  {
    question: 'Is this a replacement for Linux, Windows, or macOS?',
    answer:
      'Cosmocrat is an operating environment for AI work: coordination, continuity, tool access, and human direction. The individual tools run on the host environments documented in their releases.',
  },
  {
    question: 'Can I use a single Orion tool?',
    answer:
      'Yes. Pick the tool that solves your immediate problem. Each has its own release, instructions, and boundaries. You can add a composition when it becomes useful.',
  },
  {
    question: 'Can I install the whole system?',
    answer:
      'Today you can install individual components and try selected Starter profiles. There is no complete Cosmocrat OS installer or universal support promise.',
  },
  {
    question: 'Does everything stay private and local?',
    answer:
      'Many tools keep operating state in local stores. Browser accounts, connected services, model providers, and agent permissions have their own data boundaries. Check the selected workflow before using sensitive information.',
  },
  {
    question: 'Where should I begin?',
    answer:
      'Try the Orion PM guide to see two local workers coordinate one task. It is a concrete starting point before adding browser or phone access.',
  },
] as const;

export const chronicleReceiptsFaq = [
  {
    question: 'How is a receipt different from a system log?',
    answer:
      'An authoritative governance receipt records the policy and authority behind a decision. Local task records, hashes and tool logs have distinct authority. Neither record alone proves an external outcome.',
  },
  {
    question: 'Are receipts stored on a blockchain?',
    answer:
      'A blockchain is not required. Storage and integrity mechanisms depend on the kernel version and deployment. Do not infer a Merkle tree or external anchoring from the existence of a receipt.',
  },
  {
    question: 'Can I replay a receipt?',
    answer:
      'A governed decision can be replayed when the necessary versioned inputs and policy are retained. A receipt is not a complete model reasoning trace or a guarantee that a real-world effect occurred.',
  },
  {
    question: 'What format are receipts in?',
    answer:
      'Receipts are generated in a standardized, machine-readable JSON format, allowing for automated auditing and integration with compliance tools.',
  },
] as const;

export const decisionExhaustFaq = [
  {
    question: 'What is decision exhaust vs data exhaust?',
    answer:
      'Data exhaust is the byproduct of system operation (logs, traces). Decision exhaust is the byproduct of governance (reasoning, policy checks, authority grants). One captures what happened. The other captures why it was allowed.',
  },
  {
    question: 'Is decision exhaust the same as observability?',
    answer:
      'Observability records signals. Decision exhaust retains policy and authority information for an enrolled decision. Auditability depends on the actual retention and integrity controls.',
  },
  {
    question: "Why isn't logging enough for AI governance?",
    answer:
      'An event log can omit the policy and authority behind an action. A decision receipt records that admission basis; it does not prove that execution or an external outcome occurred.',
  },
  {
    question: 'Does decision exhaust increase latency or cost?',
    answer:
      'Policy evaluation and durable receipt persistence add work. Measure the enrolled workload; this reference makes no universal overhead or latency guarantee.',
  },
] as const;

export const driftGuardFaq = [
  {
    question: 'How does Drift Guard differ from observability?',
    answer:
      "Observability records signals such as latency and errors. Drift Guard's design adds configured checks for divergence from authorized behavior, including cases without a software error. Detection coverage must be established in the deployed integration.",
  },
  {
    question: "What is 'Behavioral Drift'?",
    answer:
      "It's when an agent's response patterns shift over time (for example, becoming more aggressive, less concise, or hallucinating facts) without any code changes.",
  },
  {
    question: 'Can Drift Guard automatically fix the AI?',
    answer:
      "The proposed response is 'Halt & Require G4' (Human Authorization). A deployment must explicitly configure and verify that response. Automatic correction requires its own authority and evidence.",
  },
  {
    question: 'Does it work on non-deterministic models?',
    answer:
      'The design checks configured boundaries and observed behavior across model types. Non-deterministic behavior still requires suitable detection signals and workload-specific validation; no universal safety guarantee follows.',
  },
] as const;

export const gateSystemFaq = [
  {
    question: 'Why are there 7 gates?',
    answer:
      'The conceptual stages separate context, formation, eligibility, authority, execution and outcome evidence. This separation guides integration design; it does not establish that every stage is implemented or that all failures are prevented.',
  },
  {
    question: 'What happens if a gate fails?',
    answer:
      'An enrolled boundary should deny or defer a request that fails a required check and retain the decision receipt. Verify fail-closed behavior, persistence failures and bypass paths in the actual integration.',
  },
  {
    question: 'Can I customize the gates?',
    answer:
      'G0-G3 are structural stages in this conceptual model. Actual stages and policy settings depend on the enrolled integration. Changing a required authority or evidence check needs its own explicit authorization.',
  },
  {
    question: 'Does this replace my existing evals?',
    answer:
      'Offline evaluations test model behavior before deployment. Enrolled runtime admission checks address proposed actions at their configured boundary. Both require validation; neither establishes universal safety.',
  },
] as const;

export const memoryInfrastructureFaq = [
  {
    question: 'Is this different from a vector database?',
    answer:
      'Yes. A vector database optimizes retrieval relevance. This design adds authority checks and provenance to an explicitly enrolled retrieval path. The underlying store remains external; verify that its actual access boundary applies the required decision before relying on isolation.',
  },
  {
    question: 'How does lane isolation work technically?',
    answer:
      'In this design, lanes identify policy scopes for enrolled memory writes and retrieval. An integration can tag records and apply lane filters, but labels alone do not enforce isolation. Verify enforcement and durable receipt persistence at the actual access boundary, including bypass and denial paths.',
  },
  {
    question: 'What happens if an agent needs cross-lane context?',
    answer:
      'On an explicitly enrolled retrieval path, a cross-lane request can be evaluated against policy before access. The integration must verify that denial prevents retrieval and that the decision receipt is durably retained. An admission receipt alone does not prove what the external store returned.',
  },
  {
    question: 'Does memory governance slow down retrieval?',
    answer:
      'Measure retrieval and governance overhead in the actual deployment. Context provenance depends on the enrolled retrieval path and retained evidence; this reference establishes no universal latency or coverage guarantee.',
  },
] as const;

export const runtimeGovernanceFaq = [
  {
    question: 'Is the kernel a proxy or a sidecar?',
    answer:
      'The narrow kernel evaluates proposed mutations and issues decision receipts. Memory retrieval, orchestration and execution remain outside that kernel and need their own governed integration.',
  },
  {
    question: 'Does runtime governance increase latency?',
    answer:
      'Policy, transport and receipt persistence add work to the decision path. Measure the actual deployment and workload; this reference establishes no universal latency benchmark.',
  },
  {
    question: 'Can the AI bypass the kernel?',
    answer:
      'A non-bypassable boundary requires removing alternative tool, credential and network paths. Current tool-family membership does not establish that property. Verify actual enrollment and capability boundaries; application-layer admission alone is insufficient.',
  },
  {
    question: 'How does it handle different models?',
    answer:
      'The admission design can evaluate proposed mutations from different model providers. Each model, tool and runtime path still needs an explicit integration and verified enforcement boundary.',
  },
] as const;
