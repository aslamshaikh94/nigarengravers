import React, { useState } from 'react'
import './index.scss'

function AccordionCollapse(props) {
  const { title, children, open } = props
  const [isOpen, setIsOpen] = useState(open)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`Collapse ${isOpen ? 'Open' : 'Close'}`}>
      <div className='CollapseHeader' onClick={handleClick}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default AccordionCollapse
