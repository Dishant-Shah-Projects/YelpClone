import { combineReducers } from "redux";
import LoginReducer from "../Reducers/LoginReducer";
import profilereducer from "../Reducers/ProfileReducer";
import orderReducer from"../Reducers/menureducer";
const finalReducers = combineReducers({
  LoginReducer: LoginReducer,
  profilereducer: profilereducer,
  orderReducer:orderReducer,
});
export default finalReducers;
