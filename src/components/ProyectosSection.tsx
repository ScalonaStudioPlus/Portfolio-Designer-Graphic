import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Sparkles, ExternalLink, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface ProyectosSectionProps {
  soundEnabled: boolean;
  playSynthBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
}

export default function ProyectosSection({ soundEnabled, playSynthBeep }: ProyectosSectionProps) {
  const [selectedAsset, setSelectedAsset] = useState<{
    id: string;
    title: string;
    subtitle: string;
    url: string;
    desc: string;
    specs: string[];
  } | null>(null);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [transitionStyle, setTransitionStyle] = useState<"grey" | "branding">("grey");

  // High-Resolution Assets provided in the prompt
  const mainLayoutUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/Proyectos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL1Byb3llY3Rvcy5wbmciLCJpYXQiOjE3Nzk2Mjc3NjMsImV4cCI6MTgxMTE2Mzc2M30.D0r_jwWKJ_Lyu2SEmEf8Izab7-aObC4xJqLCsup-4gk";
  const logo2Url = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/logo2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2xvZ28yLnBuZyIsImlhdCI6MTc3OTYyNzg2NiwiZXhwIjoxODExMTYzODY2fQ.f_GuYrYCguWFu59iYpJkYQWgpXYvqjmclK1VLNq5sEM";
  const rappiBadgeUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/IMG-20260325-WA0076_1_-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL0lNRy0yMDI2MDMyNS1XQTAwNzZfMV8tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3Nzk2Mjc4ODUsImV4cCI6MTgxMTE2Mzg4NX0.BKwtqRwE7VReaFwfsM1y12ybDHPcEEoJx6efvpnO_uc";
  const mockup2Url = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/mockup2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL21vY2t1cDIucG5nIiwiaWF0IjoxNzc5NjI3OTA4LCJleHAiOjE4MTExNjM5MDh9.rP0fYzOC2-qGCQXtF-ukSyKvreAo7m3ZACgW7rqgc7w";
  const paperTransitionUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/paper.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL3BhcGVyLnBuZyIsImlhdCI6MTc3OTYyNjExMiwiZXhwIjoxODExMTYyMTEyfQ.1fcE4I6W7YaVZqGkEs6RT61vr49mgfRqSn2KK4WM8uU";

  const assets = [
    {
      id: "logo-main",
      title: "EMBLEMA DE MARCA PRINCIPAL",
      subtitle: "La Cocina D' Chuy - Logo de Galería",
      url: logo2Url,
      desc: "Emblema circular en slate mate que incluye la icónica tipografía manuscrita, el gorro de chef y un mosaico fotográfico con cuatro platos representativos de la marca.",
      specs: ["Composición: Circular concéntrico", "Paleta: Naranja, Rojo imperial, Blanco frito", "Galería: Arepa, wraps, empanadas y falafel", "Tipografía: Serif cursiva amigable"],
    },
    {
      id: "scooter",
      title: "MOCKUP REPARTO",
      subtitle: "Fotografía Urbana y Aplicación de Marca",
      url: mainLayoutUrl, // We will use custom cropping in the card
      desc: "Fotografía sepia de alto contraste con aplicación del adhesivo de marca principal en el cofre del repartidor, simulando el despliegue urbano del ecosistema de delivery.",
      specs: ["Filtro: Sepia de Alto Contraste", "Soporte: Caja de transporte rígida de fibra", "Color Sólido: Monocromo industrial", "Resolución de mockup: Ultra-fiel"],
    },
    {
      id: "rappi",
      title: "RÉPLICA PARA DELIVERY APP",
      subtitle: "Ecosistema Digital & Integración con Rappi",
      url: rappiBadgeUrl,
      desc: "Variación del emblema adaptada al comercio electrónico con insignia de Rappi integrada, código QR promocional e ilustraciones vectoriales de alimentos rápidos.",
      specs: ["Canal de Venta: Integración con Rappi", "Iconografía: Símbolo del bigote Rappi and mochila", "Formato: badge transparente multiuso", "Estilo: Vector plano con relieve"],
    },
    {
      id: "mockup-wrap",
      title: "DISEÑO DE EMPAQUE (WRAP)",
      subtitle: "Sleeve Packaging Planar y Prototipo 3D",
      url: mockup2Url,
      desc: "Acoplamiento plano y renderizado 3D de la faja de cartón para wraps, mostrando el emblemático tramado azteca blanco y negro en contraste con el verde pino mate.",
      specs: ["Tipo de empaque: Manga cónica autoarmable", "Texturas: Geométrica diamante azteca", "Contraste: Verde botella y fondo blanco", "Contenido visual: Datos de locación e ingrediente representativo"],
    }
  ];

  const handleCardClick = (asset: typeof assets[0]) => {
    setSelectedAsset(asset);
    playSynthBeep(329.63, "triangle", 0.25); // E4 note
  };

  const handleHoverStart = (cardId: string) => {
    setHoveredCard(cardId);
    playSynthBeep(880, "sine", 0.02); // Quick high click
  };

  return (
    <section 
      id="proyectos-branding-section"
      className="relative w-full bg-black text-white py-24 sm:py-32 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-neutral-900"
    >
      {/* ================= DYNAMIC HIGH-FIDELITY REAL TORN PAPER TRANSITION ================= */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none select-none" style={{ transform: "translateY(-50%)" }}>
        {transitionStyle === "grey" ? (
          /* DESIGN 2: Light Grey/White Realistic Layered Torn Paper Transition */
          <div className="relative w-full h-12 sm:h-16 md:h-20 overflow-hidden leading-[0]">
            {/* Soft shadow to elevate paper */}
            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-black/40 blur-[2px] translate-y-full" />
            <svg
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              className="w-full h-full fill-[#fafafa] drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
            >
              <path d="M0,0 L35,55 L75,48 L115,62 L155,50 L195,58 L235,46 L275,55 L315,48 L355,62 L395,50 L435,58 L475,46 L515,55 L555,48 L595,62 L635,50 L675,58 L715,46 L755,55 L795,48 L835,62 L875,50 L915,58 L955,46 L995,55 L1035,48 L1075,62 L1115,50 L1155,58 L1195,46 L1235,55 L1275,48 L1315,62 L1355,50 L1395,58 L1435,46 L1440,55 L1440,0 L0,0 Z" />
            </svg>
            {/* Injected paper deckle inner layered shadow for 3D look */}
            <svg
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full fill-zinc-200/65 mix-blend-multiply opacity-85"
            >
              <path d="M0,0 L32,48 L72,42 L112,54 L152,44 L192,50 L232,40 L272,49 L312,42 L352,54 L392,44 L432,50 L472,40 L512,49 L552,42 L592,54 L632,44 L672,50 L712,40 L752,49 L792,42 L832,54 L872,44 L912,50 L952,40 L992,49 L1032,42 L1072,54 L1112,44 L1152,50 L1192,40 L1232,49 L1272,42 L1312,54 L1352,44 L1392,50 L1432,40 L1440,48 L1440,0 L0,0 Z" />
            </svg>
          </div>
        ) : (
          /* DESIGN 1: Brand Multi-Chrom (Solid Red bar + White spacer + Golden-Yellow torn paper bottom) */
          <div className="relative w-full flex flex-col pt-4">
            {/* Top Red branding stripe */}
            <div className="w-full h-3 bg-[#E50000] border-b border-black/10 shadow-sm" />
            {/* White transition spacer */}
            <div className="w-full h-8 sm:h-10 bg-white" />
            {/* Wavy golden yellow paper tear edge */}
            <div className="relative w-full h-8 sm:h-10 overflow-hidden leading-[0] bg-white">
              <svg
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                className="w-full h-full fill-[#FFC72C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
              >
                <path d="M0,0 L20,35 L50,30 L80,42 L110,32 L140,38 L170,28 L200,35 L230,30 L260,40 L290,32 L320,38 L350,28 L380,35 L410,30 L440,40 L470,32 L500,38 L530,28 L560,35 L590,30 L620,40 L650,32 L680,38 L710,28 L740,35 L770,30 L800,40 L830,32 L860,38 L890,28 L920,35 L950,30 L980,40 L1010,32 L1040,38 L1070,28 L1100,35 L1130,30 L1160,40 L1190,32 L1220,38 L1250,28 L1280,35 L1310,30 L1340,40 L1370,32 L1400,38 L1430,28 L1440,35 L1440,100 L0,100 Z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Decorative vertical blueprint lines & grids to preserve cinematic design theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-600/10 pointer-events-none hidden md:block" />
      <div className="absolute right-8 top-0 bottom-0 w-[1px] bg-red-600/10 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-12 items-start relative z-10">
        
        {/* ================= LEFT COLUMN: STICKY BIG TYPOGRAPHY ================= */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-24 min-h-[30vh] lg:min-h-[50vh]">
          
          <span className="font-mono text-[10px] text-zinc-500 tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            03 • SISTEMA DE IDENTIDAD DE MARCA
          </span>

          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-none text-left select-none"
          >
            <span className="text-white block">LOGO</span>
            <span className="text-red-600 block mt-1">DESIGN</span>
          </motion.h2>

          <p className="mt-8 text-lg sm:text-xl font-sans font-light text-zinc-400 max-w-md leading-relaxed italic uppercase">
            DESARROLLO COMPLETO DE IDENTIDAD PARA LA COCINA D' CHUY. DISEÑO ESTRATÉGICO CON ESTÉTICA ARTESANAL Y UN SISTEMA DE EMPAQUES COHESIVO PARA PLATAFORMAS DE DELIVERY.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">CLIENTE</span>
              <span className="text-xs font-mono text-white tracking-wider uppercase font-bold">LA COCINA D' CHUY</span>
            </div>
            <div className="h-px sm:h-8 w-12 sm:w-px bg-zinc-800" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SERVICIOS</span>
              <span className="text-xs font-mono text-white tracking-wider uppercase font-bold">BRANDING, EMPAQUE, UI DE DELIVERY</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest max-w-sm">
            <span>ENTREGA COMPROMETIDA 2026</span>
            <span>SPEC SECURE S-11</span>
          </div>

          {/* Interactive torn paper selector for cinematic prototype choice */}
          <div className="mt-6 p-3 bg-zinc-950/60 rounded-xl border border-zinc-900/80 max-w-sm flex items-center justify-between gap-4">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.15em] leading-none shrink-0">TRANSICIÓN BORDER:</span>
            <div className="flex gap-1.5">
              <button 
                type="button"
                onClick={() => { setTransitionStyle("grey"); playSynthBeep(440, "sine", 0.05); }}
                className={`px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider rounded transition-all border ${
                  transitionStyle === "grey" 
                    ? "bg-white text-black border-white font-bold" 
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                Gris (Foto 2)
              </button>
              <button 
                type="button"
                onClick={() => { setTransitionStyle("branding"); playSynthBeep(660, "sine", 0.05); }}
                className={`px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider rounded transition-all border ${
                  transitionStyle === "branding" 
                    ? "bg-red-600 text-white border-red-500 font-bold" 
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                Rojo-Amarillo (Foto 1)
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: COLLAGE GRID ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* CARD 1: Primary Circular Label (logo2.png) - White background card */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => handleHoverStart("logo-main")}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(assets[0])}
              className="sm:col-span-1 rounded-2xl overflow-hidden aspect-[4/5] bg-white border border-neutral-200 group relative cursor-pointer shadow-2xl transition-all hover:scale-[1.01]"
              id="project-card-logo-main"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent opacity-40 pointer-events-none" />

              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded border border-zinc-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF0000] rounded-full animate-ping" />
                <span>WHITE COMPONENT // DS_02</span>
              </div>

              {/* Logo asset container */}
              <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-50 relative">
                <img 
                  src={logo2Url}
                  alt="La Cocina D Chuy - Emblema Principal"
                  className="max-w-full max-h-[85%] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay with info on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black via-black/85 to-transparent z-20 pt-8 px-6 pb-6 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">S-02 CORE</span>
                  <h3 className="text-lg font-display font-black tracking-tight text-white uppercase leading-none">EMBLEMA PRINCIPAL</h3>
                  <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider mt-1">CHEF EMBLEM & FOOD GALLERY</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all shadow-lg backdrop-blur">
                  <Maximize2 size={14} />
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Delivery Scooter (Uses custom crop on Proyectos.png to match character style) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.1 }}
              onHoverStart={() => handleHoverStart("scooter")}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(assets[1])}
              className="sm:col-span-1 rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-950 border border-zinc-900 group relative cursor-pointer shadow-2xl transition-all hover:border-red-600/30"
              id="project-card-scooter"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              {/* Pixel Coordinate HUD effect */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-zinc-500 uppercase tracking-widest bg-black/60 px-2 py-1 rounded backdrop-blur border border-zinc-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-pulse" />
                <span>CAMERA_MOCK_A // MC_01</span>
              </div>

              <div className="absolute top-4 right-4 z-20 font-mono text-[8px] text-red-500 tracking-widest px-2 py-1 rounded bg-red-950/40 border border-red-900/30">
                ZOOM DETECTED
              </div>

              {/* Exact crop wrapper focusing on scooter using the source Proyectos.png */}
              <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#070707] relative">
                <img 
                  src={mainLayoutUrl}
                  alt="Scooter Mockup Crop"
                  className="absolute max-w-none w-[345%] h-auto pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transform: "translate(22%, 18%)",
                    transformOrigin: "center center",
                    filter: "sepia(0.85) contrast(1.3) brightness(0.9)",
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scanline premium overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))] z-20" />
              
              {/* Title & Info on bottom */}
              <div className="absolute bottom-6 left-6 right-6 z-30 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">MOCKUP A</span>
                  <h3 className="text-xl font-display font-black tracking-tight text-white uppercase leading-none">MOCKUP REPARTO</h3>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">APLICACIÓN URBANA VÍA ADHESIVO</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all shadow-inner">
                  <Maximize2 size={14} />
                </div>
              </div>

              {/* Tech details hover bar */}
              <div className="absolute inset-0 bg-red-950/90 mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity z-10" />
            </motion.div>

            {/* CARD 3: Custom Packaging Wraps Mockup (mockup2.png) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.15 }}
              onHoverStart={() => handleHoverStart("mockup-wrap")}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(assets[3])}
              className="sm:col-span-2 rounded-2xl overflow-hidden aspect-[16/9] bg-[#f0f2f5] border border-neutral-200 group relative cursor-pointer shadow-2xl transition-all hover:scale-[1.005]"
              id="project-card-mockup-wrap"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-zinc-500 uppercase tracking-widest bg-white px-2 py-1 rounded shadow-sm border border-zinc-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                <span>PROT_MOCK_B // SL_04</span>
              </div>

              {/* Wrap Mockup Asset Container */}
              <div className="w-full h-full flex items-center justify-center p-6 bg-[#eaeef1]">
                <img 
                  src={mockup2Url}
                  alt="La Cocina D Chuy - Packaging sleeve Mockup"
                  className="max-w-[90%] max-h-[90%] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay with info on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/85 to-transparent z-20 pt-12 px-6 pb-6 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest">SL-04 WRAPS</span>
                  <h3 className="text-xl font-display font-black tracking-tight text-white uppercase leading-none">Sleeve de Empaque</h3>
                  <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider mt-1">LAYOUT PLANO & MODELO EN ESTUDIO 3D</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all shadow-lg backdrop-blur">
                  <Maximize2 size={14} />
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Rappi Delivery Sticker Badge (IMG-20260325-WA0076_1_-removebg-preview.png) - BLACK CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.2 }}
              onHoverStart={() => handleHoverStart("rappi")}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(assets[2])}
              className="sm:col-span-1 rounded-2xl overflow-hidden aspect-square bg-[#0a0a0a] border border-zinc-900 group relative cursor-pointer shadow-2xl transition-all hover:border-orange-500/30"
              id="project-card-rappi"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-zinc-400 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded border border-zinc-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>RAPPI INTEGRATION // BT_03</span>
              </div>

              {/* Rappi Badge asset Container */}
              <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-950">
                <img 
                  src={rappiBadgeUrl}
                  alt="La Cocina D Chuy - Rappi Sticker Badge"
                  className="max-w-[85%] max-h-[85%] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-115"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay with info on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/85 to-transparent z-20 pt-10 px-5 pb-5 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-widest">E-COMMERCE INTEGRATION</span>
                  <h3 className="text-base font-display font-black tracking-tight text-white uppercase leading-none">RÉPLICA PARA APP</h3>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider mt-1">PROMOTIONAL SIGNS & QR SYSTEM</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-orange-500 group-hover:border-orange-400 transition-all shadow-md">
                  <Maximize2 size={12} />
                </div>
              </div>
            </motion.div>

            {/* CARD 5: Red Alternative Sticker Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.25 }}
              onHoverStart={() => handleHoverStart("red-circle")}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick({
                id: "red-circle",
                title: "RED ALTERNATE CARD",
                subtitle: "Esquema Cromático Rojo Imperial",
                url: logo2Url, // Uses logo2 inside a beautiful red layout card to exactly replication the bottom right Red card!
                desc: "Variación cromática del emblema principal 'La Cocina D_ Chuy' montada sobre un fondo plano en Rojo de alto contraste para destacar la marca en empaques calientes.",
                specs: ["Paleta: Rojo imperial y carbón mate", "Uso sugerido: Adhesivo para bolsas de reparto", "Contraste: Máximo impacto cromático", "Fondo: #E50000 Sólido"]
              })}
              className="sm:col-span-1 rounded-2xl overflow-hidden aspect-square bg-[#E50000] border border-red-700 group relative cursor-pointer shadow-2xl transition-all hover:scale-[1.01]"
              id="project-card-red-circle"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-white uppercase tracking-widest bg-red-950/60 px-2 py-1 rounded border border-red-900/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                <span>RED VARIANT // S_06</span>
              </div>

              {/* Logo asset container over bold red bg */}
              <div className="w-full h-full flex items-center justify-center p-8 bg-[#E50000]">
                <img 
                  src={logo2Url}
                  alt="La Cocina D Chuy - Red Badge"
                  className="max-w-[85%] max-h-[85%] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-115 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay with info on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/85 to-transparent z-20 pt-10 px-5 pb-5 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest">S-06 ALTERNATE</span>
                  <h3 className="text-base font-display font-black tracking-tight text-white uppercase leading-none">VARIANTE ROJO</h3>
                  <span className="text-[9px] font-mono text-zinc-300 uppercase tracking-wider mt-1">EMPANADA AND AREPA GRAPHICS</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-zinc-950 group-hover:border-zinc-850 transition-all shadow-md">
                  <Maximize2 size={12} />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* ================= LIGHTBOX MODAL WITH FULL DETAILS & RETRO METERS ================= */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div 
            id="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-55 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => {
              setSelectedAsset(null);
              playSynthBeep(261.63, "triangle", 0.15); // C4 note back
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Technical Grid Accent inside lightbox */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-10" />

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Visual Area (col-span-7) */}
                <div className="md:col-span-7 bg-[#070707] min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 sm:p-12 border-b md:border-b-0 md:border-r border-zinc-800 relative">
                  
                  {/* Status Indicator */}
                  <div className="absolute top-6 left-6 font-mono text-[8px] text-zinc-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span>PORTFOLIO ASSET HUD • ACTIVE PREVIEW</span>
                  </div>

                  {selectedAsset.id === "scooter" ? (
                    /* Render full Proyectos image inside Scooter view with zoom */
                    <div className="w-full h-full aspect-square overflow-hidden rounded-xl border border-zinc-800 relative flex items-center justify-center bg-[#0d0d0d]">
                      <img 
                        src={selectedAsset.url} 
                        alt={selectedAsset.title}
                        className="max-w-none w-[320%] h-auto relative pointer-events-none select-none"
                        style={{
                          transform: "translate(22%, 18%)",
                          filter: "sepia(0.8) contrast(1.35) brightness(0.9)"
                        }}
                      />
                    </div>
                  ) : (
                    /* Render standard asset */
                    <img 
                      src={selectedAsset.url} 
                      alt={selectedAsset.title}
                      className="max-w-full max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Specification & Details Sidebar (col-span-5) */}
                <div className="md:col-span-5 p-8 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-red-500 tracking-widest font-bold uppercase">
                        {selectedAsset.id === "scooter" ? "MOCKUP FILE" : selectedAsset.id === "rappi" ? "E-COMMERCE" : "ASSET DE MARCA"}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500">
                        VERSIÓN 2026.11
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-black tracking-tight text-white uppercase leading-none">
                      {selectedAsset.title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono uppercase mt-1 tracking-wider">
                      {selectedAsset.subtitle}
                    </p>

                    <div className="my-6 border-t border-zinc-800/60 pt-6">
                      <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                        <Sparkles size={8} /> DESCRIPCIÓN TÉCNICA
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed font-sans font-normal italic uppercase">
                        "{selectedAsset.desc}"
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-zinc-800/60 pt-6">
                      <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3 font-bold">
                        FICHA DE ESPECIFICACIONES
                      </h4>
                      <div className="space-y-2 bg-black/40 border border-zinc-900 rounded-xl p-4">
                        {selectedAsset.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900/60 pb-1.5 last:border-b-0 last:pb-0">
                            <span className="uppercase text-zinc-400">• {spec.split(":")[0]}</span>
                            <span className="text-white text-right">{spec.split(":")[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center">
                    <span role="status" className="text-[8px] text-zinc-600 tracking-wider">
                      CLICK ANYWHERE TO CLOSE HUD
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedAsset(null);
                        playSynthBeep(261.63, "triangle", 0.15);
                      }}
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
      <div className="w-full mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-zinc-500 tracking-widest gap-2">
        <span>PORTFOLIO PROYECTO CLIENTE • SECCIÓN DETALLADA</span>
        <span>APPROVED BRADING BLOCK S-11</span>
        <span>© JHON DESIGN 2026</span>
      </div>
    </section>
  );
}
