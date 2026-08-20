import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Trash2 } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in the portfolio of S. M. Mehedy Kawser, a Software Engineering student at Daffodil International University, Dhaka, Bangladesh. He specializes in full-stack development, cybersecurity, and privacy-first architecture. His tech stack includes React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, and Supabase. He builds projects like Fard Vault (zero-knowledge password manager), Sirr (E2E encrypted messenger), JomiMap (bilingual land measurement tool), and more. His GitHub is github.com/mehedyk. Be friendly, concise, and helpful. If asked about things you don't know about Mehedy, say you'd recommend reaching out to him directly.`;

// Offline fallback knowledge base
const FALLBACK_KB: Record<string, string> = {
  about:
    "S. M. Mehedy Kawser is a Software Engineering student at Daffodil International University in Dhaka, Bangladesh. He specializes in full-stack development, cybersecurity, and privacy-first architecture. He's passionate about building secure, high-performance applications with modern web technologies.",
  projects:
    "Mehedy's featured projects include:\n• Fard Vault — A zero-knowledge password manager with AES-256-GCM encryption and Argon2id key derivation.\n• Sirr — An end-to-end encrypted messenger using X25519 key exchange.\n• JomiMap — A bilingual land measurement tool for Bangladesh.\n• Numerical Analysis Workbench — Interactive root-finding visualizer.\n• Portfolio Builder — Generate professional portfolios quickly.\n• Algo Visualizer — 3D algorithm visualization for sorting, graphs, trees, and pathfinding.\n• QiyamBreak — A Muslim-focused wellness break reminder for Windows/Linux.\nHe has 22 projects in total spanning web apps, desktop apps, and more.",
  security:
    "Mehedy focuses heavily on cybersecurity and privacy-first architecture. His work includes zero-knowledge encryption (Fard Vault uses AES-256-GCM with Argon2id), end-to-end encrypted messaging (Sirr uses X25519 + AES-256-GCM), and he studies offensive security concepts including Kali Linux tools, network scanning, and penetration testing methodologies.",
  tech: "Mehedy's tech stack includes React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, Vite, Framer Motion, GSAP, Zustand, Three.js, WebGL, Supabase, and various cryptographic libraries. He's proficient in both frontend and backend development.",
  contact:
    "You can reach S. M. Mehedy Kawser at:\n• Email: kawser2305341202@diu.edu.bd\n• LinkedIn: linkedin.com/in/mehedyk\n• GitHub: github.com/mehedyk\n• Facebook: facebook.com/mahdi.kawser\n• Portfolio: mehedy.netlify.app",
  default:
    "I'm the AI assistant for S. M. Mehedy Kawser's portfolio. I can tell you about his projects, technical skills, cybersecurity expertise, or how to get in touch with him. What would you like to know?",
};

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('project') || q.includes('build') || q.includes('made') || q.includes('work'))
    return FALLBACK_KB.projects;
  if (q.includes('security') || q.includes('encrypt') || q.includes('hack') || q.includes('cyber') || q.includes('privacy'))
    return FALLBACK_KB.security;
  if (q.includes('tech') || q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('framework'))
    return FALLBACK_KB.tech;
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('connect'))
    return FALLBACK_KB.contact;
  if (q.includes('who') || q.includes('about') || q.includes('mehedy') || q.includes('kawser') || q.includes('tell'))
    return FALLBACK_KB.about;
  return FALLBACK_KB.default;
}

const SUGGESTION_PILLS = [
  'About Mehedy',
  'Featured Projects',
  'Security & Architecture',
  'Get in Touch',
];

// ─── Ghost SVG Component ─────────────────────────────────────────────────────
const GhostSVG = ({ size }: { size: number }) => (
  <svg viewBox="0 0 120 150" width={size} height={size * 1.25} style={{ overflow: 'visible' }}>
    <defs>
      {/* Main body gradient — deep translucent ethereal */}
      <radialGradient id="ghostBody" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stopColor="rgba(220, 235, 255, 0.55)" />
        <stop offset="45%" stopColor="rgba(170, 200, 250, 0.30)" />
        <stop offset="80%" stopColor="rgba(130, 170, 240, 0.12)" />
        <stop offset="100%" stopColor="rgba(100, 150, 220, 0.02)" />
      </radialGradient>

      {/* Inner core glow */}
      <radialGradient id="ghostCore" cx="50%" cy="40%" r="30%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
        <stop offset="100%" stopColor="rgba(200, 220, 255, 0.0)" />
      </radialGradient>

      {/* Outer aura glow */}
      <radialGradient id="ghostAura" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="rgba(180, 210, 255, 0.0)" />
        <stop offset="60%" stopColor="rgba(150, 190, 250, 0.08)" />
        <stop offset="100%" stopColor="rgba(120, 170, 240, 0.15)" />
      </radialGradient>

      {/* Blur filter for ethereal softness */}
      <filter id="ghostBlur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
      <filter id="auraBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
      </filter>
    </defs>

    {/* Outermost aura ring */}
    <ellipse
      cx="60" cy="65" rx="55" ry="60"
      fill="url(#ghostAura)"
      filter="url(#auraBlur)"
      opacity="0.6"
    >
      <animate attributeName="rx" values="52;58;52" dur="4s" repeatCount="indefinite" />
      <animate attributeName="ry" values="57;63;57" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* Ghost body — flowing spectral shape, no eyes */}
    <path
      d="M60 12 C30 12 12 38 12 65 C12 92 12 130 12 130 L28 112 L40 130 L52 115 L60 130 L68 115 L80 130 L92 112 L108 130 C108 130 108 92 108 65 C108 38 90 12 60 12Z"
      fill="url(#ghostBody)"
      stroke="rgba(200, 220, 255, 0.25)"
      strokeWidth="0.8"
      filter="url(#ghostBlur)"
    >
      {/* Subtle undulating body animation */}
      <animate
        attributeName="d"
        values="
          M60 12 C30 12 12 38 12 65 C12 92 12 130 12 130 L28 112 L40 130 L52 115 L60 130 L68 115 L80 130 L92 112 L108 130 C108 130 108 92 108 65 C108 38 90 12 60 12Z;
          M60 14 C32 14 14 40 14 66 C14 90 14 128 14 128 L30 114 L42 128 L54 116 L60 128 L66 116 L78 128 L90 114 L106 128 C106 128 106 90 106 66 C106 40 88 14 60 14Z;
          M60 12 C30 12 12 38 12 65 C12 92 12 130 12 130 L28 112 L40 130 L52 115 L60 130 L68 115 L80 130 L92 112 L108 130 C108 130 108 92 108 65 C108 38 90 12 60 12Z
        "
        dur="5s"
        repeatCount="indefinite"
      />
    </path>

    {/* Inner core glow */}
    <ellipse
      cx="60" cy="48" rx="22" ry="18"
      fill="url(#ghostCore)"
      opacity="0.7"
    >
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
      <animate attributeName="ry" values="17;20;17" dur="3.5s" repeatCount="indefinite" />
    </ellipse>

    {/* Floating wisp particles */}
    {[
      { cx: 35, cy: 30, r: 2, dur: '3.2s', delay: '0s' },
      { cx: 85, cy: 35, r: 1.5, dur: '2.8s', delay: '0.5s' },
      { cx: 50, cy: 22, r: 1.8, dur: '3.5s', delay: '1s' },
      { cx: 75, cy: 28, r: 1.2, dur: '3s', delay: '1.5s' },
    ].map((p, i) => (
      <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="rgba(220, 240, 255, 0.5)">
        <animate
          attributeName="cy"
          values={`${p.cy};${p.cy - 12};${p.cy}`}
          dur={p.dur}
          begin={p.delay}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur={p.dur}
          begin={p.delay}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export const GhostChatbot = () => {
  const { ghostDocked, setGhostDocked } = useThemeStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [vanishing, setVanishing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ghost wandering physics
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 150, y: 300 });
  const velRef = useRef({ x: 0.4, y: 0.3 });
  const targetRef = useRef({ x: 400, y: 400 });
  const animRef = useRef<number>(0);
  const tiltRef = useRef(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const ghostSize = isMobile ? 55 : 75;

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Pick a new random target position (avoiding edges and top navbar area)
  const pickNewTarget = useCallback(() => {
    const padX = 100;
    const padTop = 120; // avoid navbar
    const padBottom = 120;
    targetRef.current = {
      x: padX + Math.random() * (window.innerWidth - padX * 2),
      y: padTop + Math.random() * (window.innerHeight - padTop - padBottom),
    };
  }, []);

  // Autonomous wandering animation loop
  useEffect(() => {
    if (ghostDocked || vanishing) return;

    // Initialize position near center of the viewport
    posRef.current = {
      x: window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4,
      y: window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.3,
    };
    pickNewTarget();

    const maxSpeed = isMobile ? 0.6 : 1.0;
    const steerStrength = isMobile ? 0.008 : 0.012;
    const padX = 60;
    const padTop = 90;
    const padBottom = 90;

    const animate = () => {
      const pos = posRef.current;
      const vel = velRef.current;
      const target = targetRef.current;

      // Steer towards target
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        const nx = dx / dist;
        const ny = dy / dist;
        vel.x += nx * steerStrength;
        vel.y += ny * steerStrength;
      }

      // Clamp speed
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
      if (speed > maxSpeed) {
        vel.x = (vel.x / speed) * maxSpeed;
        vel.y = (vel.y / speed) * maxSpeed;
      }
      // Ensure minimum speed so it always moves
      if (speed < 0.15) {
        vel.x = (vel.x / (speed || 1)) * 0.15;
        vel.y = (vel.y / (speed || 1)) * 0.15;
      }

      pos.x += vel.x;
      pos.y += vel.y;

      // Boundary bounce with soft cushion
      if (pos.x < padX) { pos.x = padX; vel.x = Math.abs(vel.x) * 0.5; pickNewTarget(); }
      if (pos.x > window.innerWidth - padX) { pos.x = window.innerWidth - padX; vel.x = -Math.abs(vel.x) * 0.5; pickNewTarget(); }
      if (pos.y < padTop) { pos.y = padTop; vel.y = Math.abs(vel.y) * 0.5; pickNewTarget(); }
      if (pos.y > window.innerHeight - padBottom) { pos.y = window.innerHeight - padBottom; vel.y = -Math.abs(vel.y) * 0.5; pickNewTarget(); }

      // Pick new target when close
      if (dist < 50) pickNewTarget();

      // Smooth tilt in direction of movement (gives sense of flight)
      const targetTilt = Math.atan2(vel.y, vel.x) * (180 / Math.PI) * 0.08;
      tiltRef.current += (targetTilt - tiltRef.current) * 0.05;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.x - ghostSize / 2}px, ${pos.y - ghostSize / 2}px, 0) rotate(${tiltRef.current}deg)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [ghostDocked, vanishing, pickNewTarget, isMobile, ghostSize]);

  // Periodically change target for more organic movement
  useEffect(() => {
    if (ghostDocked || vanishing) return;
    const interval = setInterval(pickNewTarget, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [ghostDocked, vanishing, pickNewTarget]);

  // Ghost click handler
  const handleGhostClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setChatOpen(true);
  }, []);

  // Vanish trigger (called by Ayatul Qursi sword strike)
  const triggerVanish = useCallback(() => {
    setVanishing(true);
    setTimeout(() => {
      setGhostDocked(true);
      setVanishing(false);
    }, 800);
  }, [setGhostDocked]);

  // Expose vanish trigger and position on window for CursorEffects
  useEffect(() => {
    (window as any).__ghostVanish = triggerVanish;
    (window as any).__ghostRef = outerRef;
    (window as any).__ghostPos = posRef;
    return () => {
      delete (window as any).__ghostVanish;
      delete (window as any).__ghostRef;
      delete (window as any).__ghostPos;
    };
  }, [triggerVanish]);

  // Send message — uses Groq API with automatic offline fallback
  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    const userMsg: ChatMessage = { role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // If no API key, use fallback knowledge base
    if (!GROQ_KEY) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: getFallbackResponse(msg) },
        ]);
        setLoading(false);
      }, 400 + Math.random() * 400);
      return;
    }

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-10),
            userMsg,
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || 'Sorry, I could not process that.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback on network/API error
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: getFallbackResponse(msg) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <>
      {/* ── Wandering Ghost ── */}
      {!ghostDocked && (
        <div
          ref={outerRef}
          className="fixed top-0 left-0 z-40"
          style={{
            width: ghostSize,
            height: ghostSize * 1.25,
            pointerEvents: 'none',
            willChange: 'transform',
            animation: vanishing
              ? 'ghost-vanish 0.8s ease-out forwards'
              : undefined,
          }}
        >
          {/* Inner element handles floating wobble animation separately */}
          <div
            onClick={handleGhostClick}
            onTouchEnd={handleGhostClick}
            style={{
              pointerEvents: 'auto',
              cursor: 'pointer',
              animation: 'ghost-float 4s ease-in-out infinite',
              filter: 'drop-shadow(0 0 18px rgba(170, 200, 255, 0.5))',
            }}
            title="Click me to chat!"
          >
            <GhostSVG size={ghostSize} />
          </div>
        </div>
      )}

      {/* ── Docked Calm Button ── */}
      <AnimatePresence>
        {ghostDocked && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={() => setChatOpen(true)}
            className="fixed z-40 rounded-full flex items-center justify-center"
            style={{
              bottom: '5.5rem',
              left: '1.5rem',
              width: 48,
              height: 48,
              background:
                'radial-gradient(circle, rgba(200,220,255,0.35) 0%, rgba(150,180,240,0.12) 70%)',
              border: '1px solid rgba(180, 200, 255, 0.25)',
              animation: 'serene-pulse 3s ease-in-out infinite',
            }}
            title="Chat with AI"
          >
            <MessageCircle
              className="w-5 h-5"
              style={{ color: 'rgba(200, 220, 255, 0.8)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Drawer ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 flex flex-col border-l"
            style={{
              background: 'hsl(var(--background) / 0.97)',
              borderColor: 'hsl(var(--border))',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: GROQ_KEY
                      ? 'rgba(100, 255, 150, 0.7)'
                      : 'rgba(255, 200, 100, 0.7)',
                    boxShadow: GROQ_KEY
                      ? '0 0 8px rgba(100, 255, 150, 0.4)'
                      : '0 0 8px rgba(255, 200, 100, 0.4)',
                  }}
                />
                <span
                  className="font-mono text-sm"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {GROQ_KEY ? 'AI Assistant' : 'Knowledge Base'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded hover:opacity-70 transition-opacity"
                    title="Clear chat"
                  >
                    <Trash2
                      className="w-4 h-4"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    />
                  </button>
                )}
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded hover:opacity-70 transition-opacity"
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="py-6 space-y-4">
                  <p
                    className="text-center text-sm font-mono"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    Ask me anything about Mehedy's work, projects, or skills.
                  </p>
                  {/* Suggestion pills */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTION_PILLS.map((pill) => (
                      <button
                        key={pill}
                        onClick={() => sendMessage(pill)}
                        className="px-3 py-1.5 rounded-full text-xs font-mono transition-all hover:scale-105"
                        style={{
                          background: 'hsl(var(--primary) / 0.1)',
                          color: 'hsl(var(--primary))',
                          border: '1px solid hsl(var(--primary) / 0.25)',
                        }}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-lg text-sm font-mono whitespace-pre-wrap"
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'hsl(var(--primary) / 0.15)'
                          : 'hsl(var(--muted))',
                      color: 'hsl(var(--foreground))',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-3 py-2 rounded-lg text-sm font-mono flex items-center gap-1.5"
                    style={{
                      background: 'hsl(var(--muted))',
                      color: 'hsl(var(--muted-foreground))',
                    }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-3 border-t flex gap-2"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none"
                style={{
                  background: 'hsl(var(--input))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                style={{
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChatOpen(false)}
            className="fixed inset-0 z-[49]"
            style={{ background: 'rgba(0, 0, 0, 0.4)' }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
