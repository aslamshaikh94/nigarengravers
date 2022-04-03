import React, { useState } from 'react'
import history from '@history/'
import { useStore } from '@store'
import { callSetUsersCallDetailsApi } from '@api/calls'
import { sendNotificationApi } from '@api/notification'
import { generateUniqueId } from '@utils/'
import {
  MESSENGER_ROUTE,
  DASHBOARD_ROUTE,
  VIDEO_CALL_ROUTE
} from '@constants/routes'
import { CheckRadio } from '@shared/FormFields'
import Button from 'react-bootstrap/Button'

const QuickConnect = props => {
  const {
    onCloseModal,
    data: { freelancerId, isWhatsAppSame, mobileData, whatsappData, email } = {}
  } = props

  const { useSelector } = useStore()

  const {
    loggedInUserData: { userId = '' } = {},
    myProfileDetails: {
      planType,
      personalDetails: {
        profilePic: photoURL = '',
        displayName: senderName = ''
      } = {}
    } = {}
  } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData,
      myProfileDetails: state.myProfileDetails
    }
  })

  const [connect, setConnect] = useState('call')

  const notificationPayload = {
    senderPic: photoURL,
    senderId: userId,
    senderName,
    message: 'Call request',
    isRead: false,
    type: 'call'
  }

  const handleCallNow = async () => {
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
      const { status: statusN } = await sendNotificationApi(freelancerId, {
        ...notificationPayload,
        refId: docId
      })
      if (statusN === 200) {
        history.push(`${VIDEO_CALL_ROUTE}/${freelancerId}/${docId}`)
      }
    }
  }

  const handleSubmit = () => {
    if (connect === 'whatsapp') {
      if (isWhatsAppSame) {
        window.open(`https://wa.me/${mobileData.mobile}`, '_blank')
      } else {
        window.open(`https://wa.me/${whatsappData.whatsapp}`, '_blank')
      }
    }
    if (connect === 'email') {
      window.open(`mailto:${email}`, '_blank')
    }
    if (connect === 'phone') {
      window.open(`tel:${mobileData.mobile}`)
    }
    if (connect === 'chat') {
      history.push(`${DASHBOARD_ROUTE}${MESSENGER_ROUTE}/${freelancerId}`)
    }
    if (connect === 'call') {
      handleCallNow()
    }
  }

  const handleSwitch = e => {
    const { value } = e.target
    setConnect(value)
  }

  const getDisabledOptions = () => {
    if (planType === 'free') {
      return [false, true, true, true, true]
    } else if (planType === 'pro') {
      return [false, false, true, true, true]
    } else if (planType === 'enterprise') {
      return [false, false, false, false, false]
    } else return [false, true, true, true, true]
  }

  return (
    <div>
      <div>
        <CheckRadio
          label='Quick Connection options:'
          name='connect'
          checked={connect}
          optionsName={['Voice / Video', 'Chat', 'Phone', 'Whatsapp', 'Email']}
          optionsValue={['call', 'chat', 'phone', 'whatsapp', 'email']}
          optionsDisabled={getDisabledOptions()}
          mb='None'
          variant='vertical'
          onChange={handleSwitch}
        />
      </div>
      <div className='FooterInfo'>
        <div />
        <div className='ButtonGroup'>
          <Button variant='outline-primary' size='lg' onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' size='lg' onClick={handleSubmit}>
            Connect
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuickConnect
