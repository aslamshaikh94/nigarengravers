import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputField } from '@shared/FormFields'
import Facebook from '@assets/images/facebook.svg'
import Whatsapp from '@assets/images/whatsapp.svg'
import Twitter from '@assets/images/twitter.svg'
import './index.scss'

const AffiliateReferral = () => {
  const handleChange = () => {}

  return (
    <section className='AffiliateReferral'>
      <div className='AboutReferral'>
        <h3 className='Title'>Invite others and get Bonus</h3>
        <p>
          Send the Invite link to established fact that a reader will be
          distracted by the readable content of the of a page when looking at
          its layout.
        </p>
      </div>
      <Container>
        <div className='ReferralForm'>
          <InputGroup size='lg'>
            <InputField
              mb='None'
              placeholder='http: refferalinvite.com'
              value=''
              bg='None'
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button variant='primary'>Send</Button>
            </InputGroup.Append>
          </InputGroup>
          <h4>OR</h4>
          <div className='ShareLink'>
            <div className='flex-grow-1'>
              <InputField
                // label="Share Your link"
                placeholder='http: refferalinvite.com'
                value=''
                bg='None'
                onChange={handleChange}
              />
            </div>

            <a
              href='https://www.facebook.com/sharer.php?...'
              target='blank'
              rel='noopener noreferrer'
              className='Link'
            >
              <img src={Facebook} />
            </a>
            <a
              href='https://www.facebook.com/sharer.php?...'
              target='blank'
              rel='noopener noreferrer'
              className='Link'
            >
              <img src={Whatsapp} />
            </a>
            <a
              href='https://www.facebook.com/sharer.php?...'
              target='blank'
              rel='noopener noreferrer'
              className='Link'
            >
              <img src={Twitter} />
            </a>
          </div>
        </div>
        <h3 className='ReferralTitle'>How Referral Works</h3>
        <Row>
          <Col lg={4}>
            <div className='StepGroup'>
              <h5>1. Share your Link</h5>
              <p>
                Send the Invite link to established fact that a reader will be
                by the readable content
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='StepGroup'>
              <h5>2. Get signup discount</h5>
              <p>
                Send the Invite link to established fact that a reader will be
                by the readable content
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='StepGroup'>
              <h5>3. Enjoy bonus</h5>
              <p>
                Send the Invite link to established fact that a reader will be
                by the readable content
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AffiliateReferral
