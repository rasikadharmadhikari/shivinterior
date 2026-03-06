import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "in";
  delay?: number;
  duration?: number;
  triggerOffset?: string;
}

export function GSAPReveal({ 
  children, 
  className = "", 
  direction = "up", 
  delay = 0,
  duration = 1,
  triggerOffset = "top 85%"
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let scale = 1;

    switch (direction) {
      case "up": y = 50; break;
      case "left": x = -50; break;
      case "right": x = 50; break;
      case "in": scale = 0.95; break;
    }

    gsap.fromTo(
      el,
      { 
        opacity: 0, 
        y, 
        x, 
        scale 
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: triggerOffset,
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [direction, delay, duration, triggerOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
