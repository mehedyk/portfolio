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
    <span className="whitespace-nowrap text-[#4ade80] font-medium" style={{ textShadow: '0 0 8px rgba(74, 222, 128, 0.45)' }}>
      user@portfolio<span className="text-[#67e8f9]" style={{ textShadow: '0 0 6px rgba(103, 232, 249, 0.4)' }}>:~</span>$
    </span>
  );

  return (
    <div className="h-full w-full flex flex-col relative bg-[#050709] text-[#d8d4ce] font-mono overflow-hidden">
      {/* CRT Overlay from zz.html */}
      <div className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-400">
        <div className="absolute inset-0 opacity-55 animate-[scan_6s_linear_infinite]" 
             style={{ background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.32) 3px, rgba(0,0,0,0.32) 4px)' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]"></div>
        <div className="absolute inset-0 bg-[rgba(255,184,108,0.018)] animate-[flicker_7s_infinite]"></div>
      </div>
      
      {/* Film grain noise */}
      <div className="pointer-events-none fixed inset-0 z-[99] opacity-[0.06] mix-blend-overlay"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>\")" }}>
      </div>

      {/* Status Bar from zz.html */}
      <header className="flex justify-between items-center px-4 py-1.5 border-b border-[#1d2530] text-[11px] text-[#6b7585] shrink-0 select-none tracking-wide z-10"
              style={{ background: 'linear-gradient(to bottom, #0e1217, #0a0d11)' }}>
        <div className="flex gap-4 items-center">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_7px_#4ade80] animate-[pulse_2s_ease-in-out_infinite]"></span>
            kawser@portfolio
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap hidden sm:inline-flex">
            pwd: <b className="text-[#ffb86c] font-medium">~</b>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="inline-flex items-center gap-1 whitespace-nowrap hidden md:inline-flex">
            theme: <b className="text-[#ffb86c] font-medium">{cliStyle}</b>
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap hidden sm:inline-flex">
            crt: <b className="text-[#ffb86c] font-medium">on</b>
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <b className="text-[#ffb86c] font-medium">{new Date().toLocaleTimeString([], { hour12: false })}</b>
          </span>
        </div>
      </header>

      {/* Terminal Body */}
      <main
        ref={containerRef}
        className="flex-1 flex flex-col min-h-0 p-4 md:p-5 relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#1d2530] hover:scrollbar-thumb-[#6b7585] z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at top, rgba(255, 184, 108, 0.05), transparent 70%), radial-gradient(ellipse 60% 40% at bottom, rgba(103, 232, 249, 0.025), transparent 70%), #050709',
          color: style.text,
          fontSize: '14px',
          lineHeight: '1.55'
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* History */}
        {history.map((entry, i) => (
          <div key={i} className="mb-1">
            {entry.command && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Prompt />
                <span className="text-[#d8d4ce]">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className="whitespace-pre-wrap break-word mb-[2px]">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#0e1217] mt-1 relative shrink-0">
          <Prompt />
          <div className="relative flex-1 min-w-0 flex items-center">
            {/* Fake input display for cursor */}
            <div className="pointer-events-none text-[#d8d4ce] whitespace-pre">
              {input}<span className="inline-block w-[8px] h-[17px] bg-[#ffb86c] align-text-bottom shadow-[0_0_8px_#ffb86c] animate-[blink_1.06s_steps(2,end)_infinite] mx-[1px]"></span>
            </div>
            {/* Invisible real input */}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-transparent caret-transparent p-0 z-[2] cursor-text"
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>
      </main>

      {/* Mobile Quick Action Chips */}
      <div className="flex flex-wrap gap-2 p-3 border-t border-[#1d2530] bg-[#0a0d11] md:hidden z-10 shrink-0">
        {MOBILE_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              handleCommand(chip);
              setInput('');
            }}
            className="px-3 py-1.5 rounded text-xs font-mono transition-all hover:brightness-125"
            style={{
              background: '#0e1217',
              color: style.accent,
              border: `1px solid ${style.border}`,
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
