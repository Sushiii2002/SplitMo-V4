import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PaypalSystem = ({
  payoutAmount,
  handlePayoutAmount,
  initiatePayoutProcess,
  isLoading,
  payoutStatus,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter payout amount"
        value={payoutAmount}
        onChangeText={handlePayoutAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.payoutButton, isLoading && styles.disabledButton]}
        onPress={initiatePayoutProcess}
        disabled={isLoading || !payoutAmount}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Feather name="dollar-sign" size={24} color="#fff" />
        )}
      </TouchableOpacity>
      {payoutStatus ? <Text style={styles.statusText}>{payoutStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  payoutButton: {
    backgroundColor: '#009cde',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaypalSystem;