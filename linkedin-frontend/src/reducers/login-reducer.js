import * as UTIL from './../util/utils';
import { CUSTOM_APPLY_SUCCESS } from "../api/Api";
const initialState = {
        current_user: '',
        currentUserDetails:{},
        applicant_id:'',
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
              applicant_id: action.data.applicant_id,
              currentUserDetails: action.data.user_Details
            })
            //break;
            case 'USER_SIGNED_UP':
              console.log("User signed up");
              return Object.assign({}, state, {
              currentUserDetails: action.data,
              applicant_id: action.data.applicant_id,
              current_user: action.data.current_user
            })
            case 'USER_PROFILE_UPDATE':
              console.log("User profile update", action.data);
              return Object.assign({}, state, {
              message: action.data.message,
              currentUserDetails : action.data.userProfileDetails
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
