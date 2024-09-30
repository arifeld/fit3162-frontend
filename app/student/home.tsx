import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';
import Card from '../components/StoreCard';
import { getStores } from '../utils/tempDatabase';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getAllStores } from '../api/stores';
import { Stack, Tabs } from 'expo-router';

export default function Home() {


  const [stores, setStores] = useState<any[]|null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function getData() {
    setLoading(true);
    const stores = await getAllStores();
    setStores(stores);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false, // Hides the navigation bar
      });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    // Simulate a network request to refresh data
    getData() // refresh with new data
  }, []);

  const storeInfo = 
  <>
    {stores == null || stores.length === 0 ? (
      <Text style={styles.emptyMessage}>No restaurants available</Text>
    ) : (
      <FlatList
        data={stores}
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
      <Stack.Screen options={{title: "Home", headerShown: true}} />
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
