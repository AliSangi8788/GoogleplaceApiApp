import { useState } from 'react';
import { Place, Location } from '@/types/places';

// Mock data for demonstration
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'The Garden Cafe',
    address: '123 Main Street, Downtown',
    rating: 4.5,
    category: 'Restaurant',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    phone: '+1 (555) 123-4567',
    openingHours: '8:00 AM - 10:00 PM',
    isOpen: true,
    distance: 250,
  },
  {
    id: '2',
    name: 'Grand Plaza Hotel',
    address: '456 Commerce Ave, Business District',
    rating: 4.2,
    category: 'Hotel',
    imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    phone: '+1 (555) 987-6543',
    openingHours: '24 hours',
    isOpen: true,
    distance: 800,
  },
  {
    id: '3',
    name: 'Central Shopping Mall',
    address: '789 Shopping Blvd, Mall District',
    rating: 4.0,
    category: 'Shopping',
    imageUrl: 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    phone: '+1 (555) 456-7890',
    openingHours: '10:00 AM - 9:00 PM',
    isOpen: true,
    distance: 1200,
  },
  {
    id: '4',
    name: 'Artisan Coffee House',
    address: '321 Coffee Lane, Arts Quarter',
    rating: 4.7,
    category: 'Cafe',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    phone: '+1 (555) 234-5678',
    openingHours: '6:00 AM - 6:00 PM',
    isOpen: true,
    distance: 450,
  },
  {
    id: '5',
    name: 'City Hospital',
    address: '987 Health Drive, Medical Center',
    rating: 4.3,
    category: 'Hospital',
    imageUrl: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    phone: '+1 (555) 345-6789',
    openingHours: '24 hours',
    isOpen: true,
    distance: 2100,
  },
  {
    id: '6',
    name: 'Shell Gas Station',
    address: '654 Highway 101, Transit Hub',
    rating: 3.8,
    category: 'Gas Station',
    imageUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
    phone: '+1 (555) 567-8901',
    openingHours: '24 hours',
    isOpen: true,
    distance: 600,
  },
];

export function usePlacesSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = async (query: string, filter: string = 'all'): Promise<Place[]> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredPlaces = mockPlaces.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.address.toLowerCase().includes(query.toLowerCase())
      );

      if (filter !== 'all') {
        filteredPlaces = filteredPlaces.filter(place =>
          place.category.toLowerCase().includes(filter.toLowerCase()) ||
          (filter === 'restaurant' && place.category.toLowerCase().includes('restaurant')) ||
          (filter === 'lodging' && place.category.toLowerCase().includes('hotel')) ||
          (filter === 'shopping_mall' && place.category.toLowerCase().includes('shopping')) ||
          (filter === 'cafe' && place.category.toLowerCase().includes('cafe')) ||
          (filter === 'gas_station' && place.category.toLowerCase().includes('gas')) ||
          (filter === 'hospital' && place.category.toLowerCase().includes('hospital'))
        );
      }

      return filteredPlaces;
    } catch (err) {
      setError('Failed to search places');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchNearbyPlaces = async (
    location: Location,
    filter: string = 'all'
  ): Promise<Place[]> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let filteredPlaces = [...mockPlaces];

      if (filter !== 'all') {
        filteredPlaces = filteredPlaces.filter(place =>
          place.category.toLowerCase().includes(filter.toLowerCase()) ||
          (filter === 'restaurant' && place.category.toLowerCase().includes('restaurant')) ||
          (filter === 'lodging' && place.category.toLowerCase().includes('hotel')) ||
          (filter === 'shopping_mall' && place.category.toLowerCase().includes('shopping')) ||
          (filter === 'cafe' && place.category.toLowerCase().includes('cafe')) ||
          (filter === 'gas_station' && place.category.toLowerCase().includes('gas')) ||
          (filter === 'hospital' && place.category.toLowerCase().includes('hospital'))
        );
      }

      // Sort by distance
      return filteredPlaces.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } catch (err) {
      setError('Failed to find nearby places');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchPlaces,
    searchNearbyPlaces,
    loading,
    error,
  };
}