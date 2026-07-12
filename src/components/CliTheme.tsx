import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, CliStyleType } from '@/stores/themeStore';

// ─── Authentic Kali Linux terminal palettes ───────────────────────────────────
// Colors pulled from Kali's real GNOME-Terminal profiles (Default / Kali Purple / NetHunter)
const CLI_STYLES: Record<
  CliStyleType,
  { bg: string; bgHeader: string; text: string; user: string; path: string; bracket: string; accent: string; dim: string; border: string; name: string }
> = {
  classic: {
    // Kali "Default" — the terminal 99% of people recognize
    bg: '#0d1117',
    bgHeader: '#1a1f27',
    text: '#c8ccd4',
    user: '#3fdc6e',      // kali green (user@host)
    path: '#4d9de0',      // kali blue (path)
    bracket: '#8a919e',   // grey brackets/dashes
    accent: '#4d9de0',
    dim: '#5b6472',
    border: '#232935',
    name: 'Kali Default',
  },
  amber: {
    // Kali Purple edition
    bg: '#0f0a17',
    bgHeader: '#1c1425',
    text: '#d6cfe0',
    user: '#c25aff',
    path: '#9141ac',
    bracket: '#8a7a9e',
    accent: '#c25aff',
    dim: '#665a75',
    border: '#241a30',
    name: 'Kali Purple',
  },
  hacker: {
    // NetHunter-style green-on-black
    bg: '#080b08',
    bgHeader: '#101710',
    text: '#c6d6c6',
    user: '#39ff6a',
    path: '#20c95c',
    bracket: '#5c7a5c',
    accent: '#39ff6a',
    dim: '#3f5a3f',
    border: '#152015',
    name: 'NetHunter',
  },
};

// ─── Section data ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero', name: 'hero', type: 'dir', size: '4096', desc: 'Home & Introduction' },
  { id: 'about', name: 'about', type: 'dir', size: '4096', desc: 'About Me' },
  { id: 'timeline', name: 'timeline', type: 'dir', size: '4096', desc: 'Career Journey' },
  { id: 'skills', name: 'skills', type: 'dir', size: '4096', desc: 'Technical Skills' },
  { id: 'projects', name: 'projects', type: 'dir', size: '4096', desc: 'Portfolio Projects' },
  { id: 'services', name: 'services', type: 'dir', size: '4096', desc: 'Services Offered' },
  { id: 'blog', name: 'blog', type: 'dir', size: '4096', desc: 'Blog & Insights' },
  { id: 'testimonials', name: 'testimonials', type: 'dir', size: '4096', desc: 'Client Testimonials' },
  { id: 'contact', name: 'contact', type: 'dir', size: '4096', desc: 'Get In Touch' },
];

const NEOFETCH = [
  '       .::!!!!!!!:.        mehedyk@kali',
  "     .:!!!!!!!!!!!!!!:.    ---------------",
  '   :!!!!!!!!!!!!!!!!!!!:   OS: Kali GNU/Linux Portfolio',
  "  :!!!!!!!!!!!!!!!!!!!!!:  Host: netlify/mehedy.netlify.app",
  ' !!!!!!!!!!!!!!!!!!!!!!!!  Shell: reactsh v18",',
  '!!!!!!!!!!!!!!!!!!!!!!!!!! Role: Software Engineering Student',
  '!!!!!!!!!!!!!!!!!!!!!!!!!! Stack: React · TS · Vite · Tailwind',
  '!!!!!!!!!!!!!!!!!!!!!!!!!! Focus: Security · Full Stack Dev',
  ' !!!!!!!!!!!!!!!!!!!!!!!!  Uptime: since 2023',
  "  :!!!!!!!!!!!!!!!!!!!!!:  ",
  "   :!!!!!!!!!!!!!!!!!!!:   ",
  "     '!!!!!!!!!!!!!!!'     ",
  "        ''!!!!!''          ",
];

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  ls           List all sections',
    '  ls -la       List sections with details',
    '  cat <sec>    Show section summary',
    '  cd <sec>     Navigate to section',
    '  open <sec>   Open section (scroll to it)',
    '  whoami       Show portfolio owner info',
    '  neofetch     Show system info',
    '  pwd          Print working directory',
    '  clear        Clear terminal',
    '  style        Change terminal style',
    '  help         Show this help',
    '',
    'Press Ctrl+K to open command palette.',
  ],
  whoami: [
    'S.M. Mehedy Kawser',
    'Software Engineering Student @ Daffodil International University',
    'Full Stack Developer | React · Supabase · Node.js',
    'GitHub: github.com/mehedyk',
    'Email: kawser2305341202@diu.edu.bd',
  ],
  pwd: ['/home/mehedyk/portfolio'],
  sudo: ["mehedyk is not in the sudoers file. This incident will be reported. (jk, try 'help')"],
  neofetch: NEOFETCH,
  clear: ['__CLEAR__'],
};

