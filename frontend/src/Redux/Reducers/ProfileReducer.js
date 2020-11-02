import { profile,profileupdate } from '../constants/actiontypes';
const defaultState = {
    companyInfo: {
      CompanyName: '',
      Website: '',
      Size: '',
      ProfileImg: '',
      Type: '',
      Revenue: '',
      Headquarter: '',
      Industry: '',
      Founded: '',
      CompanyDescription: '',
      CompanyMission: '',
      CEO: '',
      City: '',
      State: '',
    },
  };
const studentprofilereducer = (state = defaultState, action) => {
    switch (action.type) {
        case login: {
          return {
            ...state,
            companyInfo: { ...state.companyInfo, ...action.payload },
            //   return Object.assign(state, action.payload);
          };
        }
        default: {
            return { ...state };
          }
}}
export default studentprofilereducer;
