import { app, auth } from '@src/firebase'
import { userAuthLogoutAction } from '@actions'
import addToaster from '@shared/Notification'
import store from '@store'

/** Signup user using email, password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSignupApi = async payload => {
  const { email, password } = payload
  try {
    const data = await auth.createUserWithEmailAndPassword(email, password)
    return { data, status: 200 }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Signin user using email, password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSigninWithEmailPasswordApi = async payload => {
  const { email, password } = payload
  try {
    const data = await auth.signInWithEmailAndPassword(email, password)
    return { data, status: 200 }
  } catch (error) {
    addToaster('error', error.message)
  }
}

export const onAuthStateChanged = async () => {
  auth.onAuthStateChanged(user => {
    if (user !== null) {
      // const { displayName, email, photoURL, emailVerified, userId } = user
    } else {
      store.dispatch(userAuthLogoutAction())
    }
  })
}

/** Get current login user token
 */
export const callCurrentUserTokenIdApi = () => {
  return auth.currentUser.getIdToken(/* forceRefresh */ true)
}

// Sign in with Google.
export const signInWithGoogle = async () => {
  try {
    const provider = new app.auth.GoogleAuthProvider()
    const { user, credential: { accessToken } = {} } =
      await auth.signInWithPopup(provider)
    return { status: 200, data: { user, credential: { accessToken } } }
  } catch (error) {
    addToaster('error', error.message)
    return { status: 400 }
  }
}

/** Sign out user
 */
export const callUserSignOutApi = async () => {
  try {
    await auth.signOut()
    return { status: 200 }
  } catch (error) {
    addToaster('error', error.message)
    return { status: 400 }
  }
}

/** Reset user password, using user email
 */
export const callUserPasswordResetApi = async email => {
  try {
    const data = await auth.sendPasswordResetEmail(email)
    addToaster('success', 'Please check inbox')
    return { status: 200, data }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Send email verification */
export const callUserSendEmailVerification = async () => {
  try {
    const data = await auth.sendEmailVerification()
    return data
  } catch (error) {
    addToaster('error', error.message)
  }
}