function buildLsOutput(detailed: boolean) {
  if (!detailed) {
    return [SECTIONS.map(s => s.name).join('  ')];
  }
  return [
    `total ${SECTIONS.length * 4}`,
    ...SECTIONS.map(s =>
      `drwxr-xr-x  1 mehedyk  kali  ${s.size}  Mar 10 2026  ${s.name}/`
    ),
  ];
}

function buildCatOutput(section: string) {
  const sec = SECTIONS.find(s => s.name === section);
  if (!sec) return [`cat: ${section}: No such file or directory`];
  return [
    `# ${sec.name.toUpperCase()}`,
    `Type: directory`,
    `Description: ${sec.desc}`,
    `Usage: open ${sec.name}   # scroll to section`,
  ];
}

// ─── Terminal Line ────────────────────────────────────────────────────────────
const TermLine = ({ text, color }: { text: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -4 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.1 }}
    style={{ color, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.8rem', lineHeight: '1.55', whiteSpace: 'pre-wrap' }}
  >
    {text}
  </motion.div>
);

// ─── Prompt line, Kali-style: ┌──(user㉿host)-[path] / └─$ ─────────────────────
const PromptHeader = ({ s, path = '~' }: { s: typeof CLI_STYLES[CliStyleType]; path?: string }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', lineHeight: '1.55' }}>
    <span style={{ color: s.bracket }}>┌──(</span>
    <span style={{ color: s.user, fontWeight: 700 }}>mehedyk</span>
    <span style={{ color: s.bracket }}>㉿</span>
    <span style={{ color: s.user, fontWeight: 700 }}>kali</span>
    <span style={{ color: s.bracket }}>)-[</span>
    <span style={{ color: s.path, fontWeight: 700 }}>{path}</span>
    <span style={{ color: s.bracket }}>]</span>
  </div>
);

interface CliLine {
  type: 'prompt' | 'output' | 'error';
  text: string;
  cmd?: string;
}

export const CliTheme = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const { cliStyle, setCliStyle } = useThemeStore();
  const s = CLI_STYLES[cliStyle];

  const [lines, setLines] = useState<CliLine[]>([
    { type: 'output', text: '╔══════════════════════════════════════════╗' },
    { type: 'output', text: '║   mehedyk@kali — portfolio terminal      ║' },
    { type: 'output', text: '╚══════════════════════════════════════════╝' },
    { type: 'output', text: '' },
    { type: 'output', text: "Type 'help' to see available commands." },
    { type: 'output', text: "Type 'ls' to list sections." },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [styleOpen, setStyleOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Custom mouse cursor that matches the terminal's own block caret ────────
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    const promptLine: CliLine = { type: 'prompt', text: cmd, cmd };
    let outputLines: CliLine[] = [];

    const parts = cmd.split(/\s+/);
    const base = parts[0];
    const arg = parts[1];

    if (base === 'clear') {
      setLines([]);
      return;
    }

    if (base === 'ls') {
      const detailed = arg === '-la' || arg === '-l';
      const out = buildLsOutput(detailed);
      outputLines = out.map(t => ({ type: 'output' as const, text: t }));
    } else if (base === 'cat' && arg) {
      const out = buildCatOutput(arg);
      outputLines = out.map(t => ({ type: 'output' as const, text: t }));
    } else if ((base === 'cd' || base === 'open') && arg) {
      const sec = SECTIONS.find(se => se.name === arg);
      if (sec) {
        outputLines = [{ type: 'output', text: `Navigating to ${arg}...` }];
        setTimeout(() => onNavigate(sec.id), 300);
      } else {
        outputLines = [{ type: 'error', text: `bash: cd: ${arg}: No such directory` }];
      }
    } else if (base === 'style') {
      setStyleOpen(true);
      outputLines = [{ type: 'output', text: 'Opening style picker...' }];
    } else if (COMMANDS[base]) {
      outputLines = COMMANDS[base].map(t => ({ type: 'output' as const, text: t }));
    } else {
      outputLines = [{ type: 'error', text: `bash: ${base}: command not found. Try 'help'.` }];
    }

    setLines(prev => [...prev, promptLine, ...outputLines, { type: 'output', text: '' }]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.split(' ').pop() || '';
      const match = SECTIONS.find(sec => sec.name.startsWith(partial));
      if (match) {
        const parts = input.split(' ');
        parts[parts.length - 1] = match.name;
        setInput(parts.join(' '));
      }
    }
  };

  const styles: CliStyleType[] = ['classic', 'amber', 'hacker'];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex flex-col"
      style={{ background: s.bg, cursor: hovering ? 'none' : 'text' }}
      onClick={() => inputRef.current?.focus()}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Custom mouse cursor — identical block + blink to the real terminal caret */}
      {hovering && (
        <div
          ref={cursorRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '9px',
            height: '17px',
            background: s.accent,
            opacity: 0.85,
            pointerEvents: 'none',
            zIndex: 9999,
            mixBlendMode: 'difference',
            animation: 'kali-cursor-blink 1s steps(1) infinite',
          }}
        />
      )}
      <style>{`
        @keyframes kali-cursor-blink {
          0%, 49% { opacity: 0.85; }
          50%, 100% { opacity: 0.15; }
        }
      `}</style>

      {/* GNOME-Terminal-style window chrome (Kali's actual DE, not macOS traffic lights) */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-3 py-2"
        style={{ background: s.bgHeader, borderBottom: `1px solid ${s.border}` }}
      >
        <span style={{ color: s.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.02em' }}>
          mehedyk@kali: ~
        </span>
        <div className="flex items-center gap-3">
          {/* Style picker */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setStyleOpen(o => !o); }}
              style={{ color: s.dim, fontFamily: 'monospace', fontSize: '0.65rem', background: 'transparent', border: `1px solid ${s.border}`, padding: '2px 8px', borderRadius: '2px' }}
            >
              [{CLI_STYLES[cliStyle].name}]
            </button>
            <AnimatePresence>
              {styleOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ position: 'absolute', right: 0, top: '2rem', background: s.bgHeader, border: `1px solid ${s.border}`, borderRadius: '4px', overflow: 'hidden', zIndex: 50 }}
                  onClick={e => e.stopPropagation()}
                >
                  {styles.map(st => (
                    <button
                      key={st}
                      onClick={() => { setCliStyle(st); setStyleOpen(false); }}
                      style={{
                        display: 'block', width: '100%', padding: '6px 16px',
                        textAlign: 'left', fontFamily: 'monospace', fontSize: '0.7rem',
                        color: cliStyle === st ? CLI_STYLES[st].bg : CLI_STYLES[st].text,
                        background: cliStyle === st ? CLI_STYLES[st].accent : 'transparent',
                      }}
                    >
                      {CLI_STYLES[st].name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* GNOME-style window controls (square, right-aligned — not macOS dots) */}
          <div className="flex items-center gap-1">
            <span style={{ width: '13px', height: '13px', border: `1px solid ${s.border}`, borderRadius: '2px', display: 'inline-block' }} />
            <span style={{ width: '13px', height: '13px', border: `1px solid ${s.border}`, borderRadius: '2px', display: 'inline-block' }} />
            <span style={{ width: '13px', height: '13px', border: `1px solid ${s.border}`, borderRadius: '2px', display: 'inline-block', background: '#e05561' }} />
          </div>
        </div>
      </div>

      {/* Output area */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ minHeight: '0' }}>
        <AnimatePresence>
          {lines.map((line, i) =>
            line.type === 'prompt' ? (
              <div key={i} style={{ marginTop: '2px' }}>
                <PromptHeader s={s} />
                <div style={{ display: 'flex', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
                  <span style={{ color: s.bracket, marginRight: '6px' }}>└─$</span>
                  <span style={{ color: s.text }}>{line.text}</span>
                </div>
              </div>
            ) : (
              <TermLine key={i} text={line.text} color={line.type === 'error' ? '#e05561' : s.text} />
            )
          )}
        </AnimatePresence>

        {/* Input line — mirrors the exact prompt style */}
        <div style={{ marginTop: '2px' }}>
          <PromptHeader s={s} />
          <div className="flex items-center" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
            <span style={{ color: s.bracket, marginRight: '6px', flexShrink: 0 }}>└─$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              className="flex-1 outline-none border-none bg-transparent"
              style={{ color: s.text, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', caretColor: s.accent }}
              spellCheck={false}
              autoComplete="off"
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ color: s.accent, marginLeft: '1px' }}
            >
              ▋
            </motion.span>
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Section shortcuts */}
      <div
        className="flex flex-wrap gap-2 px-4 py-3"
        style={{ borderTop: `1px solid ${s.border}`, background: s.bgHeader }}
        onClick={e => e.stopPropagation()}
      >
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => onNavigate(sec.id)}
            style={{
              color: s.dim, fontFamily: 'monospace', fontSize: '0.65rem',
              background: 'transparent', border: `1px solid ${s.border}`,
              padding: '2px 8px', borderRadius: '2px', cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = s.accent; (e.target as HTMLElement).style.borderColor = s.accent; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = s.dim; (e.target as HTMLElement).style.borderColor = s.border; }}
          >
            cd {sec.name}
          </button>
        ))}
      </div>
    </div>
  );
};
