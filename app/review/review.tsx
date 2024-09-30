import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { addReview } from '../utils/tempDatabase'; // Import the addReview function
import { Stack, useLocalSearchParams } from 'expo-router';
import { createReview } from '../api/reviews';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

export default function WriteReviewScreen() {
  const { storeId } = useLocalSearchParams<{storeId: string}>(); // Get the restaurant ID from the URL parameters
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imagesBase64, setImagesBase64] = useState<string[]>([])

  const userId = 1; // Replace with dynamic user ID

  const navigation = useNavigation<NavigationProp<any>>();


  const handleRating = (value: number) => {
    setRating(value);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need media library permissions to pick images!');
    }


    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);  // Extract URIs from assets
      const base64s = result.assets.map(asset => asset.base64!)
      setImagesBase64([...imagesBase64, ...base64s]);
      setImages([...images, ...uris]);  // Append new images to the array
    }
  };

  const takePhoto = async () => {
    // Request Camera permissions before launching the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);  // Extract URIs from assets
      const base64s = result.assets.map(asset => asset.base64!)

      setImagesBase64([...imagesBase64, ...base64s]);
      setImages([...images, ...uris]);  // Append new images to the array
    }
  };

  const chooseImageSource = () => {
    Alert.alert(
      "Select Image Source",
      "Choose an option",
      [
        {text: "Pick from gallery", onPress: pickImage},
        {text: "Take a photo", onPress: takePhoto},
        {text: "Cancel", style: "cancel"},
      ],
      {cancelable: true}
    )
  }

  const handleSubmit = () => {
    if (rating === 0 || !description.trim()) {
      Alert.alert('Error', 'Please provide a rating and a description.');
      return;
    }

    createReview(storeId, userId, rating, description, recommend, imagesBase64)
      .then((res) => {
        Alert.alert('Success', 'Your review has been submitted!', [{
          text: "Ok",
          onPress: () => navigation.goBack()
        }])
      })
      .catch((err) => {
        Alert.alert("Failure", "Something went wrong. Please try again.", [{
          text: "Ok",
          onPress: () => navigation.goBack()
        }]
        )
      }); // Add the review to the database
    // Optionally reset the form or navigate away
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
      <View style={styles.container}>
      <Stack.Screen options={{title: "Submit a Review"}} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.heading}>Ratings</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                <FontAwesome
                  name={i <= rating ? 'star' : 'star-o'}
                  size={32}
                  color={i <= rating ? '#ffd700' : '#ccc'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Add images (max 3):</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.addImageButton} onPress={chooseImageSource}>
              <FontAwesome name="plus" size={32} color="#000" />
            </TouchableOpacity>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
          </View>

          {/* <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Anonymous</Text>
            <Switch value={anonymous} onValueChange={setAnonymous} />
          </View> */}

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Recommend</Text>
            <Switch value={recommend} onValueChange={setRecommend} />
          </View>
          
          <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#FFFFFF',  
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000', 
    borderWidth: 1, 
  },  
  submitButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
