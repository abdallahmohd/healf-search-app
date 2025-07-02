import { useProductStore } from "@/store/product-store";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "react-native";

export const useSearchBar = () => {
  const [localQuery, setLocalQuery] = useState("");
  const setQuery = useProductStore((store) => store.setQuery);
  const products = useProductStore((store) => store.products);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced suggestions
  const updateSuggestions = useMemo(
    () =>
      debounce((query: string, productsList: typeof products) => {
        if (query.length < 2) {
          setSuggestions([]);
          return;
        }
        const term = query.toLowerCase();
        const matches = productsList
          .map((product) => product.TITLE)
          .filter((title) => title?.toLowerCase().includes(term));
        setSuggestions([...new Set(matches)].slice(0, 8));
      }, 200), // 200ms debounce
    []
  );

  useEffect(() => {
    updateSuggestions(localQuery, products);
    // Cancel debounce on unmount/change
    return () => updateSuggestions.cancel();
  }, [localQuery, products, updateSuggestions]);

  const onSearch = useCallback(() => {
    setQuery(localQuery.trim());
    setSuggestions([]);
  }, [localQuery, setQuery]);

  const onChangeText = (text: string) => {
    setLocalQuery(text);
    setShowSuggestions(true);
  };

  const onClear = () => {
    setLocalQuery("");
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setLocalQuery(suggestion);
    setQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  return {
    localQuery,
    onChangeText,
    onSearch,
    onClear,
    suggestions,
    showSuggestions,
    handleSuggestionPress,
  };
};
