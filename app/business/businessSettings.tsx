import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BusinessSettings() {
    const { userType } = useLocalSearchParams(); // Retrieve the user type parameter

    return (
        <View>
            <Text>Welcome to the Business Setting</Text>
            {userType === 'business' && <Text>You are logged in as a Business User</Text>}
        </View>
    );
}
