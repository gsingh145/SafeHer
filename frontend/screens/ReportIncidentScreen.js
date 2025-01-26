import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Platform, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';
import { GO_IP } from '../config.js';

const ReportIncidentScreen = () => {
  const [category, setCategory] = useState('Select Category');
  const [description, setDescription] = useState('');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    };

    requestLocationPermission();
  }, []);

  const getLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    } catch (error) {
      console.log('Error getting location:', error);
      requestLocationPermission();
    }
  };

  const handleSubmitCategory = () => {
    if (category !== 'Select Category') {
      setIsDescriptionVisible(true); // Show the description input
      getLocation(); // Get the user's location
    }
  };

  const handleDescriptionSubmit = async () => {
    if (location.latitude === null || location.longitude === null) {
      Alert.alert('Error', 'Location not available. Please try again.');
      return;
    }

    const incidentData = {
      "Category": category,
      "Description": description,
      "Latitude": location.latitude,
      "Longitude": location.longitude,
    };

    try {
      const url = `http://${GO_IP}/incidents`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      });

      if (response.ok) {
        // If the request is successful, handle the response (e.g., reset form, show a success message)
        console.log('Incident reported successfully');
        setCategory('Select Category');
        setDescription('');
        setIsDescriptionVisible(false);
      } else {
        // If the request fails, handle the error
        const errorData = await response.json();
        console.log('Error reporting incident:', errorData);
        Alert.alert('Error', `Error reporting incident: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', `Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Conditional rendering for category picker */}
      {!isDescriptionVisible && (
        <>
          <Text style={[styles.text, styles.title]}>Select Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategory(itemValue)}
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
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitCategory}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Conditional rendering for description input */}
      {isDescriptionVisible && (
        <View style={styles.inputContainer}>
          <Text style={[styles.text, styles.title]}>Enter Description for {category}</Text>
          <TextInput
            style={[styles.textInput]}
            placeholder="Enter a description"
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleDescriptionSubmit}
          >
            <Text style={styles.buttonText}>Submit Description</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReportIncidentScreen;
