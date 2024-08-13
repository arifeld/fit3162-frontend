import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

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

// Function to calculate the width of the rating bar based on the percentage of total reviews
const getBarWidthPercentage = (count: number, total: number): number => {
    if (total === 0) return 0;
    return (count / total) * 100;
};

export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters
    const restaurant = RESTAURANTS.find((item) => item.id.toString() === id); // Find the restaurant by ID

    // If no restaurant is found with the given ID, display a "Restaurant not found" message
    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Restaurant not found</Text>
            </View>
        );
    }

    // Function to render each individual review in the FlatList
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

    // Function to calculate the width of the rating bar
    const getBarWidthPercentage = (count: number, total: number) => (count / total) * 100;

    // Header component for the FlatList
    const renderHeader = () => (
        <View>
            {/* Display the restaurant's image */}
            <Image style={styles.image} source={restaurant.image} />
            {/* Display the restaurant's name */}
            <Text style={styles.title}>{restaurant.name}</Text>
            {/* Display the restaurant's description */}
            <Text style={styles.description}>{restaurant.description}</Text>
            {/* Display the restaurant's overall rating */}
            <Text style={styles.rating}>Rating: {restaurant.rating}</Text>

            {/* Section for displaying a summary of the restaurant's ratings and reviews */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Ratings & Reviews ({restaurant.totalReviews})</Text>
                <View style={styles.summaryContent}>
                    {/* Column for displaying the ratings distribution */}
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

                    {/* Column for displaying the overall rating, total reviews, and recommendation percentage */}
                    <View>
                        <Text style={styles.overallRating}>{restaurant.rating.toFixed(1)}</Text>
                        <Text>{restaurant.totalReviews} Reviews</Text>
                        <Text>{restaurant.recommendationPercentage}% Recommended</Text>
                    </View>
                </View>

            </View>

            {/* Add a button to write a review */}
            <Button title="Write a Review" onPress={() => console.log('Write a review')} />

        </View>
    );

    return (
        <FlatList
            data={restaurant.reviews} // Data source for the list
            renderItem={renderReview} // Function to render each review
            keyExtractor={(item, index) => index.toString()} // Unique key for each item
            ListHeaderComponent={renderHeader} // Header component for the FlatList
            contentContainerStyle={styles.container} // Additional styles for the list
        />
    );
}

// Stylesheet for styling various components
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up the full screen height
        padding: 16, // Padding inside the container
        backgroundColor: 'white', // Background color of the container
    },
    image: {
        width: '100%', // Make the image full width
        height: 200, // Set the height of the image
        marginBottom: 16, // Space below the image
    },
    title: {
        fontSize: 24, // Font size of the title
        fontWeight: 'bold', // Make the title bold
        marginBottom: 8, // Space below the title
    },
    description: {
        fontSize: 16, // Font size of the description
        marginBottom: 8, // Space below the description
    },
    rating: {
        fontSize: 18, // Font size of the rating
        fontWeight: 'bold', // Make the rating text bold
        marginBottom: 16, // Space below the rating
    },
    summaryContainer: {
        marginBottom: 16, // Space below the summary container
        padding: 16, // Padding inside the summary container
        backgroundColor: '#f9f9f9', // Light gray background color
        borderRadius: 8, // Rounded corners for the container
    },
    summaryTitle: {
        fontSize: 18, // Font size of the summary title
        fontWeight: 'bold', // Make the summary title bold
        marginBottom: 8, // Space below the summary title
    },
    summaryContent: {
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'space-between', // Space children evenly across the row
    },
    ratingRow: {
        flexDirection: 'row', // Arrange star rating value and bar in a row
        alignItems: 'center', // Align items vertically centered
        marginBottom: 4, // Space below each rating row
        width: 200, // Set a fixed width for the rating row
    },
    ratingBarContainer: {
        flex: 1, // Allow the bar to take up the remaining space
        flexDirection: 'row', // Arrange filled and unfilled parts of the bar in a row
        height: 10, // Set the height of the rating bar
        backgroundColor: '#e0e0e0', // Light gray background for the unfilled part of the bar
        borderRadius: 5, // Rounded corners for the rating bar
        marginLeft: 10, // Space between the star rating value and the bar
        overflow: 'hidden', // Ensure the filled bar is clipped within the container
    },
    ratingBar: {
        height: '100%', // Ensures the bar fills the height of the container
        backgroundColor: '#FFD43B', // Yellow color for the filled part of the bar
        borderRadius: 5, // Rounded corners for the filled part
    },
    overallRating: {
        fontSize: 32, // Large font size for the overall rating
        fontWeight: 'bold', // Make the overall rating bold
    },
    reviewsList: {
        paddingBottom: 16, // Padding at the bottom of the reviews list
    },
    reviewContainer: {
        padding: 16, // Padding inside each review container
        borderBottomWidth: 1, // Bottom border for each review
        borderBottomColor: '#e0e0e0', // Light gray color for the bottom border
    },
    userName: {
        fontSize: 16, // Font size of the reviewer's name
        fontWeight: 'bold', // Make the reviewer's name bold
        marginBottom: 4, // Space below the reviewer's name
    },
    starContainer: {
        flexDirection: 'row', // Arrange stars in a row
        marginBottom: 4, // Space below the stars
    },
    comment: {
        fontSize: 14, // Font size of the review comment
        marginBottom: 8, // Space below the comment
    },
    reviewFooter: {
        flexDirection: 'row', // Arrange helpful votes, date, and recommendation status in a row
        justifyContent: 'space-between', // Space them evenly across the row
        alignItems: 'center', // Align items vertically centered
    },
    helpful: {
        fontSize: 12, // Font size of the helpfulness text
        color: '#777', // Gray color for the helpfulness text
    },
    date: {
        fontSize: 12, // Font size of the date text
        color: '#777', // Gray color for the date text
    },
    recommended: {
        fontSize: 12, // Font size of the recommendation text
        color: 'green', // Green color for the recommendation text
    },
});
