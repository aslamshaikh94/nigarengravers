import rootReducer from '@reducers/'
import { createStore } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

/**
 Set store globally
 */
export const setAppStore = store => {
  localStorage.setItem('nigarStore', JSON.stringify(store))
}

/**
 This store can use globally out of componet
 */
export const getAppStore = () => {
  return JSON.parse(localStorage.getItem('nigarStore')) || {}
}

/**
 * Simple hook to get store.
 */
export const useStore = () => {
  const dispatch = useDispatch()
  return {
    dispatch,
    useSelector
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
