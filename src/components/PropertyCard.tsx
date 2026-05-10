'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { formatPrice, formatPriceFull } from './PriceFormatter';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: {
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
  };
  compact?: boolean;
}

export default function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { navigate } = useNavigationStore();
  let images: string[] = [];
  try {
    images = JSON.parse(property.images || '[]');
  } catch {
    images = [];
  }

  const handleClick = () => {
    navigate('property-detail', property.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="property-card group text-left w-full rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={images[0]}
          alt={property.title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            compact ? 'h-48' : 'h-56 sm:h-64'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={
              property.type === 'sale'
                ? 'bg-gold text-navy-dark text-xs font-semibold px-2.5 py-0.5'
                : 'bg-emerald-500 text-white text-xs font-semibold px-2.5 py-0.5'
            }
          >
            {property.type === 'sale' ? 'For Sale' : 'For Rent'}
          </Badge>
          {property.featured && (
            <Badge className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-0.5">
              Featured
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-lg sm:text-xl font-bold text-white">
            {formatPrice(property.price)}
          </p>
          {property.type === 'rent' && (
            <p className="text-xs text-white/80">per year</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-navy-card">
        <h3 className="font-heading font-semibold text-sm sm:text-base text-foreground line-clamp-1 mb-1 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-text flex items-center gap-1.5 mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>

        {!compact && (
          <p className="text-xs text-muted-text line-clamp-2 mb-3">
            {property.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-text pt-3 border-t border-gold/10">
          <span className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-gold" />
            {property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-gold" />
            {property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <i className="fas fa-tag text-gold text-[10px]"></i>
            {formatPriceFull(property.price, property.type)}
          </span>
        </div>
      </div>
    </button>
  );
}
