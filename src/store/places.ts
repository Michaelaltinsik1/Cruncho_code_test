import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { NearbySearchType } from '@/utils/types';
interface PlacesState {
  places: Array<NearbySearchType> | null;
  setPlaces: (places: Array<NearbySearchType>) => void;
}

export const usePlacesStore = create<PlacesState>((set) => {
  return {
    places: null,
    setPlaces: (places) => set(() => ({ places })),
  };
});
