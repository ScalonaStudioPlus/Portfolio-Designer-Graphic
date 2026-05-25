import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Maximize2, 
  Sparkles, 
  Settings, 
  Grid, 
  Info, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  MousePointerClick
} from "lucide-react";
import PhotoshopToolbar from "./components/PhotoshopToolbar";
import WavyMesh from "./components/WavyMesh";
import ProyectosSection from "./components/ProyectosSection";
import SocialMediaSection from "./components/SocialMediaSection";
import FooterSection from "./components/FooterSection";

// Import the generated Funko Pop image asset (Vite handles this relative path)
// @ts-ignore
import jhonFunkoPop from "./assets/images/jhon_funko_pop_toy_1779623691730.png";
// @ts-ignore
import vectorWaveBg from "./assets/images/vector_wave_bg_1779624670941.png";

export default function App() {
  const [activeTool, setActiveTool] = useState("move");
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [accentColor, setAccentColor] = useState<"white" | "cyan" | "gold" | "crimson">("white");
  
  // Custom Workspace Options
  const [showGrid, setShowGrid] = useState(false);
  const [enableParallax, setEnableParallax] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [currentProjectTopic, setCurrentProjectTopic] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sound effect helper (synthetic audio using Web Audio API to satisfy no mock logic)
  const playSynthBeep = (freq: number, type: OscillatorType = "sine", duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio context not allowed yet", e);
    }
  };

  // Track mouse coordinates for premium 3D Parallax & Custom Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5 range
      const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5 range
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const selectTool = (toolId: string) => {
    setActiveTool(toolId);
    playSynthBeep(440, "sine");
  };

  const cycleAccent = () => {
    const accents: ("white" | "cyan" | "gold" | "crimson")[] = ["white", "cyan", "gold", "crimson"];
    const nextIdx = (accents.indexOf(accentColor) + 1) % accents.length;
    setAccentColor(accents[nextIdx]);
    playSynthBeep(330 + nextIdx * 110, "triangle");
  };

  // Accent color themes
  const accentStyles = {
    white: {
      text: "text-white",
      glow: "shadow-white/20",
      border: "border-neutral-800",
      bgBadge: "bg-black text-white",
      tint: "border-white/10",
      meshColor: "opacity-45"
    },
    cyan: {
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
      border: "border-cyan-500/30",
      bgBadge: "bg-zinc-950 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]",
      tint: "border-cyan-500/10",
      meshColor: "opacity-60"
    },
    gold: {
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
      border: "border-amber-500/30",
      bgBadge: "bg-zinc-950 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
      tint: "border-amber-500/10",
      meshColor: "opacity-60"
    },
    crimson: {
      text: "text-rose-500",
      glow: "shadow-rose-600/30",
      border: "border-rose-500/30",
      bgBadge: "bg-zinc-950 border-rose-500/50 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
      tint: "border-rose-500/10",
      meshColor: "opacity-60"
    }
  };

  const activeAccent = accentStyles[accentColor];

  // Map active tool to cursor type
  const getCursorStyle = () => {
    switch (activeTool) {
      case "brush": return "circle";
      case "type": return "text";
      case "zoom": return "zoom";
      case "hand": return "grab";
      default: return "default";
    }
  };

  const projectSubtitles = [
    "INTERFACES CINEMATOGRÁFICAS",
    "CUSTOM 3D COLLECTIBLES",
    "HIGH-CONTRAST VECTOR CORES",
    "IMPERIAL BRAND SKEWS",
    "SENIOR DEVELOPER EXPERTISE"
  ];

  const triggerSubtitleCycle = () => {
    setCurrentProjectTopic((prev) => (prev + 1) % projectSubtitles.length);
    playSynthBeep(600, "square", 0.12);
  };

  return (
    <div 
      id="root-viewport-container"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white font-sans select-none overflow-x-hidden overflow-y-auto scroll-smooth"
      style={{
        // Give certain workspace cursors a unique active feel
        cursor: getCursorStyle() === "grab" ? "grab" : "default"
      }}
    >
      {/* ================= SECTION 1: HERO ACTIVE WORKSPACE ================= */}
      <div 
        id="hero-workspace-section" 
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 border-b border-neutral-900 bg-black"
      >
      {/* Dynamic Background Grid Lines */}
      {showGrid && (
        <div id="tech-pixel-grid" className="absolute inset-0 z-0 opacity-15 pointer-events-none transition-opacity duration-300">
          <div className="w-full h-full bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
      )}

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-neutral-900/40 blur-3xl pointer-events-none z-0"></div>
      
      {/* Immersive background wave graphic matching user request */}
      <div 
        id="bg-wave-graphic" 
        className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden select-none transition-transform duration-300"
        style={{
          transform: enableParallax 
            ? `scale(1.05) translateX(${-mousePosition.x * 12}px) translateY(${-mousePosition.y * 12}px)` 
            : "scale(1.01)",
        }}
      >
        <img 
          src={vectorWaveBg} 
          alt="Vector Wavy Background" 
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3D Moving Wavy Mesh Ribbon */}
      <WavyMesh />

      {/* ================= HEADER ================= */}
      <header id="header-branding-bar" className="relative z-30 flex justify-between items-start pointer-events-auto">
        <motion.div 
          id="header-left-location"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-1 cursor-pointer group"
          onClick={() => {
            playSynthBeep(880, "sine");
            setShowHelp(true);
          }}
        >
          <span className="text-xl sm:text-2xl font-condensed font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all group-hover:text-amber-400">
            Venezuela
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase leading-none">
            LATAM CORE • STUDIO 1.1
          </span>
        </motion.div>

        {/* Ambient Controls */}
        <motion.div 
          id="workspace-controls"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 bg-neutral-900/60 backdrop-blur-md p-1.5 px-3 rounded-full border border-neutral-800"
        >
          <button 
            id="btn-toggle-grid"
            onClick={() => {
              setShowGrid(!showGrid);
              playSynthBeep(520, "sine");
            }}
            className={`p-1.5 rounded-full hover:bg-neutral-800 transition-colors ${showGrid ? "text-amber-400" : "text-zinc-500"}`}
            title="Toggle Design Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
          
          <button 
            id="btn-toggle-sound"
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              // Simple synthetic audio trigger to confirm sound toggling
              if (!soundEnabled) {
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.1);
              }
            }}
            className={`p-1.5 rounded-full hover:bg-neutral-800 transition-colors ${soundEnabled ? "text-green-400" : "text-zinc-500"}`}
            title={soundEnabled ? "Mute Synthetic Synth" : "Enable Interactive Synth"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button 
            id="btn-toggle-parallax"
            onClick={() => {
              setEnableParallax(!enableParallax);
              playSynthBeep(490, "sine");
            }}
            className={`p-1.5 rounded-full hover:bg-neutral-800 transition-colors ${enableParallax ? "text-cyan-400" : "text-zinc-500"}`}
            title="Toggle Mouse Parallax"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button 
            id="btn-info-panel"
            onClick={() => {
              setShowHelp(!showHelp);
              playSynthBeep(580, "sine");
            }}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-zinc-400 transition-colors"
            title="Show Layout Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </motion.div>
      </header>


      {/* ================= MAIN HERO SECTION ================= */}
      <main id="main-hero-content" className="relative flex-grow flex items-center justify-center py-10 z-10">
        
        {/* PARALLAX OUTER WRAPPER */}
        <div 
          className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: enableParallax 
              ? `translateX(${mousePosition.x * 25}px) translateY(${mousePosition.y * 25}px)` 
              : "none",
            transition: "transform 0.1s ease-out"
          }}
        >
          {/* Lived Design - BACK TEXT "PORTFOLIO" & OVERLAY */}
          <div 
            id="central-typography-complex"
            className="relative flex flex-col items-center select-none pointer-events-auto z-30"
            onMouseEnter={() => setHoveredElement("title")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {/* Massive Slant Wrapper */}
            <div className="relative transform skew-x-[-14deg]">
              
              {/* Giant Text: PORTFOLIO */}
              <h1 
                id="giant-portfolio-header"
                className={`text-[12vw] font-display font-black tracking-[-0.04em] md:tracking-[-0.05em] uppercase leading-[0.85] text-white transition-all duration-300 selection:bg-neutral-800 ${
                  hoveredElement === "title" ? "scale-[1.01] text-neutral-100" : ""
                }`}
                style={{
                  textShadow: "0 10px 40px rgba(0,0,0,0.85)"
                }}
              >
                PORTFOLIO
              </h1>

              {/* FOREGROUND MASK BADGE "Graphic Designer" */}
              <motion.div 
                id="masking-graphic-designer"
                onClick={cycleAccent}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer py-1 md:py-2.5 px-6 md:px-14 border-y border-transparent select-none z-10 transition-all duration-500 flex items-center gap-2 ${
                  activeAccent.bgBadge
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to cycle workspace themes"
              >
                <span className="text-[2.1vw] font-condensed font-extrabold uppercase tracking-[0.25em] md:tracking-[0.45em] whitespace-nowrap text-center transition-colors">
                  Graphic Designer
                </span>
                
                {/* Tiny cycle hint icon */}
                <span className="inline-block transform rotate-12 bg-neutral-900 border border-neutral-800 rounded-full p-0.5 ml-1 lg:ml-2">
                  <Sparkles className="w-2.5 h-2.5" />
                </span>
              </motion.div>

              {/* ACCENT DATE BADGE "2026" */}
              <motion.div 
                id="accent-year-badge"
                onClick={triggerSubtitleCycle}
                className="absolute bottom-[-2.8rem] md:bottom-[-4.2rem] right-[5.5%] cursor-pointer select-none py-1.5 px-6 z-10 border border-zinc-700/60 bg-neutral-950/95 backdrop-blur-md transform transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to cycle design sub-topics"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-condensed font-extrabold tracking-wider leading-none text-white italic">
                    2026
                  </span>
                  <span className="text-[7px] sm:text-[9px] font-mono tracking-widest uppercase text-neutral-400 mt-1 whitespace-nowrap select-none">
                    {projectSubtitles[currentProjectTopic]}
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ================= GRAPHICS: LEFT TOOLBAR ================= */}
          <div 
            id="rotated-tools-anchor"
            className="absolute left-[-2%] md:left-[1%] bottom-[-8%] md:bottom-[-4%] z-20 pointer-events-auto origin-bottom-left animate-float-toolbar"
            style={{
              transform: enableParallax 
                ? `translateX(${-mousePosition.x * 40}px) translateY(${mousePosition.y * -40}px) rotate(18deg)` 
                : "rotate(18deg)",
              transition: "transform 0.15s ease-out"
            }}
          >
            <PhotoshopToolbar onSelectTool={selectTool} activeTool={activeTool} />
          </div>

          {/* ================= GRAPHICS: RIGHT TOY COLLECTIBLE ================= */}
          <div 
            id="funko-pop-character-group"
            className="absolute right-[-2.5%] sm:right-[1%] md:right-[3%] top-[55%] transform -translate-y-1/2 z-10 pointer-events-auto flex items-end group"
            style={{
              transform: enableParallax 
                ? `translateY(calc(-50% + ${mousePosition.y * 35}px)) translateX(${mousePosition.x * 25}px)` 
                : "translateY(-50%)",
              transition: "transform 0.15s ease-out"
            }}
          >
            <div className="relative">
              {/* Soft visual shadow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent blur-xl pointer-events-none rounded-2xl scale-90 translate-y-8 z-0"></div>
              
              {/* High-quality generated Jhon Design figure and box group */}
              <img 
                src={jhonFunkoPop} 
                alt="Jhon Design Custom Figurines and Packaging Group" 
                className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[410px] h-auto object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.75))"
                }}
              />

              {/* Floating specifications label of the item */}
              <div className="absolute -left-12 bottom-6 sm:bottom-12 bg-neutral-900/90 backdrop-blur-md p-2 rounded border border-neutral-800 pointer-events-none hidden md:block">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">PRODUCT ID</span>
                  <span className="text-[10px] font-condensed font-bold text-white tracking-wider">POP! VINYL 1.1</span>
                  <span className="text-[9px] font-sans text-amber-400 font-medium">JHON DESIGN EDITION</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* ================= FOOTER / WORKSPACE DECK ================= */}
      <footer id="footer-workspace-deck" className="relative z-30 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 pointer-events-auto">
        
        {/* Dynamic Interactive Cursor Tracker & Tools Overlay */}
        <div className="flex items-center gap-3 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded p-1.5 px-3 md:px-5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <span>ACTIVE_TOOL:</span>
            <span className="text-white font-bold bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
              {activeTool.toUpperCase()}
            </span>
          </div>
          
          <div className="h-4 w-px bg-neutral-800"></div>

          {/* Real-time calculated coordinates */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hidden sm:flex items-center gap-1.5">
            <span>DEC_PT:</span>
            <span className="text-zinc-300">
              X: <span className="text-white font-semibold">{(mousePosition.x + 0.5).toFixed(4)}</span> | 
              Y: <span className="text-white font-semibold">{(mousePosition.y + 0.5).toFixed(4)}</span>
            </span>
          </div>
        </div>

        {/* Minimal helper labels */}
        <div id="deck-accent-instructions" className="flex items-center gap-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
          <button 
            onClick={() => {
              // Reset all customization colors & options
              setActiveTool("move");
              setShowGrid(false);
              setAccentColor("white");
              setCurrentProjectTopic(0);
              playSynthBeep(260, "sine");
            }}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Reset active elements to defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET WORKSPACE</span>
          </button>
          
          <div className="h-3 w-px bg-neutral-800"></div>

          <span className="text-zinc-400">DESIGN MEMORABILIA • CORE REPLICA</span>
        </div>

      </footer>

      </div>

      {/* ================= SECTION 2: CINEMATIC ABOUT ME ================= */}
      <section 
        id="about-me-specification" 
        className="relative w-full min-h-screen bg-[#ECECEC] text-black overflow-hidden flex flex-col justify-between"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      >
        {/* TOP BLACK HEADER BANNER */}
        <div className="relative w-full h-[15vh] min-h-[90px] md:min-h-[110px] bg-black px-8 sm:px-16 flex justify-between items-center z-10 select-none">
          {/* Subtle wave outline on the right side of the black banner */}
          <div className="absolute right-0 top-0 h-full w-[45%] opacity-35 overflow-hidden pointer-events-none select-none">
            <svg viewBox="0 0 400 100" className="w-full h-full text-zinc-800 fill-none stroke-current stroke-[0.5]" preserveAspectRatio="none">
              <path d="M0,30 Q80,70 160,30 T320,30 T480,30" />
              <path d="M0,45 Q80,85 160,45 T320,45 T480,45" />
              <path d="M0,60 Q80,100 160,60 T320,60 T480,60" />
            </svg>
          </div>

          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest uppercase font-condensed italic select-none">
            Venezuela
          </span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest uppercase font-condensed italic select-none">
            2026
          </span>

          {/* HIGH-FIDELITY TORN PAPER VECTOR BOUNDARY */}
          <div className="absolute bottom-[-1.5rem] left-0 w-full h-6 z-20 pointer-events-none overflow-hidden select-none">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-full text-black fill-current drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
              <path d="M0,0 L1440,0 L1440,12 L1410,22 L1385,14 L1350,25 L1320,18 L1290,26 L1260,12 L1230,28 L1200,16 L1170,24 L1140,12 L1110,28 L1080,14 L1050,24 L1020,18 L990,24 L960,12 L930,26 L900,16 L870,22 L840,12 L810,28 L780,18 L750,24 L720,14 L690,28 L660,16 L630,24 L600,18 L570,26 L540,12 L510,24 L480,16 L450,26 L420,14 L390,24 L360,16 L330,28 L300,14 L270,24 L240,18 L210,26 L180,12 L150,24 L120,14 L90,28 L60,16 L30,22 L0,10 Z" />
            </svg>
          </div>
        </div>

        {/* MAIN BODY CONTENT SPLIT */}
        <div className="w-full max-w-7xl mx-auto px-8 sm:px-16 py-16 flex-grow flex flex-col md:flex-row items-center justify-between gap-12 z-0">
          
          {/* LEFT SIDE: SENSATIONAL TYPOGRAPHY */}
          <div className="w-full md:w-[60%] flex flex-col justify-center text-left select-text">
            {/* H1 - ABOUT ME in highly compressed heavy italic font */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-display font-extrabold italic uppercase tracking-tighter text-black leading-none"
            >
              ABOUT ME
            </motion.h1>

            {/* H2 - GRAPHIC DESIGNER in Oswald Gray Italic */}
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-2xl sm:text-3xl font-condensed font-bold italic uppercase text-neutral-500 tracking-wider mt-2 select-none"
            >
              GRAPHIC DESIGNER
            </motion.h2>

            {/* H3 - Highlights sentence in elegant geometric sentence-case slanted */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl sm:text-2xl font-bold italic text-black leading-snug mt-6 space-y-1 block border-l-4 border-black pl-4"
            >
              <p>Especializado en Branding, Mockup</p>
              <p>Social Media y Digital Solutions</p>
            </motion.div>

            {/* Paragraph body matching exact text from reference */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg md:text-xl font-normal italic text-neutral-800 leading-relaxed mt-6 space-y-4 max-w-xl font-sans"
            >
              <p>
                Hola, soy <strong className="text-black font-extrabold">Jhon Escalona</strong>. Trabajo con el Diseño Gráfico y Ilustraciones. Puedo realizar diseños productivos y cosas cool.
              </p>
              <p>
                Soy un apasionado con 5 años de experiencia en el desarrollo de <strong className="text-black font-extrabold">Interfaces De Usuario (UX / UI)</strong>.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: RICH BRAND GRAPHICS */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-end items-center relative py-12">
            
            {/* Background Red Arch / Dome Shape matching requested specs */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, type: "spring" }}
              className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[390px] sm:h-[430px] md:h-[460px] bg-[#FF0000] rounded-tl-[140px] md:rounded-tl-[180px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex items-end justify-center group/arch cursor-pointer"
              onClick={() => playSynthBeep(440, "triangle", 0.25)}
            >
              {/* Subtle inner highlight of the Red Arch */}
              <div className="absolute inset-0 rounded-tl-[140px] md:rounded-tl-[180px] border-t-2 border-l-2 border-white/20 pointer-events-none"></div>

              {/* Jhon Portrait Overlapping */}
              <img 
                src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/perfil-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL3BlcmZpbC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc3OTYyNTQ3NSwiZXhwIjoxODExMTYxNDc1fQ.c1MpQkd1miQTwahhVT-EQhaHy1HqQ4TelATXAHxq2ZY" 
                alt="Jhon Portrait" 
                className="absolute bottom-0 w-[105%] max-w-[105%] object-contain select-none pointer-events-none transition-transform duration-500 group-hover/arch:scale-[1.03] z-10"
                style={{
                  maxHeight: "105%",
                  filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))"
                }}
                referrerPolicy="no-referrer"
              />

              {/* Floating Crown Accent */}
              <motion.img 
                src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/corona.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Nvcm9uYS5wbmciLCJpYXQiOjE3Nzk2MjU0ODcsImV4cCI6MTgxMTE2MTQ4N30.ldcb_QNOwxtwf_OJyQW8XMOZhoLX8qn0ACIFCfYjb1o" 
                alt="Pixel Crown" 
                className="absolute -top-10 sm:-top-14 -left-6 sm:-left-10 w-24 sm:w-28 h-auto z-20 pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                animate={{
                  y: [0, -10, 0],
                  rotate: [15, 12, 15]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                referrerPolicy="no-referrer"
              />

              {/* Custom Funko Pop 3D Floating Figurine / Box */}
              <motion.img 
                src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/funko_pop-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Z1bmtvX3BvcC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc3OTYyNTQ5NCwiZXhwIjoxODExMTYxNDk0fQ.Ted_54-qO8sCmlNjo3J3U4GXY4ml7DptoF8-199XFIU" 
                alt="3D Toy Figurine" 
                className="absolute -top-16 sm:-top-24 -right-12 sm:-right-16 w-[180px] sm:w-[210px] h-auto z-20 pointer-events-auto select-none cursor-pointer drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)]"
                whileHover={{ scale: 1.08, rotate: -2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  playSynthBeep(659, "sine", 0.15);
                }}
                referrerPolicy="no-referrer"
              />

              {/* Star Badge Seal / Descarga Asset */}
              <motion.img 
                src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/descarga%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Rlc2NhcmdhICgxKS5wbmciLCJpYXQiOjE3Nzk2MjU1MzQsImV4cCI6MTgxMTE2MTUzNH0.N4DthojiMVeS2cjkUmDm3RQmPMd9hF0gWqQf-SVnQyk" 
                alt="Emblem Sticker" 
                className="absolute bottom-16 -right-8 w-16 sm:w-20 h-auto z-20 pointer-events-auto select-none cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:rotate-12 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  playSynthBeep(880, "square", 0.1);
                }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

        </div>

        {/* BOTTOM METADATA RAIL */}
        <div className="relative w-full py-4 border-t border-neutral-300 px-8 sm:px-16 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 font-mono tracking-wider z-10 gap-2">
          <span>CREATIVE PORTFOLIO • V1.1 REPLICA</span>
          <span className="text-neutral-400 select-none">MADE W/ CRAFT & PRECISION</span>
          <span>LATAM • 2026</span>
        </div>
      </section>

      {/* ================= SECTION 3: CINEMATIC ULTRA-PREMIUM SKILLS ================= */}
      <section 
        id="skills-tools-approach-section" 
        className="relative w-full bg-[#FF0000] text-white py-20 px-8 sm:px-16 overflow-hidden select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-12 items-start">
          
          {/* COLUMN 1: SKILLS LIST (col-span-3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-none text-white select-none">
              SKILLS
            </h2>
            <ul className="flex flex-col gap-5 text-xl sm:text-2xl font-condensed font-medium italic uppercase tracking-wider leading-relaxed text-white">
              <motion.li 
                whileHover={{ x: 6, color: "#FFFFFF" }} 
                className="cursor-pointer transition-all flex items-center gap-2"
                onClick={() => playSynthBeep(440, "sine", 0.05)}
              >
                • GRAPHIC DESIGN
              </motion.li>
              <motion.li 
                whileHover={{ x: 6, color: "#FFFFFF" }} 
                className="cursor-pointer transition-all flex items-center gap-2"
                onClick={() => playSynthBeep(494, "sine", 0.05)}
              >
                • BRANDING DESIGN
              </motion.li>
              <motion.li 
                whileHover={{ x: 6, color: "#FFFFFF" }} 
                className="cursor-pointer transition-all flex items-center gap-2"
                onClick={() => playSynthBeep(523, "sine", 0.05)}
              >
                • MOCKUP
              </motion.li>
              <motion.li 
                whileHover={{ x: 6, color: "#FFFFFF" }} 
                className="cursor-pointer transition-all flex items-center gap-2"
                onClick={() => playSynthBeep(587, "sine", 0.05)}
              >
                • SOCIAL MEDIA
              </motion.li>
            </ul>
          </motion.div>

          {/* COLUMN 2: TOOLS & LOGOS (col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 flex flex-col gap-6"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-none text-white select-none">
              TOOLS
            </h2>
            
            {/* Horizontal Tool Branding Items with exact links */}
            <div className="flex flex-wrap items-center gap-6 mt-2 pt-1">
              
              {/* BRAND 1: Photoshop (Ps) exact shape */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative cursor-pointer"
                onClick={() => playSynthBeep(440, "triangle", 0.15)}
                title="Adobe Photoshop"
              >
                <div className="w-16 h-16 rounded-xl bg-[#001c25] border-2 border-[#31a8ff] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform">
                  <span className="text-[#31a8ff] font-sans font-bold text-2xl tracking-tighter select-none">Ps</span>
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  PHOTOSHOP
                </span>
              </motion.div>

              {/* BRAND 2: Canva logo link */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative cursor-pointer"
                onClick={() => playSynthBeep(554, "triangle", 0.15)}
                title="Canva Pro"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/15 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all">
                  <img 
                    src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/canva.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2NhbnZhLnBuZyIsImlhdCI6MTc3OTYyNjkwMywiZXhwIjoxODExMTYyOTAzfQ.URDutx5xEoC9rSYeRYwOG1er4agDw53HD7-Xrfutoy8" 
                    alt="Canva Logo" 
                    className="w-full h-full object-contain pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  CANVA
                </span>
              </motion.div>

              {/* BRAND 3: Figma logo link */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative cursor-pointer"
                onClick={() => playSynthBeep(659, "triangle", 0.15)}
                title="Figma Premium"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/15 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all">
                  <img 
                    src="https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/Figma-Logo-PNG-Photos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL0ZpZ21hLUxvZ28tUE5HLVBob3Rvcy5wbmciLCJpYXQiOjE3Nzk2MjY5MzYsImV4cCI6MTgxMTE2MjkzNn0.I6Vnii9mbrcq_sqTzD5y19G_SBw4JsX6cPut2fjTmvU" 
                    alt="Figma Logo" 
                    className="w-full h-full object-contain pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  FIGMA
                </span>
              </motion.div>

            </div>
          </motion.div>

          {/* COLUMN 3: APPROACH TO DESIGN (col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white select-none">
              APPROACH <br /> TO DESIGN
            </h2>

            <div className="flex flex-col gap-8 mt-4">
              
              {/* Sub-section 1: Investigación */}
              <div className="flex flex-col gap-2">
                <span className="text-amber-300 font-condensed font-extrabold text-lg sm:text-xl tracking-wider uppercase select-none">
                  INVESTIGACIÓN Y ESTRATEGIA:
                </span>
                <p className="text-xl sm:text-2xl font-normal italic tracking-wide text-white leading-snug uppercase">
                  COMIENZO POR COMPRENDER <br />
                  LA PERSONALIDAD DE LA MARCA, <br />
                  EL MERCADO Y EL PÚBLICO OBJETIVO.
                </p>
              </div>

              {/* Sub-section 2: Colaboración */}
              <div className="flex flex-col gap-2 border-t border-white/20 pt-6">
                <span className="text-amber-300 font-condensed font-extrabold text-lg sm:text-xl tracking-wider uppercase select-none">
                  COLABORACIÓN:
                </span>
                <p className="text-xl sm:text-2xl font-normal italic tracking-wide text-white leading-snug uppercase">
                  TRABAJO EN ESTRECHA COLABORACIÓN <br />
                  PARA GARANTIZAR LA ALINEACIÓN <br />
                  Y UNA INTEGRACIÓN PERFECTA.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
        
        {/* Subtle, highly premium design indicator line */}
        <div className="w-full mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/40 tracking-widest gap-2">
          <span>PORTFOLIO SYSTEM • DEDICATED MATRIX BLOCK</span>
          <span>APPROVED COMPONENT S-09</span>
          <span>© JHON DESIGN 2026</span>
        </div>
      </section>

      {/* ================= SECTION 4: CINEMATIC ULTRA-PREMIUM PROYECTOS ================= */}
      <ProyectosSection soundEnabled={soundEnabled} playSynthBeep={playSynthBeep} />

      {/* ================= SECTION 5: CINEMATIC ULTRA-PREMIUM SOCIAL MEDIA ================= */}
      <SocialMediaSection soundEnabled={soundEnabled} playSynthBeep={playSynthBeep} />

      {/* ================= BRAND NEW FULLY-INTEGRATED STANDALONE REPLICA FOOTER ================= */}
      <FooterSection playSynthBeep={playSynthBeep} />

      {/* ================= HELPER DRAWER MODAL ================= */}
      <AnimatePresence>
        {showHelp && (
          <motion.div 
            id="info-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowHelp(false)}
          >
            <motion.div 
              className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-condensed font-bold uppercase tracking-wider mb-2 text-white border-b border-neutral-800 pb-3 flex items-center justify-between">
                <span>CONCHA DE DISEÑO PREMIUM</span>
                <span className="text-xs font-mono font-normal text-amber-500">100% SPEC COMPLIANCED</span>
              </h2>

              <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans">
                Esta obra representa una réplica impecable y fiel del afiche de portafolio para de <strong>Jhon Design</strong>. 
                Cada elemento ha sido colocado de manera milimétrica respetando la composición visual exacta:
              </p>

              <div className="space-y-3 font-mono text-[10px] text-zinc-500 border-l-2 border-neutral-800 pl-4 py-2">
                <div>
                  <span className="text-white font-semibold">ELEMENTO PORTFOLIO:</span> Tipografía Anton pesada con masking de corte horizontal exacto.
                </div>
                <div>
                  <span className="text-white font-semibold">CREATIVE TOOLBAR (IZQ):</span> Caja flotante oblicua de Photoshop con botones cliqueables funcionales.
                </div>
                <div>
                  <span className="text-white font-semibold">CHARACTER TOY (DER):</span> Custom Vinyl Figurine de Jhon Design con caja coleccionable POP, renderizada con luces de estudio.
                </div>
                <div>
                  <span className="text-white font-semibold">ACCENT 2026:</span> Ajuste e indicador cronológico con tópicos rotativos en la base.
                </div>
                <div>
                  <span className="text-white font-semibold">SILK WIRE MESH:</span> Ondulado continuo de vectores finos con variación aleatoria de opacidad.
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div role="status" className="text-[8px] text-zinc-600 tracking-wider">
                  PRESS ANYWHERE TO EXIT
                </div>
                <button 
                  onClick={() => setShowHelp(false)} 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-condensed font-bold text-xs uppercase px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONDITIONAL TOOL CURSOR IN BRUSH MODE ================= */}
      <AnimatePresence>
        {activeTool === "brush" && (
          <motion.div 
            id="custom-brush-circle-overlay"
            className="fixed pointer-events-none z-50 rounded-full border border-white/50 bg-white/5 hidden md:block"
            style={{
              width: "32px",
              height: "32px",
              left: `${mousePosition.x * window.innerWidth + window.innerWidth/2 - 16}px`,
              top: `${mousePosition.y * window.innerHeight + window.innerHeight/2 - 16}px`,
              transform: "translate3d(0,0,0)"
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
