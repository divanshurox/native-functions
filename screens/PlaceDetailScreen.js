import React from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import MapPreview from "../components/MapPreview";

const PlaceDetailScreen = ({ navigation, route }) => {
  const { title, image, address, lat, lng } = route.params.data;
  navigation.setOptions({
    title: title,
  });
  const mapClick = () => {
    navigation.navigate("Map", {
      readOnly: true,
      initLoc: {
        lat: lat,
        lng: lng,
      },
    });
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: image }} style={styles.img} />
      <View style={styles.locCont}>
        <View style={styles.addressCont}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          onPress={mapClick}
          style={styles.mapPreview}
          location={{ lat: lat, lng: lng }}
        />
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  img: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locCont: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressCont: {
    padding: 20,
  },
  address: {
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
