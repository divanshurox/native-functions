import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route }) => {
  const [readOnly, isRead] = useState(false);
  const [selectedLoc, setLoc] = useState();

  useEffect(() => {
    if (route.params) {
      isRead(route.params.readOnly);
      setLoc(route.params.initLoc);
    }
  }, [route.params?.initLoc, route.params?.readOnly]);

  console.log(route);
  const region = {
    latitude: 29.0007912,
    longitude: 79.3914206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const labelHandler = (event) => {
    if (readOnly) {
      return;
    }
    setLoc({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const locSaveHandler = () => {
    if (selectedLoc) {
      navigation.navigate("NewPlace", {
        location: selectedLoc,
      });
    } else {
      Alert.alert("No Location", "Please pick a location to save", [
        { text: "OK" },
      ]);
    }
  };

  let markerCoord;
  if (selectedLoc) {
    markerCoord = {
      latitude: selectedLoc.lat,
      longitude: selectedLoc.lng,
    };
  }

  if (!readOnly) {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={locSaveHandler} style={styles.btnContainer}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }

  return (
    <MapView style={styles.mapView} onPress={labelHandler} region={region}>
      {markerCoord && (
        <Marker title="Picked Location" coordinate={markerCoord}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  btnText: {
    fontSize: 18,
    color: "white",
  },
  btnContainer: {
    marginRight: 15,
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 5,
  },
});
