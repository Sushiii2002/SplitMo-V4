import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '../../constants/colors';




const DashboardScreen = ({ navigation }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
  
    return (
      <View style={styles.container}>
        
        <View style={styles.headerContainer} >
          <View style={styles.topBar}>
            <Text style={styles.heading}>Dashboard</Text>
            <TouchableOpacity onPress={toggleDropdown}>
              <Ionicons name="menu" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.balance}>Current balance: $1000</Text>
          <View style={styles.buttonsContainer}>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactList')}>
            <Image source={require('../../assets/Vector.png')} style={{width: 80, height: 60, marginBottom: 15}} />
              <Text style={styles.buttonText} >Split Money</Text>
            </TouchableOpacity>
  
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RequestFunds')}>
            <Image source={require('../../assets/requestfunds.png')} style={{width: 90, height: 80}} />
              <Text style={styles.buttonText}>Request Funds</Text>
            </TouchableOpacity>
              
            <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/Settings.png')} style={{width: 80, height: 80}} />
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/helpsettings.png')} style={{width: 70, height: 80}} />
              <Text style={styles.buttonText}>Help Center</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isDropdownVisible} animationType="slide">
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Option 3</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#E7B10A',
    width: 460,
    height: 100,
  },
  topBar: {
    width: '100%',
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E7B10A',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  buttonIcon: {
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: 5,
  },

  buttonIconImage: {
    width: 80,
    height: 60,
    marginBottom: 5,  
  },

  buttonText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default DashboardScreen;