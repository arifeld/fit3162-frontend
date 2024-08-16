import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToFavourites, removeFromFavourites, isFavourite, getRestaurants, getReviewsByStoreId } from '../utils/tempDatabase'; // Import necessary functions
import { router, useLocalSearchParams } from 'expo-router';

export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters
    const [isFav, setIsFav] = useState(false);
    const [restaurant, setRestaurant] = useState<null | {
        name: string;
        description: string;
        rating: number;
        image: any;
        id: number;
        totalReviews: number;
        recommendationPercentage: number;
        ratingsDistribution: number[];
    }>(null);

    const [reviews, setReviews] = useState<{ review_id: number; review_date: string; review_rating: number; review_description: string; user_id: number; store_id: number; review_business_response: string; }[]>([]);
    const userId = 1; // Replace this with dynamic user ID retrieval, for now, it's a static ID for testing

    useFocusEffect(
        useCallback(() => {
            const restaurants = getRestaurants(); // Get the array of restaurants
            const foundRestaurant = restaurants.find((item) => item.id.toString() === id); // Find the restaurant by ID

            if (foundRestaurant) {
                setRestaurant(foundRestaurant);
                const favStatus = isFavourite(userId.toString(), foundRestaurant.id);
                setIsFav(favStatus);

                // Fetch reviews for the restaurant
                const restaurantReviews = getReviewsByStoreId(foundRestaurant.id);
                setReviews(restaurantReviews);
            }
        }, [id]) // This effect runs whenever the screen is focused or when the id changes
    );

    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Restaurant not found</Text>
            </View>
        );
    }

    const renderReview = ({ item }: { item: any }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.userName}>{item.user_username}</Text>
            <View style={styles.starContainer}>
                {[...Array(Math.floor(item.review_rating))].map((_, index) => (
                    <Icon key={index} name="star" size={20} color="#FFD43B" />
                ))}
            </View>
            <Text style={styles.comment}>{item.review_description}</Text>
            <View style={styles.reviewFooter}>
                <Text style={styles.date}>{item.review_date}</Text>
                {item.review_business_response && (
                    <Text style={styles.recommended}>Business Response: {item.review_business_response}</Text>
                )}
            </View>
        </View>
    );

    const getBarWidthPercentage = (count: number, total: number) => (count / total) * 100;

    const renderHeader = () => (
        <View>
            <Image style={styles.image} source={restaurant.image} />
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Ratings & Reviews ({restaurant.totalReviews})</Text>
                <View style={styles.summaryContent}>
                    <View>
                        {restaurant.ratingsDistribution.map((count, index) => (
                            <View key={index} style={styles.ratingRow}>
                                <Text>{5 - index}</Text>
                                <View style={styles.ratingBarContainer}>
                                    <View
                                        style={[
                                            styles.ratingBar,
                                            { width: `${getBarWidthPercentage(count, restaurant.totalReviews)}%` },
                                        ]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text style={styles.overallRating}>{restaurant.rating.toFixed(1)}</Text>
                        <Text>{restaurant.totalReviews} Reviews</Text>
                        <Text>{restaurant.recommendationPercentage}% Recommended</Text>
                    </View>
                </View>
            </View>
            {/* Add a button to write a review */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => router.push({
                    pathname: "../review/review",
                    params: { restaurantId: restaurant.id },
                })}
            >
                <Text style={styles.submitButtonText}>Write a Review</Text>
            </TouchableOpacity>

            {/* Add a button to add/remove from favourites */}
            <TouchableOpacity
                style={styles.favButton}
                onPress={handleToggleFavourite}
            >
                <Text style={styles.submitButtonText}>
                    {isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const handleToggleFavourite = () => {
        if (isFav) {
            removeFromFavourites(userId.toString(), restaurant.id);
            Alert.alert('Removed from Favourites', `Store ID ${restaurant.id} has been removed from your favourites.`);
        } else {
            addToFavourites(userId.toString(), restaurant.id);
            Alert.alert('Added to Favourites', `Store ID ${restaurant.id} has been added to your favourites.`);
        }
        setIsFav(!isFav); // Toggle favourite state
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={(item) => item.review_id.toString()}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatListContent: {
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summaryContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summaryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        width: 200,
    },
    ratingBarContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginLeft: 10,
        overflow: 'hidden',
    },
    ratingBar: {
        height: '100%',
        backgroundColor: '#FFD43B',
        borderRadius: 5,
    },
    overallRating: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    reviewContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    comment: {
        fontSize: 14,
        marginBottom: 8,
    },
    reviewFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    helpful: {
        fontSize: 12,
        color: '#777',
    },
    date: {
        fontSize: 12,
        color: '#777',
    },
    recommended: {
        fontSize: 12,
        color: 'green',
    },
    submitButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
    },
    submitButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: 10,
    },
});
