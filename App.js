import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import {
 StyleSheet, Text, View, Platform,
 StatusBar, Image, TouchableOpacity,
 TouchableHighlight,  TouchableWithoutFeedback,
 SafeAreaView, Button, Alert, Dimensions,
 ImageBackground, AppRegistry } from 'react-native';


 import { initializeApp } from 'firebase/app';
 import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
 import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,
 signOut
} from '@firebase/auth';




import WelcomeScreen from './app/screens/auth/WelcomeScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import SignUpScreen from './app/screens/auth/SignUpScreen';
import DashboardScreen from './app/screens/dashboard/DashboardScreen';
import ContactList from './app/screens/paypal/oldcontactlist';
import RequestFunds from './app/screens/dashboard/RequestFunds';
import SettingsScreen from './app/screens/settings/SettingsScreen';
import ProfileScreen from './app/screens/profile/ProfileScreen';
import ForgotPasswordScreen from './app/screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from './app/screens/settings/ResetPasswordScreen';
import HelpCenterScreen from './app/screens/settings/HelpCenterScreen';
import FAQScreen from './app/screens/settings/FAQScreen';
import GetInTouchScreen from './app/screens/settings/GetInTouchScreen';
import TermsAndConditionScreen from './app/screens/profile/TermsAndConditionScreen';
import SettingsNotification from './app/screens/settings/SettingsNotifications';
import AccountRecoveryScreen from './app/screens/settings/AccountRecoveryScreen';
import GetProfile from './app/screens/auth/GetProfile';
import PayoutScreen from './app/screens/paypal/PayoutScreen';










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

    <NavigationContainer>
        <ContactList />
    </NavigationContainer>





      //  <NavigationContainer>
      //      <Stack.Navigator>
      //          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
      //          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}}/>                
      //          <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="ContactList" component={ContactList} options={{headerShown: false}}/>
      //          <Stack.Screen name="RequestFunds" component={RequestFunds} options={{headerShown: false}}/>
      //          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}}/> 
      //          <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="FAQScreen" component={FAQScreen} options={{headerShown: false}}/>  
      //          <Stack.Screen name="GetInTouchScreen" component={GetInTouchScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} options={{headerShown: false}}/>
      //          <Stack.Screen name="SettingsNotification" component={SettingsNotification} options={{headerShown: false}}/>
      //          <Stack.Screen name="AccountRecoveryScreen" component={AccountRecoveryScreen} options={{headerShown: false}}/>       
      //      </Stack.Navigator>
      //  </NavigationContainer>

   );
}
