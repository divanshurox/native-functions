import * as FileSystem from "expo-file-system";

export const SAVE_PLACE = "SAVE_PLACE";

export const savePlace = (place) => {
  return async (dispatch) => {
    const fileName = place.img.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: place.img,
        to: newPath,
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: SAVE_PLACE,
      place: { ...place, img: newPath },
    });
  };
};
