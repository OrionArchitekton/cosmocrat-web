'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Gauge, Pause, Play, RotateCcw } from 'lucide-react';

import { ORION_EASE_OUT_EXPO } from '@/lib/motion';
import { PREVIEW_CHAPTERS, WELCOME_DURATION } from '@/lib/welcomeVideo';

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
  const pendingSeek = useRef<number | null>(null);
  const autoPlayOnActivate = useRef(true);
  const resumeAfterResize = useRef<{
    time: number;
    playing: boolean;
    ended: boolean;
  } | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const [activated, setActivated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(WELCOME_DURATION);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.5>(1);

  useEffect(() => {
    const start = new URLSearchParams(window.location.search).get('t');
    if (start && /^\d+(?:\.\d+)?$/.test(start)) {
      const seconds = Number(start);
      if (seconds < WELCOME_DURATION) {
        resumeAfterResize.current = { time: seconds, playing: false, ended: false };
        setCurrentTime(seconds);
        autoPlayOnActivate.current = false;
        setActivated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!activated) return;
    const player = video.current;
    const host = section.current;
    if (!player || !host) return;
    const shouldAutoPlay = autoPlayOnActivate.current;
    autoPlayOnActivate.current = true;
    if (player.networkState === player.NETWORK_NO_SOURCE) setFailed(true);

    const narrow = window.matchMedia('(max-width: 760px)');
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');

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
      setFailed(false);
      failedSources.current.clear();
      player.load();
    };
    const restore = () => {
      if (Number.isFinite(player.duration) && player.duration > 0) {
        setDuration(player.duration);
      }
      if (pendingSeek.current !== null && player.readyState >= player.HAVE_METADATA) {
        const target = Math.min(pendingSeek.current, player.duration || pendingSeek.current);
        pendingSeek.current = null;
        player.currentTime = target;
        setCurrentTime(target);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) hold();
      },
      { threshold: 0.05 }
    );
    const visibility = () => {
      if (document.hidden) hold();
    };

    observer.observe(host);
    motionPref.addEventListener('change', preference);
    narrow.addEventListener('change', viewport);
    document.addEventListener('visibilitychange', visibility);
    player.addEventListener('loadedmetadata', restore);
    restore();
    if (shouldAutoPlay) {
      play();
    }

    return () => {
      observer.disconnect();
      motionPref.removeEventListener('change', preference);
      narrow.removeEventListener('change', viewport);
      document.removeEventListener('visibilitychange', visibility);
      player.removeEventListener('loadedmetadata', restore);
      resumeAfterResize.current = null;
      stop();
    };
  }, [activated]);

  useEffect(() => {
    const player = video.current;
    if (player) {
      player.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const activateAndPlay = (seekSeconds?: number) => {
    if (typeof seekSeconds === 'number') {
      pendingSeek.current = seekSeconds;
      setCurrentTime(seekSeconds);
    }
    setFailed(false);
    setEnded(false);
    setActivated(true);
  };

  const toggle = () => {
    if (!activated) {
      activateAndPlay();
      return;
    }
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
    if (!activated) {
      if (autoPlay) {
        activateAndPlay(nextSeconds);
      } else {
        setCurrentTime(nextSeconds);
      }
      return;
    }
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
      video.current?.pause();
      setFailed(true);
      setPlaying(false);
    }
  };

  const activeDuration = duration > 0 ? duration : WELCOME_DURATION;
  const progressRatio = Math.max(0, Math.min(1, currentTime / activeDuration));
  const activeChapterIdx = PREVIEW_CHAPTERS.findIndex(
    (ch, idx) =>
      currentTime >= ch.start &&
      (idx === PREVIEW_CHAPTERS.length - 1 || currentTime < ch.end)
  );
  const resolvedChapterIdx = activeChapterIdx === -1 ? 0 : activeChapterIdx;

  const controlLabel = playing ? 'Pause intro' : ended ? 'Replay intro' : 'Play intro';
  const controlAriaLabel = playing
    ? 'Pause introduction'
    : ended
      ? 'Replay introduction'
      : 'Play introduction';

  return (
    <section
      className="motion-welcome"
      ref={section}
      id="welcome-video"
      data-motion-welcome
      aria-label="Cosmocrat OS introduction"
    >
      <div className="wrap">
        <motion.div
          className="motion-shell"
          data-playing={playing ? 'true' : 'false'}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: ORION_EASE_OUT_EXPO }}
        >
          <div className="motion-deck-bar">
            <span className="motion-deck-title">Cosmocrat OS · Silent introduction preview</span>
            {activated && !failed && (
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
                onClick={!failed ? toggle : undefined}
              >
                {activated ? (
                  <video
                    ref={video}
                    muted
                    playsInline
                    preload="metadata"
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
                      if (pendingSeek.current !== null) {
                        const t = Math.min(pendingSeek.current, dur || pendingSeek.current);
                        pendingSeek.current = null;
                        event.currentTarget.currentTime = t;
                        setCurrentTime(t);
                      }
                    }}
                    onEnded={() => {
                      setEnded(true);
                      setPlaying(false);
                    }}
                    onLoadedData={() => {
                      setFailed(false);
                      failedSources.current.clear();
                    }}
                    onCanPlay={() => {
                      setFailed(false);
                      failedSources.current.clear();
                    }}
                    onError={(event) => {
                      if (event.target === event.currentTarget) {
                        event.currentTarget.pause();
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
                    Your browser cannot play the introduction. Continue to the site below.
                  </video>
                ) : (
                  <picture className="motion-poster-picture">
                    <source
                      media="(max-width: 760px)"
                      srcSet="/media/cosmocrat/cosmocrat-welcome-mobile-720w.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 760px)"
                      srcSet="/media/cosmocrat/cosmocrat-welcome-mobile-720w.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/media/cosmocrat/cosmocrat-welcome-desktop-1280w.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/media/cosmocrat/cosmocrat-welcome-desktop-1280w.webp"
                      type="image/webp"
                    />
                    <img
                      src="/media/cosmocrat/cosmocrat-welcome-desktop.jpg"
                      alt="Cosmocrat OS silent introduction preview poster"
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="motion-poster-img"
                    />
                  </picture>
                )}

                {!activated && (
                  <noscript>
                    <video
                      controls
                      preload="none"
                      poster="/media/cosmocrat/cosmocrat-welcome-desktop.jpg"
                      width={1920}
                      height={1080}
                    >
                      <source
                        src="/media/cosmocrat/cosmocrat-welcome-mobile.mp4"
                        type="video/mp4"
                        media="(max-width: 760px)"
                      />
                      <source
                        src="/media/cosmocrat/cosmocrat-welcome-desktop.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </noscript>
                )}

                {!failed && !playing && (
                  <motion.button
                    type="button"
                    className="motion-stage-overlay"
                    aria-label={ended ? 'Replay preview on stage' : 'Play preview on stage'}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggle();
                    }}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: ORION_EASE_OUT_EXPO }}
                  >
                    <span className="motion-stage-trigger">
                      {ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
                      <span>{ended ? 'Replay preview' : 'Play preview'}</span>
                    </span>
                  </motion.button>
                )}

                {activated && !failed && (
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
              {!failed && (
                <button
                  className="motion-control"
                  type="button"
                  onClick={toggle}
                  aria-label={controlAriaLabel}
                >
                  {playing ? (
                    <Pause aria-hidden="true" />
                  ) : ended ? (
                    <RotateCcw aria-hidden="true" />
                  ) : (
                    <Play aria-hidden="true" />
                  )}
                  {controlLabel}
                </button>
              )}
              <a
                className="text-link"
                href="#foundation"
                onClick={() => {
                  if (resumeAfterResize.current) resumeAfterResize.current.playing = false;
                  video.current?.pause();
                }}
              >
                Continue to architecture <ArrowDown aria-hidden="true" />
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
