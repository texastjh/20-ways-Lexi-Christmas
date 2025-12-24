import React from 'react';
import { AdventDoorProps } from '../types';

// SVG Paths for various Christmas shapes
// Updated to include requested items: Trumpet, Manger, Lamb, etc.
const getMoldShape = (id: number) => {
  const shapes = [
    // 1. Christmas Tree
    "M12 2L2 22h20L12 2zm0 5l5 13H7l5-13z",
    // 2. Star
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    // 3. Bell
    "M12 3a6 6 0 00-6 6v5l-2 2v1h16v-1l-2-2V9a6 6 0 00-6-6zM12 22a2 2 0 002-2h-4a2 2 0 002 2z",
    // 4. Trumpet (New)
    "M2 6v12h2V6H2zm4 0v12l6-4v4l8 4V2l-8 4v4L6 6z",
    // 5. Candy Cane
    "M9 6c0-2 2-4 4-4s4 2 4 4v12h-3V6c0-1-1-1-1-1s-1 0-1 1v12H9V6z",
    // 6. Manger (New)
    "M2 14l2 6h16l2-6H2zm3-3l4 3 4-3 4 3 3-3v2H5v-2z",
    // 7. Snowflake
    "M12 2v20 M2 12h20 M5 5l14 14 M5 19L19 5",
    // 8. Snowman
    "M12 4a4 4 0 100 8 4 4 0 000-8zm0 8a6 6 0 100 12 6 6 0 000-12z",
    // 9. Lamb (New)
    "M17 7c-1.5 0-2.8.8-3.5 2-.7-1.2-2-2-3.5-2-2.5 0-4.5 2-4.5 4.5 0 .5.1 1 .2 1.5C4.8 13.6 4 14.7 4 16c0 2.2 1.8 4 4 4h9c2.2 0 4-1.8 4-4 0-1.8-1.1-3.3-2.7-3.8.1-.4.2-.8.2-1.2 0-2.5-2-4.5-4.5-4.5z",
    // 10. Mitten
    "M8 4a4 4 0 00-4 4v8a4 4 0 004 4h6a4 4 0 004-4V8a4 4 0 00-4-4H8z",
    // 11. Candle
    "M10 8h4v12h-4z M12 2l-1 4h2z",
    // 12. Holly (Berries)
    "M12 10a2 2 0 100 4 2 2 0 000-4zm-4 4a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z",
    // 13. Gingerbread Man
    "M12 2a3 3 0 00-3 3v2H6a2 2 0 00-2 2v4a2 2 0 002 2h2v5a2 2 0 002 2h4a2 2 0 002-2v-5h2a2 2 0 002-2v-4a2 2 0 00-2-2h-3V5a3 3 0 00-3-3z",
    // 14. Heart
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    // 15. Bow
    "M12 12l8-6v12l-8-6-8 6V6l8 6z",
    // 16. Santa Hat
    "M12 3L4 18h16L12 3zM20 18a2 2 0 110 4 2 2 0 010-4z",
    // 17. Wreath
    "M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 110 8 4 4 0 010-8z",
    // 18. Angel
    "M12 2a3 3 0 100 6 3 3 0 000-6z M6 10l6-2 6 2v10H6z",
    // 19. Reindeer (Simple)
    "M12 10l-4-6v4l4 6 4-6V4l-4 6zM12 10v12",
    // 20. Crown / King
    "M2 8l5 2 5-6 5 6 5-2v14H2V8z"
  ];
  return shapes[(id - 1) % shapes.length];
};

export const AdventDoor: React.FC<AdventDoorProps> = ({ 
  message, 
  position, 
  isOpen, 
  onOpen,
  bgImage,
  containerWidth,
  containerHeight
}) => {
  
  // Calculate the offset required to align the inner background image with the container
  const leftPct = parseFloat(position.left);
  const topPct = parseFloat(position.top);

  const shiftX = (containerWidth / 2) - (leftPct / 100 * containerWidth);
  const shiftY = (containerHeight / 2) - (topPct / 100 * containerHeight);

  return (
    <div
      className="absolute z-10 perspective-container cursor-pointer group"
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        width: 'clamp(60px, 18vw, 110px)',
        height: 'clamp(60px, 18vw, 110px)',
      }}
      onClick={(e) => {
        e.stopPropagation(); 
        onOpen(message.id);
      }}
    >
      {/* The Door (Rotates open) */}
      <div 
        className={`relative w-full h-full transform-style-3d transition-transform duration-1000 ease-in-out origin-left ${
            isOpen 
            ? '[transform:rotateY(-110deg)]' 
            : 'group-hover:[transform:rotateY(-15deg)]'
        }`}
      >
        
        {/* Back of the Door (Cardboard flap) */}
        <div className="absolute inset-0 backface-hidden bg-[#c5bba4] [transform:rotateY(180deg)] border border-white/20 rounded-sm shadow-sm overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* Front of the Door (Closed State) */}
        <div 
            className="absolute inset-0 backface-hidden border-[1px] border-dashed border-white/30 shadow-sm flex items-center justify-center rounded-sm overflow-hidden bg-[#e3dac1]"
        >
            {/* Seamless Image */}
            {containerWidth > 0 && (
                <div 
                    className="absolute pointer-events-none"
                    style={{
                        width: containerWidth,
                        height: containerHeight,
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${shiftX}px, ${shiftY}px) rotate(${-position.rotation}deg)`,
                    }}
                >
                     <img 
                        src={bgImage} 
                        alt="" 
                        className="w-full h-full object-cover max-w-none"
                     />
                     <div className="absolute inset-0 bg-black/5"></div>
                </div>
            )}

            {/* Number */}
            <span className="font-title text-white/40 text-3xl md:text-5xl drop-shadow-md select-none font-bold z-10 transition-opacity duration-300 group-hover:text-white/90">
                {message.id}
            </span>
        </div>

      </div>

      {/* The Plastic Mold Hole (Behind the door) */}
      <div 
        className="absolute inset-0 -z-10 rounded-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center pointer-events-none border border-white/10"
      >
        {/* 1. Background Image Layer (Visible through the plastic) */}
        {containerWidth > 0 && (
            <div 
                className="absolute pointer-events-none opacity-80"
                style={{
                    width: containerWidth,
                    height: containerHeight,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${shiftX}px, ${shiftY}px) rotate(${-position.rotation}deg)`,
                }}
            >
                <img 
                    src={bgImage} 
                    alt="" 
                    className="w-full h-full object-cover max-w-none"
                />
            </div>
        )}

        {/* 2. Clear Plastic Overlay Layer */}
        {/* Frosted/Glossy look: White tint + backdrop blur effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>

         <div className="relative w-full h-full flex items-center justify-center p-3 z-10">
            {/* 
                Plastic Mold Cavity Effect:
                - Dark fill (shadow in recess): fill-black/40
                - Highlight on edge (rim): drop-shadow white
                - Blend mode overlay can enhance the transparency effect
            */}
            <svg 
                viewBox="0 0 24 24" 
                className="w-full h-full"
                style={{ 
                    filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.4))' 
                }}
            >
              <path 
                d={getMoldShape(message.id)} 
                fill="rgba(0,0,0,0.3)" 
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5"
              />
            </svg>
         </div>
      </div>
    </div>
  );
};
