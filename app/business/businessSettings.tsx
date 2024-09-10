import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function BusinessSettings() {
    const { userType } = useLocalSearchParams(); // Retrieve the user type and lastLogin parameters

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header with Logo and Last Login */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        {/* Replace this with the actual logo image if necessary */}
                        <Text style={styles.logoText}>Logo</Text>
                    </View>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Boost Juice</Text>
                    </View>
                </View>

                {/* Settings options */}
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Security</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Notification preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Give feedback</Text>
                    </TouchableOpacity>
                    {/*go to manage shops page, once clicked*/}
                    <TouchableOpacity style={styles.settingItem}
                        onPress={handleToggleManageStore}
                        >
                        <Text 
                        style={styles.settingText}>Manage Shops
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Log Out button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const handleToggleManageStore = () => {
    // Navigate to the manage shops page
    router.push('../businessPages/manageStorePage');
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginRight: 10,
    },
    logoText: {
        fontSize: 16,
        color: '#000',
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastLogin: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },
    settingsContainer: {
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    settingItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 20,
        padding: 16,
        alignItems: 'center',
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
    },
});
