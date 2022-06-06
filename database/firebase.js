
//import firebase from "firebase/compat/app";
//import "firebase/compat/firestore";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCunM-KwbcwDdLuz2-UpBO-AHtjxG2qk_c",
    authDomain: "fir-bcdb2.firebaseapp.com",
    projectId: "fir-bcdb2",
    storageBucket: "fir-bcdb2.appspot.com",
    messagingSenderId: "488394480127",
    appId: "1:488394480127:web:878946da6e6aa6d3222fca"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore (app)
 
export  {
  auth,
  db
}
//const auth = getAuth(app)
























