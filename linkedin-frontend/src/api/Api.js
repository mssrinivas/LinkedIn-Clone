import BASE_URL from './../components/constants/constants.js';
import {history} from "../util/utils";
import {userLoggedIn} from './../actions/index';
import {userSignupAction} from './../actions/index';
import {userProfileUpdateAction} from './../actions/index';
import * as UTIL from './../util/utils';
import axios from "axios";
export const CUSTOM_APPLY_SUCCESS = "custom_apply_success";
const server_url = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const userLogin = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/login`, {
          method: 'POST',
          headers: { ...headers,'Content-Type': 'application/json' },
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("userlogin status:",res.status);
            return res.json();
          }else if(res.status==401){
            alert((res.message)?res.message:"Applicant entered wrong password!!!");
            throw "userlogin Failed !!!"
          }
          else if(res.status==400){
            alert((res.message)?res.message:"Applicant is not registered, First Signup!!");
            throw "User Login Failed !!!"
          }
     }).then(result=>{
         console.log("result",result.loginUser," token :",result.servertoken)
         UTIL.saveServerToken(result);
         console.log("results")
         console.log(result.user_Details);
         dispatch(userLoggedIn(result));
         alert("Applicant logged in successfully");
         //history.push('/profilefirst');
         history.push('/listings');
  }).catch(err => {
    alert(err);
          console.log("Error while Sign up!!!");
          return err;
        });
    };
};
export const userSignUp = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/signup`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("userlogin status:",res.status);
            return res.json();
          }else{
            throw "Applicant is already registered, please login"
          }
     }).then(result=>{
         console.log("result",result," token :",result.servertoken)
         UTIL.saveServerToken(result);
         dispatch(userSignupAction(result));
         history.push('/profilefirst');
  }).catch(err => {
    alert(err);
          console.log("Error while Login!!!");
          return err;
        });
    };
};
export const profileUpdate = function(userDetail){
  return (dispatch) => {
    fetch(`${server_url}/users/updateProfile`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(userDetail)
      }).then(res => {
          if(res.status === 200){
            console.log("Profile Update:",res.status);
            return res.json();
          }

     }).then(result=>{
         console.log("result",result)
         dispatch(userProfileUpdateAction(result));
         // history.push('/');
  }).catch(err => {
    alert(err);
          console.log("Error while updating!!!");
          return err;
        });
    };
};
// export const ownerlogin = function(userDetail){
//   return (dispatch) => {
//     fetch(`${server_url}/users/ownerlogin`, {
//           method: 'POST',
//           mode: 'cors',
//           headers: { ...headers,'Content-Type': 'application/json' },
//           body: JSON.stringify(userDetail)
//       }).then(res => {
//           if(res.status === 200){
//             console.log("ownerlogin status:",res.status);
//             return res.json();
//           }else{
//             alert((res.message)?res.message:"Owner Does not exists please sign up  !!!");
//             throw "ownerlogin Failed !!!"
//           }
//      }).then(result=>{
//          console.log("result",result.loginUser," token :",result.servertoken)
//          UTIL.saveServerToken(result);
//          dispatch(ownerLoggedIn(result.loginUser));
//          history.push('/userhome');
//   }).catch(err => {
//     alert(err);
//           console.log("Error while Sign up!!!");
//           return err;
//         });
//     };
// };

export const customApplyJob =  (values) =>  dispatch =>  {
  console.log("applicant name inside custom apply action: " + values.firstname);
  
    axios.defaults.withCredentials = true;
    axios.post(`${server_url}/apply/job`, values)
        .then(res => {
          console.log("response status : " + res.status);
          if(res.status == 200 && res.data == "Applied successfully"){
            // console.log("booking failure : " + res.data);
              dispatch({
                type :  CUSTOM_APPLY_SUCCESS,
                payload: true
              })
            }
        })
 };