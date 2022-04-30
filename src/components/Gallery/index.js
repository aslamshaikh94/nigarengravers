import React, { useState, useEffect } from 'react'
import Fancybox from '@components/Fancybox'
import { Container } from 'react-bootstrap'
import { callGetProductImagesApi } from '@api/home'
import './index.scss'

export default function Gallery() {
  const [images, setImages] = useState([])
  const getGalleryImages = async () => {
    const res = await callGetProductImagesApi()
    setImages(res)
  }
  useEffect(() => {
    getGalleryImages()
  }, [])

  return (
    <div className='gallery'>
      <Container>
        <div className='images'>
          <Fancybox>
            {images.map((url, i) => {
              return (
                <a data-fancybox='gallery' href={url} key={i}>
                  <img alt='gallery' src={url} className='image' />
                </a>
              )
            })}
          </Fancybox>
        </div>
      </Container>
    </div>
  )
}
