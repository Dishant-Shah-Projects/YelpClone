import { login } from "../constants/actiontypes";
const defaultState = {
  userInfo: {
    Role: "",
    ID: "",
  },
};
const LoginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case login: {
      return {
        ...state,
        userInfo: { ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default LoginReducer;
