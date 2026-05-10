import { create } from 'zustand';

type ViewType = 'home' | 'properties' | 'property-detail' | 'admin';

interface NavigationStore {
  currentView: ViewType;
  selectedPropertyId: string | null;
  searchQuery: string;
  filterLocation: string;
  filterType: string;
  filterMinPrice: string;
  filterMaxPrice: string;
  previousScrollPositions: Record<string, number>;

  navigate: (view: ViewType, propertyId?: string) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: {
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => void;
  goBack: () => void;
  saveScrollPosition: () => void;
}

const viewStack: ViewType[] = [];

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  currentView: 'home',
  selectedPropertyId: null,
  searchQuery: '',
  filterLocation: '',
  filterType: '',
  filterMinPrice: '',
  filterMaxPrice: '',
  previousScrollPositions: {},

  navigate: (view, propertyId) => {
    const state = get();

    // Save current scroll position
    state.saveScrollPosition();

    // Push to view stack (if not a duplicate)
    if (viewStack[viewStack.length - 1] !== view) {
      viewStack.push(state.currentView);
    }

    // Update URL
    const searchParams = new URLSearchParams();
    if (view === 'property-detail' && propertyId) {
      searchParams.set('view', view);
      searchParams.set('id', propertyId);
    } else if (view !== 'home') {
      searchParams.set('view', view);
    }

    const url = searchParams.toString() ? `?${searchParams.toString()}` : '/';
    window.history.pushState({ view, propertyId }, '', url);

    set({
      currentView: view,
      selectedPropertyId: propertyId || null,
    });

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilters: (filters) =>
    set((state) => ({
      filterLocation: filters.location ?? state.filterLocation,
      filterType: filters.type ?? state.filterType,
      filterMinPrice: filters.minPrice ?? state.filterMinPrice,
      filterMaxPrice: filters.maxPrice ?? state.filterMaxPrice,
    })),

  goBack: () => {
    const previousView = viewStack.pop();
    if (previousView) {
      const url = previousView === 'home' ? '/' : `?view=${previousView}`;
      window.history.pushState({ view: previousView }, '', url);

      set((state) => {
        const savedPosition = state.previousScrollPositions[previousView];
        if (savedPosition !== undefined) {
          setTimeout(() => window.scrollTo({ top: savedPosition }), 50);
        }
        return {
          currentView: previousView,
          selectedPropertyId: null,
        };
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  saveScrollPosition: () => {
    const state = get();
    set({
      previousScrollPositions: {
        ...state.previousScrollPositions,
        [state.currentView]: window.scrollY,
      },
    });
  },
}));
