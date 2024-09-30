import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import StoreCard from '../components/StoreCard';
import { getStoresByBusinessId } from '../api/stores';
import { getBusinessByOwnerID } from '../api/owner';

type Store = {
    store_id: number;
    store_name: string;
    store_description: string;
    store_address_street: string;
    store_address_suburb: string;
    store_address_postcode: string;
    store_geopoint: string;
    store_contact_phone: string | null;
    store_contact_email: string | null;
    store_contact_website: string | null;
    store_file_name: string | null;
    business_id: number | null;
    rating?: number;
    image?: string; // Make sure to include the image property
};

export default function BusinessHome() {
    const { owner_id } = useLocalSearchParams();
    const [businessId, setBusinessId] = useState<string | null>(null);
    const [stores, setStores] = useState<Store[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchBusinessId = async () => {
            try {
                const fetchedBusinessId = await getBusinessByOwnerID(String(owner_id));
                setBusinessId(fetchedBusinessId);
            } catch (error) {
                console.error('Failed to fetch business ID:', error);
            }
        };

        if (owner_id) {
            fetchBusinessId();
        }
    }, [owner_id]);

    useEffect(() => {
        if (businessId) {
            loadStores(businessId);
        }
    }, [businessId]);

    const loadStores = async (id: string) => {
        try {
            const response = await getStoresByBusinessId(id);
            const stores: Store[] = response as Store[];
            setStores(stores);
        } catch (error) {
            console.error('Failed to load stores:', error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        if (businessId) {
            loadStores(businessId);
        }
        setRefreshing(false);
    };

    return (
        <View style={styles.outerContainer}>
            <Stack.Screen options={{title: "Business Home", headerShown: true}} />
            {stores.length === 0 ? (
                <Text style={styles.emptyMessage}>No stores available</Text>
            ) : (
                <FlatList
                    data={stores}
                    keyExtractor={(store) => store.store_id.toString()}
                    renderItem={({ item }) => (
                        <StoreCard
                            info={{
                                store_id: item.store_id,
                                store_name: item.store_name,
                                store_description: item.store_description,
                                rating: item.rating || 0,
                                image: item.image, // Use the image from the item
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
