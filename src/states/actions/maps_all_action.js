const mapsDispatch = () => {
  return function(dispatch) {
    return dispatch({type: 'MAPS'});
  };
};

export {
  mapsDispatch,
};
