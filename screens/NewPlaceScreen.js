import React, { useState } from "react";
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

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [img, setImage] = useState();
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  navigation.setOptions({
    title: "Add New Place",
  });

  const titleChangeHandler = (text) => {
    if (text.length > 0) {
      setValid(true);
    }
    setTitle(text);
  };

  const savePlaceHandler = () => {
    if (!img) {
      setValid(false);
    }
    const place = {
      title,
      img,
    };
    dispatch(savePlace(place));
    navigation.goBack();
  };

  const imageHandler = (uri) => {
    setImage(uri);
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
        <View>
          <ImageSelector onImageTaken={imageHandler} />
        </View>
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
