const initialState = {
  maps_reducer: '',
}

const maps_all_reducer = (state = initialState, action) => {
  console.log(action.type)
  console.log(action.payload)
  switch(action.type) {
    case 'MAPS':
    return {
      ...state,
      maps_reducer: action.payload,
    }
    default:
      return state;
  }
}

export default maps_all_reducer
