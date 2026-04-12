import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "7875408822";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Delay rendering to avoid hydration issues
  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <style>{`
        @keyframes float-smooth {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-14px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(2px);
          }
          75% {
            transform: translateY(-8px) translateX(-1px);
          }
        }

        @keyframes glow-intense {
          0%, 100% {
            box-shadow: 
              0 10px 30px rgba(34, 197, 94, 0.25),
              0 0 40px rgba(34, 197, 94, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 
              0 20px 50px rgba(34, 197, 94, 0.35),
              0 0 60px rgba(34, 197, 94, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          70% {
            box-shadow: 0 0 0 24px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @keyframes slide-in-bouncy {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          60% {
            opacity: 1;
            transform: translateX(-4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes icon-rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        @keyframes badge-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: -200% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        .float-smooth {
          animation: float-smooth 4s ease-in-out infinite;
        }

        .glow-intense {
          animation: glow-intense 2.5s ease-in-out infinite;
        }

        .pulse-ring {
          animation: pulse-ring 2.2s infinite;
        }

        .slide-in-bouncy {
          animation: slide-in-bouncy 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .icon-rotate {
          animation: icon-rotate 3s ease-in-out infinite;
        }

        .badge-pop {
          animation: badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .shimmer {
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% 100%;
        }
      `}</style>

      {/* Desktop: Advanced Premium Button */}
      <div
        className={`fixed bottom-8 right-8 z-40 hidden md:flex flex-col items-end gap-4
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
          transition-opacity duration-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium Tooltip with Animation */}
        {isHovered && (
          <div className="slide-in-bouncy">
            <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl px-5 py-4 shadow-2xl border border-emerald-200/60 backdrop-blur-xl">
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-t-3xl" />
              
              <div className="mb-2">
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-600" />
                  Chat with us
                </p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get expert advice instantly. Questions? We're here to help 24/7.
              </p>
              
              {/* Arrow pointer */}
              <div className="absolute -right-2 top-6 w-4 h-4 bg-gradient-to-br from-emerald-50 to-green-50 rotate-45 border-r border-b border-emerald-200/60" />
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-40" />
              <div className="absolute bottom-3 left-4 w-1 h-1 bg-green-400 rounded-full opacity-50" />
            </div>
          </div>
        )}

        {/* Main Button with Multiple Layers */}
        <button
          onClick={handleWhatsAppClick}
          className={`float-smooth group relative inline-flex items-center justify-center gap-3
            px-8 py-5 rounded-full
            font-bold text-base tracking-wide text-white
            transition-all duration-300 transform
            focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40
            ${isHovered ? "scale-110 -translate-y-1" : "hover:scale-105"}
            active:scale-95`}
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          {/* Outer glow layer */}
          <div className="absolute inset-0 rounded-full glow-intense pointer-events-none" />
          
          {/* Gradient background with depth — Premium 3D effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 opacity-100 shadow-2xl" />
          
          {/* Inner highlight layer for depth */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/40 to-emerald-300/30 opacity-70" />
          
          {/* Top shine effect — creates 3D illusion */}
          <div className="absolute inset-x-6 top-2 h-3 bg-gradient-to-b from-white/50 to-transparent rounded-full blur-md pointer-events-none" />
          
          {/* Bottom shadow layer */}
          <div className="absolute inset-x-6 bottom-2 h-2 bg-gradient-to-t from-black/20 to-transparent rounded-full blur-md pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-3">
            {/* Icon with rotation animation and glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-white/40 transition-all duration-300 w-10 h-10" />
              <div className="icon-rotate relative z-10">
                <MessageCircle size={26} className="drop-shadow-lg text-white" strokeWidth={1.8} />
              </div>
            </div>
            
            {/* Text section */}
            <div className="text-left">
              <p className="font-bold text-white tracking-wider leading-none text-lg">Chat Now</p>
              <p className="text-xs text-emerald-50/90 font-medium uppercase tracking-wider">WhatsApp</p>
            </div>
            
            {/* Right arrow indicator */}
            <Send size={20} className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1.5" strokeWidth={2} />
          </div>
          
          {/* Dynamic border glow */}
          <div className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-300
            ${isHovered ? "border-2 border-white/70" : "border border-white/30"}`} />
        </button>

        {/* Floating decorative particles around button */}
        {isHovered && (
          <>
            <div className="absolute -top-3 right-12 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-70 animate-pulse shadow-lg" />
            <div className="absolute -bottom-3 right-20 w-2 h-2 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full opacity-50 animate-pulse shadow-md" style={{animationDelay: '0.3s'}} />
          </>
        )}
      </div>

      {/* Mobile: Premium Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-8 right-8 md:hidden z-40
          float-smooth group relative
          flex items-center justify-center
          w-20 h-20 rounded-full
          transition-all duration-300 transform
          active:scale-90
          focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        {/* Outer ring pulse — creates attention */}
        <div className="absolute inset-0 rounded-full pulse-ring pointer-events-none" />
        
        {/* Outer glow layer */}
        <div className="absolute inset-0 rounded-full glow-intense pointer-events-none" />
        
        {/* Main gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 shadow-2xl" />
        
        {/* Inner shimmer effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/30 to-emerald-300/40 opacity-60 shimmer" />
        
        {/* Top highlight for 3D look */}
        <div className="absolute inset-x-4 top-2 h-2.5 bg-white/40 rounded-full blur-md" />
        
        {/* Icon with glow */}
        <div className="relative z-10">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-lg w-12 h-12 -inset-1" />
          <div className="icon-rotate relative z-10">
            <MessageCircle size={32} className="text-white drop-shadow-lg" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Premium border */}
        <div className="absolute inset-0 rounded-full border-2 border-white/40 group-active:border-white/60 transition-all duration-300" />
      </button>

      {/* Mobile Premium Status Badge */}
      {isVisible && (
        <div className="fixed bottom-32 right-8 md:hidden z-40">
          <div className="badge-pop relative inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-70 animate-pulse w-4 h-4 -inset-1" />
              <div className="relative w-4 h-4 bg-gradient-to-br from-green-300 to-emerald-500 rounded-full border-2 border-white shadow-lg drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
