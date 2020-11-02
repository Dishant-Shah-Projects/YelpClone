import { combineReducers } from 'redux';
import LoginReducer  from '../Reducers/LoginReducer';
import studentprofilereducer  from '../Reducers/ProfileReducer';


const finalReducers = combineReducers({
    LoginReducer:LoginReducer,
    studentprofilereducer:studentprofilereducer,


});
export default finalReducers;