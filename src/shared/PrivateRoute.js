import React from 'react'
import { Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '@utils'
import { SIGNIN_ROUTE } from '@constants/routes'

const PrivateRoute = ({ children }) => {
  const auth = isUserLoggedIn()
  return auth ? children : <Navigate to={SIGNIN_ROUTE} />
}

export default PrivateRoute
