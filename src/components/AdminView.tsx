'use client';

import { useState } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, ShieldCheck, Loader2 } from 'lucide-react';

const locations = [
  'Lekki, Lagos',
  'Victoria Island, Lagos',
  'Ikoyi, Lagos',
  'Ajah, Lagos',
  'Ikeja, Lagos',
  'Gwarinpa, Abuja',
  'Maitama, Abuja',
  'Asokoro, Abuja',
  'Wuse 2, Abuja',
  'Akure, Ondo State',
  'Port Harcourt, Rivers State',
];

export default function AdminView() {
  const { goBack } = useNavigationStore();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    type: 'sale',
    bedrooms: '0',
    bathrooms: '0',
    description: '',
    images: '',
    featured: false,
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'awwal1234') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, featured: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const imageList = form.images
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: imageList,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Property Added Successfully!',
          description: 'The new property has been added to the database.',
          className: 'border-gold/30',
        });
        setForm({
          title: '',
          price: '',
          location: '',
          type: 'sale',
          bedrooms: '0',
          bathrooms: '0',
          description: '',
          images: '',
          featured: false,
        });
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to add property',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Network error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="view-enter min-h-screen pt-20 sm:pt-24 pb-12 flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-muted-text">
              Enter the admin password to continue
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-sm text-muted-text">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter admin password"
                className="mt-1.5 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20"
              />
              {passwordError && (
                <p className="text-xs text-red-400 mt-1">{passwordError}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gold text-navy-dark hover:bg-gold-light font-semibold"
            >
              Access Admin Panel
            </Button>
          </form>

          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-muted-text hover:text-gold transition-colors mt-6 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Admin form
  return (
    <div className="view-enter min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-muted-text hover:text-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Add New Property
              </h1>
              <p className="text-sm text-muted-text">
                Fill in the details to add a new property listing
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm text-muted-text">
              Property Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="e.g. Luxury 5-Bedroom Duplex in Lekki"
              required
              className="mt-1.5 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20"
            />
          </div>

          {/* Price & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm text-muted-text">
                Price (₦) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleFormChange}
                placeholder="e.g. 85000000"
                required
                className="mt-1.5 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-text">Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((prev) => ({ ...prev, type: v }))}
              >
                <SelectTrigger className="mt-1.5 bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/20">
                  <SelectItem
                    value="sale"
                    className="text-foreground focus:bg-gold/10 focus:text-gold"
                  >
                    For Sale
                  </SelectItem>
                  <SelectItem
                    value="rent"
                    className="text-foreground focus:bg-gold/10 focus:text-gold"
                  >
                    For Rent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-sm text-muted-text">Location *</Label>
            <Select
              value={form.location}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, location: v }))
              }
            >
              <SelectTrigger className="mt-1.5 bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-gold/20">
                {locations.map((loc) => (
                  <SelectItem
                    key={loc}
                    value={loc}
                    className="text-foreground focus:bg-gold/10 focus:text-gold"
                  >
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedrooms" className="text-sm text-muted-text">
                Bedrooms
              </Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={handleFormChange}
                className="mt-1.5 bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-sm text-muted-text">
                Bathrooms
              </Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={handleFormChange}
                className="mt-1.5 bg-navy-card border-gold/15 text-foreground focus:border-gold focus:ring-gold/20"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm text-muted-text">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Describe the property features, amenities, and surroundings..."
              rows={5}
              required
              className="mt-1.5 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20 resize-none"
            />
          </div>

          {/* Image URLs */}
          <div>
            <Label htmlFor="images" className="text-sm text-muted-text">
              Image URLs (one per line)
            </Label>
            <Textarea
              id="images"
              name="images"
              value={form.images}
              onChange={handleFormChange}
              placeholder="https://images.unsplash.com/photo-XXXXX?w=800&h=600&fit=crop&#10;https://images.unsplash.com/photo-XXXXX?w=800&h=600&fit=crop"
              rows={4}
              className="mt-1.5 bg-navy-card border-gold/15 text-foreground placeholder:text-muted-text focus:border-gold focus:ring-gold/20 resize-none font-mono text-xs"
            />
            <p className="text-xs text-muted-text mt-1">
              Paste one image URL per line. Unsplash URLs are recommended.
            </p>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-card border border-gold/10">
            <Checkbox
              id="featured"
              checked={form.featured}
              onCheckedChange={handleCheckboxChange}
              className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
            />
            <div>
              <Label htmlFor="featured" className="text-sm text-foreground cursor-pointer">
                Featured Property
              </Label>
              <p className="text-xs text-muted-text">
                Featured properties appear on the homepage
              </p>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-navy-dark hover:bg-gold-light font-semibold py-3 text-base"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Property...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
