// components/MapComponent.js
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../styles/styles';
import { GO_IP } from '../config'; // Import the IP address from config.js

const MapComponent = ({ filterCategory }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const category = filterCategory === 'All' ? null : filterCategory; 
        const url = category 
          ? `http://${GO_IP}/incidents/filter?category=${filterCategory}`
          : `http://${GO_IP}/incidents`;
        const response = await fetch(url);
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers(); // Initial fetch

    const intervalId = setInterval(fetchMarkers, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [filterCategory]); // Refetch whenever filterCategory changes

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 40.4250,
        longitude: -86.9230,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035,
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

export default MapComponent;
