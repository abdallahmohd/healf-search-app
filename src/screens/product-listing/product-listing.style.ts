import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 8,
  },
  itemWrapper: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN / 2,
    padding: CARD_MARGIN / 2,
    maxWidth: CARD_WIDTH,
  },
});
