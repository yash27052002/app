import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Call from './Screens/Call';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName='Call' >

                <Stack.Screen component={Call} name="Call" />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default AppNavigator;
