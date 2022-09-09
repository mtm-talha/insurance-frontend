import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore"
import { getDatabase } from "firebase/database"

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }
// const firebaseConfig = {
//   apiKey: "AIzaSyD1T4aB2FdaiOKKUNZLcLuTLX7UUTnm4tg",

//   authDomain: "advancedsmartfinancial.firebaseapp.com",

//   projectId: "advancedsmartfinancial",

//   storageBucket: "advancedsmartfinancial.appspot.com",

//   messagingSenderId: "465781841545",

//   appId: "1:465781841545:web:63b6b01a35a61e9b183058",
//   cacheSizeBytes: CACHE_SIZE_UNLIMITED,
// }
const firebaseConfig = {
  apiKey: "AIzaSyA4Pl4qzhIHpmllxl4rsGfgCNg7_M3Ewsg",
  authDomain: "advancedinsuranceonline.firebaseapp.com",
  projectId: "advancedinsuranceonline",
  storageBucket: "advancedinsuranceonline.appspot.com",
  messagingSenderId: "215279607087",
  appId: "1:215279607087:web:15a1195c262a6e030215da",
  measurementId: "G-7L62NP9CQF"
};

const app = initializeApp(firebaseConfig)

// export const auth = getAuth(app)
// export const db = getFirestore(app)
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
})
export const rtdb = getDatabase(app)
