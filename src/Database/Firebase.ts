import firebase from "firebase";
import "firebase/database"
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCadS89YrhnjexJ7HdoIoX0YHWBb386ZGY",
    authDomain: "task-manager-358fd.firebaseapp.com",
    projectId: "task-manager-358fd",
    storageBucket: "task-manager-358fd.appspot.com",
    messagingSenderId: "46438231853",
    appId: "1:46438231853:web:077c9534e8b376c44fada4"
  };

const auth = firebase.auth
const database = firebase.database

firebase.initializeApp(firebaseConfig)

export {auth, database, firebase}