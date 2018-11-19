import * as UTIL from './../util/utils';
import { CUSTOM_APPLY_SUCCESS } from "../api/Api";
const initialState = {
        current_user: '',
        currentUserDetails:{},
        message:'',
        recruiter_flag:false,
        applied : false
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'USER_LOGGED_IN':
              console.log("User Logged  IN",action.data);
              return Object.assign({}, state, {
              current_user: action.data.current_user,
              currentUserDetails: action.data.user_Details
            })
            //break;
            case 'USER_SIGNED_UP':
              console.log("User signed up");
              return Object.assign({}, state, {
              currentUserDetails: action.data,
              current_user: action.data.current_user
            })
            case 'USER_PROFILE_UPDATE':
              console.log("User profile update", action.data);
              return Object.assign({}, state, {
              currentUserDetails: action.data
            })
            case CUSTOM_APPLY_SUCCESS:
              console.log("Custom apply job reducer");
              return {
                ...state,
                applied : action.payload
            }
          default:
    return state;
  }
}
