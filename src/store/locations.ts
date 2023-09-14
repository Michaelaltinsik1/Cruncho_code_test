import { create, useStore } from 'zustand';

import { LocationType } from '@/utils/types';

interface LocationState {
  location: LocationType;
  setLocation: (location: LocationType) => void;
}

export const useLocationStore = create<LocationState>((set) => {
  return {
    location: {
      loaded: false,
      coordinates: { lat: null, lng: null },
      error: null,
    },
    setLocation: (location) => set(() => ({ location })),
  };
});
