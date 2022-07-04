import React, { useState, useEffect } from 'react'
import Fancybox from '@components/Fancybox'
import { Container } from 'react-bootstrap'
import { callGetImageGalleryApi } from '@api/home'
import './index.scss'

export default function Gallery() {
  const [images, setImages] = useState([])
  const getGalleryImages = async () => {
    const res = await callGetImageGalleryApi()
    setImages(res.data)
  }
  useEffect(() => {
    getGalleryImages()
  }, [])

  return (
    <div className='gallery'>
      <Container>
        <div className='images'>
          <Fancybox>
            {images.map((item, i) => {
              return (
                <a data-fancybox='gallery' href={item.docUrl} key={i}>
                  <img alt='gallery' src={item.thumb} className='image' />
                </a>
              )
            })}
          </Fancybox>
        </div>
      </Container>
    </div>
  )
}
