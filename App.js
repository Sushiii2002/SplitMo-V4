import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { 
  StyleSheet, Text, View, Platform, 
  StatusBar, Image, TouchableOpacity, 
  TouchableHighlight,  TouchableWithoutFeedback, 
  SafeAreaView, Button, Alert, Dimensions,
  ImageBackground, AppRegistry } from 'react-native';

import { initializeApp } from '@firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from '@firebase/auth';


import WelcomeScreen from './app/screens/auth/WelcomeScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import SignUpScreen from './app/screens/auth/SignUpScreen';
import DashboardScreen from './app/screens/dashboard/DashboardScreen';
import ContactList from './app/screens/dashboard/SplitMoney';
import RequestFunds from './app/screens/dashboard/RequestFunds';





const firebaseConfig = {
    apiKey: "AIzaSyDpwBkY_bWiSa-FEoU_dma2112aWTUjZQ8",
    authDomain: "splitmo-master.firebaseapp.com",
    projectId: "splitmo-master",
    storageBucket: "splitmo-master.appspot.com",
    messagingSenderId: "693803101370",
    appId: "1:693803101370:web:6f94787776dc06521e6683",
    measurementId: "G-HBSTVWNBLL"
  };

const app = initializeApp(firebaseConfig);


const Stack = createStackNavigator();

export default function App() {
    return (
        // <NavigationContainer>
        //     <SplitMoneyScreen/>
        // </NavigationContainer>



        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>                
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ContactList" component={ContactList} options={{headerShown: false}}/>
                <Stack.Screen name="RequestFunds" component={RequestFunds} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>



    );
}



    