import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Link } from 'expo-router';
import { getRestaurants } from '../utils/tempDatabase';
import * as Linking from 'expo-linking';

export default function NearMe() {
  const restaurants = getRestaurants();

  const openNavigation = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Could not open the map.', [{ text: 'OK' }])
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Link
                  href={`/restaurant/${restaurant.id}`}  // Use Link to navigate to the details page
                  asChild
                >
                  <TouchableOpacity>
                    <Text style={styles.calloutOption}>See Details</Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity
                  onPress={() => openNavigation(restaurant.latitude, restaurant.longitude)}
                >
                  <Text style={styles.calloutOption}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    alignItems: 'center',
  },
  calloutOption: {
    padding: 10,
    fontSize: 16,
    color: 'blue',
  },
});
