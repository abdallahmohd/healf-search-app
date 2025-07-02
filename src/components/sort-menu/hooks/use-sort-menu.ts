import { useState } from "react";
import { SortMenuProps } from "../sort-menu.type";
import { SortType } from "@/screens/product-listing/product-listing.type";

export const useSortMenu = ({ sort }: Pick<SortMenuProps, 'sort'>) => {
  const sortOptions = [
    { key: SortType.Default, label: "" },
    { key: SortType.TitleAsc, label: "Title A-Z" },
    { key: SortType.TitleDesc, label: "Title Z-A" },
    { key: SortType.PriceAsc, label: "Price Low to High" },
    { key: SortType.PriceDesc, label: "Price High to Low" },
    { key: SortType.DateNew, label: "Newest First" },
    { key: SortType.DateOld, label: "Oldest First" },
  ];
  const [visible, setVisible] = useState(false);

  const currentLabel =
    sortOptions.find((option) => option.key === sort)?.label ?? "";

  return {
    sortOptions,
    currentLabel,
    visible,
    setVisible
  };
}