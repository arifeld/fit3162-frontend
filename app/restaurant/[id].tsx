import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToFavourites } from '../utils/tempDatabase'; // Import temporary database functions

// Sample data for restaurants
const RESTAURANTS = [
    {
        name: 'Guzman Y Gomez',
        description: 'Specialises in Mexican cuisine with burritos, nachos, tacos, quesadillas and other Mexican-inspired items available.',
        rating: 4.5,
        image: require('../assets/images/guzman.png'),
        id: 1,
        reviews: [
            {
                user: 'Kristin Watson',
                rating: 5,
                comment: 'SO DELICIOUS 😋💯 This is 💯 one hundred percent the best restaurant on campus',
                date: 'Nov 09, 2022',
                recommended: true,
                helpfulYes: 2,
                helpfulNo: 0,
            },
            {
                user: 'John Doe',
                rating: 4,
                comment: 'Great food, but a bit expensive.',
                date: 'Dec 15, 2022',
                recommended: true,
                helpfulYes: 1,
                helpfulNo: 0,
            },
        ],
        totalReviews: 273,
        recommendationPercentage: 88,
        ratingsDistribution: [180, 60, 20, 10, 3],
    },
    {
        name: 'Sushi Sushi',
        description: 'At Sushi Sushi we see the creation of fresh, healthy sushi as way more than a job; it is an obsession.',
        rating: 4.7,
        image: require('../assets/images/sushi-sushi.jpg'),
        id: 2,
        reviews: [
            {
                user: 'Alice Johnson',
                rating: 5,
                comment: 'Best sushi I\'ve ever had! Fresh and delicious.',
                date: 'Oct 22, 2022',
                recommended: true,
                helpfulYes: 3,
                helpfulNo: 0,
            },
            {
                user: 'Bob Brown',
                rating: 4,
                comment: 'Good sushi, but the service could be better.',
                date: 'Nov 18, 2022',
                recommended: true,
                helpfulYes: 0,
                helpfulNo: 0,
            },
        ],
        totalReviews: 150,
        recommendationPercentage: 90,
        ratingsDistribution: [120, 20, 5, 3, 2],
    },
    {
        name: 'Boost',
        description: 'Boost offers a range of healthy smoothies and freshly squeezed juices made to order, with a variety of dairy-free and gluten-free options.',
        rating: 5.0,
        image: require('../assets/images/boost-juice.png'),
        id: 3,
        reviews: [
            {
                user: 'Cathy White',
                rating: 5,
                comment: 'Love the variety of smoothies. Always fresh and tasty!',
                date: 'Sep 05, 2022',
                recommended: true,
                helpfulYes: 4,
                helpfulNo: 1,
            },
            {
                user: 'Dan Green',
                rating: 4,
                comment: 'Great smoothies but a bit pricey for a daily treat.',
                date: 'Oct 10, 2022',
                recommended: true,
                helpfulYes: 1,
                helpfulNo: 0,
            },
        ],
        totalReviews: 320,
        recommendationPercentage: 95,
        ratingsDistribution: [280, 30, 5, 3, 2],
    },
];


export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters
    const restaurant = RESTAURANTS.find((item) => item.id.toString() === id); // Find the restaurant by ID

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

           {/* Add a button to add to favourites */}
           <TouchableOpacity
                style={styles.favButton}
                onPress={() => handleAddToFavorites()}
            >
                <Text style={styles.submitButtonText}>Add to Favourites</Text>
            </TouchableOpacity>
        </View>
    );

    const handleAddToFavorites = () => {
        const userFavouriteId = addToFavourites('current_user_id_placeholder', restaurant.id);
        Alert.alert('Added to Favourites', `Store ID ${restaurant.id} has been added to your favourites.`);
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