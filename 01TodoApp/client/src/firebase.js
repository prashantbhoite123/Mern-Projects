// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todoapp-d73c0.firebaseapp.com",
  projectId: "todoapp-d73c0",
  storageBucket: "todoapp-d73c0.appspot.com",
  messagingSenderId: "234606864630",
  appId: "1:234606864630:web:2ceb32d2ebc0c0598da4d7",
  measurementId: "G-G4L9RRX5EL",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
