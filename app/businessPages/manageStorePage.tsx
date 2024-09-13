import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { getStores, deleteStore } from '../utils/tempDatabase';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function ManageStorePage() {
  const router = useRouter();

  const [stores, setStores] = useState(getStores());
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, // Hides the navigation bar
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

  const handleEdit = (storeId: any) => {
    router.push('../businessPages/editStorePage');
  };

  const handleAdd = () => {
    router.push('../businessPages/addStorePage');
  };

  const handleDelete = (storeId: number) => {
    Alert.alert(
      "Delete Store",
      "Are you sure you want to delete this store?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          deleteStore(storeId); // Call the deleteStore function
          setStores(getStores()); // Refresh the list of stores
        }},
      ]
    );
  };

  const renderStoreItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.storeImage} />
      <View style={styles.storeDetails}>
        <Text style={styles.storeName}>{item.store_name}</Text>
        <Text style={styles.storeDescription}>{item.store_description}</Text>
        <View style={styles.storeFooter}>
          <Text style={styles.storeRating}>
            {item.rating} <Text style={styles.star}>★</Text>
          </Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.store_id)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.store_id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      {stores.length === 0 ? (
        <Text style={styles.emptyMessage}>No restaurants available</Text>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(store) => store.store_id.toString()}
          renderItem={renderStoreItem}
          contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
      {/* Add Shop button */}
      <TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
        <Text style={styles.addButtonText}>Add Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20, // Ensure there's space for the Add Shop button
  },
  container: {
    marginTop: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'grey',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  storeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeDescription: {
    color: '#555',
    marginVertical: 5,
  },
  storeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  storeRating: {
    fontSize: 14,
    color: '#333',
  },
  star: {
    color: '#FFD700', // Gold color for the star
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editButton: {
    backgroundColor: '#FFD966',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 14,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#FFD966',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
