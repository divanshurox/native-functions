import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { savePlace } from "../store/actions/places";
import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [img, setImage] = useState();
  const [location, setLocation] = useState();

  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  navigation.setOptions({
    title: "Add New Place",
  });

  const [sendLocation, setSendLocation] = useState();
  useEffect(() => {
    if (route.params?.location) {
      setSendLocation(route.params.location);
    }
  }, [route.params?.location]);

  const titleChangeHandler = (text) => {
    if (text.length > 0) {
      setValid(true);
    }
    setTitle(text);
  };

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((loc) => {
    console.log(loc);
    setLocation(loc);
  }, []);

  const savePlaceHandler = () => {
    if (!img) {
      setValid(false);
    }
    const place = {
      title,
      img,
      lat: location.lat,
      lng: location.lng,
    };
    dispatch(savePlace(place));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={title}
            onChangeText={titleChangeHandler}
          />
          {!valid && <Text style={{ color: "tomato" }}>Set a Valid Title</Text>}
        </View>
        <ImageSelector onImageTaken={imageHandler} />
        <LocationPicker
          navigation={navigation}
          locate={sendLocation}
          onLocationPicked={locationHandler}
        />
        {location && <Text style={{ marginLeft: 100 }}>{location.lat}</Text>}
        <Button
          disabled={!valid}
          title="Save Place"
          onPress={savePlaceHandler}
          color="tomato"
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
