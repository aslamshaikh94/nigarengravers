import { db } from '@src/firebase'
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
export const callGetWhatWeDoDetailsApi = async () => {
  try {
    const { docs } = await db.collection('home/whatWeDo/items').get()
    const data = docs.map(doc => doc.data())
    return { status: 200, data }
  } catch (error) {
    addToaster('error', error.message)
  }
}
