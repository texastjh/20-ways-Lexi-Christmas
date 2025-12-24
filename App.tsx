import React, { useState, useEffect, useRef } from 'react';
import { AdventDoor } from './components/AdventDoor';
import { ParchmentModal } from './components/ParchmentModal';
import { MESSAGES, DOOR_POSITIONS } from './data/messages';
import { Message } from './types';

// Fallback image if the user's local file isn't found. 
const FALLBACK_BG = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop";

// Name of the expected local file
const LOCAL_BG = "./background.png";

const App: React.FC = () => {
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const [bgImage, setBgImage] = useState<string>(LOCAL_BG);
  const [progress, setProgress] = useState(0);
  
  // State for seamless background alignment
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Measure container on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Also use ResizeObserver if available for more robustness
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(updateSize);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (observer) observer.disconnect();
    };
  }, []);

  // Load state from local storage on mount
  useEffect(() => {
    // 1. Load opened doors
    const savedDoors = localStorage.getItem('hurst_advent_state');
    if (savedDoors) {
      try {
        const parsed = JSON.parse(savedDoors);
        if (Array.isArray(parsed)) setOpenedDoors(parsed);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }

    // 2. Load custom background if exists
    const savedBg = localStorage.getItem('hurst_advent_bg');
    if (savedBg) {
      setBgImage(savedBg);
    }
  }, []);

  // Update progress
  useEffect(() => {
    setProgress(openedDoors.length);
  }, [openedDoors]);

  // Persist state
  const handleDoorOpen = (id: number) => {
    if (!openedDoors.includes(id)) {
      const newOpened = [...openedDoors, id];
      setOpenedDoors(newOpened);
      localStorage.setItem('hurst_advent_state', JSON.stringify(newOpened));
    }
    const msg = MESSAGES.find(m => m.id === id) || null;
    setActiveMessage(msg);
  };

  const handleCloseModal = () => {
    setActiveMessage(null);
  };

  // Handle manual image upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBgImage(result);
        try {
          localStorage.setItem('hurst_advent_bg', result);
        } catch (e) {
          console.warn("Image too large to save to local storage");
          alert("Image loaded! It might be too large to save permanently, so you may need to upload it again if you refresh.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetBg = () => {
    setBgImage(LOCAL_BG);
    localStorage.removeItem('hurst_advent_bg');
  };

  return (
    <div className="min-h-screen bg-night-blue flex items-center justify-center p-4 overflow-hidden relative font-body select-none">
      
      {/* Background Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] aspect-[3/4] shadow-2xl rounded-lg overflow-hidden border-4 border-night-blue/50 bg-black"
      >
        {/* Background Image - The "Base" */}
        <img 
            src={bgImage}
            alt="Hurst Family Wonderland"
            className="w-full h-full object-cover"
            onError={(e) => {
                if (bgImage === LOCAL_BG) {
                    setBgImage(FALLBACK_BG);
                }
            }}
        />

        {/* Overlay Gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 pointer-events-none"></div>

        {/* Doors Layer */}
        {DOOR_POSITIONS.map((pos) => {
            const msg = MESSAGES.find(m => m.id === pos.id);
            if (!msg) return null;

            return (
                <AdventDoor 
                    key={pos.id}
                    position={pos}
                    message={msg}
                    isOpen={openedDoors.includes(pos.id)}
                    onOpen={handleDoorOpen}
                    bgImage={bgImage}
                    containerWidth={containerSize.width}
                    containerHeight={containerSize.height}
                />
            );
        })}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-white text-sm font-title shadow-lg border border-white/30 z-20">
            {progress} of 20 Moments Opened
        </div>
      </div>

      {/* Modal Overlay */}
      <ParchmentModal 
        message={activeMessage} 
        onClose={handleCloseModal} 
      />

      {/* Customization Toolbar */}
      <div className="fixed bottom-0 left-0 w-full bg-night-blue/95 text-parchment p-3 z-50 border-t border-gold/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-center gap-4 shadow-2xl">
        <span className="text-sm font-body text-gray-300 hidden md:inline">
            {bgImage === FALLBACK_BG 
                ? "Preview Mode." 
                : "Custom photo active."}
        </span>
        
        <label className="cursor-pointer bg-gold hover:bg-yellow-500 text-night-blue font-bold py-2 px-6 rounded-full text-sm transition-transform hover:scale-105 shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Your Background
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
            />
        </label>
        
        {(bgImage !== LOCAL_BG && bgImage !== FALLBACK_BG) && (
            <button 
                onClick={handleResetBg}
                className="text-xs text-gold/70 hover:text-white underline decoration-dotted"
            >
                Reset to Default
            </button>
        )}
      </div>
    </div>
  );
};

export default App;
