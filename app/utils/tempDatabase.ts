// app/utils/tempDatabase.ts

const tempDatabase = {
    userFavourites: [] as { userFavouriteId: string; userId: string; storeId: number }[],
    users: [
        {
            user_id: 1,
            user_email: 'kristin@example.com',
            user_password: 'password123',
            user_username: 'Kristin Watson',
        },
        {
            user_id: 2,
            user_email: 'john@example.com',
            user_password: 'password123',
            user_username: 'John Doe',
        },
        {
            user_id: 3,
            user_email: 'alice@example.com',
            user_password: 'password123',
            user_username: 'Alice Johnson',
        },
        {
            user_id: 4,
            user_email: 'bob@example.com',
            user_password: 'password123',
            user_username: 'Bob Brown',
        },
        {
            user_id: 5,
            user_email: 'cathy@example.com',
            user_password: 'password123',
            user_username: 'Cathy White',
        },
        {
            user_id: 6,
            user_email: 'dan@example.com',
            user_password: 'password123',
            user_username: 'Dan Green',
        },
    ],
    restaurants: [
        {
            name: 'Guzman Y Gomez',
            description: 'Specialises in Mexican cuisine with burritos, nachos, tacos, quesadillas and other Mexican-inspired items available.',
            rating: 4.5,
            image: require('../assets/images/guzman.png'),
            id: 1,
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
            totalReviews: 320,
            recommendationPercentage: 95,
            ratingsDistribution: [280, 30, 5, 3, 2],
        },
    ],
    reviews: [
        {
            review_id: 1,
            review_date: '2022-11-09',
            review_rating: 5.0,
            review_description: 'SO DELICIOUS 😋💯 This is 💯 one hundred percent the best restaurant on campus',
            user_id: 1,
            store_id: 1,
            review_business_response: '',
        },
        {
            review_id: 2,
            review_date: '2022-12-15',
            review_rating: 4.0,
            review_description: 'Great food, but a bit expensive.',
            user_id: 2,
            store_id: 1,
            review_business_response: '',
        },
        {
            review_id: 3,
            review_date: '2022-10-22',
            review_rating: 5.0,
            review_description: "Best sushi I've ever had! Fresh and delicious.",
            user_id: 3,
            store_id: 2,
            review_business_response: '',
        },
        {
            review_id: 4,
            review_date: '2022-11-18',
            review_rating: 4.0,
            review_description: 'Good sushi, but the service could be better.',
            user_id: 4,
            store_id: 2,
            review_business_response: '',
        },
        {
            review_id: 5,
            review_date: '2022-09-05',
            review_rating: 5.0,
            review_description: 'Love the variety of smoothies. Always fresh and tasty!',
            user_id: 5,
            store_id: 3,
            review_business_response: '',
        },
        {
            review_id: 6,
            review_date: '2022-10-10',
            review_rating: 4.0,
            review_description: 'Great smoothies but a bit pricey for a daily treat.',
            user_id: 6,
            store_id: 3,
            review_business_response: '',
        },
    ],
};

export const addToFavourites = (userId: string, storeId: number) => {
    const userFavouriteId = Math.random().toString(36).substr(2, 9);
    tempDatabase.userFavourites.push({
        userFavouriteId,
        userId,
        storeId,
    });
    console.log('Updated Database:', tempDatabase.userFavourites);
    return userFavouriteId;
};

export const getFavourites = (userId: string) => {
    // Fetch all favorites for the given user
    const favouriteStoreIds = tempDatabase.userFavourites
        .filter(fav => fav.userId === userId)
        .map(fav => fav.storeId);

    // Return the full restaurant details of the user's favorite stores
    return tempDatabase.restaurants.filter(restaurant =>
        favouriteStoreIds.includes(restaurant.id)
    );
};

export const getRestaurants = () => {
    
    const url = process.env.EXPO_PUBLIC_API_URL;

    fetch(`${url}/store`)
    .then(response => {
        if (!response.ok) {
            console.log(response);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There was a problem with the fetching data', error));

    return tempDatabase.restaurants;
};

export const getReviewsByStoreId = (storeId: number) => {
    return tempDatabase.reviews
        .filter(review => review.store_id === storeId)
        .map(review => {
            const user = tempDatabase.users.find(user => user.user_id === review.user_id);
            return {
                ...review,
                user_username: user ? user.user_username : 'Unknown User',
            };
        });
};

export const searchRestaurantsByName = (query: string) => {
    if (!query) {
        return getRestaurants();
    }

    return tempDatabase.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
};

export const removeFromFavourites = (userId: string, storeId: number) => {
    tempDatabase.userFavourites = tempDatabase.userFavourites.filter(
        fav => !(fav.userId === userId && fav.storeId === storeId)
    );
    console.log('Removed from Favourites:', tempDatabase.userFavourites);
};

export const isFavourite = (userId: string, storeId: number) => {
    return tempDatabase.userFavourites.some(
        fav => fav.userId === userId && fav.storeId === storeId
    );
};

export const addReview = (storeId: number, userId: number, rating: number, description: string, recommend: boolean) => {
    const newReviewId = tempDatabase.reviews.length + 1; // Simple auto-increment logic
    const newReview = {
        review_id: newReviewId,
        review_date: new Date().toISOString().split('T')[0], // Today's date in 'YYYY-MM-DD' format
        review_rating: rating,
        review_description: description,
        user_id: userId,
        store_id: storeId,
        review_business_response: '', // Assuming no business response at creation
        recommended: recommend,
    };

    tempDatabase.reviews.push(newReview);
    console.log('New Review Added:', newReview);
};


export const getDatabase = () => tempDatabase;
