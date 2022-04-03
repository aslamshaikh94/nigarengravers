import React, { useState } from 'react'
import history from '@history'
import { callUserSignupApi, signInWithGoogle } from '@api/auth'
import {
  HOME_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGNIN_ROUTE
} from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { validatePassword, validateEmail } from '@utils'
import { InputField, CheckRadio } from '@shared/FormFields'
import Button from 'react-bootstrap/Button'
import GoogleIcon from '@assets/images/google-logo.png'
import './index.scss'
import { Link } from 'react-router-dom'

const Auth = () => {
  const [error, setError] = useState({})
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { email, password, confirmPassword } = user

  const payload = {
    email,
    password
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const {
    passwordNotMatchErrorMessage,
    passwordErrorMessage,
    emailErrorMessage
  } = ERROR_MESSAGES

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
    if (password !== confirmPassword) {
      confirmPass = passwordNotMatchErrorMessage
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

  const handleSignUp = async () => {
    if (isFormValid()) {
      const {
        status,
        data: {
          user: {
            // emailVerified,
            // uid: userId,
            // displayName,
            // email,
            // phoneNumber,
            // photoURL
          }
        }
      } = await callUserSignupApi(payload)
      if (status === 200) {
        history.push(HOME_ROUTE)
      }
    }
  }

  const handleSignInWithGoogle = async () => {
    const {
      status,
      data: {
        user: {
          // uid: userId,
          // displayName,
          // email,
          // phoneNumber,
          // emailVerified,
          // photoURL
        } = {}
      }
    } = await signInWithGoogle()
    if (status === 200) {
      history.push(HOME_ROUTE)
    }
  }

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3>Sign Up</h3>
        <div className='FromGroup'>
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
          <InputField
            label='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            type='password'
            required
            error={error.confirmPassword}
            onChange={handleChange}
          />
          <Button variant='primary' onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button className='googleBtn' onClick={handleSignInWithGoogle}>
            <img src={GoogleIcon} /> Sign Up with Google
          </Button>
          <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
            Forgot Password
          </Link>
          <Link className='btn btn-lg btn-block' to={SIGNIN_ROUTE}>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Auth
