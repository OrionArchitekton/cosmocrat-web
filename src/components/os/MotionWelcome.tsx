'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowDown, Pause, Play, RotateCcw } from 'lucide-react';

export default function MotionWelcome() {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const failedSources = useRef(new Set<HTMLSourceElement>());
  const resumeAfterResize = useRef<{
    time: number;
    playing: boolean;
    ended: boolean;
  } | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const player = video.current;
    const host = section.current;
    if (!player || !host) return;
    setEnhanced(true);
    if (player.networkState === player.NETWORK_NO_SOURCE) setFailed(true);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
      if (motion.matches) hold();
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
      const pending = resumeAfterResize.current;
      if (!pending || player.readyState < player.HAVE_METADATA) return;
      resumeAfterResize.current = null;
      player.currentTime = Number.isFinite(player.duration)
        ? Math.min(pending.time, player.duration)
        : pending.time;
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
        else if (!attempted && !motion.matches && !document.hidden) {
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
    motion.addEventListener('change', preference);
    narrow.addEventListener('change', viewport);
    document.addEventListener('visibilitychange', visibility);
    player.addEventListener('loadedmetadata', restore);
    player.addEventListener('play', started);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', preference);
      narrow.removeEventListener('change', viewport);
      document.removeEventListener('visibilitychange', visibility);
      player.removeEventListener('loadedmetadata', restore);
      player.removeEventListener('play', started);
      resumeAfterResize.current = null;
      stop();
    };
  }, []);

  const toggle = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) {
      if (resumeAfterResize.current) {
        if (resumeAfterResize.current.ended) resumeAfterResize.current.time = 0;
        resumeAfterResize.current.ended = false;
        resumeAfterResize.current.playing = true;
      }
      if (player.ended || ended) player.currentTime = 0;
      setEnded(false);
      void player.play().catch(() => setPlaying(!player.paused && !player.ended));
    } else {
      if (resumeAfterResize.current) resumeAfterResize.current.playing = false;
      player.pause();
    }
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

  return (
    <section
      className="motion-welcome"
      ref={section}
      data-motion-welcome
      aria-label="Cosmocrat OS introduction"
    >
      <div className="wrap">
        <div className="motion-stage">
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
      </div>
    </section>
  );
}
