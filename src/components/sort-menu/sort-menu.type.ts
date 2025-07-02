import { SortType } from "@/screens/product-listing/product-listing.type";

export interface SortMenuProps {
  sort: SortType;
  setSort: (sort: SortType) => void;
}
