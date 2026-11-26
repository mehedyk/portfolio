import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

/**
 * "Lumora" — a cinematic hero concept (design study).
 * Lives after the footer credits. Self-contained: its own palette, its own font, no site-theme dependence.
 */

const VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
] as const;
const LABELS = ['Golden Hour', 'Still Water', 'Deep Woods', 'Quiet Dawn'] as const;
const OVERLAY = 'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';
const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community'] as const;
const STATS = ['60+ Deep Sessions', '12,000+ Creators', '4.8 User Satisfaction', 'Intentional-First Design'] as const;

const DARK = '#182C41';
const DARK_VIDEO = 2; // "Deep Woods"
const FADE_MS = 1000;
const EASE = 'cubic-bezier(0.4,0,0.2,1)';
const SANS = 'system-ui, sans-serif';
const SERIF = "'Instrument Serif', serif"; // set explicitly: the site's global h1–h6 rule would otherwise win

export const LumoraShowcase = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timers = useRef<number[]>([]);

  // Load the media only when the section is near the viewport, so ordinary visits never touch the video host.
  const [ref, near] = useInView({ triggerOnce: true, rootMargin: '400px' });

  const dark = activeVideo === DARK_VIDEO;
  const heroColor = dark ? DARK : '#ffffff';

  const selectVideo = (i: number) => {
    if (i === activeVideo || isTransitioning) return;
    setActiveVideo(i);
    setIsTransitioning(true);
    timers.current.push(window.setTimeout(() => setIsTransitioning(false), FADE_MS));
  };

  // Only the visible video plays; the others pause once the crossfade has finished (saves CPU/battery/data).
  useEffect(() => {
    if (!near) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeVideo && !reduced) void v.play().catch(() => {});
      else timers.current.push(window.setTimeout(() => v.pause(), FADE_MS));
    });
  }, [activeVideo, near]);

  // Mobile menu: Escape closes it, and the page doesn't scroll behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [menuOpen]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Concept only: nothing is sent or stored.
    setEmail('');
    setNote('This is a design concept — nothing was sent or stored.');
  };

  return (
    <section
      id="lumora"
      ref={ref}
      aria-label="Lumora — hero design concept"
      className="relative w-full min-h-[100svh] overflow-hidden bg-black"
      style={{ fontFamily: SERIF }}
    >
      {/* Background videos */}
      {near && VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          muted loop playsInline
          autoPlay={i === 0}
          preload={i === 0 ? 'auto' : 'metadata'}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ease-in-out ${i === activeVideo ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Transparent PNG overlay, gently bobbing */}
      {near && (
        <img
          src={OVERLAY} alt="" aria-hidden="true"
          className="train-bob pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 1 }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}

      {/* Content */}
      <div className="relative flex min-h-[100svh] flex-col pt-32 md:pt-24" style={{ zIndex: 2 }}>
        {/* Nav — always white */}
        <nav className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
          <span className="text-xl italic text-white sm:text-2xl">Lumora</span>

          <div className="liquid-glass hidden items-center gap-6 rounded-full py-2 pl-6 pr-2 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#lumora" className="text-sm text-white/90 transition-colors hover:text-white" style={{ fontFamily: SANS }}>{l}</a>
            ))}
            <button type="button" className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black" style={{ fontFamily: SANS }}>Get Started</button>
          </div>

          <button
            type="button"
            className="liquid-glass relative flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Menu className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} aria-hidden="true" />
            <X className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`} aria-hidden="true" />
          </button>
        </nav>

        {/* Hero */}
        <div className="flex flex-col items-center px-5 pt-10 text-center sm:px-8 sm:pt-14 md:pt-16">
          <div
            className="liquid-glass mb-6 rounded-full px-4 py-1.5 text-xs transition-colors duration-700 sm:text-sm"
            style={{ color: heroColor, fontFamily: SANS }}
          >
            Over 10,000 minds already finding their clarity
          </div>

          <h2
            className="max-w-4xl text-4xl leading-[1.1] transition-colors duration-700 sm:text-5xl md:text-7xl lg:text-[5.5rem]"
            style={{ color: heroColor, fontFamily: SERIF }}
          >
            Clarity in an Endlessly<br />Noisy Universe
          </h2>

          <p
            className="mt-6 max-w-xl text-sm leading-relaxed transition-colors duration-700 sm:text-base md:text-lg"
            style={{ color: heroColor, opacity: 0.85, fontFamily: SANS }}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover how to protect your presence and create with intention.
          </p>

          <form onSubmit={onSubmit} className="liquid-glass mt-8 flex w-full max-w-[320px] items-center gap-2 rounded-full p-1.5 sm:max-w-sm">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Best Email" aria-label="Your best email"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none transition-colors duration-700 placeholder:text-current placeholder:opacity-60"
              style={{ color: heroColor, fontFamily: SANS }}
            />
            <button type="submit" className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-black" style={{ fontFamily: SANS }}>
              Get Early Access
            </button>
          </form>
          {note && <p role="status" className="mt-3 text-xs transition-colors duration-700" style={{ color: heroColor, opacity: 0.8, fontFamily: SANS }}>{note}</p>}

          {/* Video switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8" role="group" aria-label="Choose a scene">
            {LABELS.map((label, i) => {
              const active = i === activeVideo;
              return (
                <button
                  key={label} type="button" onClick={() => selectVideo(i)} aria-pressed={active}
                  className={`border-b pb-1 text-xs transition-all duration-700 sm:text-sm ${active ? 'opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  style={{ color: heroColor, borderBottomColor: active ? heroColor : 'transparent', fontFamily: SANS }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacer pushes the stats to the bottom */}
        <div className="flex-1" />

        {/* Stats — always white */}
        <div className="px-4 pb-20 sm:pb-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/70 sm:text-sm" style={{ fontFamily: SANS }}>
            {STATS.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                {s}
                {i < STATS.length - 1 && <span aria-hidden="true" className="hidden sm:inline">|</span>}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[11px] text-white/45" style={{ fontFamily: SANS }}>
            UI concept — Lumora is a fictional product; the figures above are placeholder copy.
          </p>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        role="dialog" aria-modal="true" aria-label="Lumora menu" aria-hidden={!menuOpen}
      >
        <button
          type="button" tabIndex={menuOpen ? 0 : -1} aria-label="Close menu" onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionTimingFunction: EASE }}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l} href="#lumora" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}
              className={`text-3xl text-white transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 50}ms` : '0ms', transitionTimingFunction: EASE }}
            >
              {l}
            </a>
          ))}
          <button
            type="button" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}
            className={`mt-4 rounded-full bg-white px-6 py-3 text-base font-medium text-black transition-all duration-500 ${menuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            style={{ transitionDelay: menuOpen ? '350ms' : '0ms', transitionTimingFunction: EASE, fontFamily: SANS }}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};
