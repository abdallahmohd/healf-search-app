import { SortType } from "@/screens/product-listing/product-listing.type";

export interface ListHeaderProps {
  totalCount: number;
  sort: SortType;
  setSort: (sort: SortType) => void;
}
