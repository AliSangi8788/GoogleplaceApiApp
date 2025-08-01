import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Coffee,
  UtensilsCrossed,
  Building,
  ShoppingBag,
  Fuel,
  Heart,
  MapPin,
} from 'lucide-react-native';

interface SearchFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: 'all', label: 'All', icon: MapPin },
  { key: 'restaurant', label: 'Food', icon: UtensilsCrossed },
  { key: 'lodging', label: 'Hotels', icon: Building },
  { key: 'shopping_mall', label: 'Shopping', icon: ShoppingBag },
  { key: 'cafe', label: 'Cafes', icon: Coffee },
  { key: 'gas_station', label: 'Gas', icon: Fuel },
  { key: 'hospital', label: 'Health', icon: Heart },
];

export function SearchFilters({
  selectedFilter,
  onFilterChange,
}: SearchFiltersProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.key;
          const IconComponent = filter.icon;
          
          return (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                isSelected && styles.selectedFilter,
              ]}
              onPress={() => onFilterChange(filter.key)}
            >
              <IconComponent
                size={18}
                color={isSelected ? '#FFFFFF' : '#64748B'}
              />
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.selectedFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingRight: 48,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedFilter: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
});