import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 0,
    minHeight: 450,
  },
  cover: {
    height: 250,
    margin: 20,
    marginTop: 10,
    backgroundColor: "#f5f5f5",
  },
  heartIcon: {
    position: "absolute",
    top: 3,
    right: 3,
  },
  basketIcon: {
    position: "absolute",
    bottom: 9,
    right: 3,
    backgroundColor: "#eef5ee",
  },
  content: {
    flex: 1,
    minHeight: 200,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  vendor: {
    color: "#666",
    marginTop: 2,
  },
  price: {
    marginTop: 8,
    color: "crimson",
    fontWeight: "700",
    fontSize: 16,
  },
  newTagChip: {
    backgroundColor: "red",
    position: "absolute",
    top: 12,
    left: 10,
  },
});
