import React from "react";
import { motion } from "motion/react";

interface FooterSectionProps {
  playSynthBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
}

export default function FooterSection({ playSynthBeep }: FooterSectionProps) {
  // References to the Supabase Supersonic URLs provided in the PSD design specs
  const funkoPopUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/funko_pop-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Z1bmtvX3BvcC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc3OTYyOTkyOCwiZXhwIjoxODExMTY1OTI4fQ.UDO7m_0EjRqFepTfkmwWlwRkSPgT7CW-5eJoW_TdqjQ";
  const coronaUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/corona.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Nvcm9uYS5wbmciLCJpYXQiOjE3Nzk2Mjk5NDMsImV4cCI6MTgxMTE2NTk0M30.3NG2nZ3G4AwkUYUP9srVSk5cSJMTXRtyiM_JeyMruGU";
  const starBadgeUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/descarga%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Rlc2NhcmdhICgxKS5wbmciLCJpYXQiOjE3Nzk2Mjk5NjEsImV4cCI6MTgxMTE2NTk2MX0.x0BpSyRrv4Rn6xXfN18uwwFAfhOtnspF0EcG5fm4KwU";

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden select-none border-t border-neutral-900/40">
      
      {/* 1. TIER_1: BLACK HEADER WORK ZONE */}
      <div className="relative w-full bg-[#000000] pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32 px-6 sm:px-12 md:px-16 z-10">
        
        {/* Subtle Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-20" />

        {/* LETS WORK TOGETHER Titles */}
        <div className="text-center relative z-20 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block text-[#E70000] font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-tighter leading-none uppercase select-none drop-shadow-[0_2px_15px_rgba(231,0,0,0.15)]"
          >
            LETS WORK
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-white font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-tighter leading-none uppercase -mt-1 sm:-mt-2 select-none"
          >
            TOGETHER
          </motion.span>
        </div>

        {/* Red Pixelated Crown Emblem */}
        <div className="absolute top-10 right-8 sm:right-12 md:right-16 lg:right-24 w-12 sm:w-16 lg:w-20 aspect-square opacity-80 pointer-events-none drop-shadow-[0_2px_10px_rgba(231,0,0,0.3)] select-none">
          <img 
            src={coronaUrl} 
            alt="Red Pixelated Crown Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Dynamic Micro Decorative Text (Left Area) */}
        <div className="absolute top-10 left-8 sm:left-12 md:left-16 lg:left-24 hidden md:flex flex-col text-left font-mono text-[8px] text-zinc-650 tracking-[0.25em] select-none">
          <span>COEDITION MATRIX PROTOTYPE</span>
          <span className="mt-1">SYS_BLOCK // S-13 APPROVED</span>
        </div>

        {/* Torn Paper Top Shape (positioned at bottom of black section, overlapping white) */}
        <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 overflow-hidden z-25 pointer-events-none translate-y-[2px]">
          <svg 
            viewBox="0 0 1440 60" 
            preserveAspectRatio="none" 
            className="w-full h-full fill-white stroke-white"
          >
            <path d="M 0 60 L 0 35 L 20 31 L 45 42 L 70 34 L 92 39 L 115 29 L 140 37 L 165 28 L 190 40 L 212 30 L 235 37 L 260 29 L 285 41 L 310 31 L 332 37 L 358 29 L 380 40 L 405 32 L 428 41 L 450 31 L 475 39 L 500 29 L 522 41 L 545 32 L 570 38 L 595 29 L 618 41 L 640 31 L 665 39 L 690 28 L 712 40 L 735 31 L 760 38 L 785 29 L 810 40 L 832 31 L 855 38 L 880 29 L 905 41 L 930 31 L 952 38 L 975 29 L 1000 40 L 1022 31 L 1045 38 L 1070 29 L 1095 41 L 1118 31 L 1140 39 L 1165 28 L 1190 40 L 1212 31 L 1235 38 L 1260 29 L 1285 41 L 1310 31 L 1332 38 L 1358 29 L 1380 40 L 1405 31 L 1428 39 L 1440 28 L 1440 60 Z" />
          </svg>
        </div>

      </div>

      {/* 2. TIER_2: WHITE EXQUISITE TEXTURED PAPER BANNER */}
      <div className="relative w-full bg-white text-black py-10 sm:py-14 lg:py-16 px-6 sm:px-12 md:px-16 z-0 flex items-center justify-center">
        
        {/* Subtle Paper Texture Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-white to-neutral-100 opacity-60 pointer-events-none" />

        <p className="font-sans font-bold text-center text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase leading-relaxed text-neutral-900 select-none z-10 max-w-4xl">
          GRAPHIC DESIGNER | BRANDING | MOCKUP | SOCIAL MEDIA
        </p>

        {/* Torn Paper Bottom Shape (represented at top of bottom black section visually) */}
        <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 overflow-hidden z-25 pointer-events-none translate-y-[2px]">
          <svg 
            viewBox="0 0 1440 60" 
            preserveAspectRatio="none" 
            className="w-full h-full fill-black stroke-black"
          >
            <path d="M 0 60 L 0 35 L 20 31 L 45 42 L 70 34 L 92 39 L 115 29 L 140 37 L 165 28 L 190 40 L 212 30 L 235 37 L 260 29 L 285 41 L 310 31 L 332 37 L 358 29 L 380 40 L 405 32 L 428 41 L 450 31 L 475 39 L 500 29 L 522 41 L 545 32 L 570 38 L 595 29 L 618 41 L 640 31 L 665 39 L 690 28 L 712 40 L 735 31 L 760 38 L 785 29 L 810 40 L 832 31 L 855 38 L 880 29 L 905 41 L 930 31 L 952 38 L 975 29 L 1000 40 L 1022 31 L 1045 38 L 1070 29 L 1095 41 L 1118 31 L 1140 39 L 1165 28 L 1190 40 L 1212 31 L 1235 38 L 1260 29 L 1285 41 L 1310 31 L 1332 38 L 1358 29 L 1380 40 L 1405 31 L 1428 39 L 1440 28 L 1440 60 Z" />
          </svg>
        </div>

        {/* Overlapping Star Badge on bottom-left transition boundary */}
        <div className="absolute left-6 sm:left-12 lg:left-24 bottom-[-16px] sm:bottom-[-20px] lg:bottom-[-28px] z-30 flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-white p-1 shadow-2xl border-2 border-black flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          >
            <img 
              src={starBadgeUrl} 
              alt="Official Star Badge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <div className="flex flex-col text-left select-none hidden md:flex">
            <span className="text-[9px] font-mono text-neutral-400 font-extrabold uppercase tracking-widest leading-none">APPROVED LOGO</span>
            <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest mt-1">STAR BADGE EDITION</span>
          </div>
        </div>

      </div>

      {/* 3. TIER_3: BLACK CONTACT AND SOCIAL BAR */}
      <div className="relative w-full bg-[#000000] py-14 sm:py-16 px-6 sm:px-12 md:px-16 z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        
        {/* Left column: CONTACT ME CTA */}
        <div className="flex-1 w-full text-center md:text-left">
          <a 
            href="mailto:jhonescalona359@gmail.com"
            onClick={() => playSynthBeep(523, "sine", 0.08)}
            className="group/btn inline-flex items-center gap-2 font-display font-black text-3xl sm:text-4xl tracking-wider text-white hover:text-[#E70000] transition-colors uppercase cursor-pointer"
          >
            CONTACT ME
            <motion.span className="inline-block group-hover/btn:translate-x-1.5 transition-transform text-xl text-[#E70000]">→</motion.span>
          </a>
        </div>

        {/* Center column: Clean copyright signature */}
        <div className="flex-1 w-full text-center font-sans text-xs sm:text-sm text-zinc-500 tracking-wider">
          © Jhon Escalona, 2026
        </div>

        {/* Right column: Rounded Social Circle Buttons */}
        <div className="flex-1 w-full flex justify-center md:justify-end items-center gap-4">
          
          {/* LinkedIn Button */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSynthBeep(440, "sine", 0.05)}
            className="w-10 h-10 rounded-full border border-white/25 hover:border-white hover:bg-white text-white hover:text-black flex items-center justify-center transition-all bg-[#0a0a0a] text-xs font-bold leading-none font-sans cursor-pointer shadow-lg hover:shadow-white/5"
            title="LinkedIn Profile"
          >
            in
          </a>

          {/* Dribbble Circle Option (represented by a custom solid eye dot symbol as per PSD design) */}
          <a 
            href="https://instagram.com/lacocina_de_chuy_co" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSynthBeep(494, "sine", 0.05)}
            className="w-10 h-10 rounded-full border border-white/25 hover:border-white hover:bg-white text-white hover:text-black flex items-center justify-center transition-all bg-[#0a0a0a] cursor-pointer shadow-lg hover:shadow-white/5"
            title="Instagram Media Account"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-current" />
          </a>

          {/* Behance Button */}
          <a 
            href="https://behance.net" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSynthBeep(554, "sine", 0.05)}
            className="w-10 h-10 rounded-full border border-white/25 hover:border-white hover:bg-white text-white hover:text-black flex items-center justify-center transition-all bg-[#0a0a0a] text-xs font-bold leading-none font-sans cursor-pointer shadow-lg hover:shadow-white/5"
            title="Behance Showcase"
          >
            Bē
          </a>

        </div>

        {/* Overlapping Jhon Design Funko Pop Box & Toy (stretches from Top Black down through White to Bottom Black) */}
        <div className="absolute right-4 sm:right-12 md:right-16 lg:right-28 bottom-[60px] sm:bottom-[70px] md:bottom-[80px] lg:bottom-[90px] w-40 sm:w-56 md:w-72 lg:w-[26rem] z-30 pointer-events-none select-none">
          <motion.img 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            src={funkoPopUrl}
            alt="Jhon Design Toy & Box Overlapping"
            referrerPolicy="no-referrer"
            className="w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] filter brightness-105"
          />
        </div>

      </div>

    </footer>
  );
}
