import { View } from "react-native";
import { TagFilterCarousel } from "../tag-filter-carousel/tag-filter-carousel";
import { SortMenu } from "../sort-menu/sort-menu";
import { Text } from "react-native-paper";
import { ListHeaderProps } from "./list-header.type";

export const ListHeader = ({ totalCount, sort, setSort }: ListHeaderProps) => {
  return (
    <View>
      <View>
        <TagFilterCarousel
          type="filter"
          filterKey="category"
          label="Category"
        />
        <TagFilterCarousel
          type="goal"
          filterKey="goal"
          label="Goal"
          color="#FFD8E4"
        />
      </View>
      <SortMenu sort={sort} setSort={setSort} />
      <View style={{ marginHorizontal: 8, marginBottom: 8 }}>
        <Text>{totalCount} Products found</Text>
      </View>
    </View>
  );
};
