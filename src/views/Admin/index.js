import React from 'react'
import { Navigate } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SIGNIN_ROUTE } from '@constants/routes'
import Banner from './Banner'
import Gallery from './Gallery'
import Head from './Head'

const Admin = () => {
  const { loggedInUserData: { userId } = {} } = useSelector(state => state.auth)
  if (!userId) return <Navigate to={SIGNIN_ROUTE} />
  return (
    <section className='bg-gray'>
      <Container>
        <Card>
          <Card.Body>
            <Head />
            <Banner />
            <hr />
            <Gallery />
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default Admin
