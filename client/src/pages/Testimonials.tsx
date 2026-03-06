import { useEffect } from "react";
import { Link } from "wouter";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ArrowRight, Star, Quote } from "lucide-react";
import { clsx } from "clsx";

/* ═══════════════════ DATA ═══════════════════ */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Adhalrao",
    role: "Homeowner",
    tag: "Residential",
    city: "Pune",
    year: "2022",
    avatar: "RA",
    color: "bg-amber-700",
    highlight: "Delivered on time & within budget",
    quote: "Shiv Interiors completely transformed our home — from the modular kitchen to the false ceilings. Every corner was crafted with precision. The team was professional and punctual throughout. Truly exceptional work.",
  },
  {
    id: 2,
    name: "Priya Kharadi",
    role: "Homeowner",
    tag: "Residential",
    city: "Pune",
    year: "2023",
    avatar: "PK",
    color: "bg-stone-600",
    highlight: "Beyond our expectations",
    quote: "We had a vision for our 3 BHK and Shiv Interiors turned it into reality — better than we imagined. The custom wardrobes, lighting design and premium finishes are stunning. We get compliments from every guest who visits.",
  },
  {
    id: 3,
    name: "Vikram Bhinge",
    role: "Homeowner",
    tag: "Residential",
    city: "Pune",
    year: "2023",
    avatar: "VB",
    color: "bg-zinc-600",
    highlight: "Stress-free from start to finish",
    quote: "Professional team, clean execution and honest pricing. They guided us through every material selection and made the entire process completely stress-free. The final result is a home we are truly proud of.",
  },
  {
    id: 4,
    name: "IAIDC Management",
    role: "Corporate Client",
    tag: "Corporate Office",
    city: "Nagpur",
    year: "2022",
    avatar: "IA",
    color: "bg-yellow-700",
    highlight: "World-class workspace",
    quote: "Our corporate office needed a complete overhaul. Shiv Interiors delivered a world-class workspace — the conference room, executive cabins and reception lobby are all impressive. Our team loves the new environment.",
  },
  {
    id: 5,
    name: "Ravi Masale Team",
    role: "Business Owner",
    tag: "Retail Outlet",
    city: "Navi Mumbai",
    year: "2024",
    avatar: "RM",
    color: "bg-orange-700",
    highlight: "Customer footfall increased",
    quote: "Our retail outlet and back office were both designed by Shiv Interiors. The custom shelving, display layouts and store branding have significantly improved our customer experience and sales flow. Highly recommended.",
  },
  {
    id: 6,
    name: "KKP Corporation",
    role: "Commercial Client",
    tag: "Commercial",
    city: "Dombiwali",
    year: "2025",
    avatar: "KK",
    color: "bg-slate-600",
    highlight: "Completed ahead of schedule",
    quote: "Their team grasped our brand vision instantly. The wall panelling, lighting and ceiling details created an interior that truly stands out. The project was completed ahead of schedule which really impressed us. Will work with them again.",
  },
];

const TICKER_ITEMS = ["Residential Interiors", "Corporate Fit-Outs", "5-Star Reviews", "Retail Spaces", "On-Time Delivery", "Dream Homes Built", "Trusted Since 2001", "Turnkey Execution"];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className={clsx("w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", color)}>
      {initials}
    </div>
  );
}

