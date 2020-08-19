import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

// Importing Screens
import PlacesListScreen from "../screens/PlacesListScreen";
import PlacesDetailScreen from "../screens/PlaceDetailScreen";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";

const PlacesStack = createStackNavigator();

const PlacesNavigation = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
      }}
    >
      <PlacesStack.Screen name="List" component={PlacesListScreen} />
      <PlacesStack.Screen name="Detail" component={PlacesDetailScreen} />
      <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} />
      <PlacesStack.Screen name="Map" component={MapScreen} />
    </PlacesStack.Navigator>
  );
};

export default PlacesNavigation;
