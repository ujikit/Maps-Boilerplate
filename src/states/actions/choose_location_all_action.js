const currentLocationIsTypingDispatch = (payload) => {
  return function (dispatch) {
    return dispatch({type: 'CURRENT_LOCATION_IS_TYPING', payload: payload});
  };
};

export {currentLocationIsTypingDispatch};
