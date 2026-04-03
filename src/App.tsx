import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';
import AboutMe from './components/AboutMe';
import Fastfetch from './components/Fastfetch';
import { Notification, NotificationDaemon } from './components/NotificationDaemon';
import { OSD } from './components/OSD';
import Terminal from './components/Terminal';
import { Wallpaper } from './components/Wallpaper';
import Waybar from './components/Waybar';
import Window from './components/Window';
import { PROJECTS, WALLPAPERS } from './constants';
import { useHyprKeybinds } from './hooks/useHyprKeybinds';

export default function App() {
  const [workspace, setWorkspace] = useState(1);
  const [activeWindow, setActiveWindow] = useState('terminal');
  const [osdMessage, setOsdMessage] = useState<string | null>(null);
  const [wallpaperUrl, setWallpaperUrl] = useState(WALLPAPERS[0].url);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const triggerOSD = useCallback((msg: string) => {
    setOsdMessage(msg);
    setTimeout(() => setOsdMessage(null), 2000);
  }, []);

  const addNotification = useCallback((n: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...n, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindow(id);
    triggerOSD(`Focus: ${id}`);
  }, [triggerOSD]);

  const resetLayout = useCallback(() => {
    setWorkspace(1);
    setActiveWindow('terminal');
    triggerOSD('Layout Reset');
  }, [triggerOSD]);

  useHyprKeybinds({ focusWindow, setWorkspace, resetLayout });

  // Boot sequence
  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      addNotification({ 
        title: 'network-manager', 
        message: 'Interface eth0 connected to gigabit-fiber', 
        type: 'success' 
      });

      await new Promise(r => setTimeout(r, 800));
      addNotification({ 
        title: 'systemd', 
        message: 'Welcome to Arch Linux (React-Edition) 6.5.9-arch1', 
        type: 'info' 
      });

      await new Promise(r => setTimeout(r, 1500));
      addNotification({ 
        title: 'hyprland', 
        message: 'Config loaded: ALT key is mapped to MOD', 
        type: 'info' 
      });
    };
    sequence();
  }, [addNotification]);

  const currentWallpaperName = WALLPAPERS.find(w => w.url === wallpaperUrl)?.name;

  return (
    <div className="relative h-screen w-full bg-catppuccin-crust overflow-hidden font-mono text-catppuccin-text selection:bg-catppuccin-mauve/30">
      <Wallpaper currentWallpaper={wallpaperUrl} />
      <OSD message={osdMessage} />
      <NotificationDaemon notifications={notifications} onClose={removeNotification} />

      <div className="relative z-10 flex flex-col h-full">
        <Waybar 
          currentWS={workspace} 
          setWS={(ws) => {
            setWorkspace(ws);
            triggerOSD(`Workspace ${ws}`);
          }} 
          activeWindowName={activeWindow} 
        />

        <main className="flex-1 p-4 pt-2 overflow-hidden">
          <AnimatePresence mode="wait">
            {workspace === 1 && (
              <motion.div
                key="ws1"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full grid grid-cols-1 md:grid-cols-12 gap-4"
              >
                <div className="md:col-span-4 flex flex-col gap-4 h-full">
                  <Window 
                    id="sysinfo" 
                    title="fastfetch" 
                    isActive={activeWindow === 'sysinfo'}
                    onFocus={() => setActiveWindow('sysinfo')}
                  >
                    <Fastfetch wallpaperName={currentWallpaperName} />
                  </Window>
                  <Window 
                    id="about" 
                    title="about.md" 
                    isActive={activeWindow === 'about'}
                    onFocus={() => setActiveWindow('about')}
                  >
                    <AboutMe />
                  </Window>
                </div>
                <div className="md:col-span-8 h-full">
                  <Window 
                    id="terminal" 
                    title="zsh — portfolio" 
                    isActive={activeWindow === 'terminal'}
                    onFocus={() => setActiveWindow('terminal')}
                  >
                    <Terminal 
                      setWallpaper={setWallpaperUrl} 
                      triggerOSD={triggerOSD} 
                      wallpapers={WALLPAPERS}
                    />
                  </Window>
                </div>
              </motion.div>
            )}

            {workspace === 2 && (
              <motion.div
                key="ws2"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
                <Window 
                  id="projects" 
                  title="projects_gallery" 
                  isActive={true} 
                  onFocus={() => setActiveWindow('projects')}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {PROJECTS.map((p, i) => (
                      <motion.a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-catppuccin-mantle/60 border border-white/5 rounded-lg p-5 hover:border-catppuccin-mauve/50 transition-all shadow-lg"
                      >
                        <div className="text-catppuccin-mauve text-[10px] font-bold mb-2 uppercase tracking-widest">Project_{i+1}</div>
                        <h3 className="text-catppuccin-blue font-bold text-lg mb-2">{p.name}</h3>
                        <p className="text-catppuccin-subtext text-xs mb-4 leading-relaxed">{p.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-catppuccin-green font-mono">{p.tech}</span>
                          <span className="text-[10px] text-catppuccin-mauve opacity-0 group-hover:opacity-100 transition-opacity">view_repo ➜</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </Window>
              </motion.div>
            )}

            {workspace === 3 && (
              <motion.div
                key="ws3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full flex items-center justify-center"
              >
                <div className="w-full max-w-2xl h-[450px]">
                  <Window 
                    id="contact" 
                    title="contact_form.sh" 
                    isActive={true} 
                    onFocus={() => setActiveWindow('contact')}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-catppuccin-green">
                        <span className="font-bold">➜</span>
                        <span className="text-catppuccin-blue">mail</span>
                        <span className="text-catppuccin-subtext">--to</span>
                        <span className="text-catppuccin-yellow">lenwardkim@gmail.com</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-catppuccin-subtext uppercase tracking-widest">Subject</label>
                          <input 
                            type="text" 
                            className="w-full bg-catppuccin-crust/50 border border-white/5 rounded p-2 text-sm outline-none focus:border-catppuccin-mauve transition-colors"
                            placeholder="Collaboration Inquiry"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-catppuccin-subtext uppercase tracking-widest">Message</label>
                          <textarea 
                            className="w-full h-32 bg-catppuccin-crust/50 border border-white/5 rounded p-3 text-sm outline-none focus:border-catppuccin-mauve transition-colors resize-none custom-scrollbar"
                            placeholder="Type your message here..."
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => addNotification({ title: 'mail-daemon', message: 'Message sent successfully!', type: 'success' })}
                        className="w-full py-3 bg-catppuccin-mauve text-catppuccin-crust font-bold rounded hover:bg-catppuccin-mauve/90 transition-colors uppercase tracking-widest text-xs"
                      >
                        Send_Message
                      </button>
                    </div>
                  </Window>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <div className="fixed bottom-3 right-4 text-[9px] text-catppuccin-subtext/40 pointer-events-none flex gap-4">
          <span>[ALT + 1-3] Switch Workspaces</span>
          <span>[ALT + R] Reset Layout</span>
          <span>[ALT + ENTER] Focus Terminal</span>
        </div>
      </div>
    </div>
  );
}
