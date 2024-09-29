import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditBusinessProfile() {
  const [businessName, setBusinessName] = useState('Boost Juice'); // Default business name
  const router = useRouter();

  const handleSave = () => {
    // Add logic to save the new business name here (e.g., API call)
    Alert.alert('Profile Updated', `Business name has been changed to: ${businessName}`);
    router.back(); // Go back to the previous screen after saving
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.headerText}>Edit Business Profile</Text>

      {/* Business Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Business Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new business name"
          value={businessName}
          onChangeText={setBusinessName}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
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
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
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
  saveButton: {
    backgroundColor: '#FFD700', // Yellow save button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#000', // Black text for contrast
    fontWeight: '600',
  },
});
