const initialState = {
  choose_ride_type_reducer: {
    name: 'GoRide',
    image: require('../../assets/images/icons/Gojek/ChooseLocation/ride.jpg'),
    person: '1 person',
    price: 'Rp. 18.000'
  },
}

const choose_data_all_reducer = (state = initialState, action) => {
  console.log(action.type)
  console.log(action.payload)

  switch(action.type) {
    case 'CHOOSE_DATA':
    return {
      ...state,
      choose_ride_type_reducer: action.payload,
    }
    default:
      return state;
  }
}

export default choose_data_all_reducer
