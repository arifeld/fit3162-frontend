import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function loginStudent() {

    // State to manage form input values
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false); 
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{title: "Forgot Password", headerTitle: "Forgot Password", headerShown: true}}/>

            <View style={styles.container}>
                {/* Header section with logo and title */}
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/images/monash-logo.png')} 
                        style={styles.monashLogo}
                    />

                    <Text style={styles.title}>Restore Password</Text>
                </View>

                {/* Form section for user input */}
                <View style={styles.form}>
                    {/* Email input field */}
                    <View style={styles.input}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            style={styles.inputControl}
                            placeholder='Email'
                            placeholderTextColor='#6b7280'
                            value={form.email}
                            onChangeText={email => setForm({...form, email})}
                        />
                    </View>

                    {/* Reset button */}
                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => {
                                // awaiting backend
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Send reset instructions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Back to login button */}
                    <View style={styles.backToLoginContainer}>
                        <Link href={`/authentication/loginStudent`}>
                            <Text style={styles.backToLogin}>{`<`} Back to login?</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 32,
        marginTop: 10
    },
    monashLogo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 27,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 6,
        color: '#0E1428'
    },
    form: {},
    input: {
        marginBottom: 16
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 8

    },
    inputControl: {
        backgroundColor: 'white',
        height: 55,
        paddingHorizontal: 16,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '500',
        borderColor: 'gray',
        borderWidth: 1.5
    },
    inputControlPassword: {
        backgroundColor: 'white',
        height: 55,
        paddingHorizontal: 16,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '500',
        borderColor: 'gray',
        borderWidth: 1.5,
        flex: 1,
    },
    formAction: {},
    btn: {
        backgroundColor: '#0E1428',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0E1428',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textTransform: 'uppercase'
    },
    backToLogin: {
        color: 'grey', 
    },
    backToLoginContainer: {
        alignSelf: 'flex-start',
        marginTop: 15
    },
})