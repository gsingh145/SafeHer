// screens/ReportIncidentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

const ReportIncidentScreen = () => {
  const [category, setCategory] = useState('Select Category');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Report Incident</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="Select Category" />
          <Picker.Item label="Safety" value="Safety" />
          <Picker.Item label="Health" value="Health" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <View style={[styles.submitButtonContainer, styles.button]}>
        <Button title="Submit" onPress={() => { /* Handle submit */ }} />
      </View>
    </View>
  );
};

export default ReportIncidentScreen;
