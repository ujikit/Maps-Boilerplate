const chooseRideTypeDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'CHOOSE_DATA', payload: payload});
  };
};

export {chooseRideTypeDispatch};
