import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import MapPreview from "../components/MapPreview";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationPicker = ({ onLocationPicked, navigation, locate }) => {
  const [location, setLocation] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (locate) {
      setLocation(locate);
      onLocationPicked(locate);
    }
  }, [locate, onLocationPicked]);

  const permissionHandler = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "Sorry, you need to verify the permissions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const locationHandler = async () => {
    const granted = await permissionHandler();
    if (!granted) {
      return;
    }
    try {
      setLoad(true);
      let loc = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
      onLocationPicked({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location",
        "PLease check your internet connection",
        [{ text: "OK" }]
      );
    }
    setLoad(false);
  };

  return (
    <View style={styles.screen}>
      <MapPreview
        onPress={() => navigation.navigate("Map")}
        style={styles.mapPreview}
        location={location}
      >
        {load ? (
          <ActivityIndicator color="dodgerblue" size="large" />
        ) : (
          <Text>No Location Choosed</Text>
        )}
      </MapPreview>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Button
          title="Get Location"
          onPress={locationHandler}
          color="dodgerblue"
        />
        <Button
          title="Magnify"
          onPress={() => navigation.navigate("Map")}
          color="dodgerblue"
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPreview: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
