import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface WaybarProps {
  currentWS: number;
  setWS: (ws: number) => void;
  activeWindowName: string;
}

const Waybar: React.FC<WaybarProps> = ({ currentWS, setWS, activeWindowName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const workspaces = [
    { id: 1, name: "home" },
    { id: 2, name: "work" },
    { id: 3, name: "chat" },
  ];

  return (
    <nav className="h-8 w-full bg-catppuccin-crust/95 backdrop-blur-xl flex items-center justify-between px-3 text-[11px] border-b border-white/10 z-50">
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 bg-catppuccin-mantle px-1.5 py-0.5 rounded border border-white/5">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setWS(ws.id)}
              className={`px-2.5 py-0.5 rounded transition-all duration-300 flex items-center gap-2 ${
                currentWS === ws.id 
                  ? 'bg-catppuccin-mauve text-catppuccin-crust font-bold shadow-[0_0_12px_rgba(203,166,247,0.3)]' 
                  : 'text-catppuccin-subtext hover:bg-white/5'
              }`}
            >
              <span>{ws.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 px-4 py-0.5 bg-catppuccin-mantle rounded border border-white/5 text-catppuccin-blue italic font-semibold">
        <span className="text-catppuccin-subtext/40 not-italic font-normal">active:</span>
        <motion.span
          key={activeWindowName}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {activeWindowName}
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-4 px-3 py-0.5 bg-catppuccin-mantle rounded border border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="text-catppuccin-green">CPU</span>
            <span className="text-catppuccin-text">12%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-catppuccin-yellow">RAM</span>
            <span className="text-catppuccin-text">2.4GB</span>
          </div>
          <div className="text-catppuccin-mauve font-bold border-l border-white/10 pl-3">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Waybar;
