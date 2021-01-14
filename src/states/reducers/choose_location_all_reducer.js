const initialState = {
  choose_location_reducer: {
    name: '',
    formatted_address: ''
  },
  is_edit_reducer: false
}

const choose_location_all_reducer = (state = initialState, action) => {
  console.log(action.type)
  console.log(action.payload)

  switch(action.type) {
    case 'CHOOSE_LOCATION':
    return {
      ...state,
      current_location_reducer: {
        name: action.payload.name,
        formatted_address: action.payload.formatted_address
      },
    }
    case 'SET_IS_EDIT':
    return {
      ...state,
      is_edit_reducer: action.payload
    }
    default:
      return state;
  }
}

export default choose_location_all_reducer
