import React, { useState, useEffect } from 'react'
import { callGetImageGalleryApi } from '@api/home'
import { Row, Col } from 'react-bootstrap'
import Dropzone from '@shared/Dropzone'
import { callSetImageGalleryApi } from '@api/home'

const Gallery = () => {
  const [images, setImages] = useState([])
  const getGalleryImages = async () => {
    const res = await callGetImageGalleryApi()
    setImages(res.data)
  }
  useEffect(() => {
    getGalleryImages()
  }, [])

  const handleOnUpload = async res => {
    // setImages([...images, res.thumb])
    getGalleryImages()
    await callSetImageGalleryApi({ docUrl: res.docUrl, thumb: res.thumb })
  }

  return (
    <div>
      <h2>Image Gallery</h2>
      <Row>
        {images.map((item, i) => {
          return (
            <Col lg={1} sm={6} md={6} xs={6} key={i}>
              <img src={item.thumb} className='img-fluid' />
            </Col>
          )
        })}
      </Row>
      <Dropzone onUpload={handleOnUpload} />
    </div>
  )
}

export default Gallery
