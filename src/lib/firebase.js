import Vue from 'vue'
import firebase from 'firebase/app'

// 사용할거 하나씩 import
import 'firebase/auth' // 사용자 인증
import 'firebase/firebase-database' // database

import 'dotenv';

const firebaseConfig = {
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  appId: process.env.VUE_APP_ID,
  databaseURL: process.env.VUE_APP_DATABASE_URL
};

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase // 전역으로 사용하기 위함