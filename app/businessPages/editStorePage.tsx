import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getStoreById, editStore } from '../utils/tempDatabase'; // Updated with your editStore function
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function EditStorePage() {
  const { storeId } = useLocalSearchParams(); // Extract storeId from query params

  const normalizedStoreId = Array.isArray(storeId) ? storeId[0] : storeId;

  const [form, setForm] = useState({
    storeName: '',
    storeDescription: '',
    images: [],
  });

  const [region, setRegion] = useState({
    latitude: -37.9103098, // Default location
    longitude: 145.1294505, // Default location
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: -37.9103098, // Default marker position
    longitude: 145.1294505, // Default marker position
  });

  // Fetch store data by ID when the component mounts
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) {
        Alert.alert('Error', 'No store ID found');
        return;
      }
      const storeData = getStoreById(parseInt(normalizedStoreId, 10)); // Fetch the store data by ID
      if (storeData) {
        setForm({
          storeName: storeData.store_name,
          storeDescription: storeData.store_description,
          images: storeData.image || [],
        });
        setMarkerCoordinates({
          latitude: storeData.latitude,
          longitude: storeData.longitude,
        });
        setRegion({
          latitude: storeData.latitude,
          longitude: storeData.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert('Error', 'Store not found');
      }
    };

    fetchStoreData();
  }, [storeId]);

  // Handle image addition
  const handleAddImage = () => {
    const newImage = 'https://via.placeholder.com/100'; // Placeholder image URL
  };

  // Handle store update submission
  const handleUpdateStore = () => {
    if (!form.storeName || !form.storeDescription) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    const updatedStore = {
      store_name: form.storeName,
      store_description: form.storeDescription,
      image: form.images,
      latitude: markerCoordinates.latitude, // Updated latitude
      longitude: markerCoordinates.longitude, // Updated longitude
    };

    editStore(parseInt(normalizedStoreId, 10), updatedStore); // Call editStore to update the store

    // Navigate back to ManageStorePage
  };

  // Handle map press event to move the marker
  const handleMapPress = (event: { nativeEvent: { coordinate: { latitude: any; longitude: any; }; }; }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinates({ latitude, longitude });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Edit Store</Text>

      {/* Store Name */}
      <View style={styles.input}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputControl}
            placeholder="Store Name"
            placeholderTextColor="#6b7280"
            value={form.storeName}
            onChangeText={(storeName) => setForm({ ...form, storeName })}
          />
        </View>
      </View>

      {/* Store Description */}
      <View style={styles.input}>
        <View style={styles.inputContainerDescription}>
          <TextInput
            style={[styles.inputControl, styles.textArea]}
            placeholder="Store Description"
            placeholderTextColor="#6b7280"
            value={form.storeDescription}
            onChangeText={(storeDescription) => setForm({ ...form, storeDescription })}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      {/* Image Section */}
      <Text style={styles.label}>Edit Store Images:</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
          <FontAwesome name="plus" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Map for Location Selection */}
      <Text style={styles.label}>Select Store Location on Map:</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        onPress={handleMapPress} // Move marker to tapped location
      >
        <Marker coordinate={markerCoordinates} />
      </MapView>

      {/* Update Shop button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStore}>
        <Text style={styles.updateButtonText}>Update Shop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    backgroundColor: 'white',
    height: 55,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: '500',
    borderColor: 'gray',
    borderWidth: 1.5,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 5,
  },
  inputContainerDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 140,
    borderRadius: 5,
  },
  textArea: {
    height: 130,
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addImageButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
