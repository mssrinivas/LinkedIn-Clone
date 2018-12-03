import * as UTIL from './../util/utils';
import {SELECTED_CUSTOM_JOB_POST,UPDATED_JOB_SEARCH_CRITERIA,ADD_JOB_ID_TO_APPLIED_JOB,ADD_JOB_ID_TO_SAVED_JOB} from './../components/constants/reduxActionConstants';
import {CUSTOM_APPLY_SAVED_JOB} from './../components/constants/reduxActionConstants';
import { CUSTOM_APPLY_SUCCESS } from "../api/Api";
const initialState = {
        current_user: '',
        currentUserDetails:{},
        userTraceActivity:[],
        userDetails:{},
        applicant_id:'',
        message:'',
        userSearch:[],
        recruiter_flag:false,
        applied : false,
        customJobPost : {},
        jobSearchCriteria : {
            CompanyName : null,
            date : "",//YYYY-MM-DD
            seniorityLevel : null,
            location : null
        }
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
              userDetails: action.data.user_Details,
              applicant_id: action.data.applicant_id,
              current_user: action.data.current_user
            })
            case 'USER_PROFILE_UPDATE':
              console.log("User profile update", action.data);
              return Object.assign({}, state, {
              message: action.data.message,
              currentUserDetails : action.data.userProfileDetails
            })
            case 'USER_PROFILE_DELETE':
              console.log("User profile update", action.data);
              return Object.assign({}, state, {
              message: action.data.message,
              currentUserDetails : action.data.userProfileDetails
            })
            case 'USER_VISIT_ACTIVITY':
              console.log("User visit activity", action.data);
              return Object.assign({}, state, {
              message: action.data.message,
              userTraceActivity : action.data.userTraceDetails
            })
            case 'USER_SEARCH_ACTIVITY':
              console.log("User search activity", action.data.result);
              return Object.assign({}, state, {
              message: action.data.message,
              userSearch : action.data.result
            })
            case CUSTOM_APPLY_SUCCESS:
              console.log("Custom apply job reducer");
              return {
                ...state,
                applied : action.payload
            }

            case SELECTED_CUSTOM_JOB_POST :
                 console.log("in selected job post redux");
                 console.log(action.payload);
                 return Object.assign({},state,{customJobPost:action.payload});

            case CUSTOM_APPLY_SAVED_JOB :
                  console.log("inside custom apply for saved job in dashboard");
                  console.log("payload : " + action.payload)
                  return Object.assign({},state,{customJobPost:action.payload});
            
            case UPDATED_JOB_SEARCH_CRITERIA :
                 console.log("Inside updated search job criteria")
                 console.log(action.payload);
                 return Object.assign({},state,{jobSearchCriteria:action.payload })
                 
            case 'USER_SEARCH_ACTIVITY':
                  console.log("User search activity", action.data.result);
                  return Object.assign({}, state, {
                  message: action.data.message,
                  userSearch : action.data.result
                })

          default:
    return state;
  }
}
