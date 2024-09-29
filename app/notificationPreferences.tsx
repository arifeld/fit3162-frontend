import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';

export default function NotificationPreferences() {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Notification Preferences</Text>

      {/* Push Notifications */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceLabel}>Push Notifications</Text>
        <Switch
          value={isPushEnabled}
          onValueChange={setIsPushEnabled}
        />
      </View>

      {/* Email Notifications */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceLabel}>Email Notifications</Text>
        <Switch
          value={isEmailEnabled}
          onValueChange={setIsEmailEnabled}
        />
      </View>

      {/* SMS Notifications */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceLabel}>SMS Notifications</Text>
        <Switch
          value={isSmsEnabled}
          onValueChange={setIsSmsEnabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#555',
  },
});
