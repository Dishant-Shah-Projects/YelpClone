import { login } from '../constants/actiontypes';
const defaultState = {
    logininfo:{
    Role:"",
    ID:""
    }
};
const LoginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case login: {
          return {
            ...state,
            logininfo: { ...state.logininfo, ...action.payload },
            //   return Object.assign(state, action.payload);
          };
        }
        default: {
            return { ...state };
          }
}}
export default LoginReducer;