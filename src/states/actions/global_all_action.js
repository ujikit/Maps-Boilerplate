const userCurrentLocationDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'USER_CURRENT_LOCATION', payload: payload});
  };
};

export {userCurrentLocationDispatch};
