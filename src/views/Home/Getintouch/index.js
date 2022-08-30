import React, { useState } from 'react'
import { callGetInTouchSendEmail } from '@api/home'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { InputField, Textarea } from '@shared/FormFields'
import addToaster from '@shared/Notification'
import './index.scss'

const Getintouch = () => {
  const [formData, setFormData] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendEmail = async e => {
    e.preventDefault()
    const res = await callGetInTouchSendEmail(formData)
    console.log('🚀 ~ file: index.js ~ line 20 ~ sendEmail ~ res', res)
  }

  const { name, email, mobile, message } = formData

  return (
    <section className='getintouch bg-gray' id='touch'>
      <Container>
        <div className='heading-box'>
          <h2 className='text-center section-heading'>Get In Touch</h2>
          <p>Feel free to contact us if you have something to say!</p>
        </div>
        <div className='mb-5'>
          <Row>
            <Col lg={5} sm={12}>
              <form onSubmit={sendEmail}>
                <Row>
                  <Col lg={6}>
                    <InputField
                      label='Name'
                      name='name'
                      value={name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col lg={6}>
                    <InputField
                      label='Email'
                      name='email'
                      value={email}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputField
                      label='Mobile'
                      name='mobile'
                      value={mobile}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Textarea
                      label='Message'
                      rows={4}
                      name='message'
                      value={message}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Button variant='dark' type='submit'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>

              <Row className='mt-5'>
                <Col>
                  <h5>Nigar Engravers</h5>
                  <p>
                    97, Morland Road,
                    <br />
                    Mamsa Industrial Estate,
                    <br /> Gala No. L-16,
                    <br /> Mumbai - 400008.
                  </p>
                </Col>
                <Col>
                  <h5>Nizam Ahmed</h5>
                  <p>
                    <a href='tel:+919702182163'>+91-9702182163</a>
                  </p>
                  <p>
                    <a href='mailto:nizam@nigarengravers.com'>
                      info@nigarengravers.com
                    </a>
                  </p>
                  <p>
                    <a href='mailto:nigarengravers@gmail.com'>
                      nigarengravers@gmail.com
                    </a>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.378747129954!2d72.82606832920861!3d18.96987706746576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfaced85cd31%3A0xae3749b7327e5c6d!2sNIGAR%20ENGRAVERS!5e1!3m2!1sen!2sin!4v1641133283138!5m2!1sen!2sin'
                width='100%'
                height='500'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default Getintouch
