import React from 'react'
import './index.scss'

const Card = props => {
  const { title, children } = props
  return (
    <div className='Card'>
      {title && <div className='Head'>{title}</div>}
      <div className='Body'>{children}</div>
    </div>
  )
}

export default Card
