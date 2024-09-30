import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import StoreCard from '../components/StoreCard'; // Assuming you have a StoreCard component
import { getStoresByBusinessId } from '../api/stores';
import { getBusinessByOwnerID } from '../api/owner';

type Store = {
    store_id: number;                  // The unique identifier for the store
    store_name: string;                // The name of the store
    store_description: string;         // A description of the store
    store_address_street: string;      // The street address of the store
    store_address_suburb: string;      // The suburb where the store is located
    store_address_postcode: string;    // The postal code of the store's address
    store_geopoint: string;            // The geographic location (geopoint) of the store, possibly a point in space (could be a string or a specific GeoJSON type)
    store_contact_phone: string | null;// The phone number of the store (nullable if not provided)
    store_contact_email: string | null;// The contact email of the store (nullable if not provided)
    store_contact_website: string | null; // The website of the store (nullable if not provided)
    store_file_name: string | null;    // The file name for the store image or file related to the store
    business_id: number | null;        // The business ID associated with the store (nullable)
  };
  

export default function BusinessHome() {
    const {owner_id }= useLocalSearchParams();
    const businessId = getBusinessByOwnerID(String(owner_id));
    
    // Ensure businessId is always a string
    const normalizedBusinessId = Array.isArray(businessId) ? businessId[0] : businessId;
    
    const [stores, setStores] = useState<Store[]>([]); // Correctly typed state
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (normalizedBusinessId) {
            loadStores(normalizedBusinessId);
        }
    }, [normalizedBusinessId]);

    const loadStores = async (id: string) => {
        try {
            // Await the API call and parse the JSON response
            const response = await getStoresByBusinessId(id);  // Assume it returns a JSON array
            const stores: Store[] = response as Store[];  // Cast the response to the Store[] type
    
            // Now you can safely set the parsed data into your state
            setStores(stores);
        } catch (error) {
            console.error('Failed to load stores:', error);
        }
    };
    
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            if (normalizedBusinessId) {
                loadStores(normalizedBusinessId);
            }
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={styles.outerContainer}>
            {stores.length === 0 ? (
                <Text style={styles.emptyMessage}>No stores available</Text>
            ) : (
                <FlatList
                    data={stores}
                    keyExtractor={(store) => store.store_id.toString()}
                    renderItem={({ item }) => <StoreCard info={item} />}
                    contentContainerStyle={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
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
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'grey',
    },
});
