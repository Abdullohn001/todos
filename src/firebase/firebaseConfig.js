import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9OIBKtyAxJI518JyRA84jc1bVAbA9txk",
  authDomain: "register-53adb.firebaseapp.com",
  projectId: "register-53adb",
  storageBucket: "register-53adb.appspot.com",
  messagingSenderId: "1064873733201",
  appId: "1:1064873733201:web:9cb166f0fbe1ae42835c70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//data base
export const db = getFirestore(app);
