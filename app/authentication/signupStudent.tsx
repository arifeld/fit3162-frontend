import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function signupStudent() {

    // State to manage form input values
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return ( 
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
             {/* Header section with logo and title */}
            <View style={styles.header}>
                <Image 
                    source={require('../assets/images/monash-logo.png')} 
                    style={styles.monashLogo}
                />

                <Text style={styles.title}>Sign Up</Text>
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

                {/* Confirm Password input field */}
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputControlPassword}
                            placeholder='********'
                            placeholderTextColor='#6b7280'
                            value={form.confirmPassword}
                            onChangeText={confirmPassword => setForm({...form, confirmPassword})}
                            secureTextEntry={!showConfirmPassword} // Toggle confirm password visibility
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle the showConfirmPassword state
                            style={styles.eyeIcon}
                        >
                            <Icon 
                                name={showConfirmPassword ? 'eye-off' : 'eye'} 
                                size={20} 
                                color='#6b7280' 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sign Up button */}
                <View style={styles.formAction}>
                    <TouchableOpacity
                        onPress={() => {
                            // awaiting backend
                        }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 36,
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
        fontWeight: '500',
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
    formAction: {},
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 44,
        borderRadius: 12,
        paddingRight: 16,
    },
    eyeIcon: {
        marginLeft: 10,
        position: 'relative',
        right: 0
    },
})