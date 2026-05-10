'use client';

import { useState, useEffect } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Menu,
  X,
  Home,
  Building2,
  Info,
  Wrench,
  Phone,
  ShieldCheck,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', view: 'home' as const, icon: Home },
  { label: 'Properties', view: 'properties' as const, icon: Building2 },
  { label: 'About Us', view: 'home' as const, section: 'about', icon: Info },
  { label: 'Services', view: 'home' as const, section: 'services', icon: Wrench },
  { label: 'Contact', view: 'home' as const, section: 'contact', icon: Phone },
  { label: 'Admin', view: 'admin' as const, icon: ShieldCheck },
];

export default function Navbar() {
  const { currentView, navigate } = useNavigationStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'properties' | 'admin', section?: string) => {
    if (section && view === 'home' && currentView === 'home') {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
        return;
      }
    }
    navigate(view);
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-gold flex items-center justify-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-navy-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold font-heading text-gold tracking-wider">
                KUSTORMIZE
              </span>
              <span className="text-[9px] sm:text-[10px] text-muted-text tracking-widest uppercase">
                Properties & Procurements
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.section)}
                className={`px-3 xl:px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                  (link.view === 'properties' && currentView === 'properties') ||
                  (link.view === 'admin' && currentView === 'admin') ||
                  (link.view === 'home' && currentView === 'home' && !link.section)
                    ? 'text-gold'
                    : 'text-muted-text hover:text-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/2347067132725?text=Hi, I'm interested in your properties."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-gold text-navy-dark text-sm font-semibold rounded hover:bg-gold-light transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold hover:text-gold-light">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-navy-dark border-gold/20 p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-gold/20">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gold flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-navy-dark" />
                      </div>
                      <span className="text-sm font-bold font-heading text-gold">
                        KUSTORMIZE
                      </span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-gold hover:text-gold-light">
                        <X className="w-5 h-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex-1 py-4">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.label}
                          onClick={() => handleNavClick(link.view, link.section)}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors ${
                            (link.view === 'properties' && currentView === 'properties') ||
                            (link.view === 'admin' && currentView === 'admin')
                              ? 'text-gold bg-gold/10'
                              : 'text-muted-text hover:text-gold hover:bg-gold/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-gold/20">
                    <a
                      href="https://wa.me/2347067132725?text=Hi, I'm interested in your properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-navy-dark text-sm font-semibold rounded hover:bg-gold-light transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
