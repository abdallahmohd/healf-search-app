import { useProductStore } from "@/store/product-store";
import { getTagsByPrefix, getTopNItems } from "@/utils/product-search.utils";
import { TagFilterCarouselProps } from "../tag-filter-carousel.type";

export const useTagFilterCarousel = ({
  type,
  max,
}: Pick<TagFilterCarouselProps, "type" | "max">) => {
  const products = useProductStore((store) => store.products);
  const filters = useProductStore((store) => store.filters);
  const setFilters = useProductStore((store) => store.setFilters);

  const values: string[] = [];
  products.forEach((product) => {
    getTagsByPrefix(product.TAGS, type).forEach((value) => values.push(value));
  });
  const topValues = getTopNItems(values, max ?? 8);

  return {
    topValues,
    filters,
    setFilters,
  }
};
