import { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { GSAPReveal } from '@/components/GSAPReveal';

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Here you would handle actual login logic
      console.log('Login attempt:', { email, password });
      
      // Store auth token or session
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      
      // Redirect to admin dashboard
      setLocation('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Large decorative orbs */}
        <div className="absolute top-20 right-10 md:top-40 md:right-20 w-72 md:w-96 h-72 md:h-96 bg-primary/8 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-32 left-10 md:bottom-40 md:left-20 w-80 md:w-[28rem] h-80 md:h-[28rem] bg-primary/6 rounded-full blur-3xl animate-blob"  style={{ animationDelay: '2s' }} />
        <div className="absolute -top-40 -left-40 w-80 h-80 border border-primary/8 rounded-full animate-spin-reverse pointer-events-none" />
        
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Main content */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Branding Section with Hero Typography */}
        <GSAPReveal className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-8">
            <div className="relative group">
              {/* Outer glowing ring */}
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-5 md:p-6 rounded-2xl shadow-2xl group-hover:shadow-primary/40">
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wider text-foreground">
              ADMIN PORTAL
            </h1>
            <p className="text-foreground/50 text-sm md:text-base tracking-widest uppercase font-light">
              Secure Access to Your Design Projects
            </p>
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-primary to-primary/40 mx-auto mt-6 md:mt-8" />
          </div>
        </GSAPReveal>

        {/* Main Form Card */}
        <GSAPReveal delay={0.1}>
          <div className="backdrop-blur-md bg-background/85 border border-primary/15 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden hover:border-primary/25 transition-all duration-500">
            {/* Gradient top accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="p-6 md:p-8 lg:p-10 space-y-8">
              {/* Error Message */}
              {error && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-4 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/30 rounded-xl flex items-start gap-3 group">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-sm text-destructive/90 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
                {/* Email Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-0.5 group-focus-within:text-primary transition-colors duration-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail 
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        emailFocused ? 'text-primary scale-110' : 'text-primary/40'
                      }`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="admin@shivinteriors.com"
                      required
                      className="w-full bg-secondary/40 border-2 border-primary/15 rounded-xl pl-12 pr-4 py-3 md:py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:bg-secondary/60 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 text-base"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-0.5 group-focus-within:text-primary transition-colors duration-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock 
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        passwordFocused ? 'text-primary scale-110' : 'text-primary/40'
                      }`}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-secondary/40 border-2 border-primary/15 rounded-xl pl-12 pr-12 py-3 md:py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:bg-secondary/60 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-all duration-300 hover:scale-110"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-primary/30 accent-primary cursor-pointer"
                    />
                    <span className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 transition-all duration-300 tracking-wider font-medium hover:underline underline-offset-2"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative py-3 md:py-4 px-6 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 tracking-widest uppercase text-sm overflow-hidden mt-2"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                  
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Secure Login</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-foreground/40 bg-background/85">OR</span>
                </div>
              </div>

              {/* Demo Access Info */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/2 border border-primary/10 rounded-xl p-4 md:p-5">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Demo Access</p>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      Use test credentials to explore the admin panel and manage your interior design projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-primary/10">
                <p className="text-xs text-foreground/40 text-center tracking-widest uppercase font-light">
                  © {new Date().getFullYear()} SHIV INTERIORS
                </p>
              </div>
            </div>
          </div>
        </GSAPReveal>

        {/* Security Notice */}
        <GSAPReveal delay={0.2} className="mt-8 md:mt-12">
          <div className="p-4 md:p-5 bg-gradient-to-r from-primary/8 via-primary/5 to-primary/8 border border-primary/15 rounded-xl backdrop-blur-sm hover:border-primary/25 transition-all duration-300">
            <div className="flex gap-3">
              <Shield className="w-4 h-4 text-primary/60 flex-shrink-0 mt-1" />
              <p className="text-xs text-foreground/50 leading-relaxed text-center">
                🔒 This is a secure authentication portal. Your credentials are encrypted. Never share your login information with anyone.
              </p>
            </div>
          </div>
        </GSAPReveal>

        {/* Additional Info - Mobile hidden on very small screens */}
        <GSAPReveal delay={0.3} className="mt-8 md:mt-10 hidden sm:flex justify-center gap-8 text-center">
          {[
            { label: 'SSL Encrypted', icon: '🔐' },
            { label: '24/7 Support', icon: '💬' },
            { label: 'Fast & Secure', icon: '⚡' },
          ].map((item, idx) => (
            <div key={idx} className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors duration-300">
              <div className="text-lg md:text-xl mb-1">{item.icon}</div>
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </GSAPReveal>
      </div>
    </div>
  );
}
