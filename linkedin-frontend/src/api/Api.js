import {history} from "../util/utils";
import {userLoggedIn} from './../actions/index';
import {userSignupAction} from './../actions/index';
import * as UTIL from './../util/utils';
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
         console.log(result);
         dispatch(userLoggedIn(result.current_user));
         alert("Applicant logged in successfully");
         history.push('/postings');
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
         history.push('/postings');
  }).catch(err => {
    alert(err);
          console.log("Error while Login!!!");
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
