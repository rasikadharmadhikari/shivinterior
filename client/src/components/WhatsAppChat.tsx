import { useState } from "react";

const WHATSAPP_NUMBER = "917875408822";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Shiv%20Interiors`;

export function WhatsAppChat() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes whatsappPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5), 0 4px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.2); }
          70%  { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0), 0 4px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.2); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 4px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.2); }
        }

        @keyframes whatsappSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        .whatsapp-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #25D366;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 20px 12px 14px;
          border-radius: 50px;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.2);
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          border: none;
          animation: whatsappSlideUp 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 1s both, whatsappPulse 2.5s ease-out 2s infinite;
        }

        .whatsapp-btn:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0, 0, 0, 0.25);
          animation: none;
        }

        .whatsapp-btn svg {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
        }

        .whatsapp-btn span {
          display: inline;
        }

        @media (max-width: 480px) {
          .whatsapp-btn span {
            display: none;
          }
          .whatsapp-btn {
            padding: 14px;
            border-radius: 50%;
            width: 54px;
            height: 54px;
            justify-content: center;
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Official WhatsApp SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="white"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.132 6.752 3.056 9.384L1.056 31.2l5.984-1.92A15.93 15.93 0 0016.004 32C24.828 32 32 24.824 32 16S24.828 0 16.004 0zm9.28 22.6c-.384 1.08-1.912 1.976-3.132 2.236-.836.18-1.928.324-5.604-1.204-4.704-1.952-7.732-6.732-7.968-7.044-.228-.312-1.912-2.548-1.912-4.86s1.18-3.436 1.644-3.912c.384-.392.84-.492 1.12-.492.28 0 .56.004.804.016.26.012.604-.1.948.724.356.848 1.208 2.94 1.316 3.156.108.216.18.468.036.756-.136.296-.204.48-.408.736-.204.256-.428.572-.612.768-.204.22-.416.456-.18.896.236.44 1.052 1.736 2.26 2.812 1.552 1.38 2.86 1.808 3.3 2.024.44.216.696.18.956-.108.26-.288 1.112-1.296 1.408-1.74.296-.444.592-.372.996-.224.408.148 2.584 1.22 3.024 1.44.44.22.732.328.84.512.108.18.108 1.056-.276 2.136z"/>
        </svg>
        <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
