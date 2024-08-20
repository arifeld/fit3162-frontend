import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function loginBusiness() {
    const router = useRouter();

    // State to manage form input values
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Perform your login validation or API call here

        // Pass userType as a parameter
        router.push({
            pathname: '/business/businessHome',
            params: { userType: 'business' },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Your component JSX here */}
            <View style={styles.container}>
                {/* Header section with logo and title */}
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/images/monash-logo.png')} 
                        style={styles.monashLogo}
                    />

                    <Text style={styles.title}>Welcome Back</Text>
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
                            placeholder='Business Email'
                            placeholderTextColor='#6b7280'
                            value={form.email}
                            onChangeText={email => setForm({ ...form, email })}
                        />
                    </View>

                    {/* Password input field with show/hide functionality */}
                    <View style={styles.input}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.inputControlPassword}
                                placeholder='Password'
                                placeholderTextColor='#6b7280'
                                value={form.password}
                                onChangeText={password => setForm({ ...form, password })}
                                secureTextEntry={!showPassword} // Toggle password visibility
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)} // Toggle the showPassword state
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

                    {/* Sign In button */}
                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={handleLogin}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer section with sign-up link */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/authentication/signupBusiness')}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
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
        marginLeft: 3
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
