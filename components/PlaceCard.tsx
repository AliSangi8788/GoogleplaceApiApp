import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  MapPin,
  Star,
  Heart,
  Phone,
  Clock,
  Navigation,
} from 'lucide-react-native';
import { Place } from '@/types/places';

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showDistance?: boolean;
}

export function PlaceCard({
  place,
  isFavorite,
  onToggleFavorite,
  showDistance = false,
}: PlaceCardProps) {
  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    return distance < 1000 
      ? `${Math.round(distance)}m away`
      : `${(distance / 1000).toFixed(1)}km away`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          <Heart
            size={20}
            color={isFavorite ? '#EF4444' : '#64748B'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {place.name}
          </Text>
          {place.rating && (
            <View style={styles.rating}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.address} numberOfLines={1}>
              {place.address}
            </Text>
          </View>

          {showDistance && place.distance && (
            <View style={styles.detailRow}>
              <Navigation size={14} color="#64748B" />
              <Text style={styles.distance}>
                {formatDistance(place.distance)}
              </Text>
            </View>
          )}

          {place.category && (
            <View style={styles.category}>
              <Text style={styles.categoryText}>{place.category}</Text>
            </View>
          )}
        </View>

        {place.phone && (
          <View style={styles.contactRow}>
            <Phone size={14} color="#64748B" />
            <Text style={styles.phone}>{place.phone}</Text>
          </View>
        )}

        {place.openingHours && (
          <View style={styles.hoursRow}>
            <Clock size={14} color="#64748B" />
            <Text style={[
              styles.hours,
              place.isOpen ? styles.openText : styles.closedText
            ]}>
              {place.isOpen ? 'Open now' : 'Closed'} • {place.openingHours}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    flex: 1,
  },
  distance: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  category: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phone: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    marginLeft: 8,
    fontSize: 14,
  },
  openText: {
    color: '#10B981',
  },
  closedText: {
    color: '#EF4444',
  },
});