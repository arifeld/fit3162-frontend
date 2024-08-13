import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function WriteReviewScreen() {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [images, setImages] = useState<Array<string>>([]);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleAddImage = () => {
    const newImage = 'https://via.placeholder.com/100'; // Placeholder for the picked image
    setImages([...images, newImage]);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Submit Review", { rating, title, description, anonymous, recommend, images });
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

          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Add images:</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
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
