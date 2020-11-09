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
        let convo =state.conversations;
        let holder = null;
        for (con of state.conversations){
            if(con.restaurantID==action.payload.restaurantID&& con.customerID===action.payload.customerID){
                con=action.payload;
                holder=con;
            }
        }
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
