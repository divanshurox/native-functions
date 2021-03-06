import React from "react";
import MainNav from "./navigation/MainNav";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import PlaceReducer from "./store/reducers/places";

// DB
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("DB Running");
  })
  .catch((error) => {
    console.log(error);
  });

const rootReducer = combineReducers({
  places: PlaceReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
    </Provider>
  );
}
