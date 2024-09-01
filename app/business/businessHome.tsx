import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import StoreCard from '../components/StoreCard'; // Assuming you have a StoreCard component
import { getStoresByBusiness } from '../utils/tempDatabase'; // Function to fetch stores for a specific business

type Store = {
    store_id: number;
    store_name: string;
    store_description: string;
    rating: number;
    image: any;
    business_id: number;
    totalReviews: number;
    recommendationPercentage: number;
    ratingsDistribution: number[];
    latitude: number;
    longitude: number;
};

export default function BusinessHome() {
    const { businessId } = useLocalSearchParams();
    
    // Ensure businessId is always a string
    const normalizedBusinessId = Array.isArray(businessId) ? businessId[0] : businessId;
    
    const [stores, setStores] = useState<Store[]>([]); // Correctly typed state
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (normalizedBusinessId) {
            loadStores(normalizedBusinessId);
        }
    }, [normalizedBusinessId]);

    const loadStores = (id: string) => {
        const businessStores = getStoresByBusiness(parseInt(id, 10));
        setStores(businessStores);
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
