import { restaurantsearch } from "../constants/actiontypes";
const defaultState = {
  restaurants: [],
};
const restaurantSearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case restaurantsearch: {
      return {
        ...state,
        restaurants: [...action.payload],
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default restaurantSearchReducer;
