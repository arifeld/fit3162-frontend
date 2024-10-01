import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isFavourite, getStores, getReviewsByStoreId } from '../utils/tempDatabase'; // Updated function import to getStores
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { getReviewsByStoreID, getStoreByID } from '../api/stores';
import { addToFavourites, checkFavourites, removeFromFavourites } from '../api/userfavourites';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getReviewsByStoreID, getStoreByID } from '../api/reviews';


export default function StoreDetailScreen() { // Updated component name
    const { id } = useLocalSearchParams<{id: string}>(); // Get the store ID from the URL parameters
    const [isFav, setIsFav] = useState(false);

    const [store, setStore] = useState<null | {
        name: string;
        description: string;
        rating: number;
        image: any;
        id: number;
        totalReviews: number;
        recommendationPercentage: number;
        ratingsDistribution: number[];
    }>(null);
    const [userId, setUserId] = useState<Number | null>(null);

    const navigation = useNavigation<NavigationProp<any>>();

    // Safely get the navigation state and handle undefined
    const navigationState = navigation.getState ? navigation.getState() : undefined;

    const previousRouteName = navigationState?.routes?.[navigationState.index - 1]?.name;

    const [reviews, setReviews] = useState<{ review_id: number; review_date: string; review_rating: number; review_description: string; user_id: number; store_id: number; review_business_response: string; }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {

            async function getData() {
                setIsLoading(true);
                const store = await getStoreByID(id); // Get the array of stores
                const reviews = await getReviewsByStoreID(id);
                const userId = await AsyncStorage.getItem('userId');
                

                const distribution = [0, 0, 0, 0, 0];
                let recommendationCount = reviews.reduce((acc:any, rec:any) => acc + rec.review_recommended, 0);

                
                for (const review of reviews) {
                    if (![1, 2, 3, 4, 5].includes(review.review_rating)) {
                        console.error("Invalid review value:", review.review_rating);
                    }
                    else {
                        distribution[review.review_rating-1] += 1;
                    }
                }

                const mappedStore = {
                    name: store.store_name,
                    description: store.store_description,
                    rating: store.rating || 0,
                    image: store.image,
                    id: store.store_id,
                    totalReviews: reviews.length,
                    recommendationPercentage: (recommendationCount / reviews.length) * 100 , //store.recommendationPercentage,
                    ratingsDistribution: distribution || [0, 0, 0, 0, 0], //store.ratingsDistribution,
                };
    
                setStore(mappedStore);

                navigation.setOptions({ title: mappedStore.name });

                if(userId){
                    const favStatus = await checkFavourites(Number(userId),store.store_id);
                    console.log(favStatus.isFavorite);
                    setIsFav(favStatus.isFavorite);
                }
                                        
                setUserId(Number(userId));
                
                
                // Fetch reviews for the store
                //const storeReviews = getReviewsByStoreId(store.store_id);
                setReviews(reviews);

                setIsLoading(false);
            }

            getData();
        }, [id]) // This effect runs whenever the screen is focused or when the id changes
    );
    

    if (!store && !isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Store not found</Text>
            </View>
        );
    }

    if (!store || isLoading) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{title: ""}} />
            </View>
        )
    }

    const renderReview = ({ item }: { item: any }) => {
        
        return (
        <View style={styles.reviewContainer}>
            <Text style={styles.userName}>{item.user_username}</Text>
            <View style={styles.starContainer}>
                {[...Array(Math.floor(item.review_rating))].map((_, index) => (
                    <Icon key={index} name="star" size={20} color="#FFD43B" />
                ))}
            </View>
            <Text style={styles.comment}>{item.review_description}</Text>
            {item.images.map((image) => <Image style={styles.image} key={image} source={{uri: image}} />)}
            <View style={styles.reviewFooter}>
                <Text style={styles.date}>{item.review_date}</Text>
                {item.review_business_response && (
                    <Text style={styles.recommended}>Business Response: {item.review_business_response}</Text>
                )}
            </View>
    
            {/* Add the Reply button */}
            {previousRouteName === 'business' && (
            <TouchableOpacity 
                style={styles.replyButton} 
                onPress={() => handleReply(item)} // Pass the review object to handleReply
            >
                <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
            )}
        </View>
    );

            }
    

    const handleReply = (review: any) => {
        // Navigate to the reply screen, passing the review details
        router.push({
            pathname: "../businessPages/replyPage", // Correct path to replyPage
            params: { 
                reviewId: review.review_id, // Optionally still pass the reviewId if needed
                userUsername: review.user_username, // Pass the username
                reviewDescription: review.review_description, // Pass the review description
            },
        });
    };
    


    const getBarWidthPercentage = (count: number, total: number) => (count / total) * 100;

    const renderHeader = () => {
        return (
        <View>
            <Stack.Screen
                options={{
                    title: store.name
                }}
            />
            { /* For the purposes of the demo, we bypass the cache by doing this */ }
            {/* <Image style={styles.image} source={{uri: store.image + "?" + Math.random().toString(10)}} />  */}
            <Image style={styles.image} source={{uri: store.image}} />
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.description}>{store.description}</Text>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Ratings & Reviews ({store.totalReviews})</Text>
                <View style={styles.summaryContent}>
                    <View>
                        {store.ratingsDistribution.map((count, index) => (
                            <View key={index} style={styles.ratingRow}>
                                <Text>{5 - index}</Text>
                                <View style={styles.ratingBarContainer}>
                                    <View
                                        style={[
                                            styles.ratingBar,
                                            { width: `${getBarWidthPercentage(count, store.totalReviews)}%` },
                                        ]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text style={styles.overallRating}>{store.rating.toFixed(1)}</Text>
                        <Text>{store.totalReviews} Reviews</Text>
                        <Text>{(store.recommendationPercentage || 0).toFixed(0)}% Recommended</Text>
                    </View>
                </View>
            </View>
            {/* Add a button to write a review */}
            {previousRouteName === 'student' && (
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => router.push({
                        pathname: "../review/review",
                        params: { storeId: store.id },
                    })}
                >
                    <Text style={styles.submitButtonText}>Write a Review</Text>
                </TouchableOpacity>
            )}

            {/* Conditionally render favourite button if the previous route is "student" */}
            {previousRouteName === 'student' && (
                <TouchableOpacity
                    style={styles.favButton}
                    onPress={handleToggleFavourite}
                >
                    <Text style={styles.submitButtonText}>
                        {isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
            }

    const handleToggleFavourite = async () => {
        console.log(userId);
        if (isFav) {
            removeFromFavourites(Number(userId), store.id);
            Alert.alert('Removed from Favourites', ` ${store.name} has been removed from your favourites.`);
        } else {
            addToFavourites(Number(userId), store.id);
            Alert.alert('Added to Favourites', `${store.name} has been added to your favourites.`);
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
        marginRight: 5,
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'lefft',
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
    replyButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    replyButtonText: {
        color: '#007BFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
function setUserUsername(username: any) {
    throw new Error('Function not implemented.');
}

