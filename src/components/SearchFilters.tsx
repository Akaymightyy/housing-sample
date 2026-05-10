'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const locations = [
  { value: '__all__', label: 'All Locations' },
  { value: 'Lagos', label: 'Lagos' },
  { value: 'Abuja', label: 'Abuja' },
  { value: 'Akure', label: 'Akure' },
  { value: 'Port Harcourt', label: 'Port Harcourt' },
];

const priceRanges = [
  { value: '__all__', label: 'All Prices' },
  { value: '0-5000000', label: 'Under ₦5M' },
  { value: '5000000-15000000', label: '₦5M - ₦15M' },
  { value: '15000000-50000000', label: '₦15M - ₦50M' },
  { value: '50000000-100000000', label: '₦50M - ₦100M' },
  { value: '100000000-9999999999', label: 'Above ₦100M' },
];

export default function SearchFilters() {
  const {
    searchQuery,
    filterLocation,
    filterType,
    filterMinPrice,
    filterMaxPrice,
    setSearchQuery,
    setFilters,
  } = useNavigationStore();

  const handleLocationChange = (value: string) => {
    if (value === '__all__') {
      setFilters({ location: '' });
    } else {
      setFilters({ location: value });
    }
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === '__all__' || !value) {
      setFilters({ minPrice: '', maxPrice: '' });
      return;
    }
    const [min, max] = value.split('-');
    setFilters({ minPrice: min, maxPrice: max });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ location: '', type: '', minPrice: '', maxPrice: '' });
  };

  const hasActiveFilters =
    searchQuery || filterLocation || filterType || filterMinPrice;

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search properties by title, location..."
          className="pl-10 pr-10 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-gold"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[140px]">
          <Select
            value={filterLocation || '__all__'}
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20 h-9 text-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-muted-text" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-gold/20">
              {locations.map((loc) => (
                <SelectItem
                  key={loc.value}
                  value={loc.value}
                  className="text-foreground focus:bg-gold/10 focus:text-gold"
                >
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <Select
            value={
              filterMinPrice
                ? `${filterMinPrice}-${filterMaxPrice || '9999999999'}`
                : '__all__'
            }
            onValueChange={handlePriceRangeChange}
          >
            <SelectTrigger className="bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20 h-9 text-sm">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-gold/20">
              {priceRanges.map((range) => (
                <SelectItem
                  key={range.value}
                  value={range.value}
                  className="text-foreground focus:bg-gold/10 focus:text-gold"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          {['', 'sale', 'rent'].map((type) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              onClick={() => setFilters({ type })}
              className={`h-9 px-3 text-xs font-medium rounded-lg transition-all ${
                filterType === type
                  ? 'bg-gold text-navy-dark hover:bg-gold-light'
                  : 'bg-navy-card text-muted-text hover:text-gold hover:bg-gold/10'
              }`}
            >
              {type === '' ? 'All' : type === 'sale' ? 'For Sale' : 'For Rent'}
            </Button>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9 px-3 text-xs text-muted-text hover:text-gold"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
