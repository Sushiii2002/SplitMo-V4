import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../../constants/colors'; // Ensure you have a COLORS file with your color definitions
import Button from '../../components/Button'; // Ensure you have a Button component

const GetProfile = ( navigation ) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfilePicture = async () => {
    const { status } = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    } else {
      Alert.alert("Permission Denied", "You need to allow storage access to upload a profile picture.");
    }
  };

  const handleSubmit = () => {
    const db = getDatabase();
    set(ref(db, 'users/' + currentUser.uid), {
      username: username,
      mobileNumber: mobileNumber,
      profilePicture: profilePicture? profilePicture : require('../../assets/userProfile.png'),
    }).then(() => {
      Alert.alert('Profile updated successfully');
    }).catch((error) => {
      Alert.alert('Error updating profile', error.message);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Update Profile</Text>
          <Text style={styles.subtitle}>Enter your new details</Text>
        </View>

        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={handleProfilePicture} style={styles.profileImageContainer}>
            {profilePicture? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
                <Image source={require('../../assets/userProfile.png')} style={styles.profileImage} />
            )}
            </TouchableOpacity>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your new username"
              placeholderTextColor={COLORS.black}
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your new mobile number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              style={styles.input}
            />
          </View>
        </View>

        <Button
          title="Update Profile"
          onPress={handleSubmit}
          filled
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    marginHorizontal: 22,
  },
  titleContainer: {
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputWrapper: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  securityQuestionsHeader: {
    marginVertical: 22,
    alignItems: 'center',
  },
  securityQuestionsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderColor: 'gray', 
    borderWidth: 1.5, 
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  
});

export default GetProfile;
