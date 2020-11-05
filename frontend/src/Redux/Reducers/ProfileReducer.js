import { profile, } from "../constants/actiontypes";
const defaultState = {
  profileinfo: {
  },
};
const studentprofilereducer = (state = defaultState, action) => {
  switch (action.type) {
    case profile: {
      return {
        ...state,
        profileinfo: { ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default studentprofilereducer;
