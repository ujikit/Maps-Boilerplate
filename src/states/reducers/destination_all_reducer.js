const initialState = {
  type_location_reducer: '',
  current_location_reducer: {},
  destination_location_reducer: {},
  selected_location_reducer: {}
}

const destination_all_reducer = (state = initialState, action) => {
  console.log(action.type)
  console.log(action.payload)
  switch(action.type) {
    case 'SET_TYPE_LOCATION':
    return {
      ...state,
      type_location_reducer: action.payload
    }
    case 'SET_CURRENT_LOCATION':
    return {
      ...state,
      current_location_reducer: action.payload,
    }
    case 'SET_DESTINATION_LOCATION':
    return {
      ...state,
      destination_location_reducer: action.payload,
    }
    case 'SELECTED_LOCATION':
    return {
      ...state,
      selected_location_reducer: action.payload
    }
    default:
      return state;
  }
}

export default destination_all_reducer
