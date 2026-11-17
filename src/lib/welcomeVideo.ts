// Duration measured from both published MP4 files.
export const WELCOME_DURATION = 21.933333;

interface PreviewChapter {
  index: string;
  start: number;
  end: number;
  timeLabel: string;
  title: string;
  summary: string;
}

export const PREVIEW_CHAPTERS: readonly PreviewChapter[] = [
  {
    index: '01',
    start: 0,
    end: 5,
    timeLabel: '00:00',
    title: 'Cosmocrat OS Umbrella',
    summary: 'Human direction across ten independent Orion tools.',
  },
  {
    index: '02',
    start: 5,
    end: 11,
    timeLabel: '00:05',
    title: 'Coordination & Continuity',
    summary: 'Orion PM claims, Handoff context, Results recovery, and Worktree state.',
  },
  {
    index: '03',
    start: 11,
    end: 17,
    timeLabel: '00:11',
    title: 'Access & Practices',
    summary: 'Browser identity separation, Android access, Starter, and failclosed.',
  },
  {
    index: '04',
    start: 17,
    end: WELCOME_DURATION,
    timeLabel: '00:17',
    title: 'Explicit Boundaries',
    summary: 'Starter previews and experimental Remote Hands keep their own limits.',
  },
];
