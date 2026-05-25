import { useState } from "react";
import { 
  MousePointer, 
  Crop, 
  Sparkles, 
  Search, 
  Type, 
  Trash2, 
  Paintbrush, 
  Minus, 
  PenTool, 
  Hand, 
  Maximize, 
  CircleDot, 
  Layers, 
  Palette, 
  Square, 
  Compass, 
  Grid 
} from "lucide-react";

interface ToolbarProps {
  onSelectTool: (toolName: string) => void;
  activeTool: string;
}

export default function PhotoshopToolbar({ onSelectTool, activeTool }: ToolbarProps) {
  // Photoshop-style double-column layout
  const toolset = [
    { id: "move", name: "Move Tool (V)", icon: MousePointer },
    { id: "marquee", name: "Marquee Tool (M)", icon: () => (
      <svg className="w-4.5 h-4.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
        <rect x="3" y="3" width="18" height="18" rx="1" />
      </svg>
    )},
    { id: "lasso", name: "Lasso Tool (L)", icon: () => (
      <svg className="w-4.5 h-4.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.5 2 6 5 6 9c0 3 2 5.5 5 6l-3 7h8l-3-7c3-.5 5-3 5-6 0-4-2.5-7-6-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { id: "wand", name: "Magic Wand Tool (W)", icon: Sparkles },
    { id: "crop", name: "Crop Tool (C)", icon: Crop },
    { id: "frame", name: "Frame Tool (K)", icon: Maximize },
    { id: "eyedropper", name: "Eyedropper Tool (I)", icon: () => (
      <svg className="w-4.5 h-4.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m2 22 4-4 8 2 8-14-14 8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m5 15 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { id: "brush", name: "Brush Tool (B)", icon: Paintbrush },
    { id: "stamp", name: "Clone Stamp Tool (S)", icon: CircleDot },
    { id: "eraser", name: "Eraser Tool (E)", icon: Trash2 },
    { id: "gradient", name: "Gradient Tool (G)", icon: () => (
      <svg className="w-4.5 h-4.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18 M3 6h18 M3 18h18" opacity="0.3" />
        <path d="M12 3v18" strokeDasharray="3 3" />
      </svg>
    )},
    { id: "blur", name: "Smudge/Blur Tool", icon: Layers },
    { id: "pen", name: "Pen Tool (P)", icon: PenTool },
    { id: "type", name: "Horizontal Type Tool (T)", icon: Type },
    { id: "arrow", name: "Path Selection Tool (A)", icon: () => (
      <svg className="w-4.5 h-4.5 text-zinc-300 fill-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l8 16 3-7 7-3-18-6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { id: "shape", name: "Rectangle Tool (U)", icon: Square },
    { id: "hand", name: "Hand Tool (H)", icon: Hand },
    { id: "zoom", name: "Zoom Tool (Q)", icon: Search }
  ];

  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#262626");

  const swapColors = () => {
    setFgColor(bgColor);
    setBgColor(fgColor);
  };

  return (
    <div 
      id="photoshop-toolbar"
      className="w-[84px] bg-neutral-900 border border-neutral-800 rounded shadow-2xl p-1.5 flex flex-col items-center select-none text-white text-xs backdrop-blur-md"
    >
      {/* Mini Title/Grip Bar */}
      <div className="w-full h-4 flex items-center justify-between px-1 mb-2 border-b border-neutral-800 pb-1 cursor-grab active:cursor-grabbing">
        {/* Grip Icons */}
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700"></div>
        </div>
        <div className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-medium">PS</div>
        <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:border-red-600 transition-colors"></div>
      </div>

      {/* Grid of Double Column Tools */}
      <div className="grid grid-cols-2 gap-1 w-full">
        {toolset.map((tool) => {
          const Icon = tool.icon;
          const isSelected = activeTool === tool.id;

          return (
            <button
              id={`tool-btn-${tool.id}`}
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`group relative flex items-center justify-center w-8 h-8 rounded transition-all cursor-pointer ${
                isSelected 
                  ? "bg-neutral-800 border border-zinc-700 text-white shadow-inner scale-95" 
                  : "text-zinc-400 hover:bg-neutral-800 hover:text-white"
              }`}
              title={tool.name}
            >
              <Icon className="w-4.5 h-4.5 transition-transform group-hover:scale-105" />
              
              {/* Desktop Tooltip */}
              <div className="absolute left-[110%] top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center z-50 pointer-events-none">
                <div className="bg-neutral-950 border border-neutral-800 text-zinc-300 text-[10px] px-2 py-1 rounded white-nowrap shadow-xl font-sans tracking-wide">
                  {tool.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="w-full h-px bg-neutral-800 my-2"></div>

      {/* Foreground/Background Color Switcher */}
      <div className="relative w-12 h-12 my-2 flex items-center justify-center">
        {/* Background Color Chip */}
        <div 
          role="button"
          aria-label="Background Color Selector"
          onClick={() => setBgColor(bgColor === "#262626" ? "#3b82f6" : "#262626")}
          style={{ backgroundColor: bgColor }}
          className="absolute bottom-1 right-1 w-7 h-7 border border-neutral-700 rounded cursor-pointer transition-transform hover:scale-105 shadow-md"
        ></div>

        {/* Foreground Color Chip */}
        <div 
          role="button"
          aria-label="Foreground Color Selector"
          onClick={() => setFgColor(fgColor === "#FFFFFF" ? "#ef4444" : "#FFFFFF")}
          style={{ backgroundColor: fgColor }}
          className="absolute top-1 left-1 w-7 h-7 border border-neutral-700 rounded cursor-pointer transition-transform hover:scale-105 z-10 shadow-md flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-neutral-400/20"></div>
        </div>

        {/* Small Swap Icon */}
        <button 
          onClick={swapColors}
          className="absolute top-0 right-0 w-3.5 h-3.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full flex items-center justify-center cursor-pointer transition-colors z-20"
          title="Swap colors (X)"
        >
          <svg className="w-2 h-2 text-zinc-400 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M17 17H7 M17 17l-4-4 M7 7h10 M7 7l4 4" />
          </svg>
        </button>
      </div>

      <div className="w-full h-px bg-neutral-800 mt-2 mb-1"></div>

      {/* Miniature edit mask indicator */}
      <div className="flex flex-col items-center gap-1.5 py-1">
        <div className="w-6 h-4 border border-zinc-700 rounded-sm flex items-center justify-center cursor-pointer hover:bg-neutral-800">
          <div className="w-4 h-2 bg-neutral-800 border border-dashed border-zinc-500 rounded-sm"></div>
        </div>
        <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">EDIT</div>
      </div>
    </div>
  );
}
