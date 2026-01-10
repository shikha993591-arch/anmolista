import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpF3Q1ESL76ywrp2_OVOoOJiFOv322z5M",
  authDomain: "anmolista.firebaseapp.com",
  projectId: "anmolista",
  storageBucket: "anmolista.firebasestorage.app",
  messagingSenderId: "705625304580",
  appId: "1:705625304580:web:294c43512874622ed34f51"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
