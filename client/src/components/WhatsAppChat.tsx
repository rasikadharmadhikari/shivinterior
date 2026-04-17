import { MessageCircle, Send, Sparkles } from "lucide-react";
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
            <MessageCircle size={26} className="drop-shadow-lg" />
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
          className="fixed bottom-8 right-8 md:hidden z-50 w-24 h-24 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 shadow-xl hover:shadow-2xl active:scale-75 transition-all duration-200 cursor-pointer pointer-events-auto touch-auto"
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
          
          {/* Icon */}
          <MessageCircle size={44} className="text-white drop-shadow-xl relative z-10" strokeWidth={1.5} />
        </button>
      )}
    </>
  );
}
