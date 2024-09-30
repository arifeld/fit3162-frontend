import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginOwner } from '../api/businessLogin'; // Import loginOwner API function
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOwnerIdByEmail } from '../api/owner';

export default function loginBusiness() {
    const router = useRouter();

    // Form state for email and password
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle login using the loginOwner API
    const handleLogin = async () => {
        const { email, password } = form;

        try {
            // Call loginOwner API
            const response = await loginOwner(email, password);

            // Check if login was successful
            if (response.status === 201) {
                const { owner_id } = response.data.result;

                // Navigate to BusinessHome and pass the businessId as a route param
                router.replace({
                    pathname: '/business/businessHome',
                    params: { owner_id: owner_id },
                });
            } else {
                Alert.alert('Error', 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Stack.Screen options={{title: "Business Login"}}/>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/monash-logo.png')}
                        style={styles.monashLogo}
                    />
                    <Text style={styles.title}>Welcome Back</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            style={styles.inputControl}
                            placeholder='Business Email'
                            placeholderTextColor='#6b7280'
                            value={form.email}
                            onChangeText={email => setForm({ ...form, email })}
                        />
                    </View>

                    <View style={styles.input}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.inputControlPassword}
                                placeholder='Password'
                                placeholderTextColor='#6b7280'
                                value={form.password}
                                onChangeText={password => setForm({ ...form, password })}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Icon
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color='#6b7280'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={handleLogin}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={() => router.replace('/authentication/loginStudent')}>
                            <View style={[styles.btn]}>
                                <Text style={styles.btnText}>Back to Student Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Same styles as before...
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
    backBtn: {
        backgroundColor: '#6b7280', // Different color for the back button
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {},
    signUpText: {
        fontWeight: '900',
        color: '#0E1428',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        borderRadius: 5,
    },
});
