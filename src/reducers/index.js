import { combineReducers } from 'redux'
import bannerReducer from './banner'
import authReducer from './auth'

const rootReducer = combineReducers({
  banner: bannerReducer,
  auth: authReducer
})

export default rootReducer
