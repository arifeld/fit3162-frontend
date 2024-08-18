import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';
import Card from '../components/RestaurantCard';
import { getRestaurants } from '../utils/tempDatabase';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [restaurants, setRestaurants] = useState(getRestaurants());
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false, // Hides the navigation bar
      });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request to refresh data
    setTimeout(() => {
      setRestaurants(getRestaurants()); // Update with new data
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.outerContainer}>
      {restaurants.length === 0 ? (
        <Text style={styles.emptyMessage}>No restaurants available</Text>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(restaurant) => restaurant.id.toString()}
          renderItem={({ item }) => <Card info={item} />}
          contentContainerStyle={styles.container} // Style to wrap list content
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'grey',
  },
});
