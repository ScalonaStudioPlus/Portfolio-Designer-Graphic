import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Sparkles, ArrowRight, Instagram, Smartphone, Shield, ZoomIn, Globe } from "lucide-react";

interface SocialMediaSectionProps {
  soundEnabled: boolean;
  playSynthBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
}

export default function SocialMediaSection({ soundEnabled, playSynthBeep }: SocialMediaSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredCanvas, setHoveredCanvas] = useState(false);
  const [relativeCoords, setRelativeCoords] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"viewport" | "analytics" | "metadata">("viewport");
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Exact provided SocialMedia visual asset URL
  const socialMediaUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/SocialMedia.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL1NvY2lhbE1lZGlhLnBuZyIsImlhdCI6MTc3OTYyOTUxMSwiZXhwIjoxODExMTY1NTExfQ.mpo3NNt-7DrA2T885VBrrCyRj4XXMz0dzPv3gEDjMtE";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - left) / width, 0), 1);
    const y = Math.min(Math.max((e.clientY - top) / height, 0), 1);
    setRelativeCoords({ x, y });
  };

  const triggerClick = () => {
    setIsFullscreen(true);
    playSynthBeep(523.25, "triangle", 0.2); // C5 note for opening
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    playSynthBeep(392.00, "triangle", 0.15); // G4 note for closing
  };

  return (
    <section 
      id="social-media-branding-section"
      className="relative w-full bg-neutral-950 text-white py-24 sm:py-32 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-neutral-900"
    >
      {/* Decorative vertical blueprint lines & grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-25" />
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-650/10 pointer-events-none hidden md:block" />
      <div className="absolute right-8 top-0 bottom-0 w-[1px] bg-red-650/10 pointer-events-none hidden md:block" />

      {/* Decorative side coordinates markers */}
      <div className="absolute left-3 top-10 font-mono text-[7px] text-zinc-650 select-none tracking-widest hidden lg:block">SYS_GRID_04 // LOC_LATAM_1.1</div>
      <div className="absolute right-3 top-10 font-mono text-[7px] text-zinc-650 select-none tracking-widest hidden lg:block">SECURE_DYS_BLOCK_S-12</div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-6 items-start relative z-10">
        
        {/* ================= LEFT COLUMN: STICKY BIG TYPOGRAPHY ================= */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-24 min-h-[30vh] lg:min-h-[50vh]">
          
          <span className="font-mono text-[10px] text-zinc-500 tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF0000] rounded-full animate-pulse" />
            04 • ADAPTACIÓN DIGITAL & FEED DE MARCA
          </span>

          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-none text-left select-none"
          >
            <span className="text-white block">SOCIAL</span>
            <span className="text-[#FF0000] block mt-1">MEDIA</span>
          </motion.h2>

          <p className="mt-8 text-lg sm:text-xl font-sans font-light text-zinc-400 max-w-md leading-relaxed italic uppercase">
            DESPlIEGUE INTEGRAL DE REDES SOCIALES PARA LA COCINA D_ CHUY. COMPOSICIÓN GEOMÉTRICA CON ESTRUCTURACIÓN DE LOGOS ALTERNOS, DISEÑO DE DESTACADOS Y COMUNICACIÓN VISUAL DE ALTO RENDIMIENTO.
          </p>

          {/* Interactive Specification Tags */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">CUENTA OFICIAL</span>
              <span className="text-xs font-mono text-white tracking-wider uppercase font-bold flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer" onClick={() => playSynthBeep(440, "sine", 0.05)}>
                <Instagram size={12} className="text-red-500" /> @lacocina_de_chuy_co
              </span>
            </div>
            <div className="h-px sm:h-8 w-12 sm:w-px bg-zinc-850" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">ENTREGABLES</span>
              <span className="text-xs font-mono text-white tracking-wider uppercase font-bold">GRID DESIGN, S-02 CORES, HIGHLIGHTS</span>
            </div>
          </div>

          {/* Luxury tab control inside the sticky side column */}
          <div className="mt-10 max-w-sm border border-zinc-800/60 rounded-xl p-1 bg-zinc-950/60 flex items-center justify-between gap-1">
            <button 
              onClick={() => { setActiveTab("viewport"); playSynthBeep(523, "sine", 0.02); }}
              className={`flex-1 text-center py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-lg transition-all ${activeTab === "viewport" ? "bg-red-650 text-white shadow-lg shadow-red-950/20" : "text-zinc-500 hover:text-white"}`}
            >
              Vista Core
            </button>
            <button 
              onClick={() => { setActiveTab("analytics"); playSynthBeep(587, "sine", 0.02); }}
              className={`flex-1 text-center py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-lg transition-all ${activeTab === "analytics" ? "bg-red-650 text-white shadow-lg shadow-red-950/20" : "text-zinc-500 hover:text-white"}`}
            >
              Métricas UI
            </button>
            <button 
              onClick={() => { setActiveTab("metadata"); playSynthBeep(659, "sine", 0.02); }}
              className={`flex-1 text-center py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-lg transition-all ${activeTab === "metadata" ? "bg-red-650 text-white shadow-lg shadow-red-950/20" : "text-zinc-500 hover:text-white"}`}
            >
              Metadatos
            </button>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeTab === "viewport" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase border-l-2 border-red-600 pl-4"
                >
                  INTERFAZ SMARTPHONE COMPUESTA DIRECTO BAJO RELACIÓN DE RENDIMIENTO DE ASPECTO 19.5:9. FILTRADO VECTORIAL EXACTO S-02 PARA PRESERVAR CONTRASTE SÓLIDO EN CUALQUIER SISTEMA OPERATIVO MÓVIL.
                </motion.div>
              )}
              {activeTab === "analytics" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-1.5 bg-zinc-900/40 p-3 rounded-lg border border-zinc-850"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-500">RELACIÓN DE CONTRASTE:</span>
                    <span className="text-green-400 font-bold">21:1 (AAA COMPLIANT)</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-500">DIAGRAMACIÓN DEL GRID:</span>
                    <span className="text-white">3 COLUMNAS SIMÉTRICAS</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-500">ADAPTABILIDAD RESPONSIVA:</span>
                    <span className="text-amber-400">EXACTA MULTIPART BEZEL</span>
                  </div>
                </motion.div>
              )}
              {activeTab === "metadata" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-1 bg-black/40 border border-zinc-900 rounded-lg p-3 text-[8.5px] font-mono text-zinc-400"
                >
                  <div>FILE_TYPE: PNG COMBO BANNER</div>
                  <div>FILE_SIZE: 3.2MB RENDERED AT 300DPI</div>
                  <div>HASH_SPEC: DB_F73_9629511</div>
                  <div>STATUS: APPROVED FOR DIGITAL PRODUCTION</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest max-w-sm">
            <span>SISTEMA REPLICA 2026</span>
            <span>SPEC DE COMPOSICIÓN S-12</span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: EXQUISITE INTEGRATED COMPOSITION CARD ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => { setHoveredCanvas(true); playSynthBeep(784, "sine", 0.02); }}
            onMouseLeave={() => setHoveredCanvas(false)}
            onClick={triggerClick}
            className="w-full rounded-2xl overflow-hidden bg-[#050505] border border-zinc-850 group relative cursor-pointer shadow-3xl transition-all hover:border-red-650/40"
            id="social-media-main-compose-card"
          >
            {/* Interactive Dark Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70 pointer-events-none" />

            {/* Simulated HUD layout overlay tags on corners */}
            <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-zinc-400 uppercase tracking-widest bg-black/80 px-2 py-1 rounded backdrop-blur border border-zinc-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <span>ACTIVE SOCIAL ENGINE // PR_04</span>
            </div>

            <div className="absolute top-4 right-4 z-20 font-mono text-[8px] text-zinc-500 bg-black/80 px-2 py-1 rounded backdrop-blur border border-zinc-800 flex items-center gap-2">
              <Smartphone size={10} className="text-zinc-400" />
              <span>RESOLUTION // 2048 x 1024 PX</span>
            </div>

            {/* Absolute coordinates display in real-time */}
            <div className={`absolute bottom-4 left-4 z-30 font-mono text-[7.5px] text-zinc-450 bg-black/80 px-2 py-1 rounded backdrop-blur border border-neutral-800 flex items-center gap-1.5 transition-all duration-300 ${hoveredCanvas ? "opacity-100" : "opacity-0"}`}>
              <span>MARKER: [ {(relativeCoords.x).toFixed(3)} , {(relativeCoords.y).toFixed(3)} ]</span>
            </div>

            {/* Click to expand hover hint */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 pointer-events-none flex flex-col items-center gap-2 bg-black/85 border border-zinc-800/80 px-4 py-2.5 rounded-lg backdrop-blur ${hoveredCanvas ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <ZoomIn size={14} className="text-red-500 animate-pulse" />
              <span className="text-[8.5px] font-mono font-bold tracking-widest text-white uppercase leading-none">CLICK PARA INSPECCIONAR</span>
            </div>

            {/* High-fidelity Visual Asset Image wrapper */}
            <div className="w-full aspect-[2/1] overflow-hidden leading-[0] relative bg-black flex items-center justify-center p-0.5">
              
              {/* Mesh scanner line scanning effect */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-red-650/30 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20 animate-move-line pointer-events-none" />

              <img 
                src={socialMediaUrl}
                alt="La Cocina D Chuy - Instagram Feed & Social Media Grid"
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info footer bar on composing container */}
            <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black via-black/90 to-transparent z-20 pt-8 px-6 pb-5 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Shield size={10} className="text-red-550 animate-pulse" /> CERTIFIED INSTAGRAM COMBO
                </span>
                <h3 className="text-xl font-display font-black tracking-tight text-white uppercase leading-none">MOCKUP ESTUDIO SOCIAL</h3>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">MOBILE LAYOUT VIEWPORT & GRID PIXELS</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-red-650 group-hover:border-red-500 transition-all shadow-md backdrop-blur">
                <Maximize2 size={13} />
              </div>
            </div>

            {/* Tech details hover highlight mask */}
            <div className="absolute inset-0 bg-red-950/90 mix-blend-multiply opacity-0 group-hover:opacity-[0.035] transition-opacity z-15" />
          </motion.div>
        </div>

      </div>

      {/* ================= FULL-SCREEN IMMERSIVE LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            id="social-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-xl z-55 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={closeFullscreen}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Technical Grid Background Accent */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-20" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Image Showcase Area (col-span-8) */}
                <div className="lg:col-span-8 bg-[#040404] min-h-[300px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-zinc-850 relative">
                  
                  {/* Status Overlay */}
                  <div className="absolute top-6 left-6 font-mono text-[8px] text-zinc-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-650 rounded-full animate-pulse" />
                    <span>SPECTRAL ANALYSIS HUD • ULTRA PREVIEW</span>
                  </div>

                  <img 
                    src={socialMediaUrl} 
                    alt="Social Media High Fidelity Composite"
                    className="w-full h-auto max-h-[520px] object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-[1.015]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Specification & Details Sidebar (col-span-4) */}
                <div className="lg:col-span-4 p-8 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-[#FF0000] tracking-widest font-bold uppercase">
                        COMBO SPEC FILE
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500">
                        VERSIÓN 1.25 // 2026
                      </span>
                    </div>

                    <h3 className="text-3xl font-display font-black tracking-tight text-white uppercase leading-none">
                      INSTAGRAM PROFILE
                    </h3>
                    <p className="text-zinc-500 text-xs font-mono uppercase mt-1 tracking-wider flex items-center gap-1.5">
                      <Smartphone size={10} className="text-red-500" /> DIGITAL DELIVERY SPEC SYSTEM
                    </p>

                    <div className="my-6 border-t border-zinc-850/60 pt-6">
                      <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                        <Sparkles size={8} className="text-amber-400" /> ESPECIFICACIÓN ANALÍTICA
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed font-sans font-normal italic uppercase">
                        "UNIFICACIÓN DE PLATAFORMA DIGITAL MEDIANTE LA SINCRONIZACIÓN DE COLORES PRIMARIOS INSTITUCIONALES EN PERFIL CON S-02 CORES. EXPOSICIÓN VECTORIAL COMPATIBLE CON MÁS DE 98% DE DISPOSITIVOS RETINA DISPONIBLES."
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-zinc-850/60 pt-6">
                      <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3 font-bold">
                        DIAGRAMA DE CONTRASTE SMARTPHONE
                      </h4>
                      <div className="space-y-2 bg-black/40 border border-zinc-900 rounded-xl p-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900/60 pb-1.5 last:border-b-0">
                          <span className="uppercase text-zinc-400">• PERFIL INSTAGRAM</span>
                          <span className="text-white text-right">@lacocina_de_chuy_co</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900/60 pb-1.5 last:border-b-0">
                          <span className="uppercase text-zinc-400">• STORY HIGHLIGHTS</span>
                          <span className="text-white text-right">MENÚ | UBICACIÓN | HORARIO</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900/60 pb-1.5 last:border-b-0">
                          <span className="uppercase text-zinc-400">• COMPONENTES DE FEED</span>
                          <span className="text-white text-right">PINNED LOGO S-02 MAIN</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900/60 pb-1.5 last:border-b-0">
                          <span className="uppercase text-zinc-400">• DIMENSIONES DE MOCK</span>
                          <span className="text-white text-right">2048 x 1024 PX (2:1 WIDESCREEN)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center">
                    <span role="status" className="text-[8px] text-zinc-600 tracking-wider">
                      PRESIONE FUERA PARA SALIR DE LA HOJA S-12
                    </span>
                    <button 
                      onClick={closeFullscreen}
                      className="bg-red-650 hover:bg-red-600 border border-red-500 text-white font-condensed font-bold text-xs uppercase px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
                    >
                      Cerrar Vista <ArrowRight size={12} />
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle, highly premium design indicator line */}
      <div className="w-full mt-24 pt-8 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-zinc-500 tracking-widest gap-2">
        <span>PORTFOLIO DIGITAL ADAPTACIÓN DE ACCESO • MOCKUP DE MARCA</span>
        <span>APPROVED DIGITAL BLOCK S-12</span>
        <span>© JHON DESIGN 2026</span>
      </div>
    </section>
  );
}
