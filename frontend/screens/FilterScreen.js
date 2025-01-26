import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles'; // Import the shared stylesheet

const FilterScreen = ({ navigation, setFilterCategory }) => {
  const [category, setCategory] = useState('All');

  const applyFilter = () => {
    setFilterCategory(category); // Update the filter
    navigation.goBack(); // Navigate back to MapScreen
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Filter Incidents by Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Harassment" value="Harassment" />
          <Picker.Item label="Abuse" value="Abuse" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={[styles.submitButtonContainer, styles.button]}>
        <Button title="Apply Filter" onPress={applyFilter} color="#2196F3" />
      </View>
    </View>
  );
};

export default FilterScreen;
