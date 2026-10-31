'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play, RotateCcw } from 'lucide-react';

export default function MotionWelcome() {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
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
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 760px)');
    setPortrait(narrow.matches);
    let attempted = false;
    const stop = () => player.pause();
    const preference = () => {
      if (motion.matches) stop();
    };
    const viewport = () => {
      stop();
      setPortrait(narrow.matches);
      setEnded(false);
      player.load();
    };
    const visibility = () => {
      if (document.hidden) stop();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) stop();
        else if (!attempted && !motion.matches && !document.hidden) {
          attempted = true;
          void player.play().catch(() => setPlaying(false));
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(host);
    motion.addEventListener('change', preference);
    narrow.addEventListener('change', viewport);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', preference);
      narrow.removeEventListener('change', viewport);
      document.removeEventListener('visibilitychange', visibility);
      stop();
    };
  }, []);

  const toggle = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) {
      if (player.ended) player.currentTime = 0;
      setEnded(false);
      void player.play().catch(() => setPlaying(false));
    } else player.pause();
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
            onError={() => {
              setFailed(true);
              setPlaying(false);
            }}
          >
            <source
              src="/media/cosmocrat/cosmocrat-welcome-mobile.mp4"
              type="video/mp4"
              media="(max-width: 760px)"
            />
            <source src="/media/cosmocrat/cosmocrat-welcome-desktop.mp4" type="video/mp4" />
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
            <a className="text-link" href="#static-site" onClick={() => video.current?.pause()}>
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
