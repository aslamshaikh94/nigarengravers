import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { callUserPasswordResetApi } from '@api/auth'
import { HOME_ROUTE, SIGNIN_ROUTE } from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { validateEmail } from '@utils'
import Button from 'react-bootstrap/Button'
import { InputField } from '@shared/FormFields'
import Logo from '@assets/images/logo.svg'
import './index.scss'

const ResetPassword = () => {
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: ''
  })
  const { email } = user

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError('')
  }

  const { emailErrorMessage } = ERROR_MESSAGES

  const isFormValid = () => {
    let validEmail
    if (!validateEmail(email)) {
      validEmail = emailErrorMessage
    }
    if (validEmail) {
      setError(validEmail)
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      await callUserPasswordResetApi(email)
    }
  }

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <img
          src={Logo}
          className='Logo'
          onClick={() => history.push(HOME_ROUTE)}
        />
        <h3>Reset Password</h3>
        <div className='FromGroup'>
          <InputField
            label='Email'
            name='email'
            value={email}
            required
            error={error}
            onChange={handleChange}
          />
          <Button variant='primary' size='lg' block onClick={handleSubmit}>
            Submit
          </Button>

          <Link to={SIGNIN_ROUTE} className='ResetPassword Link'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
