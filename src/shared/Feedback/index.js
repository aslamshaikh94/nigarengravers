import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '@store'
import { callSetFeedbackApi } from '@api/'
import { Textarea } from '@shared/FormFields'
import StarRating from '@shared/StarRating'
import Button from 'react-bootstrap/Button'

const Feedback = props => {
  const { useSelector } = useStore()

  const { loggedInUserData: { userId = '' } = {} } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData
    }
  })

  const { onCloseModal } = props
  const [feedback, setFeedback] = useState({})
  const [error, setError] = useState({})
  const { reqId } = useParams()

  const { message, rating = 1 } = feedback

  const handleChange = e => {
    const { name, value } = e.target
    setFeedback({ ...feedback, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const handleClick = e => {
    const { name, value } = e.target
    setFeedback({ ...feedback, [name]: value })
  }

  const isFormValid = () => {
    let messageError
    let ratingError

    if (!message) messageError = 'Please enter Comment'

    if (messageError || ratingError) {
      setError({
        message: messageError
      })
      return false
    } else return true
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      const { status } = await callSetFeedbackApi(reqId, userId, feedback)
      if (status === 200) {
        onCloseModal()
      }
    }
  }

  return (
    <div>
      <Textarea
        label='Comment'
        name='message'
        value={message}
        placeholder='Tell us your feedback'
        rows={3}
        mb='None'
        onChange={handleChange}
        required
        error={error.message}
      />
      <StarRating onClick={handleClick} name='rating' value={rating} />
      <div className='FooterInfo'>
        <div />
        <div className='ButtonGroup'>
          <Button variant='outline-primary' size='lg' onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' size='lg' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Feedback