export default function Testimonials() {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO — matches Home hero exactly ── */}
      <section className="relative flex items-end overflow-hidden" style={{minHeight:'100svh'}}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
        />
        {/* Same gradient stack as Home */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        {/* Gold left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[22%] right-[22%] w-80 h-80 rounded-full bg-primary/9 blur-[90px] animate-blob" />
          <div className="absolute bottom-[18%] right-[8%] w-[24rem] h-[24rem] rounded-full bg-amber-950/12 blur-[110px] animate-blob" style={{animationDelay:'5s'}} />
          <div className="absolute top-[50%] left-[6%] w-48 h-48 rounded-full bg-primary/6 blur-[60px] animate-float" style={{animationDelay:'2.5s'}} />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-28 w-full">
          
          <h1 className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-display text-white leading-[0.9] mb-6 tracking-tight">
            Voices<br />
            <span className="italic text-primary/90 pl-8 md:pl-24">of Trust</span>
          </h1>
          <div className="w-full max-w-lg h-px bg-white/15 mb-8" />
          <GSAPReveal delay={0.3}>
            <p className="text-lg md:text-xl text-white/80 max-w-md mb-10 leading-relaxed font-light">
              Real words from real clients — homeowners &amp; businesses who trusted us to transform their spaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/85 transition group">
                Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white/90 uppercase tracking-widest text-sm hover:border-white hover:text-white transition">
                View Our Work
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* ── TICKER — gold strip like Home ── */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="flex gap-0 whitespace-nowrap w-max" style={{ animation: "marquee 25s linear infinite" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center text-sm tracking-[0.25em] uppercase font-medium mx-8">
              {item} <span className="w-1 h-1 rounded-full bg-primary-foreground/40 ml-8" />
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
      </div>

      {/* ── STATS — matches Home stats bar ── */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: 10,  suffix: "+", label: "Projects Delivered" },
              { num: 5,   suffix: "\u2605", label: "Average Rating" },
              { num: 100, suffix: "%", label: "Client Satisfaction" },
              { num: 3,   suffix: "",  label: "Cities Served" },
            ].map((stat, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className="py-10 px-6 md:px-10 text-center border-r border-background/10 last:border-r-0 group">
                  <AnimatedCounter value={stat.num} suffix={stat.suffix} className="text-4xl md:text-5xl font-display text-primary mb-1 leading-none block" />
                  <div className="w-8 h-px bg-primary/30 mx-auto my-2 group-hover:w-14 transition-all duration-500" />
                  <p className="text-sm uppercase tracking-[0.15em] text-background/85">{stat.label}</p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL REVIEWS — matches Home service cards style ── */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <GSAPReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" /> All Reviews
              </p>
              <h2 className="text-4xl md:text-5xl font-display leading-tight">
                Every Project, <span className="italic text-primary">Every Story</span>
              </h2>
            </GSAPReveal>
            <span className="hidden md:block text-muted-foreground/20 font-display text-7xl leading-none">{TESTIMONIALS.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {TESTIMONIALS.map((t, i) => (
              <GSAPReveal key={t.id} delay={i * 0.08}>
                <div className="group relative overflow-hidden border-r border-b border-border
                  [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0 cursor-default">
                  <div className="relative p-8 md:p-10 flex flex-col gap-5 min-h-[320px]">
                    {/* Number + tag header */}
                    <div className="flex items-start justify-between">
                      <span className="text-6xl font-display text-foreground/10 group-hover:text-primary/20 transition leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/20 bg-primary/5 px-2 py-1">{t.tag}</span>
                    </div>

                    {/* Italic highlight headline */}
                    <p className="font-display italic text-primary text-xl md:text-2xl leading-snug group-hover:text-primary transition">
                      "{t.highlight}"
                    </p>

                    {/* Quote */}
                    <div className="flex-1">
                      <Quote className="w-4 h-4 text-primary/25 mb-2" />
                      <p className="text-muted-foreground text-sm leading-[1.8] group-hover:text-foreground/80 transition">
                        {t.quote}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Avatar initials={t.avatar} color={t.color} />
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-semibold text-sm leading-tight">{t.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{t.role} · {t.city} · {t.year}</p>
                      </div>
                      <Stars />
                    </div>
                  </div>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — matches Home CTA banner exactly ── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img src="/site-photos/kkp-room3.jpg" alt="Interior" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <GSAPReveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-tight mb-8">
              Your Story Could Be<br /><span className="italic text-primary">Next.</span>
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-10 text-lg md:text-xl leading-relaxed font-light">
              Let's design a space you'll love — and a story worth sharing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/85 transition group">
                Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects"
                className="inline-flex items-center gap-3 px-10 py-4 border border-white/40 text-white/90 uppercase tracking-widest text-sm hover:border-white hover:text-white transition">
                Browse Projects
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

    </div>
  );
}
