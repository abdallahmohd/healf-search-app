import { Product } from "@/types/product.type";

export type ProductFilters = {
  category: string;
  goal: string;
};

export type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  query: string;
  setQuery: (value: string) => void;

  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;

  error: string | null;
  setError: (msg: string | null) => void;

  loadFromLocalJSON: () => void;
};
