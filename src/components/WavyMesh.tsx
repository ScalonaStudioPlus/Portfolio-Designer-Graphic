import { motion } from "motion/react";

export default function WavyMesh() {
  // Generate 12 parallel lines offset slightly to create a 3D ribbon / organic silk mesh
  const numLines = 14;

  return (
    <svg 
      id="background-wavy-mesh"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 mix-blend-screen opacity-50"
      viewBox="0 0 1440 900" 
      preserveAspectRatio="none"
    >
      <g>
        {Array.from({ length: numLines }).map((_, index) => {
          // Calculate individual lines' opacity and offset
          const ratio = index / (numLines - 1);
          const opacity = 0.05 + Math.sin(ratio * Math.PI) * 0.25; // beautiful fade-out edges
          const offset = index * 4.5; // slight horizontal and vertical spread to create ribbon thickness
          const delay = index * 0.12;

          return (
            <motion.path
              key={index}
              d={`M -50 ${350 + offset} 
                 C 250 ${220 + offset}, 450 ${680 - offset}, 750 ${500 + offset / 2} 
                 S 1150 ${120 + offset * 1.5}, 1500 ${450 - offset}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={1.2 - ratio * 0.4}
              opacity={opacity}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                d: [
                  `M -50 ${350 + offset} C 250 ${220 + offset}, 450 ${680 - offset}, 750 ${500 + offset / 2} S 1150 ${120 + offset * 1.5}, 1500 ${450 - offset}`,
                  `M -50 ${370 + offset} C 280 ${200 + offset}, 420 ${720 - offset}, 780 ${480 + offset / 2} S 1120 ${140 + offset * 1.5}, 1500 ${420 - offset}`,
                  `M -50 ${350 + offset} C 250 ${220 + offset}, 450 ${680 - offset}, 750 ${500 + offset / 2} S 1150 ${120 + offset * 1.5}, 1500 ${450 - offset}`
                ]
              }}
              transition={{
                pathLength: { duration: 2.5, ease: "easeOut", delay },
                d: { 
                  duration: 8 + index * 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
