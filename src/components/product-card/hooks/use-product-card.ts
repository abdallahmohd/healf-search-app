import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";

export const useProductCard = () => {
  const [liked, setLiked] = useState(false);

  const handleOnWishlistToggle = () => {
    setLiked((prev) => !prev);
  };

  const getPriceFromRange = (range: string): string => {
    try {
      const parsed = JSON.parse(range);
      const min = parseFloat(parsed?.min_variant_price?.amount);
      const max = parseFloat(parsed?.max_variant_price?.amount);

      if (isNaN(min) || isNaN(max)) return "N/A";

      const symbol =
        getSymbolFromCurrency(parsed?.min_variant_price?.currency_code) ?? "£";

      return min === max
        ? `${symbol}${min.toFixed(2)}`
        : `${symbol}${min.toFixed(2)} - ${symbol}${max.toFixed(2)}`;
    } catch {
      return "N/A";
    }
  };

  const getImageUrl = (image: string | undefined): string => {
    if (!image)
      return "https://cdn.brandfetch.io/idtiYwbZ9l/w/820/h/246/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B";
    try {
      const parsed = JSON.parse(image);
      return parsed?.url ?? "https://via.placeholder.com/150";
    } catch {
      return "https://via.placeholder.com/150";
    }
  };

  const hasNewTag = (tags: string | undefined) => {
    return tags?.toLowerCase().includes("new");
  };

  return {
    getPriceFromRange,
    getImageUrl,
    liked,
    handleOnWishlistToggle,
    hasNewTag,
  };
};
