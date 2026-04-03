import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

export const Wallpaper: React.FC<{ currentWallpaper: string }> = ({ currentWallpaper }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-catppuccin-crust">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWallpaper}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.35, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center blur-[40px]"
          style={{ backgroundImage: `url(${currentWallpaper})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
