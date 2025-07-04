import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { useSearchBar } from "./hooks/use-search-bar";
import { styles } from "./search-bar.style";

export const SearchBar = () => {
  const {
    localQuery,
    onChangeText,
    onSearch,
    onClear,
    suggestions,
    showSuggestions,
    handleSuggestionPress,
  } = useSearchBar();

  return (
    <View>
      <Searchbar
        placeholder="Search products…"
        value={localQuery}
        onChangeText={onChangeText}
        onIconPress={onSearch}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        onClearIconPress={onClear}
        style={styles.searchbar}
      />
      {showSuggestions && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          style={styles.suggestionList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
              <Text style={styles.suggestionItem}>{item}</Text>
            </TouchableOpacity>
          )}
          persistentScrollbar
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};
