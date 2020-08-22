import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Alert,
  Text,
  View,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = (props) => {
  const [isImage, setIsImage] = useState(false);
  const [imgData, setImgData] = useState();

  const verifyPermissions = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Insufficient Permissions",
          "Sorry, you need to verify the permissions!",
          [{ text: "Ok" }]
        );
      }
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const granted = await verifyPermissions();
    if (!granted) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // const image = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 0.5,
    // });
    setImgData(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imgPreview}>
        {!imgData && <Text>No Image picked Yet!!</Text>}
        {imgData && <Image source={{ uri: imgData }} style={styles.img} />}
      </View>
      <Button
        title={imgData ? "Choose Other" : "Select Image"}
        color="dodgerblue"
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    marginBottom: 20,
  },
  imgPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
