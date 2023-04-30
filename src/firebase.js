// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBcwo94EE13cT_XAL4JXuCucXb-hmMnG-4",
  authDomain: "swapi-api-76c49.firebaseapp.com",
  projectId: "swapi-api-76c49",
  storageBucket: "swapi-api-76c49.appspot.com",
  messagingSenderId: "237339257322",
  appId: "1:237339257322:web:47a52a8571b546bd2bea93"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)