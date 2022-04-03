import React, { useEffect, useState } from 'react'
import { callGetBannerDetailsApi } from '@api/home'
import { Container, Row, Col } from 'react-bootstrap'
import './index.scss'
import bannerUrl from '@assets/images/home-banner.png'

const Banner = () => {
  const [banerData, setBannerData] = useState({})

  const getBanner = async () => {
    const { status, data = {} } = await callGetBannerDetailsApi()
    if (status === 200) {
      setBannerData(data)
    }
  }

  useEffect(() => {
    getBanner()
  }, [])

  const { title, subTitle, description } = banerData

  return (
    <section className='banner' id='home'>
      <div className='content'>
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col lg={7}>
              <div className='respo-center'>
                <img src={bannerUrl} className='home-banner' />
              </div>
            </Col>
            <Col lg={5}>
              <div className='intro'>
                <div className='title'>quality guarantee</div>
                <h2>{title}</h2>
                <div className='subtitle'>{subTitle}</div>
                <div className='intro__text'>
                  <p>{description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default Banner
