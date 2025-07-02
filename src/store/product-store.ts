import rawProducts from "@/../assets/products.json";
import { Product } from "@/types/product.type";
import { create } from "zustand";
import { buildIndex } from "../utils/product-search.utils";
import { ProductStore } from "./product-store.type";

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),

  loading: false,
  setLoading: (value) => set({ loading: value }),

  query: "",
  setQuery: (query) => set({ query }),

  filters: { category: "", goal: "" },
  setFilters: (filters) => set({ filters }),

  error: null,
  setError: (msg) => set({ error: msg }),

  loadFromLocalJSON: () => {
    try {
      const allProducts = rawProducts as Product[];
      buildIndex(allProducts);
      set({ products: allProducts, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load JSON";
      set({ error: message });
    }
  },
}));
