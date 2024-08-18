import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BusinessHome() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Hides the navigation bar
        });
    }, [navigation]);
    
    const { userType } = useLocalSearchParams(); // Retrieve the user type parameter

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Business Home</Text>
            {userType === 'business' ? (
                <Text style={styles.infoText}>You are logged in as a Business User</Text>
            ) : (
                <Text style={styles.infoText}>You are not logged in as a Business User</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        color: 'grey',
    },
});
