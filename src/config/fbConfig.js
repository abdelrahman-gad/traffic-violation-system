import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';
import 'firebase/storage';
 
 // Your web app's Firebase configuration
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDsojfNzlpR2cck6YlsfQ4FYF-thvcg7OM",
    authDomain: "graduation-d12cb.firebaseapp.com",
    databaseURL: "https://graduation-d12cb.firebaseio.com",
    projectId: "graduation-d12cb",
    storageBucket: "graduation-d12cb.appspot.com",
    messagingSenderId: "676283050870",
    appId: "1:676283050870:web:3c9cef5b04cc791924a857"

};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  



 export  const storage = firebase.storage();

  export  {   firebase as default};  

