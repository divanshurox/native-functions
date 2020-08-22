import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

const MapPreview = (props) => {
  let imgUrl;
  if (props.location) {
    imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=AIzaSyCn90Dst_35k_ZE7r8-O0QACJjPqfLa2K4`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {imgUrl ? (
        <Image source={{ uri: imgUrl }} style={styles.map} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
});
