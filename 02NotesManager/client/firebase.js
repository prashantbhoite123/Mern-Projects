// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECURE_KEY,
  authDomain: "notes-manager-68e3f.firebaseapp.com",
  projectId: "notes-manager-68e3f",
  storageBucket: "notes-manager-68e3f.appspot.com",
  messagingSenderId: "237770355835",
  appId: "1:237770355835:web:c4b137aaed2514c6739ede",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
