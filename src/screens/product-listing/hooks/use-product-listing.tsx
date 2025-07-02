import { useProductStore } from "@/store/product-store";
import {
  getPriority,
  getProductSearchText,
  getTagsByPrefix,
  invertedIndex,
  prepareTerms,
} from "@/utils/product-search.utils";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SortType } from "../product-listing.type";
import { Product } from "@/types/product.type";

const PAGE_SIZE = 24;

export const useProductListing = () => {
  const products = useProductStore((store) => store.products);
  const query = useProductStore((store) => store.query);
  const filters = useProductStore((store) => store.filters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadMoreProducts, setLoadMoreProducts] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const listRef = useRef<FlashList<any>>(null);
  const [sort, setSort] = useState<SortType>(SortType.Default);

  const parseMinPrice = (range: string): number => {
    try {
      const parsed = JSON.parse(range);
      return parseFloat(parsed?.min_variant_price?.amount ?? "0");
    } catch {
      return 0;
    }
  };

  const parseDate = (product: Product) => {
    return new Date(product.UPDATED_AT ?? product.CREATED_AT ?? 0).getTime();
  };

  const sortProducts = (products: Product[], sort: SortType): Product[] => {
    const sorted = [...products];
    switch (sort) {
      case SortType.TitleAsc:
        sorted.sort((a, b) => a.TITLE.localeCompare(b.TITLE));
        break;
      case SortType.TitleDesc:
        sorted.sort((a, b) => b.TITLE.localeCompare(a.TITLE));
        break;
      case SortType.PriceAsc:
        sorted.sort(
          (a, b) => parseMinPrice(a.PRICE_RANGE) - parseMinPrice(b.PRICE_RANGE)
        );
        break;
      case SortType.PriceDesc:
        sorted.sort(
          (a, b) => parseMinPrice(b.PRICE_RANGE) - parseMinPrice(a.PRICE_RANGE)
        );
        break;
      case SortType.DateNew:
        sorted.sort((a, b) => parseDate(b) - parseDate(a));
        break;
      case SortType.DateOld:
        sorted.sort((a, b) => parseDate(a) - parseDate(b));
        break;
      default:
        return products;
    }
    return sorted;
  };

  // Filtering & sorting logic
  const filtered = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const queryTerms = prepareTerms(searchTerm);

    let result = products;

    if (searchTerm && queryTerms.length > 0) {
      // Phase 1: Exact-term lookup
      let matchingProductIDs = new Set(invertedIndex[queryTerms[0]] ?? []);
      for (let i = 1; i < queryTerms.length; i++) {
        const idsForTerm = invertedIndex[queryTerms[i]] ?? new Set();
        matchingProductIDs = new Set(
          [...matchingProductIDs].filter((id) => idsForTerm.has(id))
        );
        if (matchingProductIDs.size === 0) break;
      }
      const exactMatches = products.filter((product) =>
        matchingProductIDs.has(product.ID)
      );

      // Sort exact matches by field priority
      exactMatches.sort(
        (a, b) =>
          getPriority(a, queryTerms) - getPriority(b, queryTerms) ||
          a.TITLE.localeCompare(b.TITLE)
      );

      // Extended matches (description/partial)
      const extendedMatches = products.filter((product) => {
        if (matchingProductIDs.has(product.ID)) return false;
        const text = getProductSearchText(product);
        return searchTerm.split(/\s+/).every((part) => text.includes(part));
      });

      result = [...exactMatches, ...extendedMatches];
    }

    // Tag/category filters
    if (filters.category) {
      result = result.filter((product) =>
        getTagsByPrefix(product.TAGS, "filter").includes(filters.category)
      );
    }
    if (filters.goal) {
      result = result.filter((product) =>
        getTagsByPrefix(product.TAGS, "goal").includes(filters.goal)
      );
    }

    // Hide products with "hidden" tag
    result = result.filter(
      (product) =>
        !product.TAGS?.toLowerCase().includes("hidden")
    );

    return sortProducts(result, sort);
  }, [products, query, filters, sort]);

  useEffect(() => {
    scrollToTop();
    setVisibleCount(PAGE_SIZE);
  }, [query, filters, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const handleEndReached = () => {
    if (visibleCount < filtered.length && !loadMoreProducts) {
      setLoadMoreProducts(true);
      // Simulate network delay - in a real app, this would be an API call
      setTimeout(() => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
        setLoadMoreProducts(false);
      }, 350);
    }
  };

  const totalCount = filtered.length;

  const renderListFooterComponent = () => {
    return loadMoreProducts ? (
      <View style={{ paddingVertical: 16 }}>
        <ActivityIndicator animating size="small" />
      </View>
    ) : null;
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTopButton(offsetY > 600);
  };

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return {
    totalCount,
    visibleProducts,
    handleEndReached,
    renderListFooterComponent,
    handleScroll,
    scrollToTop,
    showScrollToTopButton,
    listRef,
    sort,
    setSort,
  };
};
