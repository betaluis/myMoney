

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUiDX_BcwyAicpMlRFt6BbQpM0tRylHTE",
  authDomain: "mymoney-1683a.firebaseapp.com",
  projectId: "mymoney-1683a",
  storageBucket: "mymoney-1683a.appspot.com",
  messagingSenderId: "889958614140",
  appId: "1:889958614140:web:c64133fac617dfcbe2f5f9"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
const projectAuth = firebase.auth();

export { projectAuth, projectFirestore, timestamp }