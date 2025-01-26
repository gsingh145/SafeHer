import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
          <Picker.Item label="Violence" value="Violence" />
          <Picker.Item label="Raised Voices" value="Raised Voices" />
          <Picker.Item label="Suspicious Activity" value="Suspicious Activity" />
          <Picker.Item label="Theft" value="Theft" />
          <Picker.Item label="Harassment" value="Harassment" />
          <Picker.Item label="Stalking" value="Stalking" />
        </Picker>
      </View>

      <View style={styles.submitButtonContainer}>
      <TouchableOpacity style={styles.button} onPress={applyFilter}>
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;
