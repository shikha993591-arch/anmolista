const firebaseConfig = {
  apiKey: "AIzaSyBpF3Q1ESL76ywrp2_OVOoOJiFOv322z5M",
  authDomain: "anmolista.firebaseapp.com",
  projectId: "anmolista"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// LOGIN
function login(){
  const e = email.value;
  const p = password.value;
  auth.signInWithEmailAndPassword(e,p)
    .then(()=> location.href="chat.html")
    .catch(err=>alert(err.message));
}

function signup(){
  const e = email.value;
  const p = password.value;
  auth.createUserWithEmailAndPassword(e,p)
    .then(()=> location.href="chat.html")
    .catch(err=>alert(err.message));
}

// CHAT
if(typeof db !== "undefined"){
  auth.onAuthStateChanged(u=>{
    if(!u) return;
    db.collection("messages")
      .orderBy("time")
      .onSnapshot(s=>{
        chat.innerHTML="";
        s.forEach(d=>{
          const m=d.data();
          const div=document.createElement("div");
          div.className="msg "+(m.uid===u.uid?"me":"other");
          div.textContent=m.text;
          chat.appendChild(div);
        });
        chat.scrollTop=chat.scrollHeight;
      });
  });
}

function send(){
  const text=msg.value;
  if(!text) return;
  db.collection("messages").add({
    text,
    uid:auth.currentUser.uid,
    time:firebase.firestore.FieldValue.serverTimestamp()
  });
  msg.value="";
}
