import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin, Trash2 } from 'lucide-react-native';
import { PlaceCard } from '@/components/PlaceCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved {favorites.length === 1 ? 'place' : 'places'}
        </Text>
        
        {favorites.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFavorites}
          >
            <Trash2 size={16} color="#EF4444" />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {favorites.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(place)}
          />
        ))}

        {favorites.length === 0 && (
          <View style={styles.emptyContainer}>
            <Heart size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Start exploring and save places you love to see them here
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
    marginBottom: 16,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});