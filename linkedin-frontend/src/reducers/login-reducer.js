import * as UTIL from './../util/utils';
const initialState = {
        current_user: '',
        currentUserDetails:{},
        message:'',
        recruiter_flag:false,
};
export default function (state = initialState, action) {
console.log("in action")
    console.log(action);
    switch (action.type) {
            case 'USER_LOGGED_IN':
              console.log("User Logged  IN",action.data);
              return Object.assign({}, state, {
              current_user: action.data
            })
            break;
            case 'USER_SIGNED_UP':
              console.log("User signed up");
              return Object.assign({}, state, {
              currentUserDetails: action.data,
              current_user: action.data.createdUser
            })
    default:
    return state;
  }
}
