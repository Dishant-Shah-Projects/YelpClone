import { menuload } from "../constants/actiontypes";
const defaultState = {
  menuinfo:{
  menu: [],
  PageNo:-1,
  Pages:-1,
  }
};
const menuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case menuload: {
      return {
        ...state,
        menuinfo: {...action.payload},
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default menuReducer;
