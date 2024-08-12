import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { NativeModules } from 'react-native';

const App = () => {
    const [inputValue, setInputValue] = useState('');

    const { MyCallModule } = NativeModules;

    const requestCallPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    {
                        title: 'Phone Call Permission',
                        message: 'This app needs access to make phone calls.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            // For iOS, handle permissions differently if necessary
            return true;
        }
    };

    const triggerCall = async () => {
        const hasPermission = await requestCallPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'You need to grant phone call permission to use this feature.');
            return;
        }

        if (!/^\d{10}$/.test(inputValue)) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
            return;
        }

        MyCallModule.makeCall(inputValue);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>Make a Phone Call</Text>
                <TextInput
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder='Enter phone number'
                    keyboardType='numeric'
                    style={styles.textInput}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonStyle}
                    onPress={triggerCall}
                >
                    <Text style={styles.buttonTextStyle}>Make a Call</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonStyle: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#8ad24e',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default App;
