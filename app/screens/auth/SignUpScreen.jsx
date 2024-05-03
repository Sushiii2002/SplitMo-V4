import { View, Modal, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import TermsAndConditionsContent from './TermsAndConditionsContent';


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,
 signOut
} from 'firebase/auth';




const SignUpScreen = ({ navigation }) => {
   const [isPasswordShown, setIsPasswordShown] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [name, setName] = useState('');
       const [phone, setPhone] = useState('');
      


       const onSignUp = async () => {
           try {
             const auth = getAuth();
             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
             const user = userCredential.user;
        
             const db = getFirestore();
             await addDoc(collection(db, 'users'), {
               name: name,
               email: email,
               phone: phone,
               uid: user.uid,
             });
        
             // Reset the form fields
             setName('');
             setEmail('');
             setPhone('');
             setPassword('');
        
             // Navigate to the Dashboard screen
             navigation.navigate('GetProfile');
           } catch (error) {
             console.error('Error signing up:', error);
             // Handle the error, e.g., display an error message to the user
             Alert.alert('Sign Up Error', 'Invalid email or password. Please try again.');
           }
         };








   return (
       <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
           <View style={{ flex: 1, marginHorizontal: 22 }}>
               <View style={{ marginVertical: 22 }}>
                   <Text style={{
                       fontSize: 22,
                       fontWeight: 'bold',
                       marginVertical: 12,
                       color: COLORS.black,
                       alignSelf: 'center',
                   }}>
                       Create Account
                   </Text>


                   <Text style={{
                       fontSize: 16,
                       color: COLORS.black,
                       alignSelf: 'center',
                   }}>Connect with your friend today and split your Money!</Text>
               </View>


               <View style={{ marginBottom: 12 }}>
                   <Text style={{
                       fontSize: 16,
                       fontWeight: 600,
                       marginVertical: 8
                   }}>Email address *</Text>


                   <View style={{
                       width: "100%",
                       height: 48,
                       borderColor: COLORS.black,
                       borderWidth: 1,
                       borderRadius: 8,
                       alignItems: "center",
                       justifyContent: "center",
                       paddingLeft: 22
                   }}>
                       <TextInput
                       placeholder="Enter your email address"
                       placeholderTextColor={COLORS.black}
                       keyboardType="email-address"
                       value={email}
                       onChangeText={setEmail}
                       style={{
                           width: "100%",
                       }}
                       />
                   </View>
               </View>


               <View style={{ marginBottom: 12 }}>
                   <Text style={{
                       fontSize: 16,
                       fontWeight: 600,
                       marginVertical: 8
                   }}>Mobile Number</Text>


                   <View style={{
                       width: "100%",
                       height: 48,
                       borderColor: COLORS.black,
                       borderWidth: 1,
                       borderRadius: 8,
                       alignItems: "center",
                       flexDirection: "row",
                       justifyContent: "space-between",
                       paddingLeft: 22
                   }}>
                           <TextInput
                           placeholder="Enter your phone number"
                           placeholderTextColor={COLORS.black}
                           keyboardType="numeric"
                           value={phone}
                           onChangeText={setPhone}
                           style={{
                               width: "100%",
                           }}
                           />




                   </View>
               </View>


               <View style={{ marginBottom: 12 }}>
                   <Text style={{
                       fontSize: 16,
                       fontWeight: 600,
                       marginVertical: 8
                   }}>Password *</Text>


                   <View style={{
                       width: "100%",
                       height: 48,
                       borderColor: COLORS.black,
                       borderWidth: 1,
                       borderRadius: 8,
                       alignItems: "center",
                       justifyContent: "center",
                       paddingLeft: 22
                   }}>
                           <TextInput
                           placeholder="Enter your password"
                           placeholderTextColor={COLORS.black}
                           secureTextEntry={!isPasswordShown}
                           value={password}
                           onChangeText={setPassword}
                           style={{
                               width: "100%",
                           }}
                           />


                       <TouchableOpacity
                           onPress={() => setIsPasswordShown(!isPasswordShown)}
                           style={{
                               position: "absolute",
                               right: 12
                           }}
                       >
                           {
                               isPasswordShown == false ? (
                                   <Ionicons name="eye-off" size={24} color={COLORS.black} />
                               ) : (
                                   <Ionicons name="eye" size={24} color={COLORS.black} />
                               )
                           }


                       </TouchableOpacity>
                   </View>
               </View>


               <View style={{
                   flexDirection: 'row',
                   marginVertical: 6
               }}>
                   <Checkbox
                       style={{ marginRight: 8 }}
                       value={isChecked}
                       onValueChange={setIsChecked}
                       color={isChecked ? "#E7B10A" : undefined}
                   />


                   <Text>I agree to the </Text>
                   <Pressable onPress={() => setModalVisible(true)}>
                   <Text style={{
                   color: '#3670d4',
                   textDecorationLine: 'underline',
                   }}>Terms and Conditions</Text>
                       </Pressable>
                       <Modal
                           animationType="slide"
                           transparent={true}
                           visible={modalVisible}
                           onRequestClose={() => {
                           setModalVisible(!modalVisible);
                           }}
                       >
                           <View style={{
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                           backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
                           }}>
                           <TermsAndConditionsContent onClose={() => setModalVisible(false)} />
                           </View>
                       </Modal>
               </View>


               <TouchableOpacity
                   onPress={onSignUp}
                   style={{
                       backgroundColor: isChecked ? "#E7B10A" : COLORS.grey, // Change button color based on checkbox state
                       alignItems: 'center',
                       justifyContent: 'center',
                       height: 50,
                       borderRadius: 10,
                       marginVertical: 10,
                   }}
                   disabled={!isChecked}
               >
                   <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>Sign Up</Text>
               </TouchableOpacity>


               <View style={{
                   flexDirection: "row",
                   justifyContent: "center",
                   marginVertical: 22
               }}>
                   <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                   <Pressable
                       onPress={() => navigation.navigate("LoginScreen")}
                   >
                       <Text style={{
                           fontSize: 16,
                           color: "#E7B10A",
                           fontWeight: "bold",
                           marginLeft: 6
                       }}>Login</Text>
                   </Pressable>
               </View>
           </View>
       </SafeAreaView>
   )
}




export default SignUpScreen;
