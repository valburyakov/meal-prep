import firebase from 'firebase';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '134502790531'
};

firebase.initializeApp(config);
