import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../components/RestaurantCard';
import { getFavourites } from '../utils/tempDatabase';

export default function Favourites() {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState<{ name: string; description: string; rating: number; image: any; id: number; }[]>([]);

  useEffect(() => {
    const userId = 'current_user_id_placeholder'; // Replace with the actual user ID when available
    const favourites = getFavourites(userId); // Get the latest favorites
    setFavouriteRestaurants(favourites); // Update the state with the fetched data
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={favouriteRestaurants}
        keyExtractor={(restaurant) => restaurant.id.toString()}
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
