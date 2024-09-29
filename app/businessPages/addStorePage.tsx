import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { addStore } from '../utils/tempDatabase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function AddStorePage() {
  const [images, setImages] = useState<Array<string>>([]);
  const navigation = useNavigation();

  const [form, setForm] = useState({
    storeName: '',
    storeDescription: '',
  });

  const [region, setRegion] = useState({
    latitude: -37.9103098, // Default location (can be modified)
    longitude: 145.1294505, // Default location (can be modified)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: -37.9103098, // Default marker position
    longitude: 145.1294505, // Default marker position
  });

  // Request user location on component mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setMarkerCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Handle image addition
  const handleAddImage = () => {
    const newImage = 'https://via.placeholder.com/100'; // Placeholder image URL
    setImages([...images, newImage]);
  };

  // Handle store submission
  const handleAddStore = () => {
    if (!form.storeName || !form.storeDescription) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    const newStore = {
      store_name: form.storeName,
      store_description: form.storeDescription,
      rating: 0,
      image: images[0] || 'https://via.placeholder.com/100', // Use the first image or the placeholder image
      business_id: 1,
      totalReviews: 0,
      recommendationPercentage: 0,
      ratingsDistribution: [0, 0, 0, 0, 0],
      latitude: markerCoordinates.latitude, // Save selected latitude
      longitude: markerCoordinates.longitude, // Save selected longitude
    };

    addStore(newStore);

    // Navigate back to ManageStorePage
    navigation.goBack();
  };

  // Handle map press event
  const handleMapPress = (event: { nativeEvent: { coordinate: { latitude: any; longitude: any; }; }; }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinates({ latitude, longitude });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Add New Store</Text>

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
      <Text style={styles.label}>Add Store Images:</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
          <FontAwesome name="plus" size={32} color="#000" />
        </TouchableOpacity>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
        ))}
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

      {/* Add Shop button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddStore}>
        <Text style={styles.addButtonText}>Add Shop</Text>
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
  addButton: {
    backgroundColor: '#FFD966',
    paddingVertical: 15,
    borderRadius: 10,
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
