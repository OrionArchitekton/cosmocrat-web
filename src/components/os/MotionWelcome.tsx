'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Gauge, Pause, Play, RotateCcw } from 'lucide-react';

interface PreviewChapter {
  index: string;
  start: number;
  end: number;
  timeLabel: string;
  title: string;
  summary: string;
}

const PREVIEW_CHAPTERS: readonly PreviewChapter[] = [
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
    end: 22,
    timeLabel: '00:17',
    title: 'Explicit Boundaries',
    summary: 'Starter previews and experimental Remote Hands keep their own limits.',
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function formatSeconds(value: number): string {
  const safe = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function MotionWelcome() {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const failedSources = useRef(new Set<HTMLSourceElement>());
  const resumeAfterResize = useRef<{
    time: number;
    playing: boolean;
    ended: boolean;
  } | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const [enhanced, setEnhanced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(22);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.5>(1);

  useEffect(() => {
    const player = video.current;
    const host = section.current;
    if (!player || !host) return;
    setEnhanced(true);
    if (player.networkState === player.NETWORK_NO_SOURCE) setFailed(true);
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 760px)');
    setPortrait(narrow.matches);
    let attempted = false;
    const stop = () => player.pause();
    const hold = () => {
      if (resumeAfterResize.current) resumeAfterResize.current.playing = false;
      stop();
    };
    const play = () => {
      void player.play().catch(() => setPlaying(!player.paused && !player.ended));
    };
    const preference = () => {
      if (motionPref.matches) hold();
    };
    const viewport = () => {
      resumeAfterResize.current = resumeAfterResize.current || {
        time: player.currentTime,
        playing: !player.paused && !player.ended,
        ended: player.ended,
      };
      stop();
      setPortrait(narrow.matches);
      failedSources.current.clear();
      player.load();
    };
    const restore = () => {
      if (Number.isFinite(player.duration) && player.duration > 0) {
        setDuration(player.duration);
      }
      const pending = resumeAfterResize.current;
      if (!pending || player.readyState < player.HAVE_METADATA) return;
      resumeAfterResize.current = null;
      const targetTime = Number.isFinite(player.duration)
        ? Math.min(pending.time, player.duration)
        : pending.time;
      player.currentTime = targetTime;
      setCurrentTime(targetTime);
      setEnded(pending.ended);
      const bounds = host.getBoundingClientRect();
      if (pending.playing && !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight) {
        play();
      }
    };
    const started = () => {
      attempted = true;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) hold();
        else if (!attempted && !motionPref.matches && !document.hidden) {
          attempted = true;
          play();
        }
      },
      { threshold: 0.2 }
    );
    const visibility = () => {
      if (document.hidden) hold();
      else {
        observer.unobserve(host);
        observer.observe(host);
      }
    };
    observer.observe(host);
    motionPref.addEventListener('change', preference);
    narrow.addEventListener('change', viewport);
    document.addEventListener('visibilitychange', visibility);
    player.addEventListener('loadedmetadata', restore);
    player.addEventListener('play', started);
    return () => {
      observer.disconnect();
      motionPref.removeEventListener('change', preference);
      narrow.removeEventListener('change', viewport);
      document.removeEventListener('visibilitychange', visibility);
      player.removeEventListener('loadedmetadata', restore);
      player.removeEventListener('play', started);
      resumeAfterResize.current = null;
      stop();
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (player) {
      player.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const toggle = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) {
      if (resumeAfterResize.current) {
        if (resumeAfterResize.current.ended) resumeAfterResize.current.time = 0;
        resumeAfterResize.current.ended = false;
        resumeAfterResize.current.playing = true;
      }
      if (player.ended || ended) {
        player.currentTime = 0;
        setCurrentTime(0);
      }
      setEnded(false);
      void player.play().catch(() => setPlaying(!player.paused && !player.ended));
    } else {
      if (resumeAfterResize.current) resumeAfterResize.current.playing = false;
      player.pause();
    }
  };

  const seekTo = (nextSeconds: number, autoPlay = false) => {
    const player = video.current;
    if (!player) return;
    const maxTime = Number.isFinite(player.duration) && player.duration > 0 ? player.duration : duration;
    const clamped = Math.max(0, Math.min(nextSeconds, maxTime));
    player.currentTime = clamped;
    setCurrentTime(clamped);
    const isAtEnd = clamped >= maxTime - 0.05;
    setEnded(isAtEnd);
    if (resumeAfterResize.current) {
      resumeAfterResize.current.time = clamped;
      resumeAfterResize.current.ended = isAtEnd;
      if (autoPlay && !isAtEnd) {
        resumeAfterResize.current.playing = true;
      }
    }
    if (autoPlay && !isAtEnd && player.paused) {
      void player.play().catch(() => setPlaying(!player.paused && !player.ended));
    }
  };

  const toggleSpeed = () => {
    setPlaybackRate((prev) => (prev === 1 ? 1.5 : 1));
  };

  const sourceFailed = (event: SyntheticEvent<HTMLSourceElement>) => {
    failedSources.current.add(event.currentTarget);
    const candidates = Array.from(video.current?.querySelectorAll('source') || []).filter(
      (source) => !source.media || window.matchMedia(source.media).matches
    );
    if (candidates.length && candidates.every((source) => failedSources.current.has(source))) {
      setFailed(true);
      setPlaying(false);
    }
  };

  const activeDuration = duration > 0 ? duration : 22;
  const progressRatio = Math.max(0, Math.min(1, currentTime / activeDuration));
  const activeChapterIdx = PREVIEW_CHAPTERS.findIndex(
    (ch, idx) =>
      currentTime >= ch.start &&
      (idx === PREVIEW_CHAPTERS.length - 1 || currentTime < ch.end)
  );
  const resolvedChapterIdx = activeChapterIdx === -1 ? 0 : activeChapterIdx;

  return (
    <section
      className="motion-welcome"
      ref={section}
      data-motion-welcome
      aria-label="Cosmocrat OS introduction"
    >
      <div className="wrap">
        <motion.div
          className="motion-shell"
          data-playing={playing ? 'true' : 'false'}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: EASE_OUT_EXPO }}
        >
          <div className="motion-deck-bar">
            <span className="motion-deck-title">Cosmocrat OS · Silent introduction preview</span>
            {enhanced && !failed && (
              <div className="motion-deck-meta">
                <span className="motion-timecode tabular-nums">
                  {formatSeconds(currentTime)} / {formatSeconds(activeDuration)}
                </span>
                <button
                  type="button"
                  className="motion-speed-btn"
                  onClick={toggleSpeed}
                  aria-label={`Playback speed ${playbackRate}x`}
                >
                  <Gauge aria-hidden="true" />
                  {playbackRate}x
                </button>
              </div>
            )}
          </div>

          <div className="motion-deck-grid">
            <div className="motion-stage-col">
              <div
                className="motion-stage"
                onClick={enhanced && !failed ? toggle : undefined}
              >
                <video
                  ref={video}
                  muted
                  playsInline
                  controls={!enhanced}
                  preload="metadata"
                  poster={`/media/cosmocrat/cosmocrat-welcome-${portrait ? 'mobile' : 'desktop'}.jpg`}
                  width={1920}
                  height={1080}
                  aria-describedby="welcome-caption"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onLoadedMetadata={(event) => {
                    const dur = event.currentTarget.duration;
                    if (Number.isFinite(dur) && dur > 0) setDuration(dur);
                    event.currentTarget.playbackRate = playbackRate;
                  }}
                  onEnded={() => {
                    setEnded(true);
                    setPlaying(false);
                  }}
                  onCanPlay={() => {
                    setFailed(false);
                    failedSources.current.clear();
                  }}
                  onError={(event) => {
                    if (event.target === event.currentTarget) {
                      setFailed(true);
                      setPlaying(false);
                    }
                  }}
                >
                  <source
                    src="/media/cosmocrat/cosmocrat-welcome-mobile.mp4"
                    type="video/mp4"
                    media="(max-width: 760px)"
                    onError={sourceFailed}
                  />
                  <source
                    src="/media/cosmocrat/cosmocrat-welcome-desktop.mp4"
                    type="video/mp4"
                    onError={sourceFailed}
                  />
                  Your browser can’t play the introduction. Continue to the site below.
                </video>

                {enhanced && !failed && !playing && (
                  <motion.button
                    type="button"
                    className="motion-stage-overlay"
                    aria-label={ended ? 'Replay preview on stage' : 'Play preview on stage'}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggle();
                    }}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: EASE_OUT_EXPO }}
                  >
                    <span className="motion-stage-trigger">
                      {ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
                      <span>{ended ? 'Replay preview' : 'Play preview'}</span>
                    </span>
                  </motion.button>
                )}

                {enhanced && !failed && (
                  <div
                    className="motion-scrubber"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="motion-scrubber-track">
                      <span
                        className="motion-scrubber-fill"
                        style={{ transform: `scaleX(${progressRatio})` }}
                      />
                      {PREVIEW_CHAPTERS.slice(1).map((ch) => (
                        <span
                          key={ch.index}
                          className="motion-scrubber-tick"
                          style={{ left: `${(ch.start / activeDuration) * 100}%` }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={activeDuration}
                      step={0.1}
                      value={Math.min(currentTime, activeDuration)}
                      aria-label="Seek preview video timeline"
                      className="motion-scrubber-input"
                      onChange={(event) => seekTo(Number(event.target.value), false)}
                    />
                  </div>
                )}
              </div>
            </div>

            <aside className="motion-chapters" aria-label="Preview chapters">
              <div className="motion-chapters-head">Preview sequence</div>
              <div className="motion-chapter-list">
                {PREVIEW_CHAPTERS.map((chapter, idx) => {
                  const isActive = idx === resolvedChapterIdx;
                  const chapterSpan = Math.max(1, chapter.end - chapter.start);
                  const chapterFill = isActive
                    ? Math.max(0, Math.min(1, (currentTime - chapter.start) / chapterSpan))
                    : idx < resolvedChapterIdx
                      ? 1
                      : 0;

                  return (
                    <button
                      key={chapter.index}
                      type="button"
                      className={`motion-chapter-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => seekTo(chapter.start, true)}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <div className="motion-chapter-top">
                        <span className="motion-chapter-num tabular-nums">{chapter.index}</span>
                        <span className="motion-chapter-title">{chapter.title}</span>
                        <span className="motion-chapter-time tabular-nums">{chapter.timeLabel}</span>
                      </div>
                      <p className="motion-chapter-summary">{chapter.summary}</p>
                      <span className="motion-chapter-bar" aria-hidden="true">
                        <span
                          className="motion-chapter-bar-fill"
                          style={{ transform: `scaleX(${chapterFill})` }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>

          <div className="motion-caption">
            <p id="welcome-caption">
              Cosmocrat OS brings together Orion tools for coordination, continuity, access and
              operating practices. Independent releases, Starter previews and experimental Remote
              Hands keep their own boundaries.
            </p>
            <div className="motion-actions">
              {enhanced && !failed && (
                <button
                  className="motion-control"
                  type="button"
                  onClick={toggle}
                  aria-label={
                    playing
                      ? 'Pause introduction'
                      : ended
                        ? 'Replay introduction'
                        : 'Play introduction'
                  }
                >
                  {playing ? (
                    <Pause aria-hidden="true" />
                  ) : ended ? (
                    <RotateCcw aria-hidden="true" />
                  ) : (
                    <Play aria-hidden="true" />
                  )}
                  {playing ? 'Pause' : ended ? 'Replay' : 'Play intro'}
                </button>
              )}
              <a
                className="text-link"
                href="#static-site"
                onClick={() => {
                  if (resumeAfterResize.current) resumeAfterResize.current.playing = false;
                  video.current?.pause();
                }}
              >
                Continue to the site <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>

          {failed && (
            <p className="motion-fallback" role="status">
              The introduction is unavailable. The full site is ready below.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
