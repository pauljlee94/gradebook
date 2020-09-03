import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

require('firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.firestore_apikey,
	authDomain: "gradebook-21264.firebaseapp.com",
	databaseURL: "https://gradebook-21264.firebaseio.com",
	projectId: "gradebook-21264",
	storageBucket: "gradebook-21264.appspot.com",
	messagingSenderId: "284135940693",
	appId: "1:284135940693:web:27969405ed485a44052adc",
	measurementId: "G-WKCF4PCSHP"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

export default firebase
