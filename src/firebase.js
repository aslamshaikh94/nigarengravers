import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARN3nO-JNJh9bZUSwhFEnbVqdCR7oh3aA',
  authDomain: 'nigarengravers-87741.firebaseapp.com',
  projectId: 'nigarengravers-87741',
  storageBucket: 'nigarengravers-87741.appspot.com',
  messagingSenderId: '799727119419',
  appId: '1:799727119419:web:c35d447e8f15b2a29e401e',
  measurementId: 'G-LDH9FYCMK2'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase.firestore.setLogLevel('debug')
firebase.firestore().settings({ experimentalForceLongPolling: true })

export const app = firebase
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
