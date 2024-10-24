import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function NearbyStoresScreen() {
  const [location, setLocation] = useState(null);
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Henter brugerens placering
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Tilladelse til at tilgå placering blev nægtet');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Henter supermarkeder fra Overpass API baseret på placering indenfor 1000 meter
  useEffect(() => {
    if (location) {
      const fetchSupermarkets = async () => {
        try {
          const query = `
            [out:json];
            node["shop"="supermarket"](around:1000, ${location.coords.latitude}, ${location.coords.longitude});
            out;
          `;
          const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
          setSupermarkets(response.data.elements);
        } catch (error) {
          console.error("Error fetching supermarkets:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSupermarkets();
    }
  }, [location]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Indlæser din placering...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* placering som en blå cirkel uden tekst */}
      <Circle
        center={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        radius={20} // Radius i meter
        strokeColor="rgba(0, 0, 255, 0.8)" // Blå farve for cirklens kant
        fillColor="rgba(0, 0, 255, 0.3)" // Blå farve for cirklens fyld
      />


      {/* Supermarkeder med navne som tekst med hvid baggrund */}
      {supermarkets.map((supermarket, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: supermarket.lat,
            longitude: supermarket.lon,
          }}
          title={supermarket.tags.name || 'Supermarked'}
          description={supermarket.tags.shop || 'Supermarked i nærheden'}
        >
          <View style={styles.storeContainer}>
            <Text style={styles.storeName}>
              {supermarket.tags.name || 'Supermarked'}
            </Text>
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  storeContainer: {
    backgroundColor: 'white', // Hvid baggrund
    padding: 5, // Lidt padding
    borderRadius: 5, // Rundede hjørner
  },
  storeName: {
    color: 'black',
    fontWeight: 'light',
    textAlign: 'center',
  },
});
