import { profile, profileupdate } from "../constants/actiontypes";
const defaultState = {
  profileinfo: {},
};
const profilereducer = (state = defaultState, action) => {
  switch (action.type) {
    case profile: {
      return {
        ...state,
        profileinfo: { ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    case profileupdate: {
      return {
        ...state,
        profileinfo: { ...state.profileinfo, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default profilereducer;
