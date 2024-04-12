import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { PayPalButton } from "react-native-paypal";

const SplitMoneyScreen = ({ contacts }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [amount, setAmount] = useState(0);

  const handleContactSelection = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleSplitPayment = async () => {
    try {
      // Split the amount among the selected contacts
      const splitAmount = amount / selectedContacts.length;
      for (const contact of selectedContacts) {
        await PayPalButton.paymentRequest({
          clientId: 'EHDHYxauk8RSdwQyPW3EW3WNH2-2PmDX4JgjeUNcB054PynETihflulIpGKlg3L6d0aEerEKvPE_SMPf',
          email: contact.email,
          amount: splitAmount.toFixed(2),
          currency: 'USD',
        });
        // Handle the payment response and update the UI accordingly
      }
    } catch (error) {
      console.error('Error processing split payment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.contactItem,
              selectedContacts.includes(item) && styles.selectedContact,
            ]}
            onPress={() => handleContactSelection(item)}
          >
            <Text style={styles.contactName}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.contactEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.amountInput}
        keyboardType="numeric"
        placeholder="Amount to split"
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text))}
      />
      <PayPalButton
        style={styles.splitButton}
        amount={amount.toFixed(2)}
        currency="USD"
        onSuccess={(details) => {
          console.log('Payment successful:', details);
          handleSplitPayment();
        }}
        onError={(error) => {
          console.error('Payment error:', error);
        }}
      >
        <Text style={styles.splitButtonText}>Split Payment</Text>
      </PayPalButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    marginVertical: 8,
  },
  selectedContact: {
    backgroundColor: '#f1f5f9',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  contactEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616d79',
  },
  amountInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginVertical: 16,
  },
  splitButton: {
    backgroundColor: '#E7B10A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  splitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SplitMoneyScreen;