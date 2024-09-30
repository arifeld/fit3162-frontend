import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Pressable, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Link } from 'expo-router';
import { getStores } from '../utils/tempDatabase';
import * as Linking from 'expo-linking';
import { getAllStores } from '../api/stores';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import * as Location from 'expo-location';



export default function NearMe() {

  const [stores, setStores] = useState<any[]|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<any>>();


  useEffect(() => {
    async function getLocationPermissions() {
      await Location.requestForegroundPermissionsAsync();
    }

    getLocationPermissions();

    async function getData() {
      setIsLoading(true);
      const data = await getAllStores();
      setStores(data);
      setIsLoading(false);
    }

    getData();
  }, []);



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
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: -37.911,
          longitude: 145.133,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {isLoading ? null : stores!.map((store) => (
          <Marker
            key={store.store_id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.store_name}
          >
            <Callout onPress={() => {
              router.push(`/store/${store.store_id}`);
            }}>
              <View style={styles.calloutContainer}>
                <Text style={styles.text}>{store.store_name}</Text>
                <Button title="View Details" />
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
    width: "100%",
    height: "100%"
  },
  calloutContainer: {
    alignItems: 'center',
    padding: 20
  },
  text: {
    margin: 10,
  },
  calloutOption: {
    padding: 10,
    fontSize: 16,
    color: 'blue',
  },
});
