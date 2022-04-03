import React from 'react'
import Fancybox from '@components/Fancybox'
import { Container } from 'react-bootstrap'
import './index.scss'

export default function Gallery() {
  return (
    <div className='gallery'>
      <Container>
        <div>
          <Fancybox>
            <p>
              <a
                data-fancybox='gallery'
                href='https://lipsum.app/id/33/1024x768'
              >
                <img alt='' src='https://lipsum.app/id/33/200x150' />
              </a>

              <a
                data-fancybox='gallery'
                href='https://lipsum.app/id/34/1024x768'
              >
                <img alt='' src='https://lipsum.app/id/34/200x150' />
              </a>

              <a
                data-fancybox='gallery'
                href='https://lipsum.app/id/35/1024x768'
              >
                <img alt='' src='https://lipsum.app/id/35/200x150' />
              </a>

              <a
                data-fancybox='gallery'
                href='https://lipsum.app/id/36/1024x768'
              >
                <img alt='' src='https://lipsum.app/id/36/200x150' />
              </a>
            </p>
          </Fancybox>
        </div>
      </Container>
    </div>
  )
}
