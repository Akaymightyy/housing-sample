'use client';

import { useEffect, useState } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import PropertyCard from './PropertyCard';
import { formatPriceFull } from './PriceFormatter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bed,
  Bath,
  MapPin,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Tag,
  Share2,
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

export default function PropertyDetailView() {
  const { selectedPropertyId, navigate, goBack } = useNavigationStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!selectedPropertyId) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/properties/${selectedPropertyId}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);

          // Fetch related properties (same location, different id)
          const relRes = await fetch(
            `/api/properties?location=${encodeURIComponent(data.location.split(',')[0])}`
          );
          if (relRes.ok) {
            const relData = await relRes.json();
            setRelatedProperties(
              relData
                .filter((p: Property) => p.id !== data.id)
                .slice(0, 3)
            );
          }
        }
      } catch {
        console.error('Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
    setCurrentImageIndex(0);
  }, [selectedPropertyId]);

  const handlePrevImage = () => {
    if (!property) return;
    let images: string[] = [];
    try { images = JSON.parse(property.images || '[]'); } catch { images = []; }
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!property) return;
    let images: string[] = [];
    try { images = JSON.parse(property.images || '[]'); } catch { images = []; }
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in this property: ${property?.title} priced at ${property ? formatPriceFull(property.price, property.type) : ''}. Located at ${property?.location}. Please share more details.`
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-8 bg-navy-card rounded w-40 mb-8" />
          <div className="h-[500px] bg-navy-card rounded-xl mb-8" />
          <div className="h-6 bg-navy-card rounded w-2/3 mb-4" />
          <div className="h-4 bg-navy-card rounded w-1/3 mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-navy-card rounded w-full" />
            <div className="h-4 bg-navy-card rounded w-5/6" />
            <div className="h-4 bg-navy-card rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Property Not Found
          </h2>
          <p className="text-sm text-muted-text mb-4">
            The property you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={goBack} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = JSON.parse(property.images || '[]');
  } catch {
    images = [];
  }

  return (
    <div className="view-enter min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-muted-text hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative rounded-xl overflow-hidden mb-8 group">
              <img
                src={images[currentImageIndex]}
                alt={property.title}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge
                  className={
                    property.type === 'sale'
                      ? 'bg-gold text-navy-dark text-xs font-semibold'
                      : 'bg-emerald-500 text-white text-xs font-semibold'
                  }
                >
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
                {property.featured && (
                  <Badge className="bg-amber-500 text-white text-xs font-semibold">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-gold'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Description */}
            <div className="mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-3">
                {property.title}
              </h1>
              <p className="flex items-center gap-2 text-sm text-muted-text mb-6">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                {property.location}
              </p>
              <div className="section-divider mb-6" />
              <div className="prose prose-invert max-w-none">
                <p className="text-sm sm:text-base text-muted-text leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-navy-card border border-gold/10 text-center">
                <Bed className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground font-heading">
                  {property.bedrooms}
                </p>
                <p className="text-xs text-muted-text">
                  Bedroom{property.bedrooms !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-card border border-gold/10 text-center">
                <Bath className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground font-heading">
                  {property.bathrooms}
                </p>
                <p className="text-xs text-muted-text">
                  Bathroom{property.bathrooms !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-card border border-gold/10 text-center col-span-2 sm:col-span-1">
                <Tag className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground font-heading">
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </p>
                <p className="text-xs text-muted-text">Listing Type</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="p-6 rounded-xl bg-navy-card border border-gold/15">
                <p className="text-xs text-muted-text mb-1 uppercase tracking-wider">
                  {property.type === 'sale' ? 'Asking Price' : 'Annual Rent'}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gold font-heading mb-4">
                  {formatPriceFull(property.price, property.type)}
                </p>

                <a
                  href={`https://wa.me/2347067132725?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors mb-3"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact Agent / Book Inspection
                </a>

                <Button
                  onClick={() => navigate('properties')}
                  variant="outline"
                  className="w-full border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Browse More Properties
                </Button>
              </div>

              {/* Agent Info */}
              <div className="p-6 rounded-xl bg-navy-card border border-gold/15">
                <h3 className="font-heading font-semibold text-foreground text-sm mb-4">
                  Need Help?
                </h3>
                <p className="text-xs text-muted-text mb-4 leading-relaxed">
                  Our property consultants are available to answer your
                  questions and schedule a viewing at your convenience.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a84c">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-text">WhatsApp</p>
                      <a
                        href="https://wa.me/2347067132725"
                        className="text-sm text-foreground hover:text-gold"
                      >
                        +234 706 713 2725
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-gold text-xs" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-text">Email</p>
                      <a
                        href="mailto:kustormize@gmail.com"
                        className="text-sm text-foreground hover:text-gold"
                      >
                        kustormize@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
                Similar Properties
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
