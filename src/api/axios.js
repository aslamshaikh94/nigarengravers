import Axios from 'axios'
import { getAppStore } from '@store/index'
import history from '@history/'
// import { encryptRequest, decryptResponse } from "@utils/crypto";

/**
 * Authorizes requests by injecting the token from the sessionStorage.
 * @param {import('axios').AxiosRequestConfig} request The request object
 */
const outgoingRequestInterceptor = request => {
  if (request.url) {
    const { loggedInUserData = {} } = getAppStore()
    const { token } = loggedInUserData
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
  }

  return request
}

/**
 * This interceptor is used to handle all possible axios failure scenarios.
 * Add an early return to not pass the error ahead to the caller.
 * @param {Object} err The error object
 */
const responseErrorInterceptor = err => {
  let errorJSON = err.toJSON ? err.toJSON() : {}
  const { response: { status, data: { data = {}, message } = {} } = {} } = err

  if (status < 500 && status >= 400) {
    // all 4xx errors

    // throw user to login page. 403 might have to be removed depending on API
    if ([401, 403].includes(err.response.status)) {
      const { data = {} } = err.response
      const { message = 'You have been logged out' } = data

      const type = err.config.url === '/users/login' ? 'error' : 'info'

      // history.push(LOGIN_ROUTE)
    }
  }

  if (status === 503) {
    history.push(UNDER_MAINTENANCE_ROUTE)
  }

  if (!!errorJSON && errorJSON.code === 'ECONNABORTED') {
    console.log('Request Timed Out. Please check your connection')
  }
  if (!!errorJSON && errorJSON.message === 'Network Error') {
    console.log('Network Error.')
  }

  return Promise.reject(err)
}

let AxiosInstance = Axios.create({
  baseURL: process.env.API_URL
})

AxiosInstance.defaults.timeout = 30000
AxiosInstance.defaults.headers = {
  'Content-Type': 'application/json'
}

const responseSuccessInterceptor = response => {
  return response
}

AxiosInstance.interceptors.request.use(
  request => outgoingRequestInterceptor(request),
  error => error
)

AxiosInstance.interceptors.response.use(
  response => responseSuccessInterceptor(response),
  error => responseErrorInterceptor(error)
)

export default AxiosInstance
