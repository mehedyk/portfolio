import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, CliStyleType } from '@/stores/themeStore';

// ─── CLI Style definitions ────────────────────────────────────────────────────
const CLI_STYLES: Record<CliStyleType, { bg: string; text: string; prompt: string; accent: string; dim: string; border: string; name: string }> = {
  classic: {
    bg: '#0d1117',
    text: '#00ff41',
    prompt: '#00ff41',
    accent: '#00cc33',
    dim: '#006622',
    border: '#003311',
    name: 'Linux/Bash',
  },
  amber: {
    bg: '#0e0b00',
    text: '#ffb000',
    prompt: '#ffd700',
    accent: '#ffb000',
    dim: '#5c3d00',
    border: '#3d2800',
    name: 'Amber/CRT',
  },
  hacker: {
    bg: '#050b10',
    text: '#00e5ff',
    prompt: '#00ffff',
    accent: '#0088aa',
    dim: '#003344',
    border: '#002233',
    name: 'Dark Hacker',
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

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  ls           List all sections',
    '  ls -la       List sections with details',
    '  cat <sec>    Show section summary',
    '  cd <sec>     Navigate to section',
    '  open <sec>   Open section (scroll to it)',
    '  whoami       Show portfolio owner info',
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
  clear: ['__CLEAR__'],
};

function buildLsOutput(detailed: boolean, style: typeof CLI_STYLES[CliStyleType]) {
  if (!detailed) {
    return [SECTIONS.map(s => s.name).join('  ')];
  }
  return [
    `total ${SECTIONS.length * 4}`,
    ...SECTIONS.map(s =>
      `drwxr-xr-x  1 mehedyk  staff  ${s.size}  Mar 10 2026  ${s.name}/`
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
const TermLine = ({ text, style, delay = 0 }: { text: string; style: typeof CLI_STYLES[CliStyleType]; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -4 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.12 }}
    style={{ color: style.text, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', lineHeight: '1.5' }}
  >
    {text}
  </motion.div>
);

// ─── Main CLI component ───────────────────────────────────────────────────────
interface CliLine {
  type: 'prompt' | 'output' | 'error';
  text: string;
}

export const CliTheme = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const { cliStyle, setCliStyle } = useThemeStore();
  const s = CLI_STYLES[cliStyle];

  const [lines, setLines] = useState<CliLine[]>([
    { type: 'output', text: '╔══════════════════════════════════════════╗' },
    { type: 'output', text: '║   mehedyk/portfolio v3.6.0 — Terminal    ║' },
    { type: 'output', text: '╚══════════════════════════════════════════╝' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type `help` to see available commands.' },
    { type: 'output', text: 'Type `ls` to list sections.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [styleOpen, setStyleOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    const promptLine: CliLine = { type: 'prompt', text: `mehedyk@portfolio:~$ ${cmd}` };
    let outputLines: CliLine[] = [];

    const parts = cmd.split(/\s+/);
    const base = parts[0];
    const arg = parts[1];

    if (base === 'clear') {
      setLines([promptLine]);
      return;
    }

    if (base === 'ls') {
      const detailed = arg === '-la' || arg === '-l';
      const out = buildLsOutput(detailed, s);
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
      const match = SECTIONS.find(s => s.name.startsWith(partial));
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
      className="min-h-screen w-full flex flex-col"
      style={{ background: s.bg, cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal chrome */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-2"
        style={{ background: s.border, borderBottom: `1px solid ${s.dim}` }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span style={{ color: s.dim, fontFamily: 'monospace', fontSize: '0.7rem' }}>
            mehedyk@portfolio: ~
          </span>
        </div>
        {/* Style picker */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setStyleOpen(o => !o); }}
            style={{ color: s.dim, fontFamily: 'monospace', fontSize: '0.65rem', background: 'transparent', border: `1px solid ${s.dim}`, padding: '2px 8px', borderRadius: '4px' }}
          >
            [{CLI_STYLES[cliStyle].name}]
          </button>
          <AnimatePresence>
            {styleOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ position: 'absolute', right: 0, top: '2rem', background: s.border, border: `1px solid ${s.dim}`, borderRadius: '6px', overflow: 'hidden', zIndex: 50 }}
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
                      background: cliStyle === st ? CLI_STYLES[st].text : 'transparent',
                    }}
                  >
                    {CLI_STYLES[st].name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Output area */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ minHeight: '0' }}>
        <AnimatePresence>
          {lines.map((line, i) => (
            <TermLine
              key={i}
              text={line.text}
              delay={0}
              style={{
                ...s,
                text: line.type === 'prompt' ? s.prompt : line.type === 'error' ? '#ff5555' : s.text,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Input line */}
        <div className="flex items-center" style={{ color: s.prompt, fontFamily: 'monospace', fontSize: '0.78rem' }}>
          <span style={{ color: s.prompt, marginRight: '8px', flexShrink: 0 }}>
            mehedyk@portfolio:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            className="flex-1 outline-none border-none bg-transparent"
            style={{ color: s.text, fontFamily: 'monospace', fontSize: '0.78rem', caretColor: s.prompt }}
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ color: s.prompt }}
          >▋</motion.span>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Section shortcuts */}
      <div
        className="flex flex-wrap gap-2 px-4 py-3"
        style={{ borderTop: `1px solid ${s.dim}`, background: s.border }}
        onClick={e => e.stopPropagation()}
      >
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => onNavigate(sec.id)}
            style={{
              color: s.dim, fontFamily: 'monospace', fontSize: '0.65rem',
              background: 'transparent', border: `1px solid ${s.dim}`,
              padding: '2px 8px', borderRadius: '3px', cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = s.text; (e.target as HTMLElement).style.borderColor = s.text; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = s.dim; (e.target as HTMLElement).style.borderColor = s.dim; }}
          >
            cd {sec.name}
          </button>
        ))}
      </div>
    </div>
  );
};
