import { messageload, messagesend } from "../constants/actiontypes";
const defaultState = {
  conversations: [],
};
const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case messageload: {
      return {
        ...state,
        conversations: [ ...action.payload ],
      };
    }
    case messagesend: {

      return {
        ...state,
        conversations: [ ...state.profileinfo, ...action.payload ],
        //   return Object.assign(state, action.payload);
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default messageReducer;
