import React, { useState, useEffect } from 'react'
import { callGetProductImagesApi } from '@api/home'
import { Container, Card, Row, Col } from 'react-bootstrap'
import Dropzone from '@shared/Dropzone'

const Gallery = () => {
  const [images, setImages] = useState([])
  const getGalleryImages = async () => {
    const res = await callGetProductImagesApi()
    setImages(res)
  }
  useEffect(() => {
    getGalleryImages()
  }, [])

  const handleOnUpload = res => {
    setImages([...images, res.docUrl])
  }

  return (
    <div>
      <h2>Image Gallery</h2>
      <Row>
        {images.map((item, i) => {
          return (
            <Col lg={1} sm={6} md={6} xs={6} key={i}>
              <img src={item} className='img-fluid' />
            </Col>
          )
        })}
      </Row>
      <Dropzone onUpload={handleOnUpload} />
    </div>
  )
}

export default Gallery
