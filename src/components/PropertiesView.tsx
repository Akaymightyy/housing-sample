'use client';

import { useEffect, useState, useMemo } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';
import { Building2 } from 'lucide-react';

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

export default function PropertiesView() {
  const {
    searchQuery,
    filterLocation,
    filterType,
    filterMinPrice,
    filterMaxPrice,
  } = useNavigationStore();

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (filterLocation) params.set('location', filterLocation);
        if (filterType) params.set('type', filterType);
        if (filterMinPrice) params.set('minPrice', filterMinPrice);
        if (filterMaxPrice) params.set('maxPrice', filterMaxPrice);

        const res = await fetch(`/api/properties?${params.toString()}`);
        const data = await res.json();
        setAllProperties(data);
      } catch {
        console.error('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [searchQuery, filterLocation, filterType, filterMinPrice, filterMaxPrice]);

  return (
    <div className="view-enter min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            Our Properties
          </h1>
          <div className="section-divider mb-3" />
          <p className="text-sm text-muted-text">
            Browse our collection of premium properties across Nigeria
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-text">
            {!loading && (
              <>
                Showing{' '}
                <span className="text-foreground font-medium">
                  {allProperties.length}
                </span>{' '}
                {allProperties.length === 1 ? 'property' : 'properties'}
                {searchQuery && (
                  <>
                    {' '}
                    for &ldquo;
                    <span className="text-gold">{searchQuery}</span>&rdquo;
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-gold/10 animate-pulse"
              >
                <div className="h-64 bg-navy-card" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-navy-card rounded w-3/4" />
                  <div className="h-3 bg-navy-card rounded w-1/2" />
                  <div className="h-3 bg-navy-card rounded w-full" />
                  <div className="h-3 bg-navy-card rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && allProperties.length === 0 && (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gold/20 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              No Properties Found
            </h3>
            <p className="text-sm text-muted-text max-w-md mx-auto">
              We couldn&apos;t find any properties matching your criteria. Try
              adjusting your filters or search terms.
            </p>
          </div>
        )}

        {/* Property Grid */}
        {!loading && allProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
