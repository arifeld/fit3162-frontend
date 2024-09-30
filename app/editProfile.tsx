import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import { updateUserName, getUserNameFromId } from './api/user';

export default function EditProfile() {
  const [userId, setUserId] = useState<number | null>(null); // State to hold userId
  const [username, setUsername] = useState<string>(''); // State to hold new username
  const [currentUsername, setCurrentUsername] = useState<string>(''); // State to hold current username

  // Fetch userId and user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); // Fetch userId from AsyncStorage
        if (storedUserId) {
          const userId = Number(storedUserId);
          setUserId(userId);

          // Fetch the username from the API
          const fetchedUsername = await getUserNameFromId(userId);
          setCurrentUsername(fetchedUsername); // Set the current username
          setUsername(fetchedUsername); // Set the username for editing
        } else {
          console.warn('No user ID found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to retrieve user details:', error);
      }
    };

    fetchUserDetails(); // Call the function to fetch the user details
  }, []);

  const handleSave = () => {
    // Perform validation 
    if (!username) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    // Here would call an API to update the user's username
    updateUserName(userId!, username).then(() => {
      // Call the API to update the username
      Alert.alert('Profile Updated', `Username has been changed to: ${username}`);
      router.back()
    })
    .catch((err) => {
      Alert.alert('Error', `Something went wrong. Please try again.`);
      router.back();
    }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{title: "Editing Profile"}} />
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Current Username Container */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Current Username:</Text>
        <Text style={styles.currentUsername}>{currentUsername || 'Loading...'}</Text>
      </View>

      {/* New Username Input Container */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  userInfoContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  currentUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FFD700', // Yellow button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#000', // Black text for contrast with yellow
    fontWeight: '600',
  },
});
