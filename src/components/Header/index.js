import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import { callUserSignOutApi } from '@api/auth'
import { setAppStore } from '@store/'
import { userAuthSuccessAction } from '@actions'
import { HOME_ROUTE, SIGNIN_ROUTE } from '@constants/routes'
import { useSelector, useDispatch } from 'react-redux'

import './index.scss'
import logoUrl from '@assets/images/logo.png'
import { Link, Navigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const { loggedInUserData: { userId } = {} } = useSelector(state => state.auth)
  const headerRef = useRef(null)
  function clickHandler(id) {
    const headerHeight = headerRef.current.clientHeight
    const offsetTop = document.querySelector('#' + id).offsetTop
    scroll({
      top: offsetTop - headerHeight,
      behavior: 'smooth'
    })
  }

  const handleClick = (e, id) => {
    const element = document.querySelector('.active')
    if (element) element.classList.remove('active')
    e.target.classList.add('active')
    clickHandler(id)
  }

  const handleLogoutClick = async () => {
    const { status } = await callUserSignOutApi()
    if (status === 200) {
      setAppStore({})
      dispatch(userAuthSuccessAction({}))
      return <Navigate to={SIGNIN_ROUTE} />
    }
  }

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <div className='wrapper'>
          <div className='logo'>
            <h4>
              <Link to={HOME_ROUTE}>
                <img src={logoUrl} className='logo' /> Nigar Engravers
              </Link>
            </h4>
          </div>
          <div className='menu'>
            <ul>
              <li>
                <span
                  className='nav active'
                  onClick={e => handleClick(e, 'home')}
                >
                  Home
                </span>
              </li>
              <li>
                <span className='nav' onClick={e => handleClick(e, 'whatwedo')}>
                  What we do
                </span>
              </li>
              <li>
                <span className='nav' onClick={e => handleClick(e, 'touch')}>
                  Get in touch
                </span>
              </li>
              <li>
                {userId ? (
                  <span className='nav' onClick={handleLogoutClick}>
                    Logout
                  </span>
                ) : (
                  <Link className='nav' to={SIGNIN_ROUTE}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
