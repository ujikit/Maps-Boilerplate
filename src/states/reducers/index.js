import { combineReducers } from 'redux'

// choose
import choose_data_all_reducer from './choose_data_all_reducer'
import choose_location_all_reducer from './choose_location_all_reducer'
import destination_all_reducer from './destination_all_reducer'
import global_all_reducer from './global_all_reducer'

const appReducer = combineReducers({
  choose_data_all_reducer: choose_data_all_reducer,
  choose_location_all_reducer: choose_location_all_reducer,
  destination_all_reducer: destination_all_reducer,
  global_all_reducer: global_all_reducer,
})

export default appReducer
