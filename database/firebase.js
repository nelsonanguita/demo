
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
//import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCunM-KwbcwDdLuz2-UpBO-AHtjxG2qk_c",
    authDomain: "fir-bcdb2.firebaseapp.com",
    projectId: "fir-bcdb2",
    storageBucket: "fir-bcdb2.appspot.com",
    messagingSenderId: "488394480127",
    appId: "1:488394480127:web:878946da6e6aa6d3222fca"
  };
  
  

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
 
export default{
    firebase,
    db
}
























