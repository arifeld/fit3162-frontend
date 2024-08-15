// app/utils/tempDatabase.ts

const tempDatabase = {
    userFavourites: [] as { userFavouriteId: string; userId: string; storeId: number }[],
    // Sample data for restaurants
    restaurants: [
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
    ],
};

export const addToFavourites = (userId: string, storeId: number) => {
    const userFavouriteId = Math.random().toString(36).substr(2, 9);
    tempDatabase.userFavourites.push({
        userFavouriteId,
        userId,
        storeId,
    });
    console.log('Updated Database:', tempDatabase);
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
    return tempDatabase.restaurants;
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
    console.log('Removed from Favourites:', tempDatabase);
};

export const isFavourite = (userId: string, storeId: number) => {
    return tempDatabase.userFavourites.some(
        fav => fav.userId === userId && fav.storeId === storeId
    );

}

export const getDatabase = () => tempDatabase;
