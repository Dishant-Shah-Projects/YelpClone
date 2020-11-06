import { order, orderupdate,addorder } from "../constants/actiontypes";
const defaultState = {
  orders: [
  ]
};
const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case order: {
      return {
        ...state,
        orders: [  ...action.payload ],
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default orderReducer;