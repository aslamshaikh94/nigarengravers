import React, { useEffect, useState } from 'react'
import Gallery from '@components/Gallery'
import { Container, Row, Col } from 'react-bootstrap'
import { callGetWhatWeDoDetailsApi } from '@api/home'
import './index.scss'

const Whatwedo = () => {
  const [whatwedoData, setWhatwedoData] = useState([])

  const getData = async () => {
    const { status, data } = await callGetWhatWeDoDetailsApi()
    if (status === 200) {
      setWhatwedoData(data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className='whatwedo' id='whatwedo'>
      <Container>
        <div className='heading-box'>
          <h2 className='text-center section-heading'>What We Do</h2>
        </div>
        <Row className='row row-30 row-offset-1'>
          {whatwedoData.map(item => (
            <Col lg={4} key={item.title}>
              <Article data={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <Gallery />
    </section>
  )
}

function Article({ data }) {
  const { title = '', text = '', icon } = data

  return (
    <article className='article-box'>
      <div className='icon-box'>
        <i className={`bi ${icon} icon`} />
      </div>
      <h4 className='title'>{title}</h4>
      <p>{text}</p>
    </article>
  )
}

export default Whatwedo
