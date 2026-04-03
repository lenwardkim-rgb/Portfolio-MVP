import React from 'react';

interface FastfetchProps {
  wallpaperName?: string;
}

const Fastfetch: React.FC<FastfetchProps> = ({ wallpaperName }) => {
  const info = [
    { key: "user", val: "taro", color: "text-catppuccin-red" },
    { key: "age", val: "14", color: "text-catppuccin-yellow" },
    { key: "role", val: "Aspiring Software Engineer", color: "text-catppuccin-green" },
    { key: "os", val: "Arch Linux x86_64", color: "text-catppuccin-blue" },
    { key: "wm", val: "Hyprland", color: "text-catppuccin-mauve" },
    { key: "shell", val: "zsh 5.9", color: "text-catppuccin-blue" },
    { key: "wallpaper", val: wallpaperName || 'Ignis Aqua', color: "text-catppuccin-mauve" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <pre className="text-catppuccin-mauve text-[10px] leading-[1.1] font-bold">
{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |   \\
 /_-''    ''-_\\`}
      </pre>
      <div className="space-y-1.5">
        <div className="text-catppuccin-blue font-bold text-sm mb-2">taro@portfolio</div>
        <div className="space-y-1">
          {info.map(item => (
            <div key={item.key} className="text-[11px] flex gap-3">
              <span className={`${item.color} font-bold w-20`}>{item.key}:</span>
              <span className="text-catppuccin-text">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fastfetch;
