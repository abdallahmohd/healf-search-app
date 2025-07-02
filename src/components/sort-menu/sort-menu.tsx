import React from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useSortMenu } from "./hooks/use-sort-menu";
import { styles } from "./sort-menu.style";
import { SortMenuProps } from "./sort-menu.type";

export const SortMenu = ({ sort, setSort }: SortMenuProps) => {
  const { visible, setVisible, currentLabel, sortOptions } = useSortMenu({
    sort,
  });

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setVisible(true)}
            style={styles.button}
            icon="sort"
          >
            {currentLabel}
          </Button>
        }
      >
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.key}
            onPress={() => {
              setSort(option.key);
              setVisible(false);
            }}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
};
