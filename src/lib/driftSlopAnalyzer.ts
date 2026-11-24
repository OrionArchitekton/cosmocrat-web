export type DriftFindingSeverity = 'BLOCK' | 'WARN';

export type DriftRuleCategory =
  | 'long_dash'
  | 'ai_slop'
  | 'negative_parallelism'
  | 'thriller_cliche'
  | 'passive_voice'
  | 'burstiness'
  | 'vague_abstraction';

export interface DriftFinding {
  id: string;
  ruleId: string;
  category: DriftRuleCategory;
  severity: DriftFindingSeverity;
  line: number;
  col: number;
  start: number;
  end: number;
  span: string;
  message: string;
  fixHint: string;
}

export interface DriftMetrics {
  wordCount: number;
  sentenceCount: number;
  longDashCount: number;
  hardSlopCount: number;
  kobakExcessCount: number;
  negativeParallelismCount: number;
  thrillerClicheCount: number;
  vagueAbstractionCount: number;
  passiveSentenceCount: number;
  passiveRatioPct: number;
  burstinessCv: number;
  meanSentenceWords: number;
  concreteAnchorCount: number;
  score: number;
  verdict: 'PASS' | 'WARN' | 'FAIL';
}

export interface DriftAnalysisReport {
  metrics: DriftMetrics;
  findings: DriftFinding[];
  sentenceLengths: number[];
}

export interface DriftPreset {
  id: string;
  label: string;
  summary: string;
  sampleText: string;
}

// Banned long dashes via codepoints so this file contains zero raw U+2013/2014/2015 chars.
const BANNED_DASHES: ReadonlyArray<{ char: string; code: string; label: string }> = [
  { char: String.fromCodePoint(0x2014), code: 'U+2014', label: 'em dash' },
  { char: String.fromCodePoint(0x2013), code: 'U+2013', label: 'en dash' },
  { char: String.fromCodePoint(0x2015), code: 'U+2015', label: 'horizontal bar' },
];

export const HARD_SLOP_TERMS: readonly string[] = [
  'delve',
  'tapestry',
  'multifaceted',
  'seamless',
  'a myriad of',
  "it's worth noting",
  "in today's digital age",
  'testament to',
  'game-changer',
  'paradigm shift',
  'navigating the landscape',
];

// Kobak et al. (2024) post-LLM excess style vocabulary.
export const KOBAK_EXCESS_TERMS: readonly string[] = [
  'intricacies',
  'meticulous',
  'meticulously',
  'notably',
  'underscores',
  'underscore',
  'pivotal',
  'fostering',
  'foster',
  'garnered',
  'bolster',
  'showcase',
  'showcasing',
  'highlighting',
  'emphasizing',
  'crucial',
  'enhance',
  'enhancing',
  'intricate',
  'elevate',
  'realm',
  'unlock',
  'empower',
  'leverage',
  'robust',
  'harness',
  'commendable',
  'versatile',
  'groundbreaking',
  'transformative',
  'streamline',
  'unprecedented',
  'comprehensive',
  'indispensable',
  'burgeoning',
  'reimagine',
  'spearhead',
  'amplify',
  'synergize',
  'catalyst',
  'paramount',
  'nuanced',
  'poised',
  'cornerstone',
  'linchpin',
  'holistic',
  'ever-evolving',
  'resonate',
];

export const THRILLER_CLICHES: readonly string[] = [
  'vanished off the face of the earth',
  'in the dead of night',
  'conjured out of thin air',
  'crown-jewel',
  'nondescript office park',
  'behind closed doors',
  'ticking time bomb',
  'game of cat and mouse',
  'house of cards',
  'perfect storm',
  'shrouded in secrecy',
  'sent shockwaves',
  'double-edged sword',
];

export const VAGUE_ABSTRACTIONS: readonly string[] = [
  "in today's landscape",
  'actionable insights',
  'strategic alignment',
  'holistic approach',
  'best practices',
  'cutting-edge',
  'state-of-the-art',
  'future-proof',
  'mission-critical',
  'value proposition',
  'key takeaway',
  'seamless integration',
  'scalable solution',
  'unlock potential',
  'redefine the way',
  'meaningful impact',
  'drive efficiency',
  'streamline operations',
  'optimize workflows',
  'redirecting setting',
  'version control system',
];

