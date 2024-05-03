import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Ensure this import correctly points to your Firestore initialization

const SecurityQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      // Replace 'userId' with the actual user ID for which you want to fetch security questions
      const snapshot = await firestore.collection('users').doc('userId').get();
      if (snapshot.exists) {
        // Assuming each user document has a 'securityQuestions' field that is an array of question-answer pairs
        const securityQuestions = snapshot.data().securityQuestions;
        if (securityQuestions) {
          setQuestions(securityQuestions);
        }
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default SecurityQuestions;











const handleSecurityQuestions = () => {
    const db = getDatabase();
    set(ref(db, 'users/' + currentUser.uid + '/securityQuestions'), {
      motherMaidenName: motherMaidenName,
      firstPetName: firstPetName,
    }).then(() => {
      Alert.alert('Security questions answered successfully');
    }).catch((error) => {
      Alert.alert('Error answering security questions', error.message);
    });
  };


  <View style={styles.securityQuestionsHeader}>
  <Text style={styles.securityQuestionsTitle}>Security Questions</Text>
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Mother's Maiden Name</Text>
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder="Enter your mother's maiden name"
      placeholderTextColor={COLORS.black}
      value={motherMaidenName}
      onChangeText={setMotherMaidenName}
      style={styles.input}
    />
  </View>
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>First Pet's Name</Text>
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder="Enter your first pet's name"
      placeholderTextColor={COLORS.black}
      value={firstPetName}
      onChangeText={setFirstPetName}
      style={styles.input}
    />
  </View>
</View>






<Button
title="Answer Security Questions"
onPress={handleSecurityQuestions}
filled
style={styles.button}
/>