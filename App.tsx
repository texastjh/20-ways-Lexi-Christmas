import React, { useState, useEffect, useRef } from 'react';
import { AdventDoor } from './components/AdventDoor';
import { ParchmentModal } from './components/ParchmentModal';
import { MESSAGES, DOOR_POSITIONS } from './data/messages';
import { Message } from './types';

// Fallback is available but we won't auto-switch to it for the default image 
// to ensure the user knows if their hosted image is working or not.
const FALLBACK_BG = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop";

// Default to the hosted GitHub image
const DEFAULT_BG = "https://raw.githubusercontent.com/texastjh/20-ways-Lexi-Christmas/main/illustrated-family-hero.png";

// Storage keys
const STORAGE_KEY_STATE = 'hurst_advent_state';
const STORAGE_KEY_BG = 'hurst_advent_bg_v5'; // Changed version to force refresh for user

const App: React.FC = () => {
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  
  // Initialize with DEFAULT_BG
  const [bgImage, setBgImage] = useState<string>(DEFAULT_BG);
  
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
    const savedDoors = localStorage.getItem(STORAGE_KEY_STATE);
    if (savedDoors) {
      try {
        const parsed = JSON.parse(savedDoors);
        if (Array.isArray(parsed)) setOpenedDoors(parsed);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }

    // 2. Load custom background logic
    const savedBg = localStorage.getItem(STORAGE_KEY_BG);
    if (savedBg) {
      setBgImage(savedBg);
    } else {
      // If no custom background is saved (or if we bumped the version), use default
      setBgImage(DEFAULT_BG);
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
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(newOpened));
    }
    const msg = MESSAGES.find(m => m.id === id) || null;
    setActiveMessage(msg);
  };

  const handleCloseModal = () => {
    setActiveMessage(null);
  };

  // Reset Progress (Close All Doors AND Reset Background)
  const handleResetProgress = () => {
    // 1. Close doors
    setOpenedDoors([]);
    setActiveMessage(null);
    localStorage.removeItem(STORAGE_KEY_STATE);

    // 2. Reset Background to Default
    setBgImage(DEFAULT_BG);
    localStorage.removeItem(STORAGE_KEY_BG);
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
          localStorage.setItem(STORAGE_KEY_BG, result);
        } catch (e) {
          console.warn("Image too large to save to local storage");
          alert("Image loaded! It might be too large to save permanently, so you may need to upload it again if you refresh.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if we need to show the reset button (if doors are open OR if a custom background is active)
  const hasCustomState = openedDoors.length > 0 || bgImage !== DEFAULT_BG;

  return (
    <div className="min-h-screen bg-night-blue flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-body select-none">
      
      {/* Calendar Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-4 border-night-blue/50 bg-black z-10"
      >
        {/* Background Image - The "Base" */}
        <div className="relative w-full h-full bg-[#1a2f4b]">
            <img 
                src={bgImage}
                alt="Hurst Family Wonderland"
                className="w-full h-full object-cover"
                onError={(e) => {
                    // Restored fallback logic: if the hosted image fails (e.g. 404, 403), 
                    // switch to the nice backup image so the UI doesn't look broken.
                    if (bgImage !== FALLBACK_BG) {
                        console.warn(`Failed to load ${bgImage}, reverting to fallback.`);
                        setBgImage(FALLBACK_BG);
                    }
                }}
            />
            
            {/* Overlay Gradient for contrast on the calendar itself */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>

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
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-1 text-white/90 text-sm font-title shadow-lg border border-white/10 z-20">
            {progress} of 20 Moments Opened
        </div>
      </div>

      {/* Modal Overlay */}
      <ParchmentModal 
        message={activeMessage} 
        onClose={handleCloseModal} 
      />

      {/* Customization Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-parchment py-2 px-6 rounded-full z-[100] border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-center gap-4 shadow-2xl transition-opacity hover:bg-black/80 w-max max-w-[90vw]">
        <label className="cursor-pointer text-gold hover:text-white font-bold text-sm transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Change Photo</span>
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
            />
        </label>

        {hasCustomState && (
            <>
                <div className="w-px h-4 bg-white/20 hidden md:block"></div>
                <button 
                    onClick={handleResetProgress}
                    className="text-sm font-bold text-red-400 hover:text-red-200 transition-colors flex items-center gap-2"
                    title="Reset calendar and background"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Reset</span>
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default App;