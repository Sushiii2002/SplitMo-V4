import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import ResetPasswordScreen from './ResetPasswordScreen';
import HelpCenterScreen from './HelpCenterScreen';
import SettingsNotification from './SettingsNotifications';
import AccountRecoveryScreen from './AccountRecoveryScreen';


const SettingsScreen = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <View style={styles.headerContainer}>
       <Text style={styles.headerText}>Settings</Text>
     </View>


     <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeaderText}>Security</Text>
      <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(ResetPasswordScreen)}>
        <Ionicons name="lock-closed-outline" size={24} color={"#E7B10A"} />
        <Text style={styles.settingText}>Change Password</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(AccountRecoveryScreen)}>
        <Ionicons name="shield-checkmark-outline" size={24} color={"#E7B10A"} />
        <Text style={styles.settingText}>Account Secure</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(HelpCenterScreen)}>
        <Ionicons name="help-circle-outline" size={24} color={"#E7B10A"} />
        <Text style={styles.settingText}>Help Center</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
      </TouchableOpacity>
    </View>


    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeaderText}>Reminders</Text>
      <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate()}>
        <Ionicons name="notifications-outline" size={24} color={"#E7B10A"} />
        <Text style={styles.settingText}>Set Reminder for Transfers</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
      </TouchableOpacity>
      {/* Add more TouchableOpacity components here for other reminders */}
    </View>


    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeaderText}>Notifications</Text>
      <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(SettingsNotification)}>
        <Ionicons name="notifications-off-outline" size={24} color={"#E7B10A"} />
        <Text style={styles.settingText}>Enable/Disable Notifications</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
      </TouchableOpacity>
    </View>
   </View>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#FFFFFF',


 },
 headerContainer: {
   marginBottom: 10,
   backgroundColor: "#E7B10A",
   width: 455,
   height: 100,
   padding: 10,
   paddingHorizontal: 20,
 },
 headerText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginTop: 40,

 },
 sectionContainer: {
   marginVertical: 10,
       paddingHorizontal: 20,
 },
 sectionHeaderText: {
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 10,
       paddingHorizontal: 5,
 },
 settingButton: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingVertical: 10,
   borderBottomWidth: 1,
   borderBottomColor: 'lightgray',
       paddingHorizontal: 5,
 },
 settingText: {
   flex: 1,
   marginLeft: 10,
   fontSize: 16,
   color: "black",
 },
});


export default SettingsScreen;