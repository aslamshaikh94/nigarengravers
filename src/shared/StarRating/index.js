import React from 'react'
import './index.scss'

const StarRating = props => {
  const { name, value, onClick } = props
  return (
    <div className='StarRating'>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1
        return (
          <label key={givenRating} className='Star'>
            <i
              className={`bi bi-star${givenRating <= value ? '-fill' : ''}`}
              onClick={() => onClick({ target: { name, value: givenRating } })}
            ></i>
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
