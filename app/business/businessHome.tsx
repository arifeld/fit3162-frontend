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
    const { owner_id } = useLocalSearchParams(); // Get owner_id from the route params
    const [businessId, setBusinessId] = useState<string | null>(null);  // State to store businessId
    const [stores, setStores] = useState<Store[]>([]); // Correctly typed state for stores
    const [refreshing, setRefreshing] = useState(false);

    // Fetch business ID by owner ID when the component mounts or owner_id changes
    useEffect(() => {
        const fetchBusinessId = async () => {
            try {
                const fetchedBusinessId = await getBusinessByOwnerID(String(owner_id));
                setBusinessId(fetchedBusinessId);  // Store the fetched businessId in state
            } catch (error) {
                console.error('Failed to fetch business ID:', error);
            }
        };

        if (owner_id) {
            fetchBusinessId();  // Trigger fetching the business ID
        }
    }, [owner_id]);  // This useEffect will only run when owner_id changes

    // Fetch stores when the businessId is available
    useEffect(() => {
        if (businessId) {
            loadStores(businessId);  // Load stores after businessId is fetched
        }
    }, [businessId]);  // This useEffect will run when businessId changes

    const loadStores = async (id: string) => {
        try {
            const response = await getStoresByBusinessId(id);  // Assume it returns a JSON array
            const stores: Store[] = response as Store[];  // Cast the response to the Store[] type
            setStores(stores);  // Set the stores in state
        } catch (error) {
            console.error('Failed to load stores:', error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            if (businessId) {
                loadStores(businessId);
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
                    renderItem={({ item }) => (
                        <StoreCard
                            info={{
                                ...item,  // Spread existing store properties
                                rating:  0,  // Provide default value for rating
                                image: 'default-image.jpg'  // Provide default value for image
                            }}
                        />
                    )}
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
