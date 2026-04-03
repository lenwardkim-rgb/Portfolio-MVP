import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

export const OSD: React.FC<{ message: string | null }> = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-catppuccin-mantle/90 border border-catppuccin-mauve/40 px-8 py-3 rounded-xl shadow-2xl backdrop-blur-lg"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-catppuccin-mauve">
            {message}
          </span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