const NEGATIVE_PARALLELISM_REGEXES: readonly RegExp[] = [
  /\b(?:wasn't|isn't|aren't|weren't|not)\s+(?:just|only|merely)\s+[^.!?\n]{1,60}(?:,|;)\s*(?:it\s+(?:was|is)|it's|they're|that's|but)\b/gi,
  /\bmore\s+than\s+just\b/gi,
  /\b(?:it's|it\s+is|this\s+is)\s+not\s+about\s+[^.!?\n]{1,50},\s*(?:it's|it\s+is|this\s+is)\s+about\b/gi,
];

const IRREGULAR_PARTICIPLES = new Set([
  'built',
  'broken',
  'chosen',
  'done',
  'driven',
  'eaten',
  'fallen',
  'forbidden',
  'forgotten',
  'found',
  'given',
  'gone',
  'grown',
  'held',
  'hidden',
  'known',
  'left',
  'lost',
  'made',
  'met',
  'paid',
  'proven',
  'put',
  'read',
  'run',
  'said',
  'seen',
  'sent',
  'set',
  'shown',
  'shut',
  'sold',
  'spent',
  'spoken',
  'stolen',
  'taken',
  'taught',
  'told',
  'thought',
  'understood',
  'worn',
  'written',
]);

const PASSIVE_AUX_REGEX =
  /\b(?:is|are|was|were|be|been|being|get|gets|got)\s+(?:not\s+)?(?:[a-z]+ly\s+)?([a-z]{3,})\b/gi;

const CONCRETE_ANCHOR_REGEX =
  /(?:\b\d+(?:[.,]\d+)*(?:%|ms|s|m|h|k|m|b)?\b|\$\d[\d,.]*|\b[A-Z][A-Z0-9_]{2,}\b|`[^`\n]+`|--[a-z0-9-]+|\b[a-z0-9_]+\.[a-z0-9_]+\b)/g;

const MIN_BURSTINESS_CV = 0.42;
const MAX_PASSIVE_RATIO_PCT = 12;
const KOBAK_CLUSTER_THRESHOLD = 3;
export const MAX_DIAGNOSTIC_INPUT_CHARS = 12000;

export const DRIFT_PRESETS: readonly DriftPreset[] = [
  {
    id: 'slop-agent-summary',
    label: 'Slop-heavy agent output',
    summary: 'Shows clustered Kobak verbs, negative parallelism, passive voice, and an em dash.',
    sampleText:
      "In today's digital age, our system wasn't just a monitoring tool, it was a paradigm shift for engineering teams. " +
      'A comprehensive review was conducted by the agent to showcase meticulous alignment' +
      String.fromCodePoint(0x2014) +
      'highlighting pivotal safeguards across the workflow. ' +
      'These actionable insights were leveraged to bolster governance and streamline operations behind closed doors. ' +
      'Notably, this robust framework underscores the holistic approach needed to empower stakeholders.',
  },
  {
    id: 'safety-fog-incident',
    label: 'Over-redacted safety fog',
    summary: 'Replaces concrete commands and failure numbers with vague abstractions and passive verbs.',
    sampleText:
      'A redirecting setting in the version control system caused the check to inspect an untouched directory. ' +
      'The validation status was reported as green by the runner even though the modified files were skipped. ' +
      'Actionable insights were gathered to foster strategic alignment across teams. ' +
      'Future-proof best practices will be implemented to drive efficiency and deliver meaningful impact.',
  },
  {
    id: 'operator-incident-note',
    label: 'Operator-grade note',
    summary: 'Concrete timestamps, flags, active verbs, and varied sentence cadence.',
    sampleText:
      'On Nov 4 at 14:02 UTC, the CI gate exited 0 while GIT_WORK_TREE still pointed at the clean primary checkout. ' +
      'The check did not lie. It read the wrong directory. ' +
      'We removed the inherited env export from tests/run-gate.sh and re-ran against commit 8f12c9a. ' +
      'Three failing path checks surfaced within 400ms, proving the boundary now fails closed on dirty worktrees.',
  },
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildTermRegex(term: string): RegExp {
  const parts = term.split(/\s+/).map(escapeRegex);
  return new RegExp(`\\b${parts.join('\\s+')}\\b`, 'gi');
}

function lineColAt(text: string, offset: number): { line: number; col: number } {
  let line = 1;
  let lastNl = -1;
  for (let i = 0; i < offset; i += 1) {
    if (text.charCodeAt(i) === 10) {
      line += 1;
      lastNl = i;
    }
  }
  return { line, col: offset - lastNl };
}

function maskUrls(text: string): string {
  return text.replace(/https?:\/\/\S+/g, (match) => {
    const trimmed = match.replace(/[.,!?;:)\]]+$/, '');
    const masked = trimmed
      .split('')
      .map((ch) => (ch === '\n' ? '\n' : ' '))
      .join('');
    return masked + match.slice(trimmed.length);
  });
}

interface SentenceSpan {
  text: string;
  start: number;
  end: number;
  wordCount: number;
}

function splitSentences(text: string): SentenceSpan[] {
  const spans: SentenceSpan[] = [];
  const rx = /(?:[^.!?\n]|(?<=\d)\.(?=\d))+(?:[.!?]+|$)/g;
  let match: RegExpExecArray | null;
  while ((match = rx.exec(text)) !== null) {
    const raw = match[0];
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const leadingSpaces = raw.length - raw.trimStart().length;
    const start = match.index + leadingSpaces;
    const end = start + trimmed.length;
    const words = trimmed.match(/[A-Za-z0-9_'-]+/g) ?? [];
    if (words.length === 0) continue;
    spans.push({ text: trimmed, start, end, wordCount: words.length });
  }
  return spans;
}

function isPassiveParticiple(word: string): boolean {
  const lower = word.toLowerCase();
  if (IRREGULAR_PARTICIPLES.has(lower)) return true;
  if (lower.length >= 5 && (lower.endsWith('ed') || lower.endsWith('en'))) {
    // Exclude common predicate adjectives that are rarely passive actions.
    if (
      lower === 'open' ||
      lower === 'even' ||
      lower === 'green' ||
      lower === 'red' ||
      lower === 'retired' ||
      lower === 'enabled' ||
      lower === 'disabled'
    ) {
      return false;
    }
    return true;
  }
  return false;
}

export function analyzeAgentDrift(rawInput: string): DriftAnalysisReport {
  const text = rawInput.slice(0, MAX_DIAGNOSTIC_INPUT_CHARS);
  if (!text.trim()) {
    return {
      metrics: {
        wordCount: 0,
        sentenceCount: 0,
        longDashCount: 0,
        hardSlopCount: 0,
        kobakExcessCount: 0,
        negativeParallelismCount: 0,
        thrillerClicheCount: 0,
        vagueAbstractionCount: 0,
        passiveSentenceCount: 0,
        passiveRatioPct: 0,
        burstinessCv: 0,
        meanSentenceWords: 0,
        concreteAnchorCount: 0,
        score: 100,
        verdict: 'PASS',
      },
      findings: [],
      sentenceLengths: [],
    };
  }

  const findings: DriftFinding[] = [];
  let seq = 0;
  const pushFinding = (f: Omit<DriftFinding, 'id'>) => {
    seq += 1;
    findings.push({ ...f, id: `df-${seq}` });
  };

  // 1. Long dashes (U+2013, U+2014, U+2015) on raw text
  let longDashCount = 0;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const entry = BANNED_DASHES.find((d) => d.char === ch);
    if (entry) {
      longDashCount += 1;
      const { line, col } = lineColAt(text, i);
      pushFinding({
        ruleId: 'BANNED_LONG_DASH',
        category: 'long_dash',
        severity: 'BLOCK',
        line,
        col,
        start: i,
        end: i + 1,
        span: entry.code,
        message: `Banned ${entry.label} (${entry.code}).`,
        fixHint: 'Split into two direct sentences or use a colon; never swap mechanically for a comma.',
      });
    }
  }

  // Mask URLs before lexical scanning so slug words like /seamless-rollbacks do not trigger false positives.
  const prose = maskUrls(text);

  // 2. Hard slop lexemes
  let hardSlopCount = 0;
  for (const term of HARD_SLOP_TERMS) {
    const rx = buildTermRegex(term);
    let m: RegExpExecArray | null;
    while ((m = rx.exec(prose)) !== null) {
      hardSlopCount += 1;
      const { line, col } = lineColAt(text, m.index);
      pushFinding({
        ruleId: 'HARD_SLOP_LEXEME',
        category: 'ai_slop',
        severity: 'BLOCK',
        line,
        col,
        start: m.index,
        end: m.index + m[0].length,
        span: m[0],
        message: `Hard AI-slop phrase "${term}".`,
        fixHint: 'Replace with a concrete command, count, timestamp, or observed system behavior.',
      });
    }
  }

  // 3. Kobak excess vocabulary (WARN individually; BLOCK cluster if >= 3)
  let kobakExcessCount = 0;
  let firstKobak: { line: number; col: number; start: number; end: number; span: string } | null =
    null;
  for (const term of KOBAK_EXCESS_TERMS) {
    const rx = buildTermRegex(term);
    let m: RegExpExecArray | null;
    while ((m = rx.exec(prose)) !== null) {
      kobakExcessCount += 1;
      const { line, col } = lineColAt(text, m.index);
      if (!firstKobak) {
        firstKobak = { line, col, start: m.index, end: m.index + m[0].length, span: m[0] };
      }
      pushFinding({
        ruleId: 'KOBAK_EXCESS_TERM',
        category: 'ai_slop',
        severity: 'WARN',
        line,
        col,
        start: m.index,
        end: m.index + m[0].length,
        span: m[0],
        message: `Excess AI style verb/adjective "${term}" (Kobak et al. 2024).`,
        fixHint: 'Swap inflated style wording for the literal physical verb or concrete outcome.',
      });
    }
  }
  if (kobakExcessCount >= KOBAK_CLUSTER_THRESHOLD && firstKobak) {
    pushFinding({
      ruleId: 'KOBAK_EXCESS_CLUSTER',
      category: 'ai_slop',
      severity: 'BLOCK',
      line: firstKobak.line,
      col: firstKobak.col,
      start: firstKobak.start,
      end: firstKobak.end,
      span: firstKobak.span,
      message: `Cluster of ${kobakExcessCount} Kobak excess style terms detected (threshold: ${KOBAK_CLUSTER_THRESHOLD}).`,
      fixHint: 'Rewrite sentences with direct active verbs and inspectable facts.',
    });
  }

  // 4. Negative parallelism ("not just X, it's Y")
  let negativeParallelismCount = 0;
  for (const rx of NEGATIVE_PARALLELISM_REGEXES) {
    const localRx = new RegExp(rx.source, rx.flags);
    let m: RegExpExecArray | null;
    while ((m = localRx.exec(prose)) !== null) {
      negativeParallelismCount += 1;
      const { line, col } = lineColAt(text, m.index);
      pushFinding({
        ruleId: 'NEGATIVE_PARALLELISM',
        category: 'negative_parallelism',
        severity: 'BLOCK',
        line,
        col,
        start: m.index,
        end: m.index + m[0].length,
        span: m[0],
        message: 'Negative-parallelism contrast frame ("not just X, it\'s Y").',
        fixHint: 'State directly what the artifact or failure is without theatrical contrast framing.',
      });
    }
  }

  // 5. Thriller cliches
  let thrillerClicheCount = 0;
  for (const cliche of THRILLER_CLICHES) {
    const rx = buildTermRegex(cliche);
    let m: RegExpExecArray | null;
    while ((m = rx.exec(prose)) !== null) {
      thrillerClicheCount += 1;
      const { line, col } = lineColAt(text, m.index);
      pushFinding({
        ruleId: 'THRILLER_CLICHE',
        category: 'thriller_cliche',
        severity: 'BLOCK',
        line,
        col,
        start: m.index,
        end: m.index + m[0].length,
        span: m[0],
        message: `Stock thriller cliche "${cliche}".`,
        fixHint: 'Replace melodrama with the exact time, location, record, or failure signal.',
      });
    }
  }

  // 6. Vague abstractions / safety fog
  let vagueAbstractionCount = 0;
  for (const phrase of VAGUE_ABSTRACTIONS) {
    const rx = buildTermRegex(phrase);
    let m: RegExpExecArray | null;
    while ((m = rx.exec(prose)) !== null) {
      vagueAbstractionCount += 1;
      const { line, col } = lineColAt(text, m.index);
      pushFinding({
        ruleId: 'VAGUE_ABSTRACTION',
        category: 'vague_abstraction',
        severity: 'WARN',
        line,
        col,
        start: m.index,
        end: m.index + m[0].length,
        span: m[0],
        message: `Vague abstraction / safety fog "${phrase}".`,
        fixHint: 'Name the actual flag, protocol, error code, dollar figure, or operator action.',
      });
    }
  }

  // 7. Sentence metrics: passive voice ratio and burstiness CV
  const sentences = splitSentences(prose);
  const sentenceLengths = sentences.map((s) => s.wordCount);
  const sentenceCount = sentences.length;
  const wordCount = sentenceLengths.reduce((acc, n) => acc + n, 0);
  const meanSentenceWords =
    sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  let burstinessCv = 0;
  if (sentenceCount >= 2 && meanSentenceWords > 0) {
    const exactMean = wordCount / sentenceCount;
    const variance =
      sentenceLengths.reduce((acc, n) => acc + (n - exactMean) ** 2, 0) / sentenceCount;
    burstinessCv = Math.round((Math.sqrt(variance) / exactMean) * 1000) / 1000;
  }

  let passiveSentenceCount = 0;
  for (const sent of sentences) {
    const rx = new RegExp(PASSIVE_AUX_REGEX.source, PASSIVE_AUX_REGEX.flags);
    let m: RegExpExecArray | null;
    let foundPassiveInSent = false;
    while ((m = rx.exec(sent.text)) !== null) {
      if (isPassiveParticiple(m[1])) {
        if (!foundPassiveInSent) {
          passiveSentenceCount += 1;
          foundPassiveInSent = true;
        }
        const offset = sent.start + m.index;
        const { line, col } = lineColAt(text, offset);
        pushFinding({
          ruleId: 'PASSIVE_CLAUSE',
          category: 'passive_voice',
          severity: 'WARN',
          line,
          col,
          start: offset,
          end: offset + m[0].length,
          span: m[0],
          message: `Passive construction "${m[0]}".`,
          fixHint: 'Name the actor first (e.g., "The runner skipped two files" instead of "were skipped").',
        });
      }
    }
  }

  const passiveRatioPct =
    sentenceCount > 0 ? Math.round((passiveSentenceCount / sentenceCount) * 1000) / 10 : 0;

  if (sentenceCount >= 4 && burstinessCv < MIN_BURSTINESS_CV) {
    pushFinding({
      ruleId: 'LOW_BURSTINESS_CV',
      category: 'burstiness',
      severity: 'BLOCK',
      line: 1,
      col: 1,
      start: 0,
      end: Math.min(text.length, sentences[0]?.end ?? 0),
      span: `CV=${burstinessCv.toFixed(3)}`,
      message: `Sentence-length burstiness CV ${burstinessCv.toFixed(3)} is below ${MIN_BURSTINESS_CV} floor.`,
      fixHint: 'Break uniform AI sentence lengths by pairing 4-8 word verdicts with 18-28 word causal explanations.',
    });
  }

  if (sentenceCount >= 3 && passiveRatioPct >= MAX_PASSIVE_RATIO_PCT) {
    pushFinding({
      ruleId: 'EXCESS_PASSIVE_VOICE',
      category: 'passive_voice',
      severity: 'BLOCK',
      line: 1,
      col: 1,
      start: 0,
      end: Math.min(text.length, sentences[0]?.end ?? 0),
      span: `passive=${passiveRatioPct}%`,
      message: `Passive-voice ratio ${passiveRatioPct}% meets or exceeds ${MAX_PASSIVE_RATIO_PCT}% limit.`,
      fixHint: 'Convert "was evaluated by" clauses into active subjects with clear ownership.',
    });
  }

  const concreteAnchorCount = (text.match(CONCRETE_ANCHOR_REGEX) ?? []).length;

  // Deterministic transparent score deduction from 100
  let penalty = 0;
  penalty += longDashCount * 10;
  penalty += hardSlopCount * 15;
  penalty += kobakExcessCount * 4;
  penalty += negativeParallelismCount * 12;
  penalty += thrillerClicheCount * 12;
  penalty += vagueAbstractionCount * 5;
  if (sentenceCount >= 4 && burstinessCv < MIN_BURSTINESS_CV) penalty += 15;
  if (sentenceCount >= 3 && passiveRatioPct >= MAX_PASSIVE_RATIO_PCT) penalty += 12;
  if (wordCount >= 25 && concreteAnchorCount === 0) penalty += 8;

  const score = Math.max(0, Math.min(100, Math.round(100 - penalty)));
  const hasBlocker = findings.some((f) => f.severity === 'BLOCK');
  const hasWarn = findings.some((f) => f.severity === 'WARN');
  const verdict: 'PASS' | 'WARN' | 'FAIL' = hasBlocker ? 'FAIL' : hasWarn ? 'WARN' : 'PASS';

  findings.sort((a, b) => a.start - b.start || (a.severity === 'BLOCK' ? -1 : 1));

  return {
    metrics: {
      wordCount,
      sentenceCount,
      longDashCount,
      hardSlopCount,
      kobakExcessCount,
      negativeParallelismCount,
      thrillerClicheCount,
      vagueAbstractionCount,
      passiveSentenceCount,
      passiveRatioPct,
      burstinessCv,
      meanSentenceWords,
      concreteAnchorCount,
      score,
      verdict,
    },
    findings,
    sentenceLengths,
  };
}
