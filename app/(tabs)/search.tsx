import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image } from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Implement your search logic here
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      {/* No Results Found */}
      <View style={styles.noResultsContainer}>
        <Image
          source={require('../assets/images/no-results.png')} 
          style={styles.noResultsImage}
        />
        <Text style={styles.noResultsText}>No results found</Text>
      </View>
    </View>
  );
}

// Stylesheet for styling the search page
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen height
    backgroundColor: 'white', // Set background color to white
    padding: 16, // Add padding around the container
  },
  searchBar: {
    height: 40, // Set the height of the search bar
    borderColor: '#e0e0e0', // Set border color to light gray
    borderWidth: 1, // Set border width
    borderRadius: 8, // Add rounded corners to the search bar
    paddingHorizontal: 12, // Add padding inside the search bar
    backgroundColor: '#f5f5f5', // Set background color for the search bar
    fontSize: 16, // Set font size of the text in the search bar
  },
  noResultsContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  noResultsImage: {
    width: 200, // Set the width of the image
    height: 200, // Set the height of the image
    marginBottom: 16, // Add space below the image
  },
  noResultsText: {
    fontSize: 16, // Set font size of the "No results found" text
    color: '#777', // Set color of the text to gray
  },
});
