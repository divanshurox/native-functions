import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlacesItem";
import { setPlaces } from "../store/actions/places";

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);

  navigation.setOptions({
    title: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="md-add"
            title="Add Place"
            onPress={() => {
              navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      );
    },
  });

  const renderPlaces = (itemData) => {
    return (
      <PlaceItem
        image={itemData.item.image}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => {
          navigation.navigate("Detail", {
            data: itemData.item,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(ele) => ele.id}
      data={places}
      renderItem={renderPlaces}
    />
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
