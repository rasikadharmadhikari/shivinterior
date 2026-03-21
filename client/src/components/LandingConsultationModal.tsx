import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { insertContactMessageSchema } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export function LandingConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { mutate: submitContact, isPending } = useSubmitContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const onSubmit = (data: ContactFormData) => {
    submitContact(data, {
      onSuccess: () => {
        toast({
          title: "Consultation Request Sent",
          description: "Thank you. Our team will contact you shortly.",
        });
        form.reset();
        close();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Failed to Send",
          description: error.message,
        });
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close consultation form"
        onClick={close}
        className="absolute inset-0 bg-[#21180f]/65 backdrop-blur-[5px]"
      />

      <div className="relative z-[101] flex min-h-full items-center justify-center p-4 md:p-6">
        <div className="relative w-full max-w-[450px] overflow-hidden rounded-2xl border border-[#ccb293] bg-[#fffdfa] px-6 py-6 shadow-[0_22px_80px_rgba(36,22,8,0.42)] md:px-7">
          <div className="pointer-events-none absolute -left-12 -top-14 h-44 w-44 rounded-full bg-[#d6b58a]/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-[#8f6a42]/18 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.45),transparent_44%),radial-gradient(circle_at_86%_78%,rgba(186,151,109,0.12),transparent_46%)]" />

          <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdb79a] bg-[#fff7ec] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#7d5429]">
            <Sparkles className="h-3.5 w-3.5" /> Design Discovery Call
          </div>

          <div className="relative z-10 mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-[2rem] leading-[1.02] text-[#21160d] font-display">
                Shape A Space That
                <span className="block italic text-[#7e4f1e]">Feels Truly Yours</span>
              </h3>
              <p className="mt-2.5 max-w-[92%] text-sm leading-relaxed text-[#4f4033]">
                Tell us what you are planning. We will review your ideas and get back with a tailored consultation.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-[#ccb398] bg-[#fff8ef] p-1 text-[#6d5a47] transition hover:border-[#8c6036] hover:text-[#31251b]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10 space-y-3.5">
            <div>
              <input
                {...form.register("name")}
                className="w-full rounded-md border border-[#bda386] bg-white px-3.5 py-2.5 text-sm text-[#1f1813] placeholder:text-[#7f7366] transition focus:border-[#7e4f1e] focus:outline-none focus:ring-2 focus:ring-[#c8935d]/30"
                placeholder="Full Name"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...form.register("phone")}
                type="tel"
                className="w-full rounded-md border border-[#bda386] bg-white px-3.5 py-2.5 text-sm text-[#1f1813] placeholder:text-[#7f7366] transition focus:border-[#7e4f1e] focus:outline-none focus:ring-2 focus:ring-[#c8935d]/30"
                placeholder="Phone Number (WhatsApp preferred)"
              />
              {form.formState.errors.phone && (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <input
                {...form.register("email")}
                type="email"
                className="w-full rounded-md border border-[#bda386] bg-white px-3.5 py-2.5 text-sm text-[#1f1813] placeholder:text-[#7f7366] transition focus:border-[#7e4f1e] focus:outline-none focus:ring-2 focus:ring-[#c8935d]/30"
                placeholder="Email Address"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...form.register("message")}
                rows={4}
                className="w-full resize-none rounded-md border border-[#bda386] bg-white px-3.5 py-2.5 text-sm text-[#1f1813] placeholder:text-[#7f7366] transition focus:border-[#7e4f1e] focus:outline-none focus:ring-2 focus:ring-[#c8935d]/30"
                placeholder="Share your project goals, location, timeline, and style preferences"
              />
              {form.formState.errors.message && (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#24170d] via-[#3b2514] to-[#5a391f] py-3 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#a97847]/50 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Book My Design Consultation <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="pt-1 text-center text-xs text-[#584838]">Your details stay private. We only contact you for this request.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
