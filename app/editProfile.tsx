import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { getUserById } from './utils/tempDatabase'; // Assuming this function gets user details

export default function EditProfile() {
  // Fetch the current user's details
  const currentUser = getUserById(1); // Replace with actual logic to fetch user
  const [username, setUsername] = useState(currentUser?.user_username || ''); // Initialize state with current username

  const handleSave = () => {
    // Perform validation 
    if (!username) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    // Update the user's profile
    // Call the API to update the user's username
    Alert.alert('Profile Updated', `Username has been changed to: ${username}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Current Username Container */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Current Username:</Text>
        <Text style={styles.currentUsername}>{currentUser?.user_username}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
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
