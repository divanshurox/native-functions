import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlacesItem";

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);

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
        address={null}
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
