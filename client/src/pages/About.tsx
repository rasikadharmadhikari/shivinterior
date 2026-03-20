import { useEffect } from "react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Link } from "wouter";
import { ArrowRight, Check, Award, Clock, Users, Home as HomeIcon } from "lucide-react";

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] right-[20%] w-72 h-72 rounded-full bg-primary/10 blur-[90px] animate-blob" />
          <div className="absolute bottom-[15%] left-[10%] w-56 h-56 rounded-full bg-primary/7 blur-[70px] animate-float" style={{animationDelay:'2s'}} />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">
          <GSAPReveal>
            <p className="text-sm tracking-[0.35em] uppercase text-primary mb-4 font-medium flex items-center gap-3">
              <span className="w-8 h-px bg-primary inline-block" />
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[0.95] mb-6">
              About <span className="italic text-primary/90">SHIV</span><br />INTERIORS
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-lg leading-relaxed">
              Pune's trusted turnkey interior firm — 20+ years of transforming
              homes and offices across Maharashtra and beyond.
            </p>
          </GSAPReveal>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10">
            {[
              { num: 20,  suffix: "+",  label: "Years Experience",  icon: Award },
              { num: 200, suffix: "+",  label: "Projects Done",     icon: HomeIcon },
              { num: 6,   suffix: "+",  label: "Cities Served",     icon: Users },
              { num: 100, suffix: "%",  label: "Turnkey Solutions", icon: Clock },
            ].map((stat, i) => (
              <GSAPReveal key={i} delay={i * 0.08}>
                <div className="py-10 px-6 md:px-10 text-center group">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-3 opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
                  <AnimatedCounter value={stat.num} suffix={stat.suffix} className="text-4xl md:text-5xl font-display text-primary leading-none mb-2 block" />
                  <div className="w-8 h-px bg-primary/30 mx-auto my-2 group-hover:w-14 transition-all duration-500" />
                  <p className="text-sm uppercase tracking-[0.2em] text-background/70">{stat.label}</p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <GSAPReveal>
              <p className="text-sm tracking-[0.35em] uppercase text-primary mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />Our Story
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-snug">
                Two decades of crafting spaces that feel like{" "}
                <span className="italic text-primary">home.</span>
              </h2>
            </GSAPReveal>
            <GSAPReveal delay={0.2}>
              <p className="text-foreground/70 leading-relaxed mb-8 text-lg md:text-xl">
                Shiv Interiors is a turnkey interior design firm based in Pune — delivering
                residential and commercial spaces across Chhatrapati Sambhajinagar, Solapur,
                Baramati, Navi Mumbai, and Secunderabad. Concept to completion, under one roof.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Turnkey Execution", "Vastu Compliant", "Budget Conscious", "On-Time Delivery"].map((tag) => (
                  <span key={tag} className="px-5 py-2 border border-border text-sm uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition">
                    {tag}
                  </span>
                ))}
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE FOUNDER ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground">
        {/* decorative gold rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-primary/30" />

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT — photo */}
          <GSAPReveal>
            <div className="relative h-[26rem] lg:h-full overflow-hidden bg-foreground">
              <img
                src="/shiv-photo.png"
                alt="I.D. Shivanand Sutar — Founder, Shiv Interiors"
                className="w-full h-full object-cover object-[center_10%] scale-[1.08] lg:scale-[1.16] lg:object-[center_8%]"
              />
              {/* subtle gradient into the right panel */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-foreground/80" />
              {/* floating label */}
              <div className="absolute bottom-6 left-6 lg:hidden">
                <p className="text-white text-2xl font-display">I.D. Shivanand Sutar</p>
                <p className="text-primary text-sm uppercase tracking-widest mt-1">Founder · Shiv Interiors</p>
              </div>
            </div>
          </GSAPReveal>

          {/* RIGHT — bio */}
          <GSAPReveal delay={0.15}>
            <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 lg:py-24">

              <p className="text-sm tracking-[0.35em] uppercase text-primary mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />Meet the Founder
              </p>

              {/* name — only visible on desktop (overlaps photo on mobile) */}
              <div className="hidden lg:block mb-2">
                <h2 className="text-5xl xl:text-6xl font-display text-background leading-tight">
                  I.D. Shivanand Sutar 
                  
                </h2>
                <p className="text-background/50 text-sm uppercase tracking-[0.25em] mt-3">
                  Interior Designer & Consultant · Founder, Shiv Interiors
                </p>
                <div className="w-14 h-px bg-primary mt-6 mb-8" />
              </div>

              <div className="space-y-5 text-base md:text-lg text-background/70 leading-relaxed">
                <p>
                  With over <span className="text-primary font-medium">20 years</span> of experience in interior design
                  and turnkey project execution, I.D. Shivanand Sutar leads Shiv Interiors with a strong
                  focus on functionality, budget control, and timely delivery.
                </p>
                <p>
                  He has successfully executed residential, commercial, and institutional projects
                  across Pune and nearby cities, delivering spaces that balance aesthetics, comfort,
                  and practical planning.
                </p>
                <p>
                  His expertise covers complete turnkey solutions — from concept design and layout
                  planning to contractor coordination, execution, and final handover — ensuring
                  quality workmanship under one roof.
                </p>
                <p>
                  Shivanand Sir personally supervises every project, believing that great interiors
                  are created through disciplined planning, attention to detail, and commitment to
                  client satisfaction.
                </p>
              </div>

              {/* key credentials */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-background/10 pt-8">
                {[
                  { value: "20+", label: "Years" },
                  { value: "200+", label: "Projects" },
                  { value: "6+", label: "Cities" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-display text-primary leading-none">{s.value}</p>
                    <p className="text-xs uppercase tracking-widest text-background/40 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </GSAPReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <GSAPReveal>
            <div className="max-w-2xl mb-16 md:mb-20">
              <p className="text-sm tracking-[0.35em] uppercase text-primary mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />Our Process
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-5">How We Work</h2>
              
            </div>
          </GSAPReveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Consult",  desc: "Site visit, requirements & budget discussion — we understand your vision before anything else." },
              { step: "02", title: "Design",   desc: "Curated concepts, precise layouts and material palettes tailored to your lifestyle." },
              { step: "03", title: "Execute",  desc: "Supervised fabrication and installation with strict quality checks at every stage." },
              { step: "04", title: "Handover", desc: "Final walkthrough, snagging list, and full project closure on your schedule." },
            ].map((item, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className={`group flex min-h-[280px] flex-col rounded-[1.75rem] border border-border bg-background p-8 md:p-9 shadow-[0_18px_50px_rgba(56,40,28,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_24px_70px_rgba(56,40,28,0.12)] ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}>
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 text-sm font-medium tracking-[0.2em] text-primary">
                      {item.step}
                    </span>
                    <span className="pt-3 text-[0.65rem] uppercase tracking-[0.35em] text-foreground/35">
                      Step {item.step}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-2xl md:text-[2rem] font-display text-foreground mb-3">
                      {item.title}
                    </h3>
                    <div className="mb-5 h-px w-12 bg-primary/45 transition-all duration-300 group-hover:w-20" />
                    <p className="text-base leading-relaxed text-foreground/68">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <GSAPReveal>
            <p className="text-sm tracking-[0.35em] uppercase text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />Our Strengths
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-16">Why Choose Us</h2>
          </GSAPReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              { num: "01", title: "Innovative Design",    desc: "Multiple design options tailored to your space, lifestyle and budget — no templates, just your vision." },
              { num: "02", title: "On-Time Delivery",     desc: "Defined milestones, strict timelines — every project handed over on schedule, every time." },
              { num: "03", title: "Personal Supervision", desc: "Hands-on oversight from our principals throughout the entire execution phase — no surprises." },
              { num: "04", title: "Budget Control",       desc: "We work transparently within your budget without compromising on quality or aesthetics." },
            ].map((item, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className="group bg-background p-10 md:p-14 hover:bg-card transition-colors duration-300 flex gap-8 items-start">
                  <span className="text-6xl md:text-7xl font-display text-primary/12 group-hover:text-primary/25 transition-colors duration-300 leading-none shrink-0 mt-1">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <GSAPReveal>
            <p className="text-sm tracking-[0.35em] uppercase text-primary mb-3 text-center flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-primary" />Pricing<span className="w-6 h-px bg-primary" />
            </p>
            <h2 className="text-3xl md:text-4xl font-display mb-3 text-center">
              Residential <span className="italic">Packages</span>
            </h2>
            <p className="text-foreground/60 text-base text-center max-w-lg mx-auto mb-10">
              Transparent, all-inclusive pricing for every home size.
            </p>
          </GSAPReveal>

          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* 1 BHK */}
            <GSAPReveal delay={0}>
              <div className="group border border-border bg-background hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                <div className="p-6 md:p-7 border-b border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Starter</p>
                  <h3 className="text-3xl font-display mb-3">1 BHK</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display text-primary leading-none">₹2.85</span>
                    <span className="text-sm text-muted-foreground mb-1">Lakh onwards*</span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1">
                    {["Modular kitchen", "1 bedroom wardrobe", "TV unit", "Standard flooring", "POP false ceiling", "Interior painting"].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-shimmer mt-6 flex items-center justify-center gap-2 px-5 py-3 border border-primary text-primary uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition">
                    Get Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GSAPReveal>

            {/* 2 BHK Featured */}
            <GSAPReveal delay={0.1}>
              <div className="relative bg-foreground text-background flex flex-col h-full md:-mt-4 z-10 shadow-2xl">
                <div className="bg-primary text-primary-foreground text-xs uppercase tracking-[0.3em] text-center py-2 font-medium">
                  Most Popular
                </div>
                <div className="p-6 md:p-7 border-b border-background/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Standard</p>
                  <h3 className="text-3xl font-display text-background mb-3">2 BHK</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display text-primary leading-none">₹3.85</span>
                    <span className="text-sm text-background/50 mb-1">Lakh onwards*</span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1">
                    {["Modular kitchen with top & base units", "2 bedroom wardrobes", "Living room furniture", "False ceiling with lighting", "Premium flooring", "Painting & wallpaper", "On-site supervision"].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-background/75">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-shimmer mt-6 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground uppercase tracking-widest text-xs hover:bg-white hover:text-foreground transition">
                    Get Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GSAPReveal>

            {/* 3 BHK */}
            <GSAPReveal delay={0.2}>
              <div className="group border border-border bg-background hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                <div className="p-6 md:p-7 border-b border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Premium</p>
                  <h3 className="text-3xl font-display mb-3">3 BHK</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display text-primary leading-none">₹4.85</span>
                    <span className="text-sm text-muted-foreground mb-1">Lakh onwards*</span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1">
                    {["Full modular kitchen", "3 bedroom wardrobes", "Living & dining furniture", "Custom furniture fabrication", "Premium flooring & false ceiling", "Wallpaper & décor", "Complete turnkey execution"].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-shimmer mt-6 flex items-center justify-center gap-2 px-5 py-3 border border-primary text-primary uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition">
                    Get Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GSAPReveal>

          </div>
          <GSAPReveal delay={0.3}>
            <p className="text-center text-xs text-muted-foreground mt-6">
              * Prices are indicative and may vary based on site conditions, materials and scope. Final quote after site visit.
            </p>
          </GSAPReveal>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img src="/site-photos/hiremath-office.jpg" alt="Modern office interior" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <GSAPReveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-tight mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Ready To Shape Your<br />
              <span className="italic text-primary drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">Next Interior Project?</span>
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-10 text-lg md:text-xl leading-relaxed font-light">
              Tell us about your home, office, or commercial space and our team will help you plan the right design, budget, and execution approach.
            </p>
            <div className="flex justify-center">
              <Link href="/contact" className="btn-shimmer inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/85 transition group">
                Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

    </div>
  );
}
