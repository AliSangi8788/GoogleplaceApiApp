import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Loader } from 'lucide-react-native';
import { PlaceCard } from '@/components/PlaceCard';
import { SearchFilters } from '@/components/SearchFilters';
import { useLocation } from '@/hooks/useLocation';
import { usePlacesSearch } from '@/hooks/usePlacesSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { Place } from '@/types/places';

export default function NearbyScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [places, setPlaces] = useState<Place[]>([]);
  const { location, loading: locationLoading, error: locationError, requestLocation } = useLocation();
  const { searchNearbyPlaces, loading: searchLoading } = usePlacesSearch();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (location) {
      handleNearbySearch();
    }
  }, [location, selectedFilter]);

  const handleNearbySearch = async () => {
    if (!location) return;
    
    try {
      const results = await searchNearbyPlaces(location, selectedFilter);
      setPlaces(results);
    } catch (err) {
      Alert.alert('Error', 'Failed to find nearby places. Please try again.');
    }
  };

  const handleLocationRequest = () => {
    requestLocation();
  };

  if (locationError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Navigation size={64} color="#EF4444" />
          <Text style={styles.errorTitle}>Location Access Required</Text>
          <Text style={styles.errorText}>
            We need access to your location to find nearby places
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleLocationRequest}
          >
            <Text style={styles.retryButtonText}>Enable Location</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Places</Text>
        <Text style={styles.subtitle}>
          {location 
            ? `Searching around your location` 
            : 'Getting your location...'
          }
        </Text>
      </View>

      <SearchFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {(locationLoading || searchLoading) && (
        <View style={styles.loadingContainer}>
          <Loader size={32} color="#2563EB" />
          <Text style={styles.loadingText}>
            {locationLoading ? 'Getting your location...' : 'Finding nearby places...'}
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isFavorite={favorites.some(fav => fav.id === place.id)}
            onToggleFavorite={() => toggleFavorite(place)}
            showDistance={true}
          />
        ))}

        {places.length === 0 && location && !searchLoading && (
          <View style={styles.noResultsContainer}>
            <MapPin size={48} color="#CBD5E1" />
            <Text style={styles.noResultsTitle}>No places found nearby</Text>
            <Text style={styles.noResultsText}>
              Try changing your filter or search in a different area
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});