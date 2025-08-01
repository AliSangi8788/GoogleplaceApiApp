export interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  rating?: number;
  category: string;
  imageUrl: string;
  phone?: string;
  openingHours?: string;
  isOpen?: boolean;
  distance?: number; // in meters
  website?: string;
  priceLevel?: number; // 1-4 scale
}

export interface PlaceDetails extends Place {
  description?: string;
  reviews?: Review[];
  photos?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export type PlaceCategory = 
  | 'restaurant'
  | 'lodging'
  | 'shopping_mall'
  | 'cafe'
  | 'gas_station'
  | 'hospital'
  | 'tourist_attraction'
  | 'bank'
  | 'pharmacy'
  | 'all';