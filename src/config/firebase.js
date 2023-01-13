import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCvYrV-tqolJ0EQ5zmis3_tcWt5y4tUww0",
  authDomain: "email-clone-5fa75.firebaseapp.com",
  projectId: "email-clone-5fa75",
  storageBucket: "email-clone-5fa75.appspot.com",
  messagingSenderId: "283317551745",
  appId: "1:283317551745:web:bf2fe686e3aa460a040380"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider, firebaseApp};
