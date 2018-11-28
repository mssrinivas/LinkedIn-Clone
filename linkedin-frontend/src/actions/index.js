export const userLoggedIn = (userDetail) => {
  console.log("user detail");
  console.log(userDetail);
    return {
        type: 'USER_LOGGED_IN',
        data: userDetail
    }
};
export const userSignupAction = (userDetail) => {
    return {
        type: 'USER_SIGNED_UP',
        data: userDetail
    }
};
export const userProfileUpdateAction = (userDetail) => {
    return {
        type: 'USER_PROFILE_UPDATE',
        data: userDetail
    }
};
export const userDeleteAction = (userDetail) => {
    return {
        type: 'USER_PROFILE_DELETE',
        data: userDetail
    }
};

export const userTraceAction = (userDetail) => {
    return {
        type: 'USER_VISIT_ACTIVITY',
        data: userDetail
    }
};
export const userSearchAction = (userDetail) => {
    return {
        type: 'USER_SEARCH_ACTIVITY',
        data: userDetail
    }
};
