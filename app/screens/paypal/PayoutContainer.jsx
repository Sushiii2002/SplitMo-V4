import React, { useState } from 'react';
import PayoutScreen from './PayoutScreen';
import PaypalSystem from './PayPalSystem';

const PayoutContainer = () => {
  const [payoutAmount, setPayoutAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handlePayoutAmount = (text) => {
    setPayoutAmount(text);
  };

  const initiatePayoutProcess = async () => {
    setIsLoading(true);
    setPayoutStatus('');

    try {
      // Make a POST request to your server-side /payout route
      const response = await fetch('http://localhost:3000/payout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmails: selectedRecipients.map((recipient) => recipient.email),
          amounts: selectedRecipients.map(() => payoutAmount),
          currency: 'USD',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPayoutStatus('Payout initiated successfully');
      } else {
        setPayoutStatus('Error initiating payout');
      }
    } catch (error) {
      console.error('Error initiating payout:', error);
      setPayoutStatus('Error initiating payout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipients = (recipients) => {
    setSelectedRecipients(recipients);
  };

  return (
    <>
      <PayoutScreen
        selectedRecipients={selectedRecipients}
        onSelectRecipients={handleSelectRecipients}
      />
      <PaypalSystem
        payoutAmount={payoutAmount}
        handlePayoutAmount={handlePayoutAmount}
        initiatePayoutProcess={initiatePayoutProcess}
        isLoading={isLoading}
        payoutStatus={payoutStatus}
      />
    </>
  );
};

export default PayoutContainer;