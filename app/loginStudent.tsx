import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

export default function loginStudent() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        source={require('./assets/images/monash-logo.png')} 
                        style={styles.monashLogo}
                        alt="Logo"
                    />

                    <Text style={styles.title}>Sign in</Text>

                    <Text style={styles.subtitle}>Start reviewing to help students in Monash</Text>
                </View>

                <View style={styles.form}>
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

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <TextInput
                            style={styles.inputControl}
                            placeholder='********'
                            placeholderTextColor='#6b7280'
                            value={form.password}
                            onChangeText={password => setForm({...form, password})}
                        />
                    </View>

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
    }
})