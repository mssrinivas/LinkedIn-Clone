
import {BASE_URL} from './../components/constants/constants.js';
import {history} from "../util/utils";
import {userLoggedIn} from './../actions/index';
import {userSignupAction} from './../actions/index';
import {userClickedAction} from './../actions/index';
import {userProfileUpdateAction} from './../actions/index';
import {userDeleteAction} from './../actions/index';
import {userTraceAction} from './../actions/index';
import {userSearchAction} from './../actions/index';
import {searchFieldAction} from './../actions/index';
import {jobsearchFieldAction} from './../actions/index';
import {jobtitleUpdateAction} from './../actions/index';
import {recuriterDashBoardTraceAction} from './../actions/index';
import * as UTIL from './../util/utils';
import axios from "axios";
export const CUSTOM_APPLY_SUCCESS = "custom_apply_success";
// export const CUSTOM_APPLY_FAILURE = "custom_apply_failure";


const headers = {
    'Accept': 'application/json'
};

export const userLogin = function(userDetail){
  return (dispatch) => {
    fetch(`${BASE_URL}/users/login`, {
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
         //localStorage.setItem("token",result.server_token)
         console.log("results")
         console.log(result.user_Details);
         dispatch(userLoggedIn(result));
         history.push('/feed');
         // history.push('/userprofile');
          //history.push('/listings');
  }).catch(err => {
    alert(err);
          console.log("Error while Sign up!!!");
          return err;
        });
    };
};
export const userSignUp = function(userDetail){
  return (dispatch) => {
    fetch(`${BASE_URL}/users/signup`, {
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
    console.log("User details: ",userDetail);
    fetch(`${BASE_URL}/users/updateProfile`, {
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
         history.push('/userprofile');
  }).catch(err => {
    alert(err);
          console.log("Error while updating!!!");
          return err;
        });
    };
};

export const customApplyJob =  (values) =>  dispatch =>  {
  console.log("applicant name inside custom apply action: " + values.firstname);

    axios.defaults.withCredentials = true;
    axios.post(`${BASE_URL}/apply/job`, values)
        .then(res => {
          console.log("response status : " + res.status);
          if(res.status == 200 && res.data == "Applied successfully"){
            // console.log("booking failure : " + res.data);
              dispatch({
                type :  CUSTOM_APPLY_SUCCESS,
                payload: true
              })
            }
            else if(res.status == 200 && res.data == "Already applied"){
              // dispatch({
              //   type :  CUSTOM_APPLY_FAIL,
              //   payload: true
              // })
              alert("Already applied for this job")
            }
           else {
             alert("Oops !! Something went wrong. Login again")
           }
        })
 };

//  export const respondToFriendRequest =  (values) =>  dispatch =>  {
//   console.log("User details while sending friend request: " + values.firstname);

//     axios.defaults.withCredentials = true;
//     axios.post(`${BASE_URL}/user/respondtorequest`, values)
//         .then(res => {
//           console.log("response status : " + res.status);
//           if(res.status == 200 && res.data == "Applied successfully"){
//             // console.log("booking failure : " + res.data);
//               dispatch({
//                 type :  CUSTOM_APPLY_SUCCESS,
//                 payload: true
//               })
//             }
//         })
//  };

//  export const sendFriendRequest =  (values) =>  dispatch =>  {
//   console.log("User details while sending friend request: " + values.firstname);

//     axios.defaults.withCredentials = true;
//     axios.post(`${BASE_URL}/user/requestconnection`, values)
//         .then(res => {
//           console.log("response status : " + res.status);
//           if(res.status == 200 && res.data == "Applied successfully"){
//             // console.log("booking failure : " + res.data);
//               dispatch({
//                 type :  CUSTOM_APPLY_SUCCESS,
//                 payload: true
//               })
//             }
//         })
//  };


//  export const SendMessage =  (values) =>  dispatch =>  {
//   console.log("Message to be added: " + values.Message);

//     axios.defaults.withCredentials = true;
//     axios.post(`${BASE_URL}/messages/send`, values)
//         .then(res => {
//           console.log("response status : " + res.status);
//           if(res.status == 200){
//             // console.log("booking failure : " + res.data);
//             alert("Message sent Successfully !!")
//             }else{alert("Oops !! Could not send Message!!")}
//         })
//  };


//  export const submitMessage =  (values) =>  dispatch =>  {
//   console.log("Conversation initiated: ");

//     axios.defaults.withCredentials = true;
//     axios.post(`${BASE_URL}/messages/startnew`, values)
//         .then(res => {

//           if(res.status == 200){
//             console.log("response status : " + res.status);
//             history.push('/messages')
//             }else{alert("Oops !! Could not send Message!!")}
//         })
//  };
//  export const userSearch = function(userDetail){
//   console.log("Data sent to API:", userDetail);
//   return (dispatch) => {
//   fetch(`${BASE_URL}/users/users`, {
//         method: 'POST',
//         credentials:'include',
//         headers: { ...headers,'Content-Type': 'application/json' },
//         mode: 'cors',
//         body: JSON.stringify(userDetail)
//                   }).then(res => {
//                       if(res.status === 200){
//                         console.log("user search data status:",res.status);
//                         return res.json();
//                       }else{
//                         throw "User data can not be fetched"
//                       }
//                  }).then(result=>{
//                      console.log("result",result," token :",result)
//                      dispatch(userSearchAction(result));
//                      history.push('/search');
//               }).catch(err => {
//                 alert(err);
//                       console.log("Error while Login!!!");
//                       return err;
//                     });
//                 };
// };
//       };

  export const userDelete = function(userDetail){
        return (dispatch) => {
          fetch(`${BASE_URL}/users/updateProfile`, {
                method: 'POST',
                credentials:'include',
                headers: { ...headers,'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(userDetail)
            }).then(res => {
                if(res.status === 200){
                  console.log("user delete status:",res.status);
                  return res.json();
                }else{
                  throw "Applicant account can not be deleted"
                }
           }).then(result=>{
               console.log("result",result," token :",result.servertoken)
               UTIL.deleteServerToken(result);
               dispatch(userDeleteAction(result));
               history.push('/');
        }).catch(err => {
          alert(err);
                console.log("Error while Login!!!");
                return err;
              });
          };
      };


      export const graphUpdate = function(userDetail){
        console.log("Data sent to API:", userDetail);
            return (dispatch) => {
              fetch(`${BASE_URL}/users/getTraceData`, {
                    method: 'POST',
                    credentials:'include',
                    headers: { ...headers,'Content-Type': 'application/json' },
                    mode: 'cors',
                    body: JSON.stringify(userDetail)
                }).then(res => {
                    if(res.status === 200){
                      console.log("user trace fetch data status:",res.status);
                      return res.json();
                    }else{
                      throw "User trace data can not be fetched"
                    }
               }).then(result=>{
                   console.log("result",result," token :",result)
                   dispatch(userTraceAction(result));
                   history.push('/applicantDashBoard');
            }).catch(err => {
              alert(err);
                    console.log("Error while Login!!!");
                    return err;
                  });
              };
          };
export const userSearch = function(userDetail){
    console.log("Data sent to API:", userDetail.search_filter);
    return (dispatch) => {
    fetch(`${BASE_URL}/users/users`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(userDetail)
                    }).then(res => {
                        if(res.status === 200){
                          console.log("user search data status:",res.status);
                          return res.json();
                        }else{
                          throw "User data can not be fetched"
                        }
                   }).then(result=>{
                       console.log("result",result)
                       dispatch(userSearchAction(result));
                       history.push('/userlisting');
                }).catch(err => {
                  alert(err);
                        console.log("Error while searching for data!!!");
                        return err;
                      });
                  };
};



export const jobSearch = function(userDetail){
    console.log("Data sent to API:", userDetail);
    return (dispatch) => {
                          dispatch(jobsearchFieldAction(userDetail));
                  };
                };
export const onUserClicked = function(userDetail){
    console.log("Data sent to API on user click:", userDetail);
    return (dispatch) => {
    fetch(`${BASE_URL}/users/getProfile`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(userDetail)
                    }).then(res => {
                        if(res.status === 200){
                          console.log("user data status on clicking:",res.status);
                          return res.json();
                        }else{
                          throw "User data can not be fetched on click"
                        }
                   }).then(result=>{
                       console.log("result",result," token :",result)
                       dispatch(userClickedAction(result));
                       history.push('/uservisit');
                }).catch(err => {
                  alert(err);
                        console.log("Error while fetching user data on click!!!");
                        return err;
                      });
                  };
};
export const recuriterDashBoardSearch = function(userDetail){
  console.log("Data sent to API:", userDetail);
      return (dispatch) => {
        fetch(`${BASE_URL}/applications/getrecruiterdashboard`, {
              method: 'POST',
              credentials:'include',
              headers: { ...headers,'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify(userDetail)
          }).then(res => {
              if(res.status === 200){
                console.log("user trace fetch data status:",res.status);
                return res.json();
              }else{
                throw "User trace data can not be fetched"
              }
         }).then(result=>{
             console.log("result",result," token :",result)
             dispatch(recuriterDashBoardTraceAction(result));
             history.push('/recruiterdashboard');
      }).catch(err => {
        alert(err);
              console.log("Error while Login!!!");
              return err;
            });
        };
};
export const jobtitleUpdate = function(userDetail){
    console.log("Data sent to API:", userDetail);
    return (dispatch) => {
                          dispatch(jobtitleUpdateAction(userDetail));
                  };
                };
export const searchCriteriaFilter = function(searchCriteria){
    console.log("Data sent to API on entering search criteria click:", searchCriteria);
    return (dispatch) => {
                       dispatch(searchFieldAction(searchCriteria));
                     };
                   };
