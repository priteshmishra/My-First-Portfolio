import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, CommandOutput } from './commandRegistry';
import { Card } from '../../components/ui/Card';
import { Terminal, Copy, Check, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';

interface TerminalLine {
  id: string;
  type: 'input' | 'output-success' | 'output-error' | 'output-info' | 'output-system';
  content: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { id: '1', type: 'output-system', content: 'BIOVERSE COMPUTATIONAL BIOLOGY TERMINAL [v1.0.0]' },
  { id: '2', type: 'output-system', content: 'Architecture: WebAssembly + WebGL Client Sandbox' },
  { id: '3', type: 'output-info', content: 'Type "help" to see available commands or click quick prompts below.' },
  { id: '4', type: 'output-info', content: '------------------------------------------------------------' },
];

export const BioinformaticsTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [copied, setCopied] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (commandToRun?: string) => {
    const raw = (commandToRun !== undefined ? commandToRun : inputVal).trim();
    if (!raw) return;

    soundSynth.playClick();

    // Append user input line
    const userLine: TerminalLine = {
      id: Math.random().toString(),
      type: 'input',
      content: `bioverse@pritesh:~$ ${raw}`,
    };

    // Update command history for up/down arrows
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);
    setInputVal('');

    const output: CommandOutput = executeCommand(raw);

    if (output.lines.length === 1 && output.lines[0] === '__CLEAR__') {
      setHistory([]);
      return;
    }

    const resultLines: TerminalLine[] = output.lines.map((l) => ({
      id: Math.random().toString(),
      type: `output-${output.type}` as TerminalLine['type'],
      content: l,
    }));

    setHistory((prev) => [...prev, userLine, ...resultLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const handleCopyTerminal = () => {
    soundSynth.playClick();
    const text = history.map((h) => h.content).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const quickCommands = [
    { label: 'help', cmd: 'help' },
    { label: 'about', cmd: 'about' },
    { label: 'skills', cmd: 'skills' },
    { label: 'projects', cmd: 'projects' },
    { label: 'gc-content', cmd: 'gc-content ATGCATGCGAATTC' },
    { label: 'stats', cmd: 'stats' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div className="space-y-4">
      {/* Terminal Container */}
      <Card glowColor="cyan" className="p-0 overflow-hidden border-bio-cyan/30 shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="bg-space-950 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-bio-cyan" />
              <span>bash - bioverse@pritesh:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTerminal}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors text-xs font-mono flex items-center gap-1"
              title="Copy Output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => {
                soundSynth.playClick();
                setHistory(INITIAL_LINES);
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors text-xs font-mono flex items-center gap-1"
              title="Reset Terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-space-950/95 p-4 sm:p-6 font-mono text-xs sm:text-sm h-96 overflow-y-auto cursor-text space-y-1.5 select-text"
        >
          {history.map((line) => {
            const styles = {
              input: 'text-bio-cyan font-bold',
              'output-success': 'text-emerald-300',
              'output-error': 'text-rose-400',
              'output-info': 'text-slate-300',
              'output-system': 'text-bio-violet font-semibold',
            }[line.type];

            return (
              <div key={line.id} className={`${styles} leading-relaxed whitespace-pre-wrap`}>
                {line.content}
              </div>
            );
          })}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-bio-cyan pt-2">
            <span className="shrink-0 font-bold">bioverse@pritesh:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm caret-bio-cyan"
              autoFocus
            />
          </div>

          <div ref={terminalEndRef} />
        </div>
      </Card>

      {/* Quick Prompt Pill Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-bio-cyan" />
          <span>Quick Commands:</span>
        </span>
        {quickCommands.map((q) => (
          <button
            key={q.label}
            onClick={() => handleCommandSubmit(q.cmd)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 hover:border-bio-cyan text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
};
