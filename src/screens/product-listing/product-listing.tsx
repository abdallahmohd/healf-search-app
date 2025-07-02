import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

import { ListHeader } from "@/components/list-header/list-header";
import { NoResults } from "@/components/no-results/no-results";
import { ProductCard } from "@/components/product-card/product-card";
import { SearchBar } from "@/components/search-bar/search-bar";
import { FAB as FaB } from "react-native-paper";
import { useProductListing } from "./hooks/use-product-listing";
import { styles } from "./product-listing.style";

export const ProductListing = () => {
  const {
    totalCount,
    visibleProducts,
    handleEndReached,
    renderListFooterComponent,
    handleScroll,
    scrollToTop,
    showScrollToTopButton,
    listRef,
    sort,
    setSort,
  } = useProductListing();

  return (
    <View style={styles.container}>
      <SearchBar />
      {visibleProducts.length === 0 ? (
        <NoResults />
      ) : (
        <FlashList
          ref={listRef}
          data={visibleProducts}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ProductCard
                id={item.ID}
                title={item.TITLE}
                vendor={item.VENDOR}
                price={item.PRICE_RANGE}
                image={item.FEATURED_IMAGE}
                tags={item.TAGS}
              />
            </View>
          )}
          estimatedItemSize={500}
          numColumns={2}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          ListHeaderComponent={
            <ListHeader totalCount={totalCount} sort={sort} setSort={setSort} />
          }
          ListFooterComponent={renderListFooterComponent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
      {showScrollToTopButton && (
        <FaB
          icon="arrow-up"
          style={{
            position: "absolute",
            right: 16,
            bottom: 24,
            zIndex: 20,
            backgroundColor: "#fff",
          }}
          onPress={scrollToTop}
          size="small"
        />
      )}
    </View>
  );
};
