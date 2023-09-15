export interface NearbySearchType {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  id: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: {
    height: number;
    width: number;
    html_attributions: string[];
    photo_reference: string;
  }[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  rating?: number;
  reference: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
}

export interface LocationType {
  loaded: boolean;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
  error: ErrorType | null | null;
}

export interface ErrorType {
  code: number;
  message: string;
}

export enum SearchTypes {
  SCHOOL = 'school',
  GYM = 'gym',
  MOVIE_THEATER = 'movie_theater',
  RESTAURANT = 'restaurant',
  PHARMACY = 'pharmacy',
  LIBRARY = 'library',
}
