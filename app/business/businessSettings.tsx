import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function BusinessSettings() {
  const { userType } = useLocalSearchParams(); // Retrieve the user type and lastLogin parameters
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/authentication/loginBusiness');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with Logo and Business Name */}
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
          {/* Edit Profile */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/businessPages/editProfile')}
          >
            <Text style={styles.settingText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Notification Preferences */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('../notificationPreferences')}
          >
            <Text style={styles.settingText}>Notification Preferences</Text>
          </TouchableOpacity>

          {/* Give Feedback */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('../giveFeedback')}
          >
            <Text style={styles.settingText}>Give Feedback</Text>
          </TouchableOpacity>

          {/* Manage Shops */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/businessPages/manageStorePage')}
          >
            <Text style={styles.settingText}>Manage Shops</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
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
