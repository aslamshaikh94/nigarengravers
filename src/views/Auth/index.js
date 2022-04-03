import React, { useState } from 'react'
import history from '@history'
import {
  callUserSigninWithEmailPasswordApi,
  callCurrentUserTokenIdApi,
  signInWithGoogle
} from '@api/auth'
import { userAuthSuccessAction } from '@actions'
import {
  ADMIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGNUP_ROUTE,
  SIGNIN_ROUTE
} from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { useStore, setAppStore } from '@store'
import { useSelector } from 'react-redux'
import { validatePassword, validateEmail } from '@utils'
import Button from 'react-bootstrap/Button'
import { InputField } from '@shared/FormFields'
import { Link, Navigate } from 'react-router-dom'
import GoogleIcon from '@assets/images/google-logo.png'
import './index.scss'

const Auth = () => {
  const { dispatch } = useStore()
  const { loggedInUserData: { userId } = {} } = useSelector(state => state.auth)

  const [error, setError] = useState({})
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { email, password } = user

  const payload = {
    email,
    password
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const { passwordErrorMessage, emailErrorMessage } = ERROR_MESSAGES

  const isFormValid = () => {
    let confirmPass
    let validPass
    let validEmail
    if (!validateEmail(email)) {
      validEmail = emailErrorMessage
    }
    if (!validatePassword(password)) {
      validPass = passwordErrorMessage
    }
    if (confirmPass || validPass || validEmail) {
      setError({
        ...error,
        confirmPassword: confirmPass,
        password: validPass,
        email: validEmail
      })
      return false
    } else {
      return true
    }
  }

  const handleSignIn = async () => {
    if (isFormValid()) {
      const {
        status,
        data: {
          user: {
            emailVerified,
            uid: userId,
            displayName,
            email,
            phoneNumber,
            photoURL
          }
        }
      } = await callUserSigninWithEmailPasswordApi(payload)
      if (status === 200) {
        const jwtToken = await callCurrentUserTokenIdApi()
        const loggedInUserData = {
          photoURL,
          emailVerified,
          userId,
          displayName,
          token: jwtToken,
          email,
          phoneNumber
        }
        dispatch(userAuthSuccessAction(loggedInUserData))
        setAppStore({ loggedInUserData })
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSignIn()
  }

  const handleSignInWithGoogle = async () => {
    const {
      status,
      data: {
        user: {
          uid: userId,
          displayName,
          email,
          phoneNumber,
          emailVerified,
          photoURL
        } = {}
      }
    } = await signInWithGoogle()
    if (status === 200) {
      const jwtToken = await callCurrentUserTokenIdApi()
      const loggedInUserData = {
        emailVerified,
        userId,
        displayName,
        photoURL,
        token: jwtToken,
        email,
        phoneNumber
      }
      dispatch(userAuthSuccessAction(loggedInUserData))
      return <Navigate to={ADMIN_ROUTE} />
    }
  }

  if (userId) return <Navigate to={ADMIN_ROUTE} />

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3>Sign In</h3>
        <div className='FromGroup'>
          <form onSubmit={e => handleSubmit(e)}>
            <InputField
              label='Email'
              name='email'
              value={email}
              required
              error={error.email}
              onChange={handleChange}
            />
            <InputField
              label='Password'
              name='password'
              value={password}
              type='password'
              required
              error={error.password}
              onChange={handleChange}
            />
            <Button
              type='submit'
              variant='primary'
              size='lg'
              // block
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className='googleBtn'
              size='lg'
              // block
              onClick={handleSignInWithGoogle}
            >
              <img src={GoogleIcon} /> Sign Up with Google
            </Button>
            <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
              Forgot Password
            </Link>
            <Link className='btn btn-lg btn-block' to={SIGNUP_ROUTE}>
              Don't have account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
