import React from 'react'
import { callUploadProductImageApi } from '@api/home'
import addToaster from '@shared/Notification'
import './index.scss'
import Resizer from 'react-image-file-resizer'

const Dropzone = props => {
  const { label, onUpload } = props

  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri)
        },
        'base64'
      )
    })

  const handleChange = async e => {
    let file = e.target.files[0]
    let { name, size } = file
    let fileType = file['type'].split('/')[0]
    let fileSize = (size / 1024 / 1024).toFixed(2)
    const thumb = await resizeFile(file)

    if (fileSize <= 5) {
      try {
        const { ref } = await callUploadProductImageApi({ name, file })
        const docUrl = await ref.getDownloadURL()
        onUpload({ name, fileType, docUrl, thumb })
        addToaster('success', 'Success')
      } catch (error) {
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
