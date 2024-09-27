import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, TouchableOpacity, Image, Alert } from 'react-native';
import { getStores, deleteStore } from '../utils/tempDatabase';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function ManageStorePage() {
  const router = useRouter(); // Use the router to navigate

  const [stores, setStores] = useState(getStores());
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setStores(getStores());
      setRefreshing(false);
    }, 2000);
  }, []);

  // Handle the navigation to the EditStorePage
  const handleEdit = (storeId: number) => {
    // Navigate to EditStorePage and pass storeId as a query parameter
    router.push({
      pathname: '/businessPages/editStorePage',
      params: { storeId: storeId.toString() }, // Ensure storeId is passed as a string
    });
  };

  const handleAdd = () => {
    router.push('/businessPages/addStorePage'); // Navigate to the AddStorePage
  };

  const handleDelete = (storeId: number) => {
    Alert.alert(
      "Delete Store",
      "Are you sure you want to delete this store?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK", onPress: () => {
            deleteStore(storeId);
            setStores(getStores());
          }
        },
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
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
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
