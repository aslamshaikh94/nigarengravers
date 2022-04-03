import React, { useEffect, useState } from 'react'
import history from '@history'
import { useStore } from '@store'
import { setGrouplistAction } from '@actions'
import { PROFILE_VIEW_ROUTE } from '@constants/routes'
import { ERROR_MESSAGES } from '@constants'
import {
  callAddCardWishlistApi,
  callRemoveCardWishlistApi
} from '@api/wishlist'
import addToaster from '@shared/Notification'
import DefaultPic from '@assets/images/DefaultPic.jpg'
import './index.scss'

const ProfileCard = props => {
  const { useSelector, dispatch } = useStore()

  const {
    loggedInUserData: { userId = '' } = {},
    wishlist = [],
    grouplist = []
  } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData,
      grouplist: state.grouplist,
      wishlist: state.wishlist
    }
  })

  const [wishlistIds, setWishlistIds] = useState([])

  useEffect(() => {
    setWishlistIds(wishlist.map(item => item._id))
  }, [wishlist.length])

  const { groupBtn, bookmarkBtn, centered, data = {} } = props
  const {
    userId: freelancerId,
    isOnline,
    profileTitle,
    overview,
    displayName,
    userName,
    country,
    profilePic = '',
    isPhotoHide,
    hourlyRate,
    feedbacks = {}
  } = data

  const handaleView = () => {
    history.push(`${PROFILE_VIEW_ROUTE}/${freelancerId}`)
  }

  const isInWishlist = wishlistIds.includes(freelancerId)
  const isInGroup = grouplist.includes(freelancerId)

  const { loginErrorMessage } = ERROR_MESSAGES

  const isUserLogin = () => {
    if (userId) {
      return true
    } else {
      addToaster('error', loginErrorMessage)
      return false
    }
  }

  // id is profile id when we want to add in wishlist
  const handleWishlist = async () => {
    if (isUserLogin()) {
      if (isInWishlist) {
        const { status } = await callRemoveCardWishlistApi(userId, freelancerId)
        if (status !== 200) {
          addToaster('error', 'Somthing went wrong')
        }
      } else {
        const { status } = await callAddCardWishlistApi(userId, freelancerId)
        if (status !== 200) {
          addToaster('error', 'Please login')
        }
      }
    }
  }

  const handleGroup = id => {
    const user = grouplist.filter(item => item !== id)
    const groupUsers = grouplist.includes(id) ? user : [...grouplist, id]
    dispatch(setGrouplistAction(groupUsers))
  }
  const { averageRating = 0, feedbacksLength = 0 } = feedbacks

  return (
    <div className={`ProfileCard ${centered && 'Centered'}`}>
      <div className='CardHeader'>
        <div className='UserPhoto' onClick={handaleView}>
          <img src={!isPhotoHide && profilePic ? profilePic : DefaultPic} />
          <span className={`Status ${isOnline ? 'Online' : ''}`}></span>
        </div>
        <div className='ActionBtn'>
          {bookmarkBtn && (
            <a className='BookmarkBtn' onClick={handleWishlist}>
              <i
                className={`bi ${
                  isInWishlist ? 'bi-bookmark-fill' : 'bi-bookmark'
                }`}
              ></i>
            </a>
          )}
          {groupBtn && (
            <a
              className='BookmarkBtn'
              onClick={() => handleGroup(freelancerId)}
            >
              <i
                className={`bi ${
                  isInGroup ? 'bi-person-dash-fill' : 'bi-person-plus'
                }`}
              ></i>
            </a>
          )}
        </div>
      </div>
      <div className='Body' onClick={handaleView}>
        <p className='Name'>
          {displayName || userName} <span className='Location'> {country}</span>
        </p>
        <div className='Designation'>{profileTitle}</div>
        <div>{overview && overview.slice(0, 60)}</div>
      </div>
      <div className='ProfileFooter'>
        <div className='Rating'>
          <i className='bi bi-star-fill'></i> {averageRating}{' '}
          <span className='Count'>( {feedbacksLength} )</span>
        </div>
        <div>
          $ {hourlyRate} /<small>hr</small>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
