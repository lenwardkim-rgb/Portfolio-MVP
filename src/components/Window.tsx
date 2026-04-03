import { motion } from 'motion/react';
import React from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onFocus: () => void;
  id: string;
}

const Window: React.FC<WindowProps> = ({ title, children, isActive, onFocus }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onFocus}
      className={`relative flex-1 flex flex-col overflow-hidden rounded-lg transition-all duration-500 ${
        isActive ? 'z-20 shadow-[0_0_30px_rgba(137,180,250,0.15)]' : 'z-10'
      }`}
      style={{
        padding: '1px',
        background: isActive 
          ? 'linear-gradient(45deg, #89b4fa, #cba6f7)' 
          : '#313244'
      }}
    >
      <div className="flex flex-col h-full w-full bg-catppuccin-base/85 backdrop-blur-md rounded-[7px] overflow-hidden">
        <div className="px-3 py-1.5 flex items-center justify-between bg-catppuccin-mantle/60 text-[10px] uppercase tracking-widest text-catppuccin-subtext border-b border-white/5">
          <span className="font-bold">{title}</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-catppuccin-red/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-catppuccin-yellow/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-catppuccin-green/40" />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
