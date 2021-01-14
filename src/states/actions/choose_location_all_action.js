const currentLocationIsTypingDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'CURRENT_LOCATION_IS_TYPING', payload: payload});
  };
};

const setIsEditDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'SET_IS_EDIT', payload: payload});
  };
};

export {currentLocationIsTypingDispatch, setIsEditDispatch};
