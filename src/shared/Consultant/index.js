import React, { useEffect, useState } from 'react'
import { useStore } from '@store'
import history from '@history'
import {
  callAddCardWishlistApi,
  callRemoveCardWishlistApi
} from '@api/wishlist'
import { callSetUsersCallDetailsApi } from '@api/calls'
import {
  PROFILE_VIEW_ROUTE,
  SCHEDULE_CALL,
  VIDEO_CALL_ROUTE
} from '@constants/routes'
import { generateUniqueId } from '@utils/'
import { ERROR_MESSAGES } from '@constants'
import Button from 'react-bootstrap/Button'
import ProfileInfo from '@shared/ProfileInfo'
import Modal from '@shared/Modal'
import { TooltipWrapper } from '@shared/FormFields'
import MakeBid from '@shared/MakeBid'
import QuickConnect from '@shared/QuickConnect'
import addToaster from '@shared/Notification'
import './index.scss'

const Consultant = props => {
  const { useSelector } = useStore()

  const { loggedInUserData: { userId = '' } = {}, wishlist = [] } = useSelector(
    state => {
      return {
        loggedInUserData: state.loggedInUserData,
        wishlist: state.wishlist
      }
    }
  )

  const {
    data: {
      userId: freelancerId,
      personalDetails = {},
      skills = [],
      profileOverview = {},
      rateDetails = {},
      isOnline,
      feedbacks
    } = {},
    overviewHide
  } = props

  const { hourlyRate = 'NA' } = rateDetails
  const [isBidModal, setIsBidModal] = useState(false)
  const [isQueckModal, setIsQueckModal] = useState(false)
  const { overview = '', totalExperience } = profileOverview

  const [wishlistIds, setWishlistIds] = useState([])

  useEffect(() => {
    setWishlistIds(wishlist.map(item => item._id))
  }, [wishlist.length])

  const profileInfo = {
    freelancerId,
    ...personalDetails,
    ...profileOverview,
    rateDetails,
    feedbacks,
    isOnline
  }

  const { loginErrorMessage } = ERROR_MESSAGES

  const isUserLogin = () => {
    if (userId) {
      return true
    } else {
      addToaster('error', loginErrorMessage)
      return false
    }
  }

  const handaleBidNow = async () => {
    if (isUserLogin()) {
      setIsBidModal(true)
    }
  }

  const [showLess, setShowLess] = useState(true)
  const textLength = overview.length > 240

  useEffect(() => {
    setShowLess(textLength)
  }, [overview])

  const handaleScheduleCall = () => {
    if (isUserLogin()) {
      history.push(`${SCHEDULE_CALL}/${freelancerId}`)
    }
  }

  const handaleView = () => {
    history.push(`${PROFILE_VIEW_ROUTE}/${freelancerId}`)
  }

  const handaleQuickConnect = () => {
    if (isUserLogin()) {
      setIsQueckModal(true)
    }
  }

  const handleCallNow = async () => {
    if (isUserLogin()) {
      const docId = generateUniqueId()
      const payload = {
        channel: docId,
        refId: docId,
        userId,
        receiverId: freelancerId
      }
      const users = [userId, freelancerId]
      const { status } = await callSetUsersCallDetailsApi(users, docId, payload)
      if (status === 200) {
        history.push(`${VIDEO_CALL_ROUTE}/${freelancerId}/${docId}`)
      }
    }
  }

  const isInWishlist = wishlistIds.includes(freelancerId)

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

  return (
    <>
      <div className='CardWrapper'>
        <div className='HeaderInfo'>
          <ProfileInfo data={profileInfo} onClick={handaleView} />
          <div className='RightBar'>
            <span className='TotalExperience'>
              Total Exp - {totalExperience} yrs
            </span>
            <span className='BookmarkBtn' onClick={handleWishlist}>
              <i
                className={`bi ${
                  isInWishlist ? 'bi-bookmark-fill' : 'bi-bookmark'
                }`}
              ></i>
            </span>
          </div>
        </div>
        {!overviewHide && (
          <div className='Summary'>
            <p>
              {showLess ? overview.slice(0, 240) : overview} {showLess}
              {textLength && (
                <span className='Link' onClick={() => setShowLess(!showLess)}>
                  {showLess ? 'Show More' : 'Show Less'}
                </span>
              )}
            </p>
          </div>
        )}
        <div className='TagGroup'>
          {skills &&
            skills.map((item, i) => (
              <TooltipWrapper content={item.achievenment} key={i}>
                <div className='Tag'>
                  <span className='Name'>{item.skill}</span>
                  <span className='Years'>{item.yearsOfExperience} Yrs</span>
                </div>
              </TooltipWrapper>
            ))}
        </div>
        <div className='FooterInfo'>
          <h4>
            $ {hourlyRate} /<small>hr</small>
          </h4>
          <div className='BtnGroup'>
            <Button variant='link' size='lg' onClick={handaleBidNow}>
              Make a Bid
            </Button>
            <Button
              variant='outline-primary'
              size='lg'
              onClick={handaleScheduleCall}
            >
              Schedule a call
            </Button>
            <Button
              variant='outline-primary'
              size='lg'
              onClick={handaleQuickConnect}
            >
              Quick Connect
            </Button>
            <Button variant='primary' size='lg' onClick={handleCallNow}>
              Call Now
            </Button>
          </div>
        </div>
      </div>
      <Modal
        footerHide
        title='Make your Bid'
        isOpen={isBidModal}
        onCloseModal={() => setIsBidModal(false)}
      >
        <MakeBid data={profileInfo} onCloseModal={() => setIsBidModal(false)} />
      </Modal>
      <Modal
        size='Sm'
        footerHide
        // title='Quick Connection options:'
        isOpen={isQueckModal}
        onCloseModal={() => setIsQueckModal(false)}
      >
        <QuickConnect
          data={profileInfo}
          onCloseModal={() => setIsQueckModal(false)}
        />
      </Modal>
    </>
  )
}

export default Consultant
