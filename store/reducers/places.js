import { SAVE_PLACE } from "../actions/places";
import Place from "../../models/Place";

const initState = {
  places: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_PLACE:
      const id = new Date().toString();
      const { title, img } = { ...action.place };
      const newPlace = new Place(id, title, img);
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};

export default reducer;
