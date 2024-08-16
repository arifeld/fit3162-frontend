import React, { useState } from 'react';
import { Link } from 'expo-router';
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
            <View style={styles.container}>
                {/* Header section with logo and title */}
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/images/monash-logo.png')} 
                        style={styles.monashLogo}
                    />

                    <Text style={styles.title}>Sign In</Text>

                    <Text style={styles.subtitle}>Start reviewing to help students in Monash</Text>
                </View>

                {/* Form section for user input */}
                <View style={styles.form}>
                    {/* Email input field */}
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email Address</Text>

                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            style={styles.inputControl}
                            placeholder='john@example.com'
                            placeholderTextColor='#6b7280'
                            value={form.email}
                            onChangeText={email => setForm({...form, email})}
                        />
                    </View>

                    {/* Password input field with show/hide functionality */}
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.inputControlPassword}
                                placeholder='********'
                                placeholderTextColor='#6b7280'
                                value={form.password}
                                onChangeText={password => setForm({...form, password})}
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
                        <TouchableOpacity
                            onPress={() => {
                                // awaiting backend
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer section with sign-up link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <Link style={ {marginLeft: 6} } href={`/authentication/signupStudent`}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </Link>
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
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 6
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: 'darkgray'
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
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500'
    },
    formAction: {

    },
    btn: {
        backgroundColor: '#075eec',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#075eec',
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 120,
    },
    footerText: {},
    signUpText: {
        textDecorationLine: 'underline',
        color: '#007bff',
    },
    eyeIcon: {
        marginLeft: 10,
        position: 'relative',
        right: 0
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 44,
        borderRadius: 12,
        paddingRight: 16,
    },
    inputControlPassword: {
        backgroundColor: 'white',
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        flex: 1, // For eye icon
    },
})