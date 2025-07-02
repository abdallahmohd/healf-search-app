import { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useProductStore } from "@/store/product-store";
import { ProductListing } from "@/screens/product-listing/product-listing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-native-paper";

export default function App() {
  const loadFromLocalJSON = useProductStore.getState().loadFromLocalJSON;

  const loading = useProductStore((store) => store.loading);
  const error = useProductStore((store) => store.error);

  useEffect(() => {
    loadFromLocalJSON();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          {loading && <ActivityIndicator size="large" color="#333" />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {!loading && !error && <ProductListing />}
        </View>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
