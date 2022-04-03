import React from 'react'
import LoaderImage from '@assets/images/loader.svg'
import './index.scss'

const Loader = () => {
  return (
    <div className="Loader">
      <img src={LoaderImage} />
    </div>
  )
}

export default Loader
