const setTypeLocationDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'SET_TYPE_LOCATION', payload: payload});
  };
};

const currentLocationDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'SET_CURRENT_LOCATION', payload: payload});
  };
};

const destinationLocationDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'SET_DESTINATION_LOCATION', payload: payload});
  };
};

const selectedLocationDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'SELECTED_LOCATION', payload: payload});
  };
};

export {setTypeLocationDispatch, currentLocationDispatch, destinationLocationDispatch, selectedLocationDispatch};
