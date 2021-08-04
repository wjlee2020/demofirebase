import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// do not share this config key! keep this private

const firebaseConfig = {
    apiKey: "AIzaSyCnRqIY1suQgLM7SrrOADSA9D2TjchUJUg",
    authDomain: "jg-firebase-demo.firebaseapp.com",
    projectId: "jg-firebase-demo",
    storageBucket: "jg-firebase-demo.appspot.com",
    messagingSenderId: "1027718551125",
    appId: "1:1027718551125:web:0afda24a6e4ba0a054a6dc"
  };

firebase.initializeApp(firebaseConfig);

const { FieldValue } = firebase.firestore;

export { firebase, FieldValue };