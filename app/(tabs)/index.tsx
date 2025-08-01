import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star, Clock, Phone } from 'lucide-react-native';
import { PlaceCard } from '@/components/PlaceCard';
import { SearchFilters } from '@/components/SearchFilters';
import { usePlacesSearch } from '@/hooks/usePlacesSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { Place } from '@/types/places';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { searchPlaces, loading, error } = usePlacesSearch();
  const { favorites, toggleFavorite } = useFavorites();
  const [places, setPlaces] = useState<Place[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setPlaces([]);
      setSuggestions([]);
    }
  }, [query, selectedFilter]);

  const handleSearch = async () => {
    try {
      const results = await searchPlaces(query, selectedFilter);
      setPlaces(results);
      
      // Generate autocomplete suggestions
      const uniqueSuggestions = Array.from(
        new Set(results.map(place => place.name))
      ).slice(0, 5);
      setSuggestions(uniqueSuggestions);
    } catch (err) {
      Alert.alert('Error', 'Failed to search places. Please try again.');
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Places</Text>
        <Text style={styles.subtitle}>Find amazing locations near you</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for places..."
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
        </View>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <MapPin size={16} color="#64748B" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <SearchFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Searching places...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ScrollView
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isFavorite={favorites.some(fav => fav.id === place.id)}
            onToggleFavorite={() => toggleFavorite(place)}
          />
        ))}

        {places.length === 0 && query.length > 2 && !loading && (
          <View style={styles.noResultsContainer}>
            <MapPin size={48} color="#CBD5E1" />
            <Text style={styles.noResultsTitle}>No places found</Text>
            <Text style={styles.noResultsText}>
              Try adjusting your search terms or filters
            </Text>
          </View>
        )}

        {query.length === 0 && (
          <View style={styles.welcomeContainer}>
            <Search size={64} color="#CBD5E1" />
            <Text style={styles.welcomeTitle}>Start Exploring</Text>
            <Text style={styles.welcomeText}>
              Search for restaurants, hotels, attractions, and more
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#475569',
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
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
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});