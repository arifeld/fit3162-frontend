import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { addStore } from '../utils/tempDatabase';

export default function AddStorePage() {
  const [images, setImages] = useState<Array<string>>([]);

  const navigation = useNavigation();

  const [form, setForm] = useState({
    storeName: '',
    storeDescription: '',
    storeLocation: '',
});

  const handleAddImage = () => {
    const newImage = 'https://via.placeholder.com/100';
    setImages([...images, newImage]);
  };

  const handleAddStore = () => {
    if (!form.storeName || !form.storeDescription || !form.storeLocation) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    const newStore = {
        store_name: form.storeName,
        store_description: form.storeDescription,
        rating: 0, // new store by default should have 0 rating
        image: images[0] || 'https://via.placeholder.com/100', // (temporary) Use the first image or the placeholder image
        business_id: 1, // idk what this business id is
        totalReviews: 0, // new store by default should have 0 reviews
        recommendationPercentage: 0, 
        ratingsDistribution: [0, 0, 0, 0, 0],
        latitude: 0, 
        longitude: 0, 
    };

    addStore(newStore);

    // Navigate back to ManageStorePage
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Add New Store</Text>

        {/* Store Name */}
        <View style={styles.input}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputControl}
                    placeholder='Store Name'
                    placeholderTextColor='#6b7280'
                    value={form.storeName}
                    onChangeText={storeName => setForm({...form, storeName})}
                />
            </View>
        </View>

        <Text style={styles.label}>Add Store Images:</Text>
            <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                <FontAwesome name="plus" size={32} color="#000" />
            </TouchableOpacity>
            {images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
        </View>   

        {/* Store Description */}
        <View style={styles.input}>
            <View style={styles.inputContainerDescription}>
                <TextInput
                    style={[styles.inputControl, styles.textArea]}
                    placeholder='Store Description'
                    placeholderTextColor='#6b7280'
                    value={form.storeDescription}
                    onChangeText={storeDescription => setForm({...form, storeDescription})}
                    multiline
                    numberOfLines={4}
                />
            </View>
        </View>

        {/* Store Location */}
        <View style={styles.input}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputControl}
                    placeholder='Store Location'
                    placeholderTextColor='#6b7280'
                    value={form.storeLocation}
                    onChangeText={storeLocation => setForm({...form, storeLocation})}
                />
            </View>
        </View>

        {/* Add Shop button */}
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddStore()}>
            <Text style={styles.addButtonText}>Add Shop</Text>
        </TouchableOpacity>
    </View>
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
        marginBottom: 16
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
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
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    imagePreview: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
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
