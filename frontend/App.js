import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications'; // Import Expo Notifications
import { listenForNewEntries } from './firebase/firebaseSetup'; // Import Firebase-related functions

import MapScreen from './screens/MapScreen';
import FilterScreen from './screens/FilterScreen';
import ReportIncidentScreen from './screens/ReportIncidentScreen';
import { styles } from './styles/styles';
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();
const streets = [
  {
    name: 'State Street',
    latRange: [40.423705, 40.426000],
    lngRange: [-86.921200, -86.917000],
  },
  {
    name: 'University Street',
    latRange: [40.425000, 40.428000],
    lngRange: [-86.923500, -86.920000],
  },
  {
    name: 'Grant Street',
    latRange: [40.422000, 40.424500],
    lngRange: [-86.913000, -86.910000],
  },
  // Add more streets as needed
];

// Function to find the street name based on latitude and longitude
const getStreetName = (latitude, longitude) => {
  for (const street of streets) {
    const [latMin, latMax] = street.latRange;
    const [lngMin, lngMax] = street.lngRange;

    if (
      latitude >= latMin &&
      latitude <= latMax &&
      longitude >= lngMin &&
      longitude <= lngMax
    ) {
      return street.name;
    }
  }
  return 'Unknown Street';
};


const App = () => {
  const [filterCategory, setFilterCategory] = useState(null); // State managed here

  // Function to request notification permissions and get the FCM token
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to receive notifications was denied');
      return;
    }
  };

  // Listen for new incidents in the Firebase Realtime Database
  // Listen for new incidents in the Firebase Realtime Database
  useEffect(() => {
    let isInitialLoad = true; // Track if it's the initial load of the data
    requestNotificationPermissions();

    const handleNewEntry = (data) => {
      const { latitude, longitude } = data;

      const streetName = getStreetName(latitude, longitude);

      Alert.alert("New Incident Reported", `Location: WALC`);
    };

    const unsubscribe = listenForNewEntries("incidents", (data) => {
      if (isInitialLoad) return; // Skip alerts during the initial load
      handleNewEntry(data); // Process the new data
    });

    const timeout = setTimeout(() => {
      isInitialLoad = false;
    }, 2000); // Adjust timeout to fit the expected initial load time

    return () => {
      clearTimeout(timeout); // Cleanup timeout
      unsubscribe(); // Cleanup Firebase listener
    };
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map" screenOptions={styles.headerStyle}>
        <Stack.Screen name="Map">
          {(props) => <MapScreen {...props} filterCategory={filterCategory} />}
        </Stack.Screen>
        <Stack.Screen name="Filter" screenOptions={styles.headerStyle}>
          {(props) => (
            <FilterScreen
              {...props}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ReportIncident" screenOptions={styles.headerStyle} component={ReportIncidentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
