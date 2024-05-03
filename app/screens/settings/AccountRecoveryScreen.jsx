import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import ResetPasswordScreen from './ResetPasswordScreen';
import HelpCenterScreen from './HelpCenterScreen';
import SettingsNotification from './SettingsNotifications';

const AccountRecoveryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Account Recovery</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Recovery Security Questions</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(ResetPasswordScreen)}>
          <Ionicons name="lock-closed-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Set Security Questions</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Account Recovery Email</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate()}>
          <Ionicons name="mail-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Update Recovery Email</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Two-Factor Authentication</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate()}>
          <Ionicons name="shield-half-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Enable/Disable 2FA</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Account Deactivation/Deletion</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate()}>
          <Ionicons name="trash-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Deactivate/Delete Account</Text>
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

export default AccountRecoveryScreen;
