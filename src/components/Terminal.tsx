import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';

interface HistoryItem {
  type: 'command' | 'output' | 'error';
  content: React.ReactNode;
}

interface TerminalProps {
  setWallpaper?: (url: string) => void;
  triggerOSD?: (msg: string) => void;
  wallpapers?: { id: string; url: string; name: string }[];
}

const Terminal: React.FC<TerminalProps> = ({ setWallpaper, triggerOSD, wallpapers }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const renderProjectList = () => (
    <div className="flex flex-col gap-3 my-4">
      {PROJECTS.map((p, i) => (
        <motion.a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="group relative p-3 rounded-md bg-catppuccin-mantle/40 border border-white/5 hover:border-catppuccin-blue/40 transition-all overflow-hidden"
          onClick={() => triggerOSD?.(`Opening ${p.name}...`)}
        >
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <div className="text-catppuccin-blue font-bold text-sm flex items-center gap-2">
                <span className="text-xs opacity-50">➜</span> {p.name}
              </div>
              <div className="text-catppuccin-subtext text-[11px] mt-1 ml-5">{p.desc}</div>
            </div>
            <span className="text-[10px] bg-catppuccin-base/50 px-2 py-0.5 rounded text-catppuccin-mauve border border-catppuccin-mauve/20">
              {p.tech}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-catppuccin-blue/0 via-catppuccin-blue/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.a>
      ))}
    </div>
  );

  useEffect(() => {
    const sequence = async () => {
      await sleep(1000);
      addToHistory('command', 'gh repo list taromukhalela-alt');
      await sleep(500);
      addToHistory('output', 'Fetching repositories from GitHub...');
      await sleep(800);
      
      setHistory(prev => [...prev, { type: 'output', content: renderProjectList() }]);
      setIsTyping(false);
    };

    sequence();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addToHistory = (type: HistoryItem['type'], content: React.ReactNode) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    
    addToHistory('command', cmd);

    if (cmd === 'help') {
      addToHistory('output', 'Available commands: ls, help, clear, about, skills, hyprpaper');
    } else if (cmd === 'ls' || cmd === 'projects') {
      addToHistory('output', 'Fetching repositories from GitHub...');
      addToHistory('output', renderProjectList());
    } else if (cmd === 'skills') {
      addToHistory('output', 'Tech Stack: React, TypeScript, Python, Scikit-Learn, Rust, Go, Hyprland, Docker');
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'about') {
      addToHistory('output', 'Taro, 14yo Aspiring Software Engineer. Focused on ML and UI/UX.');
    } else if (cmd === 'hyprpaper') {
      if (wallpapers) {
        addToHistory('output', (
          <div className="flex flex-col gap-1 mt-1">
            <p className="text-catppuccin-yellow">Usage: hyprpaper -w [1-3]</p>
            {wallpapers.map((w, i) => (
              <p key={w.id} className="text-xs">{i + 1}: {w.name}</p>
            ))}
          </div>
        ));
      }
    } else if (cmd.startsWith('hyprpaper -w ')) {
      const index = parseInt(cmd.split('-w ')[1]) - 1;
      if (wallpapers && wallpapers[index]) {
        setWallpaper?.(wallpapers[index].url);
        triggerOSD?.(`Wallpaper: ${wallpapers[index].name}`);
        addToHistory('output', `Wallpaper changed to ${wallpapers[index].name}`);
      } else {
        addToHistory('error', 'Invalid wallpaper index.');
      }
    } else {
      addToHistory('error', `zsh: command not found: ${cmd}`);
    }
    setInput('');
  };

  return (
    <div 
      ref={scrollRef}
      className="h-full overflow-y-auto font-mono text-xs md:text-sm selection:bg-catppuccin-mauve selection:text-catppuccin-crust custom-scrollbar"
    >
      <div className="space-y-2">
        {history.map((item, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
            {item.type === 'command' && (
              <div className="flex gap-2">
                <span className="text-catppuccin-mauve font-bold">➜</span>
                <span className="text-catppuccin-blue font-bold">~</span>
                <span className="text-catppuccin-text">{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-catppuccin-subtext ml-6">{item.content}</div>
            )}
            {item.type === 'error' && (
              <div className="text-catppuccin-red ml-6">{item.content}</div>
            )}
          </div>
        ))}
      </div>

      {!isTyping && (
        <form onSubmit={handleCommand} className="flex gap-2 mt-3 items-center">
          <span className="text-catppuccin-mauve font-bold">➜</span>
          <span className="text-catppuccin-blue font-bold">~</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-catppuccin-text caret-catppuccin-mauve"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      )}

      {isTyping && (
        <div className="flex gap-2 items-center text-catppuccin-subtext italic mt-2">
          <span className="animate-pulse">Loading system modules...</span>
        </div>
      )}
    </div>
  );
};

export default Terminal;
