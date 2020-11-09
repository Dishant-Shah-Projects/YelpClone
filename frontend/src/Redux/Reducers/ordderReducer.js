import { order,orderupdate } from "../constants/actiontypes";
const defaultState = {
  orderinfo:{
  orders: [],
  PageNo:-1,
  Pages:-1,
  }
};
const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case order: {
      return {
        ...state,
        orderinfo: {...action.payload},
      };
    }
    case orderupdate: {
      return {
        ...state,
        orderinfo: {...state.orderinfo, orders:[action.payload, ...state.orderinfo.orders] },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default orderReducer;
