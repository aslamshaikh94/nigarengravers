import React from 'react'
import Button from 'react-bootstrap/Button'
import Cross from '@assets/images/cross.svg'
import './index.scss'

const Modal = props => {
  const { title, isOpen, onCloseModal, onAccept, children, size, footerHide } =
    props

  return isOpen ? (
    <div className='ModalOverlay'>
      <div className={`Modal ${size ? size : ''}`}>
        {title && (
          <div className='Header'>
            {title}{' '}
            <img src={Cross} onClick={onCloseModal} className='CloseBtn' />
          </div>
        )}
        <div className='Body'>{children}</div>
        {!footerHide && (
          <div className='Footer'>
            <div />
            <div className='ButtonGroup'>
              <Button
                variant='outline-primary'
                size='lg'
                onClick={onCloseModal}
              >
                Cancel
              </Button>
              <Button variant='primary' size='lg' onClick={onAccept}>
                Call Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    false
  )
}

export default Modal
