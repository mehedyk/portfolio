import { useState, useRef, useEffect } from 'react';
import { useThemeStore, type CliStyleType } from '@/stores/themeStore';
import { Minus, Square, X } from 'lucide-react';

const CLI_STYLES: Record<CliStyleType, { bg: string; text: string; prompt: string; accent: string; border: string }> = {
  classic: { bg: '#1a1b26', text: '#c0caf5', prompt: '#7aa2f7', accent: '#73daca', border: '#2a2e3f' },
  amber: { bg: '#1c1200', text: '#ffb86c', prompt: '#f1fa8c', accent: '#ff5555', border: '#3c2800' },
  hacker: { bg: '#0a0e14', text: '#39ff14', prompt: '#39ff14', accent: '#00ff41', border: '#1a2e14' },
};

const KALI_DRAGON = [
  '      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
  '    ██                      ██',
  '   ██  █▄▄▄▄▄▄▄    ▄▄▄▄▄  ██',
  '  ██   ██     ██  ██   ██  ██',
  '  ██   ██▄▄▄▄▄██  ██▄▄▄██   ██',
  '  ██   ██     ██  ██       ██',
  '   ██  ██     ██  ██       ██',
  '    ██▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄██',
];

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'blog', label: 'Blog' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const NEOFETCH = [
  '',
  ...KALI_DRAGON.map((line, i) => {
    const info = [
      'kawser@kali',
      '----------',
      'OS: Kali GNU/Linux Rolling x86_64',
      'Host: Portfolio v2.0',
      'Kernel: React 18.3.1 + TypeScript',
      'Shell: zsh 5.9',
      'Theme: Fard (Dark) [GTK2/3]',
      'Icons: lucide-react',
      'Terminal: GhostTerm 1.0',
      '',
    ];
    return info[i] ? `${line}    ${info[i]}` : line;
  }),
  '',
];

interface HistoryEntry {
  command: string;
  output: string[];
}

const COMMANDS: Record<string, string[]> = {
  help: [
    '',
    'Available commands:',
    '  help             Show this help message',
    '  neofetch         System information',
    '  ls               List portfolio sections',
    '  cd <section>     Navigate to a section',
    '  clear            Clear terminal',
    '  whoami           Display current user',
    '  uname -a         System information',
    '  pwd              Print working directory',
    '  date             Display current date',
    '  cat /etc/issue   Display system info',
    '  ip a             Network interfaces',
    '  nmap             Port scan (demo)',
    '  msfconsole       Metasploit (demo)',
    '  sqlmap           SQL injection (demo)',
    '  history          Command history',
    '  theme <style>    Switch CLI style (classic/amber/hacker)',
    '',
    '  Tip: Press Tab for auto-completion',
    '',
  ],
  whoami: ['kawser'],
  'uname -a': ['Linux kali 6.6.15-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'],
  pwd: ['/home/kawser/portfolio'],
  date: [],
  'cat /etc/issue': ['Kali GNU/Linux Rolling \\n \\l', ''],
  'ip a': [
    '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536',
    '    inet 127.0.0.1/8 scope host lo',
    '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500',
    '    inet 192.168.1.42/24 brd 192.168.1.255 scope global',
  ],
  nmap: [
    '',
    'Starting Nmap 7.94SVN ( https://nmap.org )',
    'Scanning portfolio.mehedy.dev (127.0.0.1)...',
    '',
    'PORT     STATE  SERVICE',
    '22/tcp   open   ssh',
    '80/tcp   open   http',
    '443/tcp  open   https',
    '3000/tcp open   dev-server',
    '',
    'Nmap done: 1 IP address (1 host up) scanned in 2.34s',
    '',
  ],
  msfconsole: [
    '',
    '       =[ metasploit v6.4.1-dev ]',
    '+ -- --=[ 2397 exploits - 1239 auxiliary ]',
    '+ -- --=[ 422 payloads - 46 encoders ]',
    '+ -- --=[ 11 nops - 9 evasion ]',
    '',
    '[*] Just kidding. This is a portfolio, not a pentest lab.',
    '[*] But yes, I do study offensive security.',
    '',
  ],
  sqlmap: [
    '',
    '        ___',
    '       __H__',
    ' ___ ___[)]_____ ___ ___  {1.8.2#stable}',
    '|_ -| . [)]     | .\'| . |',
    '|___|_  [.]_|_|_|__,|  _|',
    '      |_|V...       |_|',
    '',
    '[!] This portfolio is NOT vulnerable to SQL injection.',
    '[*] Because it doesn\'t use SQL. It\'s a static React app.',
    '',
  ],
  history: [],
  neofetch: NEOFETCH,
  ls: [
    '',
    ...SECTIONS.map((s) => `  \x1b[34m${s.id}/\x1b[0m    ${s.label}`),
    '',
  ],
  clear: [],
};

const TAB_COMPLETIONS = Object.keys(COMMANDS);

const MOBILE_CHIPS = ['help', 'neofetch', 'ls', 'nmap', 'msfconsole', 'clear', 'whoami'];

