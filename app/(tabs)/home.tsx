import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Card from '../components/RestaurantCard';
import { getRestaurants } from '../utils/tempDatabase'; // Import the function to get restaurants

export default function Home() {
  const RESTAURANTS = getRestaurants(); // Fetch restaurants from the tempDatabase

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={RESTAURANTS}
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
