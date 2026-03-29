import { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, LogOut, Menu, X, Sparkles, ArrowRight, TrendingUp, Calendar, Zap, Settings, BarChart3 } from 'lucide-react';
import { AddProjectForm } from '@/pages/AddProjectForm';
import { GSAPReveal } from '@/components/GSAPReveal';

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    setLocation('/admin');
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 md:top-20 right-10 md:right-20 w-72 md:w-96 h-72 md:h-96 bg-primary/8 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-32 md:bottom-40 left-10 md:left-20 w-80 md:w-[28rem] h-80 md:h-[28rem] bg-primary/6 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1 md:right-10 w-56 h-56 bg-primary/4 rounded-full blur-3xl animate-pulse" />
        
        {/* Spinning rings */}
        <div className="absolute -top-40 -left-40 w-80 h-80 border border-primary/8 rounded-full animate-spin-reverse" />
        <div className="absolute -bottom-20 -right-40 w-96 h-96 border-dashed border border-primary/6 rounded-full animate-spin-slow" />
      </div>

      {/* Gradient accent line */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-20" />

      {/* Header/Navbar */}
      <header className="relative z-20 border-b border-primary/10 backdrop-blur-xl bg-background/70">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 md:gap-4 group cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-2.5 md:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl md:text-3xl font-display tracking-wider text-foreground">SHIV INTERIORS</h1>
                <p className="text-xs text-foreground/50 tracking-widest uppercase font-light">Project Management</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-xl font-display tracking-wider text-foreground">SHIV</h1>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <div className="text-right pr-4 lg:pr-6 border-r border-primary/15">
                <p className="text-sm font-semibold text-foreground">{adminEmail}</p>
                <p className="text-xs text-foreground/50">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-destructive/15 to-destructive/5 hover:from-destructive/25 hover:to-destructive/10 text-destructive rounded-lg transition-all duration-300 text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-destructive/20"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-primary/15 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-center pb-4 border-b border-primary/15">
                <p className="text-sm font-semibold text-foreground">{adminEmail}</p>
                <p className="text-xs text-foreground/50">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-destructive/15 to-destructive/5 hover:from-destructive/25 hover:to-destructive/10 text-destructive rounded-lg transition-all duration-300 text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        
        {/* Hero Section */}
        <GSAPReveal className="mb-12 md:mb-16 lg:mb-20">
          <div className="relative">
            {/* Background accent */}
            <div className="absolute -top-20 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-30" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <p className="text-xs md:text-sm text-primary uppercase tracking-widest font-semibold mb-2 md:mb-3">Welcome Back</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wider text-foreground leading-tight">
                      Project Command Center
                    </h2>
                  </div>
                  <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-lg">
                    Effortlessly manage your interior design portfolio, track projects, and showcase your creative work to clients worldwide.
                  </p>
                  <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-primary to-primary/40" />
                </div>
              </div>

              {/* Stats Preview */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '0', label: 'Total', color: 'from-blue-500/20' },
                    { value: '0', label: 'This Month', color: 'from-amber-500/20' },
                  ].map((stat, i) => (
                    <div key={i} className={`bg-gradient-to-br ${stat.color} to-transparent border border-primary/15 rounded-xl p-4 md:p-6 text-center`}>
                      <p className="text-2xl md:text-3xl font-display text-foreground mb-1">{stat.value}</p>
                      <p className="text-xs md:text-sm text-foreground/60 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GSAPReveal>

        {/* Quick Actions */}
        <GSAPReveal delay={0.1} className="mb-12 md:mb-16">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-display tracking-wider text-foreground mb-2">Quick Actions</h3>
              <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-primary to-primary/40" />
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="group relative w-full md:w-auto inline-flex items-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground font-semibold rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 tracking-widest uppercase text-sm overflow-hidden mb-4"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
              
              <Plus className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" />
              <span className="flex-1">Add New Project</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
            </button>
          </div>
        </GSAPReveal>

        {/* Stats Grid */}
        <GSAPReveal delay={0.15} className="mb-12 md:mb-16">
          <div className="space-y-4 md:space-y-6 mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-display tracking-wider text-foreground mb-2">Project Statistics</h3>
              <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-primary to-primary/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { 
                label: 'Total Projects', 
                value: '0', 
                icon: BarChart3,
                color: 'from-blue-500/10 to-blue-600/5',
                iconColor: 'text-blue-500',
                trend: '+0%'
              },
              { 
                label: 'This Month', 
                value: '0', 
                icon: Calendar,
                color: 'from-amber-500/10 to-amber-600/5',
                iconColor: 'text-amber-500',
                trend: '+0%'
              },
              { 
                label: 'Last Updated', 
                value: 'Today', 
                icon: Zap,
                color: 'from-emerald-500/10 to-emerald-600/5',
                iconColor: 'text-emerald-500',
                trend: 'Live'
              },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={i}
                  className={`group relative p-5 md:p-6 lg:p-7 bg-gradient-to-br ${stat.color} border border-primary/15 hover:border-primary/30 rounded-xl md:rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4`}
                  style={{ 
                    animationDelay: `${150 + i * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 rounded-xl md:rounded-2xl transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-background/40 group-hover:bg-background/60 transition-all duration-300`}>
                        <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <span className="text-xs font-semibold text-primary">{stat.trend}</span>
                    </div>
                    
                    <p className="text-foreground/60 text-xs md:text-sm tracking-widest uppercase mb-2 font-medium">{stat.label}</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-display tracking-wider text-foreground group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </GSAPReveal>

        {/* Empty Projects State */}
        <GSAPReveal delay={0.2}>
          <div className="relative py-16 md:py-20 lg:py-24 px-6 md:px-8 bg-gradient-to-br from-secondary/20 to-secondary/5 border border-primary/10 rounded-2xl md:rounded-3xl text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative text-5xl md:text-6xl animate-bounce">📁</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-display tracking-wider text-foreground mb-3">No Projects Yet</h3>
                <p className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  Start building your portfolio by creating your first interior design project. Showcase your creative expertise and connect with potential clients.
                </p>
              </div>
              
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="group inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg md:rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 mt-6 tracking-wider uppercase text-sm"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create First Project</span>
              </button>
            </div>
          </div>
        </GSAPReveal>

        {/* Features Grid */}
        <GSAPReveal delay={0.25} className="mt-16 md:mt-20">
          <div className="space-y-4 md:space-y-6 mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-display tracking-wider text-foreground mb-2">Features</h3>
              <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-primary to-primary/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🎨', title: 'Portfolio Management', desc: 'Showcase your best work' },
              { icon: '📊', title: 'Project Analytics', desc: 'Track engagement metrics' },
              { icon: '🔒', title: 'Secure Access', desc: 'Protected admin panel' },
              { icon: '⚡', title: 'Real-time Updates', desc: 'Instant project refresh' },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="p-5 md:p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border border-primary/10 hover:border-primary/25 rounded-xl md:rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
              >
                <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">{feature.title}</h4>
                <p className="text-xs md:text-sm text-foreground/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </GSAPReveal>
      </main>

      {/* Add Project Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-background rounded-2xl md:rounded-3xl border border-primary/15 shadow-2xl my-8 w-full max-w-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            <AddProjectForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