export const CliTheme = () => {
  const { cliStyle, setCliStyle } = useThemeStore();
  const [history, setHistory] = useState<HistoryEntry[]>([{ command: '', output: ['Type "help" for available commands.', ''] }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const style = CLI_STYLES[cliStyle];

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'date') {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: [new Date().toString(), ''] },
      ]);
      return;
    }

    if (trimmed === 'history') {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: ['', ...cmdHistory.map((c, i) => `  ${i + 1}  ${c}`), ''],
        },
      ]);
      return;
    }

    if (trimmed.startsWith('cd ')) {
      const section = trimmed.split(' ')[1];
      const target = SECTIONS.find((s) => s.id === section);
      if (target) {
        const el = document.getElementById(target.id);
        el?.scrollIntoView({ behavior: 'smooth' });
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: [`Navigating to ${target.label}...`, ''] },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: cmd,
            output: [
              `bash: cd: ${section}: No such directory`,
              `Available: ${SECTIONS.map((s) => s.id).join(', ')}`,
              '',
            ],
          },
        ]);
      }
      return;
    }

    if (trimmed.startsWith('theme ')) {
      const newStyle = trimmed.split(' ')[1] as CliStyleType;
      if (['classic', 'amber', 'hacker'].includes(newStyle)) {
        setCliStyle(newStyle);
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: [`Switched to ${newStyle} style.`, ''] },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: ['Available styles: classic, amber, hacker', ''] },
        ]);
      }
      return;
    }

    const output = COMMANDS[trimmed];
    if (output) {
      setHistory((prev) => [...prev, { command: cmd, output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            `bash: ${trimmed.split(' ')[0]}: command not found`,
            'Type "help" for available commands.',
            '',
          ],
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input) {
        const match = TAB_COMPLETIONS.find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const Prompt = () => (
    <span className="whitespace-nowrap">
      <span style={{ color: style.accent }}>┌──(</span>
      <span style={{ color: style.prompt }}>kawser💠kali</span>
      <span style={{ color: style.accent }}>)</span>
      <span style={{ color: style.accent }}>-[</span>
      <span style={{ color: style.text }}>~</span>
      <span style={{ color: style.accent }}>]</span>
      <br />
      <span style={{ color: style.accent }}>└─</span>
      <span style={{ color: style.prompt }}>$</span>{' '}
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 pb-8 relative overflow-hidden">
      {/* CRT Effects from zz.html aesthetic */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] animate-[scan_6s_linear_infinite]" />
      <div className="pointer-events-none fixed inset-0 z-[51] bg-[radial-gradient(ellipse_110%_100%_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[52] opacity-10 bg-[rgba(255,184,108,0.018)] animate-[flicker_7s_infinite]" />
      
      <div
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10"
        style={{ border: `1px solid ${style.border}` }}
      >
        {/* GNOME Title Bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: style.border }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: style.text }}>kawser@kali: ~</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="opacity-60 hover:opacity-100">
              <Minus size={14} style={{ color: style.text }} />
            </button>
            <button className="opacity-60 hover:opacity-100">
              <Square size={12} style={{ color: style.text }} />
            </button>
            <button className="opacity-60 hover:opacity-100">
              <X size={14} style={{ color: '#ff5555' }} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={containerRef}
          className="p-4 font-mono text-sm overflow-y-auto"
          style={{
            background: style.bg,
            color: style.text,
            minHeight: '60vh',
            maxHeight: '75vh',
            lineHeight: 1.6,
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Banner */}
          <div style={{ color: style.accent }} className="mb-2 text-xs opacity-70">
            Kali GNU/Linux Rolling | kawser@kali | {new Date().toLocaleDateString()}
          </div>

          {/* History */}
          {history.map((entry, i) => (
            <div key={i} className="mb-1">
              {entry.command && (
                <div className="flex flex-wrap">
                  <Prompt />
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.output.map((line, j) => (
                <div key={j} className="whitespace-pre-wrap break-all">
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex flex-wrap items-start">
            <Prompt />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none min-w-[120px] caret-current"
              style={{ color: style.text, caretColor: style.accent }}
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>

        {/* Mobile Quick Action Chips */}
        <div
          className="flex flex-wrap gap-2 p-3 md:hidden"
          style={{ background: style.border }}
        >
          {MOBILE_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                handleCommand(chip);
                setInput('');
              }}
              className="px-3 py-1.5 rounded-full text-xs font-mono transition-all hover:brightness-125"
              style={{
                background: style.bg,
                color: style.accent,
                border: `1px solid ${style.accent}40`,
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* CLI Style Switcher */}
      <div className="flex gap-3 mt-6">
        {(['classic', 'amber', 'hacker'] as CliStyleType[]).map((s) => (
          <button
            key={s}
            onClick={() => setCliStyle(s)}
            className={`px-4 py-2 rounded-lg font-mono text-sm capitalize transition-all ${
              cliStyle === s ? 'ring-2 ring-offset-2 scale-105' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              background: CLI_STYLES[s].bg,
              color: CLI_STYLES[s].accent,
              ringColor: CLI_STYLES[s].accent,
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
