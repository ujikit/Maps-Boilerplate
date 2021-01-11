import { combineReducers } from 'redux'

// choose
import maps_all_reducer from './maps_all_reducer'

const appReducer = combineReducers({
  maps_all_reducer: maps_all_reducer,
})

export default appReducer
