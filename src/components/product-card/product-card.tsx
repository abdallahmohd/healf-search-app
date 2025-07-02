import React from "react";
import { View, Text } from "react-native";
import { ProductCardProps } from "./product-card.type";
import { styles } from "./product-card.style";
import { useProductCard } from "./hooks/use-product-card";
import { Button, Card, Chip, IconButton } from "react-native-paper";

export const ProductCard = ({
  title,
  vendor,
  price,
  image,
  tags,
}: ProductCardProps) => {
  const {
    getPriceFromRange,
    getImageUrl,
    liked,
    handleOnWishlistToggle,
    hasNewTag,
  } = useProductCard();
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: getImageUrl(image) }}
        style={styles.cover}
        resizeMode="contain"
      />
      <IconButton
        icon={liked ? "heart" : "heart-outline"}
        size={32}
        iconColor={"black"}
        style={styles.heartIcon}
        onPress={handleOnWishlistToggle}
      />
      <Card.Content style={styles.content}>
        <View>
          <Text numberOfLines={3} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.vendor}>{vendor}</Text>
          <Text style={styles.price}>{getPriceFromRange(price)}</Text>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          theme={{ roundness: 0, colors: { primary: "black" } }}
          onPress={() => {
            console.log(`Adding ${title} to basket`);
          }}
        >
          Add to basket
        </Button>
      </Card.Content>
      {hasNewTag(tags) && <Chip style={styles.newTagChip}>New</Chip>}
    </Card>
  );
};
