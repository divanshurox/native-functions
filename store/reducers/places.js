import { SAVE_PLACE, SET_PLACES } from "../actions/places";
import Place from "../../models/Place";

const initState = {
  places: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_PLACE:
      const { title, img, id, address, lat, lng } = { ...action.place };
      const newPlace = new Place(id, title, img, address, lat, lng);
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      const placesArr = [...action.places];
      return {
        ...state,
        places: placesArr.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.image,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    default:
      return state;
  }
};

export default reducer;
