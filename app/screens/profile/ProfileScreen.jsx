import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, SafeAreaView, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    firstName: 'Russel',
    lastName: 'Mendez',
    phoneNumber: '+1 (555) 123-4567',
    image: null,
  });
  const [isProfileImageEditable, setIsProfileImageEditable] = useState(false);
  const [isNameEditable, setIsNameEditable] = useState(false); // State to manage name editing visibility
  const [editableName, setEditableName] = useState(`${user.firstName} ${user.lastName}`);
  const [editableImage, setEditableImage] = useState(user.image);

  const handleNameChange = (text) => {
    setEditableName(text);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setEditableImage(result.uri);
    }
  };

  const toggleNameEditable = () => {
    setIsNameEditable(!isNameEditable);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Profile</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            {editableImage? (
              <Image source={{ uri: editableImage }} style={styles.profileImage} resizeMode="cover" />
            ) : (
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{`${editableName.charAt(0)}${user.lastName.charAt(0)}`}</Text>
              </View>
            )}
          </TouchableOpacity>
          {isNameEditable? (
          <TextInput
            style={styles.nameInput}
            value={editableName}
            onChangeText={handleNameChange}
            placeholder="Name"
            placeholderTextColor="#888"
            onBlur={() => setIsNameEditable(false)} // Hide input when it loses focus
          />
        ) : (
          <Text style={styles.name}>{editableName}</Text>
        )}
          <TouchableOpacity onPress={toggleNameEditable} style={styles.editIcon}>
            <Ionicons name="create-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <Text style={styles.navigationButtonText}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('HelpCenterScreen')}
          >
            <Text style={styles.navigationButtonText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('SettingsScreen')}
          >
            <Text style={styles.navigationButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('TermsAndConditionScreen')}
          >
            <Text style={styles.navigationButtonText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
   backgroundColor: "#E7B10A",
   width: 455,
   height: 100,
 },
 topBar: {
   width: '100%',
   marginTop: 40,
   marginLeft: 20,
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
   marginTop: 60,
   padding: 10,
   paddingHorizontal: 20,
   alignItems: 'center',
   justifyContent: 'center',
 },
 profileContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   marginVertical: 20,
 },
 profileImage: {
   width: 100,
   height: 100,
   borderRadius: 50,
 },
 profileAvatar: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: "#E7B10A",
   width: 100,
   height: 100,
   borderRadius: 50,
 },
 profileAvatarText: {
   fontSize: 36,
   fontWeight: 'bold',
   color: '#ffffff',
 },
 name: {
   fontSize: 20,
   fontWeight: 'bold',
   color: 'black',
   marginTop: 10,
 },
 navigationContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   marginVertical: 20,
 },
 navigationButton: {
   backgroundColor: "#E7B10A",
   borderColor: "#E7B10A",
   borderWidth: 2,
   borderRadius: 30,
   padding: 10,
   margin: 10,
   alignItems: 'center',
   justifyContent: 'center',
   width: 300,
   height: 50,
 },
 navigationButtonText: {
   fontSize: 16,
   color: '#ffffff',
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
 profileContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
},
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
profileAvatar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "#E7B10A",
  width: 100,
  height: 100,
  borderRadius: 50,
},
profileAvatarText: {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#ffffff',
},

nameInput: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  width: '80%',
},
editIcon: {
  position: 'absolute',
  right: -30,
  top: 112.5,
  padding: 0,
},
});


export default ProfileScreen;
