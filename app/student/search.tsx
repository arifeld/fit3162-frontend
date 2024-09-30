import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Image, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../components/StoreCard';
import { searchStoresByName } from '../api/stores';
import { Stack } from 'expo-router';

export default function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    getData();
  };

  async function getData() {
    setIsLoading(true);
    const results = await searchStoresByName(searchQuery);
    setSearchResults(results);
    setIsLoading(false);
    console.log(searchResults);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
  
        {/* Non-scrollable content: Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>

        {/* Scrollable content: Search Results */}
        {searchResults !== null && searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(store) => store.store_id.toString()}
            renderItem={({ item }) => <Card info={item} />}
            contentContainerStyle={styles.flatListContentContainer} // Style for FlatList content
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Image
              source={require('../assets/images/no-results.png')} 
              style={styles.noResultsImage}
            />
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// Stylesheet for styling the search page
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen height
    backgroundColor: 'white', // Set background color to white
    padding: 10, // Add padding around the container
  },
  searchBarContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    borderColor: '#e0e0e0', // Set border color to light gray
    borderWidth: 1, // Set border width
    borderRadius: 8, // Add rounded corners to the container
    backgroundColor: '#f5f5f5', // Set background color
    paddingHorizontal: 8, // Add padding inside the container
    marginBottom: 16, // Add margin below the search bar
  },
  searchIcon: {
    marginRight: 8, // Add space between the icon and the input
  },
  searchBar: {
    flex: 1, // Allow the input to take up remaining space
    height: 40, // Set the height of the search bar
    fontSize: 16, // Set font size of the text in the search bar
  },
  flatListContentContainer: {
    paddingBottom: 20, // Add some padding at the bottom for better spacing
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
