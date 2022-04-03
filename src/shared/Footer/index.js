import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AffiliateReferral from './AffiliateReferral'
import './index.scss'

const Footer = () => {
  return (
    <>
      <AffiliateReferral />
      <section className='Footer'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={3}>
              <ul className='LinkGroup'>
                <li className='LingTitle'>Company</li>
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact Us</li>
              </ul>
            </Col>
            <Col lg={3}>
              <ul className='LinkGroup'>
                <li className='LingTitle'>Support</li>
                <li>Help Center</li>
                <li>Safety Center</li>
                <li>Community Guidelines</li>
              </ul>
            </Col>
            <Col lg={3}>
              <ul className='LinkGroup'>
                <li className='LingTitle'>Legal</li>
                <li>Cookies Policy</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Law Enforcement</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className='CopyRight'>
          <Container> © Hanatech 2020. All rights reserved</Container>
        </div>
      </section>
    </>
  )
}

export default Footer
