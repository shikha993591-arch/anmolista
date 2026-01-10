const firebaseConfig = {
  apiKey: "AIzaSyBpF3Q1ESL76ywrp2_OVOoOJiFOv322z5M",
  authDomain: "anmolista.firebaseapp.com",
  projectId: "anmolista",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup(){
  const email=document.getElementById("email").value;
  const pass=document.getElementById("password").value;
  const username=document.getElementById("username").value;

  if(!email||!pass||!username) return alert("Fill all fields");

  auth.createUserWithEmailAndPassword(email,pass)
  .then(res=>{
    localStorage.setItem("username",username);
    window.location="home.html";
  })
  .catch(e=>alert(e.message));
}

function login(){
  const email=document.getElementById("email").value;
  const pass=document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,pass)
  .then(()=>{
    window.location="home.html";
  })
  .catch(e=>alert(e.message));
}
