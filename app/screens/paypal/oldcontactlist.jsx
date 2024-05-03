import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, Image, SafeAreaView, Pressable, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Feather } from '@expo/vector-icons';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.Image],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleContactPress = (contact) => {
    if (isMultiSelectMode) {
      handleContactSelection(contact);
    } else {
      setSelectedContact(contact);
      setShowModal(true);
    }
  };

  const handleContactSelection = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleLongPress = (contact) => {
    setIsMultiSelectMode(true);
    handleContactSelection(contact);
  };

  const handleMenuPress = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts);
    }
  };

  const handleExitMultiSelect = () => {
    setIsMultiSelectMode(false);
    setSelectedContacts([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleContactPress(item)}
        onLongPress={() => handleLongPress(item)}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.cardImg} />
        ) : (
          <View style={styles.cardAvatar}>
            <Text style={styles.cardAvatarText}>{`${item.firstName.charAt(0)}${item.lastName.charAt(0)}`}</Text>
          </View>
        )}
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, selectedContacts.includes(item) && styles.selectedContact]}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={[styles.cardPhone, selectedContacts.includes(item) && styles.selectedContact]}>{item.phoneNumbers?.length > 0 ? item.phoneNumbers[0].number : ''}</Text>
        </View>
        {isMultiSelectMode && (
          <Pressable style={styles.cardAction} onPress={() => handleContactSelection(item)}>
            <Feather name={selectedContacts.includes(item) ? 'check-square' : 'square'} size={24} color="#9ca3af" />
          </Pressable>
        )}
        {!isMultiSelectMode && (
          <Pressable style={styles.cardAction} onPress={() => handleMenuPress(item)}>
            <Feather name="more-vertical" size={24} color="#9ca3af" />
          </Pressable>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: '#E7B10A' }}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#aaa"
          />
          {isMultiSelectMode && (
            <TouchableOpacity onPress={handleSelectAll} style={styles.selectAllButton}>
              <Text style={styles.selectAllButtonText}>
                {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          )}
          {isMultiSelectMode && (
            <TouchableOpacity onPress={handleExitMultiSelect} style={styles.exitButton}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contactList}
        showsVerticalScrollIndicator={false}
      />
      {selectedContact && (
        <Modal visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {`${selectedContact.firstName} ${selectedContact.lastName}`}
                </Text>
                <Pressable onPress={() => setShowModal(false)}>
                  <Feather name="x" size={24} color="#9ca3af" />
                </Pressable>
              </View>
              <View style={styles.payPalButton}>
                <Text style={styles.payPalButtonText}>Pay with PayPal</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E7B10A',
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectAllButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  selectAllButtonText: {
    fontSize: 16,
    color: '#333',
  },
  exitButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 16,
  },
  contactList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  card: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 2,
  },
  cardAction: {
    paddingRight: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  payPalButton: {
    backgroundColor: '#ffc439',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payPalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ContactList;