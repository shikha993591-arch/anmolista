<!-- firebase.js -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBpF3Q1ESL76ywrp2_OVOoOJiFOv322z5M",
    authDomain: "anmolista.firebaseapp.com",
    projectId: "anmolista",
    storageBucket: "anmolista.appspot.com",
    messagingSenderId: "705625304580",
    appId: "1:705625304580:web:294c43512874622ed34f51"
  };

  window.app = initializeApp(firebaseConfig);
  window.auth = getAuth(app);
  window.db = getFirestore(app);
</script>
