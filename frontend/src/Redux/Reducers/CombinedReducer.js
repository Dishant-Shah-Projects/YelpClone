import { combineReducers } from "redux";
import LoginReducer from "../Reducers/LoginReducer";
import profilereducer from "../Reducers/ProfileReducer";
import menuReducer from "../Reducers/menureducer";
import restaurantSearchReducer from "../Reducers/restaurantSearchReducer";
import orderReducer from "../Reducers/ordderReducer";
import messageReducer from "../Reducers/messageReducer";
const finalReducers = combineReducers({
  LoginReducer: LoginReducer,
  profilereducer: profilereducer,
  menuReducer: menuReducer,
  restaurantSearchReducer: restaurantSearchReducer,
  orderReducer: orderReducer,
  messageReducer: messageReducer,
});
export default finalReducers;
