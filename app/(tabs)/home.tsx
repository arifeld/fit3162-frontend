import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Card from '../components/RestaurantCard';

const RESTAURANTS = [
  {
    name: 'Guzman Y Gomez',
    description: 'Specialises in Mexican cuisine with burritos, nachos, tacos, quesadillas and other Mexican-inspired items available.',
    rating: 4.5,
    image: require('../assets/images/guzman.png'),
    id: 1,
  },
  {
    name: 'Sushi Sushi',
    description: 'At Sushi Sushi we see the creation of fresh, healthy sushi as way more than a job; it is an obsession.',
    rating: 4.7,
    image: require('../assets/images/sushi-sushi.jpg'),
    id: 2,
  },
  {
    name: 'Boost',
    description: 'Boost offers a range of healthy smoothies and freshly squeezed juices made to order, with a variety of dairy-free and gluten-free options.',
    rating: 5.0,
    image: require('../assets/images/boost-juice.png'),
    id: 3,
  },
];

export default function Home() {
  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={RESTAURANTS}
        keyExtractor={(restaurant) => restaurant.id.toString()}
        renderItem={({ item }) => <Card info={item} />}
        contentContainerStyle={styles.container} // Style to wrap list content
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

