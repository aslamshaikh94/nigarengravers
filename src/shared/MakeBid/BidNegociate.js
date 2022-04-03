import React, { useState } from 'react'
import { useParams } from 'react-router'
import { callSetUserBidApi } from '@api/bids'
import { sendNotificationApi } from '@api/notification'
import { useStore } from '@store'
import { generateUniqueId, getInputVal } from '@utils'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProfileInfo from '@shared/ProfileInfo'
import { InputField, CheckRadio, Textarea, Label } from '@shared/FormFields'

// Make rebid
const BidNegociate = props => {
  const {
    onCloseModal,
    data: {
      bid: previousBid = [],
      profileTitle,
      displayName,
      profilePic,
      isOnline,
      isLongTerm,
      rateDetails: { hourlyRate = 'NA', minBid = 'NA', negotiable } = {}
    }
  } = props

  const { useSelector } = useStore()

  const {
    loggedInUserData: { userId = '' } = {},
    myProfileDetails: {
      personalDetails: { displayName: clientName, profilePic: photoURL = '' }
    } = {}
  } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData,
      myProfileDetails: state.myProfileDetails
    }
  })

  const { reqId, id } = useParams()
  const { hoursNeeded, validTill } = previousBid[0]
  console.log(previousBid[0])
  const [error, setError] = useState({})
  const [bid, setBid] = useState({ bidRate, message: '' })

  const { bidRate, message } = bid

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
    if (isLongTerm) {
      return {
        hoursNeeded,
        validTill
      }
    } else {
      return {}
    }
  }

  const payload = {
    isAccepted: false,
    isRejected: false,
    isDeleted: false,
    rejectedBy: null,
    bid: [
      ...previousBid,
      {
        ...getBidPayload(),
        amount: bidRate,
        message,
        status: 'pending',
        userId,
        uniqId: generateUniqueId(),
        createdAt: new Date()
      }
    ]
  }

  const isFormValid = () => {
    let bidRateError
    let hoursNeededError
    let validTillError
    let messageError
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
    refId: id,
    senderName: clientName,
    isRead: false,
    message: `Bid submited by ${clientName}`,
    type: 'bid'
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      const { status } = await callSetUserBidApi(userId, reqId, id, payload)
      if (status === 200) {
        await sendNotificationApi(reqId, notificationPayload)
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
        disabled
      />
      {negotiable && (
        <div className={'Bid'}>
          ! The minimum bid starts from <b>${minBid}</b>
        </div>
      )}
      <ProfileInfo data={{ profileTitle, displayName, isOnline, profilePic }} />
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
              type='number'
              name='bidRate'
              value={bidRate}
              placeholder='Enter your rate pr/hr'
              onChange={handleChange}
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
                  disabled
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
                  disabled
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

export default BidNegociate
