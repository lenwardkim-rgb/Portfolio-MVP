import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="font-mono text-sm space-y-5">
      <div className="flex items-center gap-2 text-catppuccin-mauve border-b border-white/10 pb-2">
        <h1 className="font-bold uppercase tracking-widest text-xs">Identity_Config</h1>
      </div>
      
      <div className="space-y-4">
        <p className="text-catppuccin-text leading-relaxed">
          I am a <span className="text-catppuccin-yellow font-bold">14-year-old aspiring software engineer</span>. 
          I'm deeply passionate about how software works under the hood, from system-level ricing to high-level application design.
        </p>

        <p className="text-catppuccin-subtext italic text-xs border-l-2 border-catppuccin-mauve/30 pl-3">
          "Currently exploring the intersection of Machine Learning, 
          Game Development, and Linux ricing."
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-6">
        <div className="bg-catppuccin-mantle/50 p-3 rounded border border-white/5">
          <span className="text-[10px] text-catppuccin-blue block uppercase font-bold mb-1">Current Focus</span>
          <span className="text-xs text-catppuccin-text">ML Models, UI/UX Design, and Rust experiments.</span>
        </div>
        <div className="bg-catppuccin-mantle/50 p-3 rounded border border-white/5">
          <span className="text-[10px] text-catppuccin-green block uppercase font-bold mb-1">Environment</span>
          <span className="text-xs text-catppuccin-text">Arch Linux + Hyprland + Neovim</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
