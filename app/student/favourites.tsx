import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../components/StoreCard';
import { getFavourites } from '../utils/tempDatabase';
import { getFavouriteStores } from '../api/userfavourites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, Tabs } from 'expo-router';


export default function Favourites() {
  // const [favouriteRestaurants, setFavouriteRestaurants] = useState<{ 
  //   store_id: number;
  //   store_name: string;
  //   store_description: string;
  //   rating: number;
  //   image: any; }[]>([]);

  const [favouriteRestaurants, setFavouriteRestaurants] = useState<any[]|null>(null);

  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  
  async function getData() {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    const favstores = await getFavouriteStores(Number(userId));
    setFavouriteRestaurants(favstores);
    setRefreshing(false);
    setLoading(false);
    console.log("favourite it's here:")
    console.log(favstores);
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
      //const userId = "1"; // Replace with the actual user ID when available
      //const favourites = getFavourites(userId); // Get the latest favorites
      //setFavouriteRestaurants(favourites); // Update the state with the fetched data
    }, []) // Empty dependency array ensures this runs when the screen is focused
  );

  const onRefresh = useCallback(() => {
    // Simulate a network request to refresh data
    getData() // refresh with new data
  }, []);

  const storeInfo = 
  <>
    {favouriteRestaurants == null || favouriteRestaurants.length === 0 ? (
      <Text style={styles.emptyMessage}>No restaurants available</Text>
    ) : (
      <FlatList
        data={favouriteRestaurants}
        keyExtractor={(store) => store.store_id.toString()}
        renderItem={({ item }) => <Card info={{ store_id: item.store_id, store_name: item.store_name, store_description: item.store_description, rating: item.rating || 0, image: item.image }} />}
        contentContainerStyle={styles.container} // Style to wrap list content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    )}
  </>
  

  return (
    <View style={styles.outerContainer}>
      <Stack.Screen options={{title: "Favourites", headerShown: true}} />
      {
        loading && !refreshing ? <ActivityIndicator /> : storeInfo
      }
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
