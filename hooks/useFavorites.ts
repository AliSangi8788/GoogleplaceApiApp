import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place } from '@/types/places';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: Place[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (place: Place) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.id === place.id);
    
    if (isCurrentlyFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== place.id);
      saveFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, place];
      saveFavorites(newFavorites);
    }
  };

  const clearFavorites = () => {
    saveFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    clearFavorites,
  };
}