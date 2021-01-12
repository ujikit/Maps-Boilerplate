const initialState = {
  user_current_location_reducer: {
    latitude: '',
    longitude: '',
  }
}

const destination_all_reducer = (state = initialState, action) => {
  console.log(action.type)
  console.log(action.payload)

  switch(action.type) {
    case 'USER_CURRENT_LOCATION':
    return {
      ...state,
      user_current_location_reducer: {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      }
    }
    default:
      return state;
  }
}

export default destination_all_reducer
