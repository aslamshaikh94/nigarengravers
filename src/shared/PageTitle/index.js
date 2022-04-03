import React from 'react'
import { Link } from 'react-router-dom'
import { DASHBOARD_ROUTE } from '@constants/routes'
import './index.scss'

const PageTitle = props => {
  const { children, title, childTitle, onBack } = props

  return (
    <div className='HeaderAction'>
      <h4>
        {onBack && (
          <>
            <Link to={`${DASHBOARD_ROUTE}${onBack}`}>
              <i className='bi bi-arrow-left'></i>
            </Link>{' '}
          </>
        )}
        {title && `${title} ${childTitle ? '/' : ''}`}
        <span className='ChildTitle'>{childTitle && `${childTitle}`}</span>
      </h4>
      <div>{children}</div>
    </div>
  )
}

export default PageTitle
