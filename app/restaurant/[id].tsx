import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToFavourites, removeFromFavourites, isFavourite, getRestaurants } from '../utils/tempDatabase'; // Import temporary database functions

export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters
    const restaurants = getRestaurants(); // Call the getRestaurants function to get the array of restaurants
    const restaurant = restaurants.find((item) => item.id.toString() === id); // Find the restaurant by ID
    const userId = 'current_user_id_placeholder'; // Replace with the actual user ID
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const favStatus = restaurant ? isFavourite(userId, restaurant.id) : false;
        setIsFav(favStatus);
    }, [userId, restaurant?.id]);

    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Restaurant not found</Text>
            </View>
        );
    }

    const renderReview = ({ item }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.userName}>{item.user}</Text>
            <View style={styles.starContainer}>
                {[...Array(item.rating)].map((_, index) => (
                    <Icon key={index} name="star" size={20} color="#FFD43B" />
                ))}
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.reviewFooter}>
                <Text style={styles.helpful}>Helpful? Yes ({item.helpfulYes}) No ({item.helpfulNo})</Text>
                <Text style={styles.date}>{item.date}</Text>
                {item.recommended && <Text style={styles.recommended}>✔ Recommended</Text>}
            </View>
        </View>
    );

    const getBarWidthPercentage = (count, total) => (count / total) * 100;

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
                onPress={() => router.push("../review/review")}
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
            removeFromFavourites(userId, restaurant.id);
            Alert.alert('Removed from Favourites', `Store ID ${restaurant.id} has been removed from your favourites.`);
        } else {
            addToFavourites(userId, restaurant.id);
            Alert.alert('Added to Favourites', `Store ID ${restaurant.id} has been added to your favourites.`);
        }
        setIsFav(!isFav); // Toggle favourite state
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurant.reviews}
                renderItem={renderReview}
                keyExtractor={(item, index) => index.toString()}
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
