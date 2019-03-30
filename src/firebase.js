import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBwMx8tZxwWQrSsYzlMAVY4DDicLKCsCQM",
  authDomain: "react-test-38279.firebaseapp.com",
  databaseURL: "https://react-test-38279.firebaseio.com",
  projectId: "react-test-38279",
  storageBucket: "react-test-38279.appspot.com",
  messagingSenderId: "745693230344"
};

firebase.initializeApp(config);

export default firebase;