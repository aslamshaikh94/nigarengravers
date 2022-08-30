import { db, storage, serverTimestamp } from '@src/firebase'
import addToaster from '@shared/Notification'
import Axios from './axios'
/**
 * Get Main banner info
 */
export const callGetMainBannerApi = async () => {
  return await Axios.get('home/banner')
}

/** Get bid details using user userId and profile id freelancerId
 * @param {Object} payload.userId
 */
export const callGetBannerDetailsApi = async () => {
  try {
    const res = await db.collection('home').doc('banner').get()
    return { status: 200, data: res.data() }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Get bid details using user userId and profile id freelancerId
 * @param {Object} payload.userId
 */
export const callSetBannerDetailsApi = async payload => {
  try {
    await db.collection('home').doc('banner').set(payload)
    addToaster('success', 'Sucsess')
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Get bid details using user userId and profile id freelancerId
 * @param {Object} payload.userId
 */
export const callSetImageGalleryApi = async payload => {
  try {
    await db.collection('gallery').add(payload)
    addToaster('success', 'Sucsess')
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Get bid details using user userId and profile id freelancerId
 * @param {Object} payload.userId
 */
export const callGetImageGalleryApi = async () => {
  try {
    const { docs } = await db.collection('gallery').get()
    const data = docs.map(item => {
      const id = item.id
      return { ...item.data(), id }
    })
    return { status: 200, data: data }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Get bid details using user userId and profile id freelancerId
 * @param {Object} payload.userId
 */
export const callGetWhatWeDoDetailsApi = async () => {
  try {
    const { docs } = await db.collection('home/whatWeDo/items').get()
    const data = docs.map(doc => doc.data())
    return { status: 200, data }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Upload documents using user uid
 * @param {Object} payload
 * @param {Object} payload.uid
 */
export const callUploadProductImageApi = payload => {
  const { name, file } = payload
  return storage.ref(`/gallery/${name}-${serverTimestamp}`).put(file)
}

export const callGetProductImagesApi = async () => {
  try {
    const { items } = await storage.ref().child('gallery').listAll()
    const imageList = await Promise.all(
      items.map(async item => {
        const url = await item.getDownloadURL()
        return await url
      })
    )

    return imageList
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Send email verification */
export const callGetInTouchSendEmail = async payload => {
  try {
    const res = await Axios.post('/mail', payload)
    return res
  } catch (error) {
    addToaster('error', error.message)
  }
}
