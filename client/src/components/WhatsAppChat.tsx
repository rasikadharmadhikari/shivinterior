import { Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "7875408822";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Shiv%20Interiors`;

export function WhatsAppChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show button immediately on component mount
    setIsVisible(true);
  }, []);

  const handleWhatsAppClick = () => {
    // Simple, direct link handling
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (isMobileDevice) {
      // Mobile: direct navigation to WhatsApp
      window.location.href = WHATSAPP_LINK;
    } else {
      // Desktop: open in new tab
      window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-smooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes glow-emit {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3); }
        }
        .whatsapp-float { animation: float-smooth 3s ease-in-out infinite; }
        .whatsapp-pulse { animation: pulse-ring 2s infinite; }
        .whatsapp-glow { animation: glow-emit 2.5s ease-in-out infinite; }
      `}</style>

      {/* Desktop Button - Hidden on Mobile */}
      {isVisible && (
        <div
          className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-end gap-4 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          {isHovered && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl px-4 py-3 shadow-xl border border-emerald-200/60 backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-600" />
                Chat with us
              </p>
              <p className="text-xs text-gray-600 mt-1">Get expert advice instantly</p>
            </div>
          )}

          {/* Main Button */}
          <button
            onClick={handleWhatsAppClick}
            className="whatsapp-float whatsapp-glow group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
            type="button"
            aria-label="Chat with us on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            {/* Official WhatsApp Logo - Speech Bubble with Phone */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              <path d="M20.52 3.98C19.13 2.58 17.23 1.77 15.17 1.77c-4.21 0-7.64 3.43-7.64 7.64 0 1.35.35 2.69.99 3.87L6.58 21.23l4.15-2.17c1.12.62 2.41.99 3.74.99h.03c4.21 0 7.64-3.43 7.64-7.64 0-2.04-.78-3.96-2.22-5.41zm-5.35 11.74h-.03c-1.16 0-2.3-.31-3.31-.88l-.24-.14-2.43.13.13-2.41-.15-.24c-.6-1.02-.91-2.16-.91-3.32 0-3.51 2.86-6.37 6.37-6.37 1.7 0 3.29.66 4.49 1.86 1.2 1.2 1.86 2.78 1.86 4.49 0 3.51-2.86 6.37-6.37 6.37zm3.54-4.76c-.19-.1-1.15-.57-1.33-.63-.18-.07-.31-.1-.44.1-.13.19-.5.63-.62.76-.12.12-.24.14-.43.04-.19-.1--.57-.21-1.09-.68-.4-.36-.67-.8-.75-.99-.08-.19-.01-.29.07-.38.08-.08.18-.2.27-.3.09-.1.12-.17.19-.28.07-.11.04-.21-.02-.3-.06-.09-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33-.11 0-.24-.01-.37-.01s-.33.05-.5.24c-.18.19-.67.65-.67 1.59 0 .94.68 1.84.78 1.97.1.13 1.39 2.12 3.36 2.97 1.36.58 1.9.62 2.58.52.46-.07 1.41-.58 1.61-1.13.2-.55.2-1.02.14-1.12-.06-.1-.19-.16-.38-.26z"/>
            </svg>
            <span className="tracking-wide">Chat Now</span>
            <Send size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}

      {/* Mobile Button - Visible only on Mobile */}
      {isVisible && (
        <button
          onClick={handleWhatsAppClick}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleWhatsAppClick();
          }}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 md:hidden z-50 w-16 sm:w-20 h-16 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 shadow-xl hover:shadow-2xl active:scale-75 transition-all duration-200 cursor-pointer pointer-events-auto touch-auto"
          type="button"
          aria-label="Chat with us on WhatsApp"
          title="Tap to chat on WhatsApp"
            style={{
            animation: 'float-smooth 3s ease-in-out infinite, pulse-ring 2s infinite',
          }}
        >
          {/* Pulsing ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(34, 197, 94, 0.3)',
              animation: 'pulse-ring 2s infinite',
            }}
          />
          
          {/* Icon - Official WhatsApp Logo */}
          <svg width="clamp(28px, 8vw, 40px)" height="clamp(28px, 8vw, 40px)" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl relative z-10" style={{ minWidth: '28px', minHeight: '28px' }}>
            <path d="M20.52 3.98C19.13 2.58 17.23 1.77 15.17 1.77c-4.21 0-7.64 3.43-7.64 7.64 0 1.35.35 2.69.99 3.87L6.58 21.23l4.15-2.17c1.12.62 2.41.99 3.74.99h.03c4.21 0 7.64-3.43 7.64-7.64 0-2.04-.78-3.96-2.22-5.41zm-5.35 11.74h-.03c-1.16 0-2.3-.31-3.31-.88l-.24-.14-2.43.13.13-2.41-.15-.24c-.6-1.02-.91-2.16-.91-3.32 0-3.51 2.86-6.37 6.37-6.37 1.7 0 3.29.66 4.49 1.86 1.2 1.2 1.86 2.78 1.86 4.49 0 3.51-2.86 6.37-6.37 6.37zm3.54-4.76c-.19-.1-1.15-.57-1.33-.63-.18-.07-.31-.1-.44.1-.13.19-.5.63-.62.76-.12.12-.24.14-.43.04-.19-.1--.57-.21-1.09-.68-.4-.36-.67-.8-.75-.99-.08-.19-.01-.29.07-.38.08-.08.18-.2.27-.3.09-.1.12-.17.19-.28.07-.11.04-.21-.02-.3-.06-.09-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33-.11 0-.24-.01-.37-.01s-.33.05-.5.24c-.18.19-.67.65-.67 1.59 0 .94.68 1.84.78 1.97.1.13 1.39 2.12 3.36 2.97 1.36.58 1.9.62 2.58.52.46-.07 1.41-.58 1.61-1.13.2-.55.2-1.02.14-1.12-.06-.1-.19-.16-.38-.26z"/>
          </svg>
        </button>
      )}
    </>
  );
}
