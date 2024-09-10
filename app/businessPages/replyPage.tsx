import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; // Using expo-router to fetch params

export default function ReplyPage() {
    const { reviewId, userUsername, reviewDescription } = useLocalSearchParams(); // Retrieve the review details from params
    const [replyText, setReplyText] = useState(''); // Local state for the reply text

    const handleSubmitReply = () => {
        if (replyText.trim() === '') {
            Alert.alert('Error', 'Reply text cannot be empty.');
            return;
        }

        // Logic for submitting the reply (e.g., API call or saving locally)
        Alert.alert('Reply Submitted', `Your reply to review by ${userUsername} has been submitted.`);
        
        // Navigate back after submitting
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Display the review details */}
            <Text style={styles.title}>Reply to Review</Text>
            <Text style={styles.reviewUsername}>Review by: {userUsername}</Text>
            <Text style={styles.reviewText}>{reviewDescription}</Text>

            {/* Reply input field */}
            <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                placeholder="Type your reply here..."
                value={replyText}
                onChangeText={setReplyText}
            />

            {/* Submit Reply button */}
            <Button title="Submit Reply" onPress={handleSubmitReply} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    reviewUsername: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    reviewText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    textInput: {
        height: 150,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});
