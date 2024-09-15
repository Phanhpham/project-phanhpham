// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOZqGghWyCE5VmAWbpVu9CMpoxhRwUZVE",
  authDomain: "phanh-1a9d5.firebaseapp.com",
  projectId: "phanh-1a9d5",
  storageBucket: "phanh-1a9d5.appspot.com",
  messagingSenderId: "821183768730",
  appId: "1:821183768730:web:3e64465c307182909f5723",
  measurementId: "G-6MSDNC63ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);