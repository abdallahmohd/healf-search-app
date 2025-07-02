import { ProductFilters } from "@/store/product-store.type";

export type FilterKey = keyof ProductFilters;

export interface TagFilterCarouselProps {
    type: string;
    filterKey: FilterKey;
    label: string;
    color?: string;
    max?: number;
  }