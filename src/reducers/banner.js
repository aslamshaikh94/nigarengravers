const initialState = {
  baseURL: process.env.API_URL,
  colors: []
}

export default function bannerReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'BANNER': {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: payload
      }
    }
    default:
      return state
  }
}
