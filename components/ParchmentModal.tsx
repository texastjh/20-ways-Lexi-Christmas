import React, { useEffect, useState } from 'react';
import { Message } from '../types';

interface ParchmentModalProps {
  message: Message | null;
  onClose: () => void;
}

export const ParchmentModal: React.FC<ParchmentModalProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Small delay to allow the door opening animation to register first
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ backgroundColor: 'rgba(26, 47, 75, 0.7)' }}
      onClick={onClose}
    >
      <div 
        className={`
          relative w-full max-w-md bg-parchment p-8 rounded-sm shadow-2xl 
          border-4 border-double border-gold/30
          transform transition-all duration-700
          ${visible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}
        `}
        onClick={(e) => e.stopPropagation()}
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold/50 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/50 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/50 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold/50 rounded-br-lg"></div>

        <div className="text-center space-y-6 parchment-scroll max-h-[70vh] overflow-y-auto">
            <div className="font-title text-gold text-2xl md:text-3xl border-b border-gold/20 pb-2 mb-4">
                Way #{message.id}
            </div>
            
            <h2 className="font-title text-night-blue text-2xl md:text-3xl leading-relaxed animate-fade-in">
                {message.title}
            </h2>
            
            <p className="font-body text-gray-800 text-lg md:text-xl leading-relaxed italic animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {message.body}
            </p>

            {message.signature && (
                <div className="mt-6 pt-4 border-t border-gold/20 font-body text-night-blue/80 text-base animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    — {message.signature}
                </div>
            )}
        </div>

        <button 
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 shadow-lg border-2 border-white transition-transform hover:scale-110"
        >
            ✕
        </button>
      </div>
    </div>
  );
};
