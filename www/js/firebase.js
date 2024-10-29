import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   setDoc,
// } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
  update
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Configuración de Firebase (Obtenido desde Firebase Console)
var firebaseConfig = {
  apiKey: "AIzaSyCtDMH8gX-5pfAWxAZWC0wgMNPWWK_LKeo",
  authDomain: "project-vtsocial.firebaseapp.com",
  databaseURL: "https://project-vtsocial.firebaseio.com",
  projectId: "project-vtsocial",
  storageBucket: "project-vtsocial.appspot.com",
  messagingSenderId: "989775033065",
  appId: "1:989775033065:web:fd581bbd9209a374717678",
  measurementId: "G-4G2SV98HQX",
};

var app = initializeApp(firebaseConfig);
var auth = getAuth(app); // Autenticacion referencia
var dbRealTime = getDatabase(app); // Realtime Database referencia
// var dbFireStore = getFirestore(app); // Firestore referencia





export { auth, signInWithEmailAndPassword, dbRealTime, update, ref};


