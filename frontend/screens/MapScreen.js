// screens/MapScreen.js
import React from 'react';
import { View, Button } from 'react-native';
import MapComponent from '../components/MapComponent';
import { styles } from '../styles/styles';
import { Image } from 'react-native';


const MapScreen = ({ navigation, filterCategory }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 20 }} // Adjusted height and width
      />
      <MapComponent filterCategory={filterCategory} />
      <View style={styles.buttonContainer}>
        <Button
          title="Report Incident"
          color="#f3e6df"
          onPress={() => navigation.navigate('ReportIncident')}
        />
        <Button
          title="Filter Menu"
          color="#f3e6df"
          onPress={() => navigation.navigate('Filter')}
        />
        <Button
          title="Contact Police"
          color="#f3e6df"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default MapScreen;
