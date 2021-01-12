const initialState = {
  choose_location_reducer: {
    name: '',
    formatted_address: ''
  },
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
    default:
      return state;
  }
}

export default choose_location_all_reducer
