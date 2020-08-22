import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const SAVE_PLACE = "SAVE_PLACE";
export const SET_PLACES = "SET_PLACES";

export const savePlace = (place) => {
  return async (dispatch) => {
    const fileName = place.img.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: place.img,
        to: newPath,
      });
      const res = await insertPlace(
        place.title,
        newPath,
        "Dummy Address",
        place.lat,
        place.lng
      );
      dispatch({
        type: SAVE_PLACE,
        place: {
          ...place,
          address: "Dummy Address",
          img: newPath,
          id: res.insertId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const res = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: [...res.rows._array],
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};
