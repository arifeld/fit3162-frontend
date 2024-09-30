import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../components/StoreCard';
import { getFavourites } from '../utils/tempDatabase';


export default function Favourites() {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState<{ 
    store_id: number;
    store_name: string;
    store_description: string;
    rating: number;
    image: any; }[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const userId = "1"; // Replace with the actual user ID when available
      const favourites = getFavourites(userId); // Get the latest favorites
      setFavouriteRestaurants(favourites); // Update the state with the fetched data
    }, []) // Empty dependency array ensures this runs when the screen is focused
  );

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={favouriteRestaurants}
        keyExtractor={(store) => store.store_id.toString()}
        renderItem={({ item }) => <Card info={item} />}
        contentContainerStyle={styles.container} // Style to wrap list content
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});