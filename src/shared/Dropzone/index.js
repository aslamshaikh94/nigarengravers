import React from 'react'
import { callUploadDocumentsApi } from '@api'
import { setLodingStatusAction } from '@actions'
import { useStore } from '@store'
import addToaster from '@shared/Notification'
import './index.scss'

const Dropzone = props => {
  const { label, onUpload } = props
  const { useSelector } = useStore()

  const { loggedInUserData: { userId = '' } = {} } = useSelector(state => {
    return {
      loggedInUserData: state.loggedInUserData
    }
  })

  const handleChange = async e => {
    let file = e.target.files[0]
    let { name, size } = file
    let fileType = file['type'].split('/')[0]
    let fileSize = (size / 1024 / 1024).toFixed(2)

    if (fileSize <= 5) {
      setLodingStatusAction(true)
      try {
        const { ref } = await callUploadDocumentsApi(userId, { name, file })
        const docUrl = await ref.getDownloadURL()
        onUpload({ name, fileType, docUrl })
        setLodingStatusAction(false)
      } catch (error) {
        setLodingStatusAction(false)
        addToaster('error', error.message)
      }
    } else {
      addToaster('error', 'Your file is too large, maximum allowed size is 5MB')
    }
  }

  return (
    <>
      <label className='label form-label'>{label}</label>
      <div className='Dropzone'>
        <div className='BoxLine'>
          <>
            <div className='BrowseGroup'>
              <p>Browse or Drag here</p>
              <small>Attach Your Badges/Image/ video less than 5MB</small>
            </div>
            <input
              type='file'
              accept='video/*,image/*'
              value=''
              onChange={handleChange}
            />
          </>
        </div>
      </div>
    </>
  )
}

export default Dropzone
