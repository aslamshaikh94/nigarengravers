import { USER_AUTH_SUCCESS } from '@constants/actionsType'

const { loggedInUserData = {} } =
  JSON.parse(localStorage.getItem('nigarStore')) || {}

const initialState = { loggedInUserData }

export default function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_AUTH_SUCCESS: {
      return {
        // Again, one less level of nesting to copy
        ...state,
        loggedInUserData: payload
      }
    }
    default:
      return state
  }
}
