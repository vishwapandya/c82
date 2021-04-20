import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAJMjP37NY2vlMZKd3yd_e27CVl8PeRDr4",
    authDomain: "book-santa-979c1.firebaseapp.com",
    projectId: "book-santa-979c1",
    storageBucket: "book-santa-979c1.appspot.com",
    messagingSenderId: "345757261116",
    appId: "1:345757261116:web:ba8fa166530c6a87b79239"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();