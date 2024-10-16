import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function signupStudent() {

    // State to manage form input values
    const [form, setForm] = useState({
        email: '',
        abn: '',
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

                <Text style={styles.title}>Sign Up</Text>
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
                        onChangeText={email => setForm({...form, email})}
                    />
                </View>

                {/* ABN input field */}
                <View style={styles.input}>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputControl}
                        placeholder='ABN'
                        placeholderTextColor='#6b7280'
                        value={form.abn}
                        onChangeText={abn => setForm({...form, abn})}
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        borderRadius: 5,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16
    },
})