const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");

const config = {
    apiKey: 'AIzaSyAbog8thHCc_2lhPwHcP050Hugi97uYo1o',
    authDomain: 'rainbarrel-dev.firebaseapp.com',
    databaseURL: 'https://rainbarrel-dev.firebaseio.com',
    projectId: 'rainbarrel-dev',
    storageBucket: 'rainbarrel-dev.appspot.com',
    messagingSenderId: '9213028884'
};

export const initFirebase = () => {
    firebase.initializeApp(config);

    var db = firebase.firestore();
  
    return db;
};