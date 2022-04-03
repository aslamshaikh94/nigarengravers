import {
  USER_AUTH_SUCCESS,
  USER_DETAILS_SUCCESS,
  SEARCH_PROFILES_SUCCESS,
  BID_DETAILS_SUCCESS,
  EXPERT_PROFILES_SUCCESS,
  NOTIFICATION_SUCCESS,
  SCHEDULED_AVAILABILITY_SUCCESS,
  SCHEDULED_CALL_DETAILS_SUCCESS,
  SCHEDULED_CALL_CHATS_SUCCESS,
  WISHLIST_SUCCESS,
  USER_LOGOUT_SUCCESS,
  CLEAR_CURRENT_USER_DATA,
  APPLICATION_LOADING_STATUS,
  GROUPLIST_SUCCESS
} from '@constants/actionsType'

/**
 * Sets loading status in the context store so that a loader can be
 * displayed when appropriate
 * @param {Boolean} payload Whether the app is in loading state
 */
export const setLodingStatusAction = payload => ({
  type: APPLICATION_LOADING_STATUS,
  payload
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userAuthSuccessAction = payload => ({
  type: USER_AUTH_SUCCESS,
  payload
})

/**
Current user Logout
 */
export const userAuthLogoutAction = () => ({
  type: USER_LOGOUT_SUCCESS
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userSetUserDetailsSuccessAction = payload => ({
  type: USER_DETAILS_SUCCESS,
  payload
})

/**
 * Clear current user data
 * @param {Object} payload The user login data
 */
export const clearCurrentUserDataAction = () => ({
  type: CLEAR_CURRENT_USER_DATA
})

/**
 * Sets profiles list and
 * @param {Object} payload The user login data
 */
export const userSetProfilesSuccessAction = payload => ({
  type: SEARCH_PROFILES_SUCCESS,
  payload
})

/**
 * Sets expert profiles list and
 * @param {Object} payload The user login data
 */
export const userSetExpertProfilesSuccessAction = payload => ({
  type: EXPERT_PROFILES_SUCCESS,
  payload
})

/**
 * Sets profiles bid details
 * @param {Object} payload The user login data
 */
export const userSetBidDetailsSuccessAction = payload => ({
  type: BID_DETAILS_SUCCESS,
  payload
})

/**
 * Sets profiles bid details
 * @param {Object} payload The Bid Received data
 */
export const userSetNotificationSuccessAction = payload => ({
  type: NOTIFICATION_SUCCESS,
  payload
})

/**
 * Sets profiles bid details
 * @param {Object} payload The Bid Received data
 */
export const setScheduledAvailabilitySuccessAction = payload => ({
  type: SCHEDULED_AVAILABILITY_SUCCESS,
  payload
})

/**
 * Set schedule call details
 * @param {Object} payload
 */
export const setScheduledcallDetailsAction = payload => ({
  type: SCHEDULED_CALL_DETAILS_SUCCESS,
  payload
})

/**
 * Set schedule call details
 * @param {Object} payload
 */
export const setScheduledCallChatsAction = payload => ({
  type: SCHEDULED_CALL_CHATS_SUCCESS,
  payload
})

/**
 * Set schedule call details
 * @param {Object} payload
 */
export const setWishlistAction = payload => ({
  type: WISHLIST_SUCCESS,
  payload
})

/**
 * Set schedule call details
 * @param {Object} payload
 */
export const setGrouplistAction = payload => ({
  type: GROUPLIST_SUCCESS,
  payload
})
