// app/tabs/profile.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList
} from 'react-native';

// Define the type for items in the TABS array
interface TabItem {
  id: string;
  title: string;
}

// List of tab items with their IDs and titles
const TABS: TabItem[] = [
  { id: '1', title: 'Security' },
  { id: '2', title: 'Notification Preferences' },
  { id: '3', title: 'Give Feedback' },
];

export default function Setting() {
  // Render each item in the FlatList
  const renderItem = ({ item }: { item: TabItem }) => (
    <TouchableOpacity style={styles.tabItem}>
      <Text style={styles.tabTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const router = useRouter();

  const handleLogout = () => {
    router.replace('/authentication/loginStudent');
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Profile information section */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png'}}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Zhan Hung Fu</Text>
          <Text style={styles.profileLastLogin}>Last login: Aug 7, 2024 9:58 AM</Text>
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
    marginBottom: 5
  },
  profileLastLogin: {
    color: 'gray',
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
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});
