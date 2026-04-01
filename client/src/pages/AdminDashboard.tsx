import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Plus, LogOut, Menu, X, Sparkles, ArrowRight, TrendingUp, Calendar, Zap, Settings, BarChart3, Edit2, Trash2, Loader } from 'lucide-react';
import { AddProjectForm } from '@/pages/AddProjectForm';
import { EditProjectForm } from '@/pages/EditProjectForm';
import { ProjectDetailModal } from '@/pages/ProjectDetailModal';
import { GSAPReveal } from '@/components/GSAPReveal';

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProject, setDetailProject] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Calculate stats
  const totalProjects = projects.length;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const thisMonthProjects = projects.filter((project) => {
    const projectDate = new Date(project.createdAt);
    return projectDate.getMonth() === currentMonth && projectDate.getFullYear() === currentYear;
  }).length;

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    setLocation('/admin');
  };

  const handleDeleteProject = async (projectId: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This will permanently delete all images and cannot be undone.`
    );
    
    if (!confirmed) return;

    setDeletingProjectId(projectId);
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Instantly remove from local state
        setProjects(projects.filter(p => p._id !== projectId));
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to delete project: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert(`Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleEditProject = (projectId: string) => {
    const project = projects.find(p => p._id === projectId);
    if (project) {
      setEditingProject(project);
      setShowEditForm(true);
    }
  };

  const handleEditProjectSuccess = (updatedProject: any) => {
    // Update the project in the projects state array
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      )
    );
  };

  const handleViewProject = (projectId: string) => {
    const project = projects.find(p => p._id === projectId);
    if (project) {
      setDetailProject(project);
      setShowDetailModal(true);
    }
  };

  const handleDetailProjectNavigate = (projectId: string) => {
    const project = projects.find(p => p._id === projectId);
    if (project) {
      setDetailProject(project);
    }
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
                    { value: totalProjects.toString(), label: 'Total', color: 'from-blue-500/20' },
                    { value: thisMonthProjects.toString(), label: 'This Month', color: 'from-amber-500/20' },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {[
              { 
                label: 'Total Projects', 
                value: totalProjects.toString(), 
                icon: BarChart3,
                color: 'from-blue-500/10 to-blue-600/5',
                iconColor: 'text-blue-500',
                trend: `+${totalProjects}`
              },
              { 
                label: 'This Month', 
                value: thisMonthProjects.toString(), 
                icon: Calendar,
                color: 'from-amber-500/10 to-amber-600/5',
                iconColor: 'text-amber-500',
                trend: `+${thisMonthProjects}`
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

        {/* Projects List Section */}
        <GSAPReveal delay={0.2} className="mb-12 md:mb-16">
          <div className="space-y-4 md:space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-display tracking-wider text-foreground mb-2">All Projects</h3>
                <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-primary to-primary/40" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/15 border border-primary/25 rounded-lg">
                <span className="text-xs md:text-sm font-semibold text-primary">{totalProjects}</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingProjects && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-foreground/60">Loading projects...</p>
              </div>
            </div>
          )}

          {/* Projects List or Empty State */}
          {!isLoadingProjects && projects.length === 0 ? (
            // Show existing empty state when no projects
            <div className="relative py-16 md:py-20 lg:py-24 px-6 md:px-8 bg-gradient-to-br from-secondary/20 to-secondary/5 border border-primary/10 rounded-2xl md:rounded-3xl text-center overflow-hidden">
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
                <button
                  onClick={() => setShowAddForm(true)}
                  className="group inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg md:rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 mt-6 tracking-wider uppercase text-sm"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create First Project</span>
                </button>
              </div>
            </div>
          ) : (
            // Projects List
            <div className="space-y-3 md:space-y-4">
              {projects.map((project, idx) => {
                const projectDate = new Date(project.createdAt);
                const formattedDate = projectDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={project._id}
                    onClick={() => handleViewProject(project._id)}
                    className="group relative flex items-center gap-4 md:gap-6 p-4 md:p-5 bg-gradient-to-r from-secondary/20 to-secondary/5 border border-primary/10 hover:border-primary/25 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-primary/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 cursor-pointer"
                    style={{
                      animationDelay: `${300 + idx * 50}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover border border-primary/15"
                        />
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 bg-primary/15 text-primary text-xs font-medium rounded border border-primary/25">
                            {project.projectType || project.category || 'Project'}
                          </span>
                          {project.location && (
                            <span className="text-xs md:text-sm text-foreground/60">
                              📍 {project.location}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-foreground/50">
                          Added {formattedDate}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project._id);
                        }}
                        className="p-2 md:p-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 hover:text-amber-700 transition-all duration-300 hover:scale-105"
                        title="Edit project"
                      >
                        <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project._id, project.title);
                        }}
                        disabled={deletingProjectId === project._id}
                        className="p-2 md:p-2.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title={deletingProjectId === project._id ? "Deleting..." : "Delete project"}
                      >
                        {deletingProjectId === project._id ? (
                          <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

      {/* Edit Project Modal */}
      {showEditForm && editingProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEditForm(false);
            }
          }}
        >
          <div className="bg-background rounded-2xl md:rounded-3xl border border-primary/15 shadow-2xl my-8 w-full max-w-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            <EditProjectForm 
              project={editingProject}
              onClose={() => setShowEditForm(false)} 
              onSuccess={handleEditProjectSuccess}
            />
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {showDetailModal && detailProject && (
        <ProjectDetailModal
          project={detailProject}
          projects={projects}
          onClose={() => setShowDetailModal(false)}
          onNavigate={handleDetailProjectNavigate}
        />
      )}
    </div>
  );
}
