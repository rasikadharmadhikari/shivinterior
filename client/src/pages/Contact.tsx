import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, MapPin, Mail, Clock, ArrowRight, Facebook } from "lucide-react";
import { z } from "zod";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { mutate: submitContact, isPending } = useSubmitContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onSubmit = (data: ContactFormData) => {
    submitContact(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting SHIV INTERIORS. Our team will reach out to you shortly.",
        });
        form.reset();
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
                    <p className="font-medium text-foreground">S. No, Ganapati Matha, 44/2, NDA Road</p>
                    <p className="text-sm text-muted-foreground">Vitthal Nagar, Warje, Pune – 411058</p>
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
                    <h2 className="text-3xl font-display mb-2">Send Your Requirement</h2>
                    

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                            Full Name
                          </label>
                          <input
                            {...form.register("name")}
                            className="w-full bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/50 input-glow"
                            placeholder="e.g. Rajesh Sharma"
                          />
                          {form.formState.errors.name && (
                            <p className="text-destructive text-xs mt-1.5">{form.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                            Email Address
                          </label>
                          <input
                            {...form.register("email")}
                            type="email"
                            className="w-full bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/50 input-glow"
                            placeholder="your@email.com"
                          />
                          {form.formState.errors.email && (
                            <p className="text-destructive text-xs mt-1.5">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">
                          Project Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Residential", "Commercial", "Office", "Clinic / Hospital", "Other"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setSelectedType(selectedType === type ? null : type)}
                              className={`px-4 py-1.5 border text-xs uppercase tracking-wider transition select-none ${
                                selectedType === type
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                          Project Details
                        </label>
                        <textarea
                          {...form.register("message")}
                          rows={5}
                          className="w-full bg-background border border-border px-4 py-3 text-sm transition resize-none placeholder:text-muted-foreground/50 input-glow"
                          placeholder="Flat size, location, budget range, timeline, special requirements..."
                        />
                        {form.formState.errors.message && (
                          <p className="text-destructive text-xs mt-1.5">{form.formState.errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="btn-shimmer group w-full py-4 bg-primary text-primary-foreground uppercase tracking-[0.2em] text-sm hover:bg-foreground transition flex justify-center items-center gap-3 disabled:opacity-50"
                      >
                        {isPending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><span>Submit Enquiry</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </button>

                     
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
                Ganapati Matha, 44/2, NDA Road<br />
                Vitthal Nagar, Warje, Pune – 411058
              </p>
              <a
                href="https://www.google.com/maps/search/SHIV+INTERIORS,+44%2F2,+NDA+Rd,+Vitthal+Nagar,+Warje,+Pune,+Maharashtra+411058"
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
