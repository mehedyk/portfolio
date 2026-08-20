import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in the portfolio of S. M. Mehedy Kawser, a Software Engineering student at Daffodil International University, Dhaka, Bangladesh. He specializes in full-stack development, cybersecurity, and privacy-first architecture. His tech stack includes React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, and Supabase. He builds projects like Fard Vault (zero-knowledge password manager), Sirr (E2E encrypted messenger), JomiMap (bilingual land measurement tool), and more. His GitHub is github.com/mehedyk. Be friendly, concise, and helpful. If asked about things you don't know about Mehedy, say you'd recommend reaching out to him directly.`;

export const GhostChatbot = () => {
  const { ghostDocked, setGhostDocked } = useThemeStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [vanishing, setVanishing] = useState(false);

  // Ghost wandering state
  const ghostRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 100, y: 200 });
  const targetRef = useRef({ x: 300, y: 400 });
  const animRef = useRef<number>(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const pickNewTarget = useCallback(() => {
    const pad = 80;
    targetRef.current = {
      x: pad + Math.random() * (window.innerWidth - pad * 2),
      y: pad + Math.random() * (window.innerHeight - pad * 2),
    };
  }, []);

  useEffect(() => {
    if (ghostDocked) return;
    pickNewTarget();
    const speed = isMobile ? 0.003 : 0.006;

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      pos.x += dx * speed;
      pos.y += dy * speed;

      if (dist < 30) pickNewTarget();

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [ghostDocked, pickNewTarget, isMobile]);

  // Change target periodically for more organic movement
  useEffect(() => {
    if (ghostDocked) return;
    const interval = setInterval(pickNewTarget, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [ghostDocked, pickNewTarget]);

  const handleGhostClick = () => {
    setChatOpen(true);
  };

  const triggerVanish = useCallback(() => {
    setVanishing(true);
    setTimeout(() => {
      setGhostDocked(true);
      setVanishing(false);
    }, 800);
  }, [setGhostDocked]);

  // Expose vanish trigger on window for CursorEffects to call
  useEffect(() => {
    (window as any).__ghostVanish = triggerVanish;
    (window as any).__ghostRef = ghostRef;
    (window as any).__ghostPos = posRef;
    return () => {
      delete (window as any).__ghostVanish;
      delete (window as any).__ghostRef;
      delete (window as any).__ghostPos;
    };
  }, [triggerVanish]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (!GROQ_KEY) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I'm currently running without an API key. You can reach S. M. Mehedy Kawser at kawser2305341202@diu.edu.bd or connect on LinkedIn at linkedin.com/in/mehedyk.",
          },
        ]);
        setLoading(false);
      }, 500);
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

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const ghostSize = isMobile ? 50 : 70;

  return (
    <>
      {/* Wandering Ghost */}
      {!ghostDocked && (
        <div
          ref={ghostRef}
          onClick={handleGhostClick}
          className="fixed top-0 left-0 z-40 cursor-pointer"
          style={{
            width: ghostSize,
            height: ghostSize,
            pointerEvents: 'auto',
            animation: vanishing ? 'ghost-vanish 0.8s ease-out forwards' : 'ghost-float 4s ease-in-out infinite',
          }}
          title="Click me to chat!"
        >
          <svg
            viewBox="0 0 100 120"
            width={ghostSize}
            height={ghostSize}
            style={{ filter: 'drop-shadow(0 0 15px rgba(180, 200, 255, 0.6))' }}
          >
            <defs>
              <radialGradient id="ghostGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="rgba(200, 220, 255, 0.7)" />
                <stop offset="70%" stopColor="rgba(150, 180, 240, 0.3)" />
                <stop offset="100%" stopColor="rgba(120, 150, 220, 0.05)" />
              </radialGradient>
            </defs>
            <path
              d="M50 10 C25 10 10 30 10 55 C10 80 10 110 10 110 L25 95 L35 110 L50 95 L65 110 L75 95 L90 110 C90 110 90 80 90 55 C90 30 75 10 50 10Z"
              fill="url(#ghostGlow)"
              stroke="rgba(180, 200, 255, 0.4)"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* Docked calm button */}
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
              bottom: '6.5rem',
              left: '1.25rem',
              width: 48,
              height: 48,
              background: 'radial-gradient(circle, rgba(200,220,255,0.4) 0%, rgba(150,180,240,0.15) 70%)',
              border: '1px solid rgba(180, 200, 255, 0.3)',
              animation: 'serene-pulse 3s ease-in-out infinite',
            }}
            title="Chat with AI"
          >
            <MessageCircle className="w-5 h-5" style={{ color: 'rgba(200, 220, 255, 0.8)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
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
                    background: 'rgba(180, 200, 255, 0.6)',
                    boxShadow: '0 0 8px rgba(180, 200, 255, 0.4)',
                  }}
                />
                <span
                  className="font-mono text-sm"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  AI Assistant
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p
                  className="text-center text-sm font-mono py-8"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Ask me anything about Mehedy's work, projects, or skills.
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-lg text-sm font-mono"
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'hsl(var(--primary) / 0.15)'
                          : 'hsl(var(--muted))' ,
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
                    className="px-3 py-2 rounded-lg text-sm font-mono"
                    style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}
                  >
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="p-3 border-t flex gap-2"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none"
                style={{
                  background: 'hsl(var(--input))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="p-2 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop when chat is open */}
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
