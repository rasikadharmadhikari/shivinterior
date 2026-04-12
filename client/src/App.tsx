import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home as HomeIcon, Lamp, Sofa } from "lucide-react";

// Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppChat } from "@/components/WhatsAppChat";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import Testimonials from "@/pages/Testimonials";
import { AdminLogin } from "@/pages/AdminLogin";
import { AdminDashboard } from "@/pages/AdminDashboard";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Let the DOM update before refreshing trigger positions
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [location]);
  return null;
}

function VectorPreloader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`vector-preloader fixed inset-0 z-[130] transition-opacity duration-500 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="vector-preloader__container">
        <div className="vector-preloader__orbit-container">
          {/* Center core */}
          <div className="vector-preloader__core">
            <div className="vector-preloader__core-dot" />
          </div>

          {/* Three rotating icons */}
          <div className="vector-preloader__orbit vector-preloader__orbit--fast">
            <div className="vector-preloader__icon">
              <HomeIcon size={40} strokeWidth={1.5} />
            </div>
            <div className="vector-preloader__icon">
              <Lamp size={40} strokeWidth={1.5} />
            </div>
            <div className="vector-preloader__icon">
              <Sofa size={40} strokeWidth={1.5} />
            </div>
          </div>

          {/* Outer accent ring */}
          <div className="vector-preloader__ring" />
        </div>

        <div className="vector-preloader__content">
          <p className="vector-preloader__brand">SHIV INTERIORS</p>
          <p className="vector-preloader__text">Creating Beautiful Spaces</p>
        </div>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setIsRouteLoading(true);
    const timer = setTimeout(() => setIsRouteLoading(false), 900);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <VectorPreloader visible={isRouteLoading} />
      <ScrollToTop />
      <Switch>
        <Route path="/admin/dashboard">
          {() => <AdminDashboard />}
        </Route>
        <Route path="/admin">
          {() => <AdminLogin />}
        </Route>
        <Route>
          {() => (
            <>
              <Navbar />
              <main className="flex-grow">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/projects" component={Projects} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/testimonials" component={Testimonials} />
                  <Route component={NotFound} />
                </Switch>
              </main>
              <Footer />
              <WhatsAppChat />
            </>
          )}
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const complete = () => {
      setTimeout(() => setIsInitialLoading(false), 1200);
    };

    if (document.readyState === "complete") {
      complete();
      return;
    }

    window.addEventListener("load", complete);
    const fallback = setTimeout(() => setIsInitialLoading(false), 4200);

    return () => {
      window.removeEventListener("load", complete);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <VectorPreloader visible={isInitialLoading} />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
