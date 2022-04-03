import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SIGNIN_ROUTE } from '@constants/routes'
import Banner from './Banner'

const Admin = () => {
  const { loggedInUserData: { userId } = {} } = useSelector(state => state.auth)
  if (!userId) return <Navigate to={SIGNIN_ROUTE} />
  return <Banner />
}

export default Admin
