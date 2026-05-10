'use client';

import { useEffect, useState } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import { formatPrice, formatPriceFull } from './PriceFormatter';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  Home,
  FileSearch,
  Hammer,
  Handshake,
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images: string;
  featured: boolean;
}

const stats = [
  { value: '500+', label: 'Properties Listed', icon: Building2 },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '50+', label: 'Projects Completed', icon: Hammer },
  { value: '8+', label: 'Years Experience', icon: TrendingUp },
];

const services = [
  {
    icon: Home,
    title: 'Property Sales',
    description:
      'Find your dream home from our extensive portfolio of residential and commercial properties across Nigeria.',
  },
  {
    icon: Building2,
    title: 'Property Rentals',
    description:
      'Discover quality rental properties that meet your budget and lifestyle requirements in prime locations.',
  },
  {
    icon: FileSearch,
    title: 'Property Inspection',
    description:
      'Our expert team conducts thorough property inspections to ensure you make informed investment decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Property Verification',
    description:
      'We verify property documents and titles to protect you from fraudulent transactions and legal issues.',
  },
  {
    icon: Hammer,
    title: 'Property Development',
    description:
      'From concept to completion, we manage property development projects with precision and quality craftsmanship.',
  },
  {
    icon: Handshake,
    title: 'Real Estate Consulting',
    description:
      'Get expert advice on real estate investments, market trends, and portfolio management strategies.',
  },
];

export default function HomeView() {
  const { navigate } = useNavigationStore();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/properties?featured=true');
        const data = await res.json();
        setFeaturedProperties(data.slice(0, 4));
      } catch {
        console.error('Failed to fetch featured properties');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="view-enter">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">
              Trusted Real Estate Partner in Nigeria
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Building Your Future,{' '}
            <span className="gold-gradient">Securing Your Deals</span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover premium properties across Lagos, Abuja, and beyond. Whether
            you&apos;re buying, renting, or investing, we make your real estate
            dreams a reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate('properties')}
              className="bg-gold text-navy-dark hover:bg-gold-light font-semibold px-8 py-3 text-base rounded-lg transition-all duration-200 hover:scale-105"
            >
              Browse Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="https://wa.me/2347067132725?text=Hi, I'm interested in your properties. Please share more details."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 font-medium rounded-lg transition-all duration-200 text-base"
            >
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 sm:py-20 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gold uppercase tracking-widest mb-2">
              Our Portfolio
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-sm sm:text-base text-muted-text max-w-xl mx-auto">
              Handpicked properties that represent the best in luxury living and
              smart investment opportunities.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-gold/10 animate-pulse"
                >
                  <div className="h-64 bg-navy-card" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-navy-card rounded w-3/4" />
                    <div className="h-3 bg-navy-card rounded w-1/2" />
                    <div className="h-3 bg-navy-card rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              onClick={() => navigate('properties')}
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-navy-dark px-8 py-2.5 font-medium transition-all duration-200"
            >
              View All Properties
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-gold/15">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                  alt="Kustormize Properties Office"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:right-8 bg-navy-card border border-gold/20 rounded-xl p-4 backdrop-blur-sm shadow-xl">
                <p className="text-2xl font-bold text-gold font-heading">8+</p>
                <p className="text-xs text-muted-text">Years of Excellence</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-semibold text-gold uppercase tracking-widest mb-2">
                About Us
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                Nigeria&apos;s Trusted Real Estate Partner
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-sm sm:text-base text-muted-text leading-relaxed mb-4">
                Kustormize Properties & Procurements is a premier real estate
                firm dedicated to helping Nigerians find their perfect homes and
                investment properties. With over 8 years of experience, we&apos;ve
                built a reputation for integrity, transparency, and excellence.
              </p>
              <p className="text-sm sm:text-base text-muted-text leading-relaxed mb-8">
                Our team of experienced professionals is committed to providing
                personalized service, ensuring every client finds a property that
                meets their unique needs and aspirations. From luxury apartments
                in Victoria Island to family homes in Gwarinpa, we cover the
                entire spectrum of Nigerian real estate.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 p-3 rounded-lg bg-navy-card border border-gold/10"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground font-heading">
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-muted-text">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gold uppercase tracking-widest mb-2">
              What We Offer
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Our Services
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-sm sm:text-base text-muted-text max-w-xl mx-auto">
              Comprehensive real estate solutions tailored to meet your every
              need, from acquisition to management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group p-6 rounded-xl bg-navy-card border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gold uppercase tracking-widest mb-2">
              Get In Touch
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Contact Us Today
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-sm sm:text-base text-muted-text max-w-xl mx-auto">
              Ready to find your perfect property? Reach out to us and let our
              experts guide you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="https://wa.me/2347067132725?text=Hi, I'm interested in your properties."
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl bg-navy-card border border-gold/10 hover:border-gold/30 text-center transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">
                WhatsApp
              </h3>
              <p className="text-xs text-muted-text">+234 706 713 2725</p>
            </a>

            <a
              href="mailto:kustormize@gmail.com"
              className="group p-6 rounded-xl bg-navy-card border border-gold/10 hover:border-gold/30 text-center transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-envelope text-gold text-lg group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">
                Email Us
              </h3>
              <p className="text-xs text-muted-text">kustormize@gmail.com</p>
            </a>

            <a
              href="tel:+2347067132725"
              className="group p-6 rounded-xl bg-navy-card border border-gold/10 hover:border-gold/30 text-center transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-phone text-gold text-lg group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">
                Call Us
              </h3>
              <p className="text-xs text-muted-text">+234 706 713 2725</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
