import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserNameFromId } from '../api/user'
import { useIsFocused } from '@react-navigation/native';

interface TabItem {
  id: string;
  title: string;
  route: string; // Add route field to specify the navigation path
}

const TABS: TabItem[] = [
  { id: '1', title: 'Edit Profile', route: '/editProfile' },
  { id: '2', title: 'Notification Preferences', route: '/notificationPreferences' },
  { id: '3', title: 'Give Feedback', route: '/giveFeedback' },
];

export default function Setting() {
  const isFocused = useIsFocused();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null); // Track userId from AsyncStorage
  const [userUsername, setUserUsername] = useState<string | null>(null); // Track username from database

  // Fetch userId from AsyncStorage when component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); // Fetch userId from AsyncStorage
        if (storedUserId) {
          setUserId(storedUserId); // Update the state with userId
          // Fetch username using the stored userId and update state
          const username = await getUserNameFromId(Number(storedUserId)); // Ensure that it's awaited if it's async
          setUserUsername(username); // Set the username in the state
        }
      } catch (error) {
        console.error('Failed to retrieve user ID from AsyncStorage:', error);
      }

    };
    if (isFocused) {
      fetchUserId();
    }
  }, [isFocused]); // Empty dependency array to run only once

  // Function to navigate to a specific route when a tab is pressed
  const handlePress = (route: string) => {
    router.push(route as any); // Navigate to the given route
  };

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: TabItem }) => (
    <TouchableOpacity style={styles.tabItem} onPress={() => handlePress(item.route)}>
      <Text style={styles.tabTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Clear the userId from AsyncStorage when logging out
    AsyncStorage.removeItem('userId').then(() => {
      router.replace('/authentication/loginStudent');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile information section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png' }}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>
            {userUsername ? userUsername : 'Loading...'}
          </Text>
        </View>
      </View>

      {/* List of settings tabs */}
      <FlatList
        data={TABS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.tabList}
      />

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tabList: {
    flexGrow: 0,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabTitle: {
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
