import React, { useState } from 'react'
import { callSetUserBidApi } from '@api/bids'
import { useStore } from '@store'
import { sendNotificationApi } from '@api/notification'
import { generateUniqueId, getInputVal } from '@utils'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProfileInfo from '@shared/ProfileInfo'
import addToaster from '@shared/Notification'
import { InputField, CheckRadio, Textarea, Label } from '@shared/FormFields'
import './index.scss'

const MakeBid = props => {
  const {
    onCloseModal,
    data: {
      freelancerId,
      profileTitle,
      displayName,
      profilePic,
      isOnline,
      rateDetails: { hourlyRate = 'NA', minBid = 'NA', negotiable } = {}
    } = {}
  } = props

  const { useSelector } = useStore()

  const {
    loggedInUserData: { userId = '' } = {},
    myProfileDetails: {
      personalDetails: {
        displayName: clientName = '',
        profilePic: photoURL = ''
      } = {}
    } = {}
  } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData,
      myProfileDetails: state.myProfileDetails
    }
  })

  const [error, setError] = useState({})
  const [bid, setBid] = useState({ bidRate, message: '', isLongTerm: false })

  const { bidRate, message, isLongTerm, hoursNeeded, validTill } = bid

  const handleChange = e => {
    const { name, value, type, max } = e.target
    const val = getInputVal(value, type, max)

    if (val === false) return false
    else {
      setBid({ ...bid, [name]: val })
      setError({ ...error, [name]: '' })
    }
  }

  const handleChecked = e => {
    const { name, value } = e.target
    setBid({ ...bid, [name]: value })
  }

  const getBidPayload = () => {
    const bidDetails = {
      amount: bidRate,
      message,
      status: 'pending',
      userId,
      uniqId: generateUniqueId(),
      createdAt: new Date()
    }
    if (isLongTerm) {
      return [
        {
          ...bidDetails,
          hoursNeeded,
          validTill
        }
      ]
    } else {
      return [bidDetails]
    }
  }

  const payload = {
    isLongTerm,
    freelancerId,
    userId,
    profileName: displayName,
    clientName,
    askedRate: hourlyRate,
    isAccepted: false,
    isRejected: false,
    isDeleted: false,
    rejectedBy: null,
    bid: getBidPayload()
  }

  const isFormValid = () => {
    let bidRateError
    let hoursNeededError
    let validTillError
    let messageError
    if (!clientName) {
      addToaster('error', 'Please complete personal profile')
      return false
    }
    if (!bidRate) bidRateError = 'Please enter bid rate'
    if (isLongTerm && !hoursNeeded) {
      hoursNeededError = 'Please enter needed hours'
    }
    if (isLongTerm && !validTill) {
      validTillError = 'Please enter valid till date'
    }
    if (!message) messageError = 'Please enter message'

    if (bidRateError || hoursNeededError || validTillError || messageError) {
      setError({
        bidRate: bidRateError,
        hoursNeeded: hoursNeededError,
        validTill: validTillError,
        message: messageError
      })
      return false
    } else return true
  }

  const notificationPayload = {
    senderPic: photoURL,
    senderId: userId,
    senderName: clientName,
    isRead: false,
    type: 'bid',
    message: `Bid submited by ${clientName}`
  }

  const handleSubmit = async () => {
    const docId = generateUniqueId()
    if (isFormValid()) {
      const { status } = await callSetUserBidApi(
        freelancerId,
        userId,
        docId,
        payload
      )
      if (status === 200) {
        await sendNotificationApi(freelancerId, {
          ...notificationPayload,
          refId: docId
        })
        onCloseModal()
      }
    }
  }

  return (
    <div className='MakeBid'>
      <CheckRadio
        name='isLongTerm'
        checked={isLongTerm}
        optionsName={['One-time', 'Long Term Commitment']}
        optionsValue={[false, true]}
        inline
        labelPosition='Top'
        onChange={handleChecked}
      />
      {negotiable && (
        <div className={'Bid'}>
          ! The minimum bid starts from <b>${minBid}</b>
        </div>
      )}
      <div className='HeaderInfo'>
        <ProfileInfo
          data={{ profileTitle, displayName, isOnline, profilePic }}
        />
      </div>
      <div className='BookingInfo'>
        <Row>
          <Col lg={3}>
            <div>
              <Label title='Current Rate' />
              <h5>
                $ {hourlyRate} /<small>pr hr</small>{' '}
              </h5>
            </div>
          </Col>
          <Col lg={3}>
            <InputField
              label='Your Bid Rate'
              value={bidRate}
              type='number'
              name='bidRate'
              placeholder='Enter your rate pr/hr'
              onChange={handleChange}
              required
              error={error.bidRate}
            />
          </Col>
          {isLongTerm && (
            <>
              <Col lg={3}>
                <InputField
                  label='Hours Needed'
                  name='hoursNeeded'
                  value={hoursNeeded}
                  type='number'
                  placeholder='Enter your hours'
                  onChange={handleChange}
                  required
                  error={error.hoursNeeded}
                />
              </Col>
              <Col lg={3}>
                <InputField
                  label='Valid Till'
                  name='validTill'
                  value={validTill}
                  type='date'
                  onChange={handleChange}
                  required
                  error={error.validTill}
                />
              </Col>
            </>
          )}
        </Row>
      </div>
      <Row>
        <Col lg={12}>
          <Textarea
            label='Additional Message'
            name='message'
            value={message}
            placeholder='Tell us your requirement'
            rows={3}
            mb='None'
            onChange={handleChange}
            required
            error={error.message}
          />
        </Col>
      </Row>
      <div className='FooterInfo'>
        <div />
        <div className='ButtonGroup'>
          <Button variant='outline-primary' size='lg' onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' size='lg' onClick={handleSubmit}>
            Bid Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MakeBid
