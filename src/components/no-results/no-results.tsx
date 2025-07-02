import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./no-results.style";

export const NoResults = () => (
  <View style={styles.container}>
    <Image
      source={require("../../../assets/no-results.jpg")}
      style={styles.image}
      resizeMode="contain"
    />
    <Text variant="titleMedium" style={styles.text}>
      No results found
    </Text>
  </View>
);
