'use client';

import { useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

// Dynamic imports to avoid SSR issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const WhatsAppFloat = dynamic(() => import('@/components/WhatsAppFloat'), { ssr: false });
const HomeView = dynamic(() => import('@/components/HomeView'), { ssr: false });
const PropertiesView = dynamic(() => import('@/components/PropertiesView'), { ssr: false });
const PropertyDetailView = dynamic(() => import('@/components/PropertyDetailView'), { ssr: false });
const AdminView = dynamic(() => import('@/components/AdminView'), { ssr: false });

// Error Boundary to catch runtime errors in views
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ViewErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('ViewErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-text mb-6">
              An unexpected error occurred. Please try again or go back to the home page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-gold text-navy-dark hover:bg-gold-light"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  useNavigationStore.getState().navigate('home');
                }}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Page() {
  const { currentView, navigate, saveScrollPosition } = useNavigationStore();
  const initialized = useRef(false);

  // Handle hydration & URL initialization
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Initialize from URL on mount
    const searchParams = new URLSearchParams(window.location.search);
    const viewParam = searchParams.get('view');
    const idParam = searchParams.get('id');

    if (viewParam) {
      if (
        viewParam === 'home' ||
        viewParam === 'properties' ||
        viewParam === 'admin'
      ) {
        useNavigationStore.setState({ currentView: viewParam as 'home' | 'properties' | 'admin' });
      } else if (viewParam === 'property-detail' && idParam) {
        useNavigationStore.setState({ currentView: 'property-detail', selectedPropertyId: idParam });
      }
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.view) {
        saveScrollPosition();
        const view = state.view as 'home' | 'properties' | 'property-detail' | 'admin';
        const propertyId = state.propertyId || null;
        useNavigationStore.setState({
          currentView: view,
          selectedPropertyId: propertyId,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        useNavigationStore.setState({
          currentView: 'home',
          selectedPropertyId: null,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [saveScrollPosition]);

  const renderView = () => {
    switch (currentView) {
      case 'properties':
        return <PropertiesView />;
      case 'property-detail':
        return <PropertyDetailView />;
      case 'admin':
        return <AdminView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1628]">
      <Navbar />
      <main className="flex-1">
        <ViewErrorBoundary>
          {renderView()}
        </ViewErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
