import { combineReducers } from 'redux'

// choose
import global_all_reducer from './global_all_reducer'

const appReducer = combineReducers({
  global_all_reducer: global_all_reducer,
})

export default appReducer
