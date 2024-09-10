import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';
import Card from '../components/StoreCard';
import { getStores } from '../utils/tempDatabase';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ManageStorePage() {
  const [stores, setStores] = useState(getStores());
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
      setStores(getStores()); // Update with new data
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.outerContainer}>
      {stores.length === 0 ? (
        <Text style={styles.emptyMessage}>No restaurants available</Text>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(store) => store.store_id.toString()}
          renderItem={({ item }) => <Card info={{ store_id: item.store_id, store_name: item.store_name, store_description: item.store_description, rating: item.rating, image: item.image }} />}
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
