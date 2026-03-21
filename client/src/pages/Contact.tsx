import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, MapPin, ArrowRight, Facebook, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { z } from "zod";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { mutate: submitContact, isPending } = useSubmitContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    mode: "onChange",
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    service: "",
    spaces: "",
    style: "",
    budget: "",
    timeline: "",
    urgency: "",
  });

  const serviceOptions = [
    { value: "Complete Home Interior", label: "Complete Home Interior", emoji: "🏠" },
    { value: "Renovation + Refresh", label: "Renovation + Refresh", emoji: "🛠" },
    { value: "Modular Kitchen + Storage", label: "Modular Kitchen + Storage", emoji: "🍳" },
    { value: "Custom Furniture + Decor", label: "Custom Furniture + Decor", emoji: "🪑" },
    { value: "Office / Studio Setup", label: "Office / Studio Setup", emoji: "💼" },
    { value: "Design Consultation Only", label: "Design Consultation Only", emoji: "📐" },
  ];

  const spaceOptions = [
    { value: "Living + Dining", label: "Living + Dining", emoji: "🛋" },
    { value: "Master Bedroom", label: "Master Bedroom", emoji: "🛏" },
    { value: "Kitchen", label: "Kitchen", emoji: "🍽" },
    { value: "Bathroom", label: "Bathroom", emoji: "🚿" },
    { value: "Office / Study", label: "Office / Study", emoji: "💼" },
    { value: "Kids Room", label: "Kids Room", emoji: "🧸" },
    { value: "Entire Home", label: "Entire Home", emoji: "🏡" },
    { value: "Commercial Area", label: "Commercial Area", emoji: "🏢" },
  ];

  const styleOptions = [
    { value: "Soft Minimal", label: "Soft Minimal", emoji: "🤍" },
    { value: "Contemporary Chic", label: "Contemporary Chic", emoji: "✨" },
    { value: "Warm Traditional", label: "Warm Traditional", emoji: "🪔" },
    { value: "Industrial Modern", label: "Industrial Modern", emoji: "⚙️" },
    { value: "Scandinavian Calm", label: "Scandinavian Calm", emoji: "🌿" },
    { value: "Premium Luxe", label: "Premium Luxe", emoji: "👑" },
    { value: "Need Style Guidance", label: "Need Style Guidance", emoji: "🧭" },
  ];

  const budgetOptions = [
    { value: "Under 5 Lakh", label: "Under 5 Lakh", emoji: "💸" },
    { value: "5 - 10 Lakh", label: "5 - 10 Lakh", emoji: "💰" },
    { value: "10 - 25 Lakh", label: "10 - 25 Lakh", emoji: "💵" },
    { value: "25 - 50 Lakh", label: "25 - 50 Lakh", emoji: "🪙" },
    { value: "50 Lakh+", label: "50 Lakh+", emoji: "🏆" },
  ];
  const timelineOptions = [
    { value: "Within 1 Month", label: "Within 1 Month", emoji: "⚡" },
    { value: "1 - 3 Months", label: "1 - 3 Months", emoji: "🗓" },
    { value: "3 - 6 Months", label: "3 - 6 Months", emoji: "📆" },
    { value: "6+ Months", label: "6+ Months", emoji: "⏳" },
    { value: "Flexible", label: "Flexible", emoji: "🧘" },
  ];
  const urgencyOptions = [
    { value: "High Priority", label: "High Priority", emoji: "🚀" },
    { value: "Moderate", label: "Moderate", emoji: "🎯" },
    { value: "Planning Ahead", label: "Planning Ahead", emoji: "🧠" },
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const canGoNext = () => {
    if (currentStep === 1) return !!answers.service;
    if (currentStep === 2) return !!answers.spaces;
    if (currentStep === 3) return !!answers.style;
    if (currentStep === 4) return !!answers.budget && !!answers.timeline && !!answers.urgency;
    return false;
  };

  const setAnswer = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: ContactFormData) => {
    const wizardSummary = [
      "Interior Consultation Wizard",
      `Service Need: ${answers.service}`,
      `Primary Space: ${answers.spaces}`,
      `Design Direction: ${answers.style}`,
      `Budget Range: ${answers.budget}`,
      `Preferred Timeline: ${answers.timeline}`,
      `Project Priority: ${answers.urgency}`,
      "",
      "Additional Notes:",
      data.message,
    ].join("\n");

    submitContact({ ...data, message: wizardSummary }, {
      onSuccess: () => {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting SHIV INTERIORS. Our team will reach out to you shortly.",
        });
        form.reset();
        setAnswers({
          service: "",
          spaces: "",
          style: "",
          budget: "",
          timeline: "",
          urgency: "",
        });
        setCurrentStep(1);
      },
      onError: (error) => {
        toast({ variant: "destructive", title: "Submission Failed", description: error.message });
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-background">

      {/* HERO BANNER */}
      <section className="relative h-[52vh] min-h-[340px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <GSAPReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-medium">
              Get In Touch
            </p>
            <h1 className="text-5xl md:text-7xl font-display text-white leading-tight">
              Let's Build<br />
              <span className="italic text-primary/90">Something</span> Beautiful
            </h1>
          </GSAPReveal>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-background/10">
            {[
              { num: 20,  suffix: "+", label: "Years of Experience" },
              { num: 200, suffix: "+", label: "Projects Delivered" },
              { num: 100, suffix: "%", label: "Turnkey Solutions" },
            ].map((stat, i) => (
              <div key={i} className="py-6 px-4 md:px-10 text-center group">
                <AnimatedCounter value={stat.num} suffix={stat.suffix} className="text-2xl md:text-3xl font-display text-primary block" />
                <p className="text-[11px] uppercase tracking-widest text-background/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* LEFT: INFO PANEL */}
            <div className="lg:col-span-2 space-y-6">
              <GSAPReveal>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Ready to transform your space? Share your requirements and our
                  design consultants will connect with you within 24 hours.
                </p>
              </GSAPReveal>

              <GSAPReveal delay={0.1}>
                <a href="tel:09370455666" className="group flex items-start gap-5 p-5 border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Call Us</p>
                    <p className="font-medium text-foreground">09370455666</p>
                    
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto self-center opacity-0 group-hover:opacity-100 text-primary transition" />
                </a>
              </GSAPReveal>

              <GSAPReveal delay={0.2}>
                <div className="flex items-start gap-5 p-5 border border-border bg-card">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Visit Us</p>
                    <p className="font-medium text-foreground">21 Prasad Chambers, Karve Road</p>
                    <p className="text-sm text-muted-foreground">Pune – 411004</p>
                  </div>
                </div>
              </GSAPReveal>

            

  

              <GSAPReveal delay={0.5}>
                <a
                  href="https://www.facebook.com/share/16yjiLwBC4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5 p-5 border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition"
                >
                  <div className="w-10 h-10 shrink-0 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Follow Us</p>
                    <p className="font-medium text-foreground">SHIV INTERIORS</p>
                    <p className="text-sm text-muted-foreground">Facebook Page</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto self-center opacity-0 group-hover:opacity-100 text-primary transition" />
                </a>
              </GSAPReveal>
            </div>

            {/* RIGHT: FORM */}
            <div className="lg:col-span-3">
              <GSAPReveal delay={0.2}>
                <div className="relative">
                  <div className="h-1 w-16 bg-primary mb-0" />
                  <div className="bg-card border border-border p-8 md:p-12">
                    <h2 className="text-3xl font-display mb-2">Tell Us About Your Project</h2>
                    <p className="text-muted-foreground mb-8">
                      A quick 5-step form so we can suggest the right interior plan for your needs.
                    </p>

                    <div className="mb-8 flex items-center gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((step) => {
                        const isCompleted = step < currentStep;
                        const isActive = step === currentStep;
                        return (
                          <div key={step} className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition ${
                                isCompleted
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : isActive
                                    ? "bg-foreground border-foreground text-background"
                                    : "bg-background border-border text-muted-foreground"
                              }`}
                            >
                              {isCompleted ? <Check className="w-4 h-4" /> : step}
                            </div>
                            {step !== 5 && <div className="w-6 sm:w-10 h-px bg-border" />}
                          </div>
                        );
                      })}
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {currentStep === 1 && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-2xl font-display mb-1">Step 1: Project Intent</h3>
                            <p className="text-muted-foreground">What kind of support are you looking for right now?</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {serviceOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setAnswer("service", opt.value)}
                                className={`text-left px-4 py-3 border transition ${
                                  answers.service === opt.value
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-background text-foreground border-border hover:border-primary/60"
                                }`}
                              >
                                <span className="inline-flex items-center gap-2">
                                  <span>{opt.emoji}</span>
                                  <span>{opt.label}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-2xl font-display mb-1">Step 2: Focus Area</h3>
                            <p className="text-muted-foreground">Which area should we prioritize first?</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {spaceOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setAnswer("spaces", opt.value)}
                                className={`text-left px-4 py-3 border transition ${
                                  answers.spaces === opt.value
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-background text-foreground border-border hover:border-primary/60"
                                }`}
                              >
                                <span className="inline-flex items-center gap-2">
                                  <span>{opt.emoji}</span>
                                  <span>{opt.label}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-2xl font-display mb-1">Step 3: Design Personality</h3>
                            <p className="text-muted-foreground">Pick the aesthetic direction that best matches your taste.</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {styleOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setAnswer("style", opt.value)}
                                className={`text-left px-4 py-3 border transition ${
                                  answers.style === opt.value
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-background text-foreground border-border hover:border-primary/60"
                                }`}
                              >
                                <span className="inline-flex items-center gap-2">
                                  <span>{opt.emoji}</span>
                                  <span>{opt.label}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div className="space-y-7">
                          <div>
                            <h3 className="text-2xl font-display mb-1">Step 4: Budget + Timeline</h3>
                            <p className="text-muted-foreground">Help us estimate scope and delivery rhythm.</p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Budget Range</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {budgetOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setAnswer("budget", opt.value)}
                                  className={`text-left px-4 py-3 border transition ${
                                    answers.budget === opt.value
                                      ? "bg-foreground text-background border-foreground"
                                      : "bg-background text-foreground border-border hover:border-primary/60"
                                  }`}
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <span>{opt.emoji}</span>
                                    <span>{opt.label}</span>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Preferred Start Timeline</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {timelineOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setAnswer("timeline", opt.value)}
                                  className={`text-left px-4 py-3 border transition ${
                                    answers.timeline === opt.value
                                      ? "bg-foreground text-background border-foreground"
                                      : "bg-background text-foreground border-border hover:border-primary/60"
                                  }`}
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <span>{opt.emoji}</span>
                                    <span>{opt.label}</span>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Priority Level</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {urgencyOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setAnswer("urgency", opt.value)}
                                  className={`text-left px-4 py-3 border transition ${
                                    answers.urgency === opt.value
                                      ? "bg-foreground text-background border-foreground"
                                      : "bg-background text-foreground border-border hover:border-primary/60"
                                  }`}
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <span>{opt.emoji}</span>
                                    <span>{opt.label}</span>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 5 && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-2xl font-display mb-1">Step 5: Your Contact Details</h3>
                            <p className="text-muted-foreground">Share your details so our design team can connect with you.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                Name *
                              </label>
                              <input
                                {...form.register("name")}
                                className="w-full bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/60"
                                placeholder="Your full name"
                              />
                              {form.formState.errors.name && (
                                <p className="text-destructive text-xs mt-1.5">{form.formState.errors.name.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                Email *
                              </label>
                              <input
                                {...form.register("email")}
                                type="email"
                                className="w-full bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/60"
                                placeholder="you@example.com"
                              />
                              {form.formState.errors.email && (
                                <p className="text-destructive text-xs mt-1.5">{form.formState.errors.email.message}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                              Phone Number *
                            </label>
                            <input
                              {...form.register("phone")}
                              type="tel"
                              className="w-full bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/60"
                              placeholder="+91 98765 43210"
                            />
                            {form.formState.errors.phone && (
                              <p className="text-destructive text-xs mt-1.5">{form.formState.errors.phone.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                              Anything Else?
                            </label>
                            <textarea
                              {...form.register("message")}
                              rows={5}
                              className="w-full bg-background border border-border px-4 py-3 text-sm resize-none placeholder:text-muted-foreground/60"
                              placeholder="Special requirements, preferred site location, references, or any additional note"
                            />
                            {form.formState.errors.message && (
                              <p className="text-destructive text-xs mt-1.5">{form.formState.errors.message.message}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-border flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                          disabled={currentStep === 1 || isPending}
                          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>

                        {currentStep < 5 ? (
                          <button
                            type="button"
                            onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                            disabled={!canGoNext()}
                            className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background uppercase tracking-[0.2em] text-sm transition hover:bg-primary disabled:opacity-45 disabled:cursor-not-allowed"
                          >
                            Next <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isPending || !form.formState.isValid}
                            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground uppercase tracking-[0.2em] text-sm transition hover:bg-foreground disabled:opacity-45 disabled:cursor-not-allowed"
                          >
                            {isPending ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                            ) : (
                              <><span>Submit</span><ArrowRight className="w-4 h-4" /></>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </GSAPReveal>
            </div>

          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-0">
        <GSAPReveal>
          <div className="relative">
            <div className="w-full h-[420px] md:h-[480px]">
              <iframe
                title="SHIV INTERIORS Location"
                src="https://maps.google.com/maps?q=18.4909,73.8053&z=16&output=embed"
                className="w-full h-full border-0 grayscale contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-foreground border-l-2 border-primary px-6 py-5 shadow-2xl max-w-xs">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-primary" />Our Location
              </p>
              <p className="font-display text-xl text-background mb-1">SHIV INTERIORS</p>
              <div className="w-8 h-px bg-primary/40 my-3" />
              <p className="text-sm text-background/65 leading-relaxed">
                21 Prasad Chambers, Karve Road<br />
                Pune – 411004
              </p>
              <a
                href="https://www.google.com/maps/search/21+Prasad+Chambers+Karve+Road+Pune+411004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.25em] text-primary hover:text-background transition group"
              >
                Open in Maps <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </GSAPReveal>
      </section>

    </div>
  );
}
