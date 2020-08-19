import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const PlaceDetailScreen = ({ navigation, route }) => {
  const { title, image } = route.params.data;
  navigation.setOptions({
    title: title,
  });
  return (
    <View>
      <Image source={{ uri: image }} style={styles.img} />
    </View>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
  },
});
