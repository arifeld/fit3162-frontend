import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { addReview } from '../utils/tempDatabase'; // Import the addReview function
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function WriteReviewScreen() {
  const { restaurantId } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [images, setImages] = useState<string[]>([]);


  const userId = 1; // Replace with dynamic user ID

  const handleRating = (value: number) => {
    setRating(value);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);  // Extract URIs from assets
      setImages([...images, ...uris]);  // Append new images to the array
    }
  };

  const handleSubmit = () => {
    if (rating === 0 || !description.trim()) {
      Alert.alert('Error', 'Please provide a rating and a description.');
      return;
    }

    addReview(Number(restaurantId), userId, rating, description, recommend); // Add the review to the database
    Alert.alert('Success', 'Your review has been submitted!');
    // Optionally reset the form or navigate away
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <FontAwesome name="plus" size={32} color="#000" />
            </TouchableOpacity>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Anonymous</Text>
            <Switch value={anonymous} onValueChange={setAnonymous} />
          </View>

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
