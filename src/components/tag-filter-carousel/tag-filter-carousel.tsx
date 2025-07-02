import React from "react";
import { ScrollView, View } from "react-native";
import { Chip, Text } from "react-native-paper";
import { useTagFilterCarousel } from "./hooks/use-tag-filter-carousel";
import { styles } from "./tag-filter-carousel.style";
import { TagFilterCarouselProps } from "./tag-filter-carousel.type";

export const TagFilterCarousel = ({
  type,
  filterKey,
  label,
  max = 8,
  color,
}: TagFilterCarouselProps) => {
  const { topValues, filters, setFilters } = useTagFilterCarousel({
    type,
    max,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={styles.chipRow}>
          <Chip
            selected={!filters[filterKey]}
            onPress={() => setFilters({ ...filters, [filterKey]: "" })}
            style={[styles.chip, { backgroundColor: color ?? "#F6EDFF" }]}
          >
            All
          </Chip>
          {topValues.map((value) => (
            <Chip
              key={value}
              selected={filters[filterKey] === value}
              onPress={() => setFilters({ ...filters, [filterKey]: value })}
              style={[styles.chip, { backgroundColor: color ?? "#F6EDFF" }]}
            >
              {value}
            </Chip>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
