import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Alert, Platform, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { PermissionsAndroid } from 'react-native';

const ContactsScreen = () => {
    const [numberSelected, setNumberSelected] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handlePress = (number) => {
        setNumberSelected(prevNumber => {
            const updatedNumber = prevNumber + number;
            console.log(updatedNumber);
            return updatedNumber.length <= 10 ? updatedNumber : updatedNumber.slice(0, 10);
        });
    };

    const handleInputChange = () => {
        setIsEditing(true);
        Keyboard.dismiss();
    };

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

        if (!/^\d{10}$/.test(numberSelected)) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
            return;
        }

        Linking.openURL(`tel:${numberSelected}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleInputChange}>
                <TextInput
                    style={styles.selectedNumber}
                    value={numberSelected}
                    editable={isEditing}
                />
            </TouchableOpacity>
            <View style={styles.numPad}>
                {/* Row 1 */}
                <View style={styles.numPadRow}>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('1')}>1</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('2')}>2</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('3')}>3</Button>
                </View>
                {/* Row 2 */}
                <View style={styles.numPadRow}>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('4')}>4</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('5')}>5</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('6')}>6</Button>
                </View>
                {/* Row 3 */}
                <View style={styles.numPadRow}>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('7')}>7</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('8')}>8</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('9')}>9</Button>
                </View>
                {/* Row 4 */}
                <View style={styles.numPadRow}>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('*')}>*</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('0')}>0</Button>
                    <Button mode="contained" style={styles.numButton} onPress={() => handlePress('#')}>#</Button>
                </View>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={triggerCall}>
                <Text style={styles.callButtonText}>CALL</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Light mode background color
        top: 150,
    },
    numPad: {
        marginBottom: 100,
    },
    numPadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    numButton: {
        width: 60,
        height: 50,
        margin: 9,
        borderRadius: 100,
        backgroundColor: '#adadad',
    },
    callButton: {
        backgroundColor: '#007BFF',
        borderRadius: 30,
        padding: 15,
        width: 70,
        alignItems: 'center',
        bottom: 100,
        height: 40,
    },
    callButtonText: {
        color: '#ffffff',
        fontSize: 10,
    },
    selectedNumber: {
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 2,
        width: 500,
    },
});

export default ContactsScreen;
