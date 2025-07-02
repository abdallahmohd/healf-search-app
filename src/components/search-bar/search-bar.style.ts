import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchbar: {
    margin: 8,
    marginBottom: 2,
  },
  suggestionList: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    borderRadius: 6,
    elevation: 2,
    maxHeight: 240,
    zIndex: 100,
  },
  suggestionItem: {
    padding: 12,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
