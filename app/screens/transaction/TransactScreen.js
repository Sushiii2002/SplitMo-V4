import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity, 
  Image,
  Permissions,
  Contacts,
} from 'react-native';

const SplitMoney = () => {
  const [amount, setAmount] = useState('');
  const [contacts, setContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const getContactPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        setHasPermission(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.ImageUri],
        });
        setContacts(data);
      } else {
        setHasPermission(false);
      }
    };
    getContactPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount to split..."
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {hasPermission ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contactItem}>
              {item.imageAvailable ? (
                <Image source={{ uri: item.imageUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar} />
              )}
              <View style={styles.contactInfo}>
                <Text style={styles.name}>{item.name}</Text>
                {item.phoneNumbers?.map((phone) => (
                  <Text key={phone.id} style={styles.phone}>
                    {phone.number}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.permissionText}>
          Please grant permission to access your contacts.
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingHorizontal: 24,
  },

  inputContainer: {
    marginBottom: 16,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 16, 
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },

    backgroundColor: '#0000',
    borderRadius: 8,
    paddingHorizontal: 16,  
    avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: '#0000',
    fontSize: 18,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactInfo: {
    flex: 1,
  },

  name: {
    fontVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fffSize: 16',
    fontWeight: 'bold',
  },

  phone: {
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    color: '#666',
  },    

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,  
  },

  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },

});

export default SplitMoney;