import { useEffect } from 'react';

type KeybindActions = {
  focusWindow: (id: string) => void;
  setWorkspace: (ws: number) => void;
  resetLayout: () => void;
};

export const useHyprKeybinds = (actions: KeybindActions) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.altKey;

      if (mod) {
        const key = e.key.toLowerCase();
        
        if (['1', '2', '3', 'r', 'enter'].includes(key)) {
          e.preventDefault();
        }

        switch (key) {
          case '1':
            actions.setWorkspace(1);
            break;
          case '2':
            actions.setWorkspace(2);
            break;
          case '3':
            actions.setWorkspace(3);
            break;
          case 'r':
            actions.resetLayout();
            break;
          case 'enter':
            actions.focusWindow('terminal');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
};
