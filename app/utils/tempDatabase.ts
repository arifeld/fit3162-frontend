// app/utils/tempDatabase.ts

const tempDatabase = {
    userFavourites: [] as { userFavouriteId: string; userId: string; storeId: number }[],
    restaurants: [
        {
            name: 'Guzman Y Gomez',
            description: 'Specialises in Mexican cuisine with burritos, nachos, tacos, quesadillas and other Mexican-inspired items available.',
            rating: 4.5,
            image: require('../assets/images/guzman.png'),
            id: 1,
        },
        {
            name: 'Sushi Sushi',
            description: 'At Sushi Sushi we see the creation of fresh, healthy sushi as way more than a job; it is an obsession.',
            rating: 4.7,
            image: require('../assets/images/sushi-sushi.jpg'),
            id: 2,
        },
        {
            name: 'Boost',
            description: 'Boost offers a range of healthy smoothies and freshly squeezed juices made to order, with a variety of dairy-free and gluten-free options.',
            rating: 5.0,
            image: require('../assets/images/boost-juice.png'),
            id: 3,
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

export const removeFavorite = (userFavouriteId: string) => {
    tempDatabase.userFavourites = tempDatabase.userFavourites.filter(
        fav => fav.userFavouriteId !== userFavouriteId
    );
    console.log('Updated Database:', tempDatabase);
};

export const getDatabase = () => tempDatabase;
