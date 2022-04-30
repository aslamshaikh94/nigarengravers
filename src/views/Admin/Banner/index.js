import React, { useEffect, useState } from 'react'
import { callGetBannerDetailsApi, callSetBannerDetailsApi } from '@api/home'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { InputField, Textarea } from '@shared/FormFields'

const Banner = () => {
  const [bannerData, setBannerData] = useState({})

  const getBanner = async () => {
    const { status, data = {} } = await callGetBannerDetailsApi()
    if (status === 200) {
      setBannerData(data)
    }
  }

  useEffect(() => {
    getBanner()
  }, [])

  const { title, subTitle, description } = bannerData

  const handleChange = e => {
    const { name, value } = e.target
    setBannerData({ ...bannerData, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await callSetBannerDetailsApi(bannerData)
    console.log('submit', res)
  }

  return (
    <div>
      <h2>Banner</h2>
      <Row>
        <Col lg={6}>
          <InputField
            name='title'
            label='Title'
            value={title}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <InputField
            name='subTitle'
            label='Sub Title'
            value={subTitle}
            onChange={handleChange}
          />
        </Col>
        <Col lg={12}>
          <Textarea
            name='description'
            rows={6}
            label='Description'
            value={description}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <div className='mt-3 d-flex justify-content-end'>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default Banner
