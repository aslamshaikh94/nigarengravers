import React from 'react'
import DefaultPic from '@assets/images/DefaultPic.jpg'
import './index.scss'

const ProfileInfo = props => {
  const {
    data: {
      displayName,
      country,
      profileTitle,
      profilePic,
      isPhotoHide,
      isOnline,
      feedbacks: { averageRating, feedbacksLength } = {}
    } = {},
    onClick
  } = props

  return (
    <>
      <div className={`ProfileInfo ${onClick ? 'Link' : ''}`} onClick={onClick}>
        <div className='UserPhoto'>
          <img src={!isPhotoHide && profilePic ? profilePic : DefaultPic} />
          <span className={`Status ${isOnline ? 'Online' : ''}`}></span>
        </div>
      </div>
      <div className={`UserInfo ${onClick ? 'Link' : ''}`} onClick={onClick}>
        <p className='Name'>
          {displayName}
          {country && <span className='Location'> {country}</span>}
        </p>
        {profileTitle && <p className='Designation'>{profileTitle}</p>}
        {averageRating && (
          <div className='Rating'>
            <i className='bi bi-star-fill'></i> {averageRating}
            {feedbacksLength && (
              <span className='Count'>( {feedbacksLength} )</span>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileInfo
