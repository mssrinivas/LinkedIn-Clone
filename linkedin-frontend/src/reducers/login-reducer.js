import * as UTIL from './../util/utils';
const initialState = {
        current_user: '',
        currentUserDetails:{},
        message:'',
        recruiter_flag:false,
};
export default function (state = initialState, action) {
    switch (action.type) {
            case 'USER_LOGGED_IN':
              console.log("User Logged  IN",action.data);
              return Object.assign({}, state, {
              current_user: action.data.current_user,
              currentUserDetails: action.data.user_Details
            })
            break;
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
    default:
    return state;
  }
}
