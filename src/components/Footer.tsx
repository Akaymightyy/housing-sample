'use client';

import { Building2 } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation-store';

export default function Footer() {
  const { navigate } = useNavigationStore();

  const handleNavClick = (view: 'home' | 'properties' | 'admin') => {
    navigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-dark border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-gold flex items-center justify-center">
                <Building2 className="w-6 h-6 text-navy-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold font-heading text-gold tracking-wider">
                  KUSTORMIZE
                </span>
                <span className="text-[10px] text-muted-text tracking-widest uppercase">
                  Properties & Procurements
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-text leading-relaxed">
              Building Your Future, Securing Your Deals. We provide premium real
              estate services across Nigeria with integrity and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-heading text-gold mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', view: 'home' as const },
                { label: 'Properties', view: 'properties' as const },
                { label: 'About Us', view: 'home' as const },
                { label: 'Services', view: 'home' as const },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.view)}
                    className="text-sm text-muted-text hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-heading text-gold mb-4 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#c9a84c"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="text-xs text-muted-text">WhatsApp</p>
                  <a
                    href="tel:+2347067132725"
                    className="text-sm text-foreground hover:text-gold transition-colors"
                  >
                    +234 706 713 2725
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i
                  className="fas fa-envelope text-gold mt-1 text-sm"
                ></i>
                <div>
                  <p className="text-xs text-muted-text">Email</p>
                  <a
                    href="mailto:kustormize@gmail.com"
                    className="text-sm text-foreground hover:text-gold transition-colors"
                  >
                    kustormize@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-sm font-bold font-heading text-gold mb-4 uppercase tracking-wider">
              Our Offices
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-gold mt-1 text-sm"></i>
                <div>
                  <p className="text-sm font-medium text-foreground">Lagos Office</p>
                  <p className="text-xs text-muted-text">
                    40 Awoseyin Street, Shomolu, Lagos
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-gold mt-1 text-sm"></i>
                <div>
                  <p className="text-sm font-medium text-foreground">Akure Office</p>
                  <p className="text-xs text-muted-text">
                    20 Alabi Close, Southgate, Akure
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-text text-center sm:text-left">
            &copy; {new Date().getFullYear()} Kustormize Properties & Procurements. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-navy-dark transition-all duration-200"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-sm"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-navy-dark transition-all duration-200"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-sm"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-navy-dark transition-all duration-200"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
