import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error';
  icon?: string;
}

interface Props {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export const NotificationDaemon: React.FC<Props> = ({ notifications, onClose }) => {
  const colors = {
    info: 'border-catppuccin-blue text-catppuccin-blue',
    success: 'border-catppuccin-green text-catppuccin-green',
    error: 'border-catppuccin-red text-catppuccin-red',
  };

  return (
    <div className="fixed top-12 right-4 z-[100] flex flex-col pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            layout
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`w-72 bg-catppuccin-mantle/95 backdrop-blur-md border-l-4 p-4 rounded shadow-2xl mb-3 pointer-events-auto cursor-pointer relative overflow-hidden ${colors[n.type]}`}
            onClick={() => onClose(n.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-60 mb-1">
                  {n.title}
                </h4>
                <p className="text-catppuccin-text text-[11px] leading-relaxed font-mono">
                  {n.message}
                </p>
              </div>
            </div>
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[1px] bg-current opacity-20"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
