import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function GiveFeedback() {
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Give Feedback</Text>

      {/* Feedback Input */}
      <Text style={styles.label}>Your Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback here"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
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
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#FFD700', // Yellow button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#000', // Black text for contrast with yellow
    fontWeight: '600',
  },
});
