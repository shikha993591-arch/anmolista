const firebaseConfig = {
  apiKey: "PASTE_YOUR_KEY",
  authDomain: "anmolista.firebaseapp.com",
  projectId: "anmolista"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* AUTH */
function signup(){
  auth.createUserWithEmailAndPassword(email.value, password.value)
  .then(()=>location='profile.html')
  .catch(e=>msg.innerText=e.message);
}

function login(){
  auth.signInWithEmailAndPassword(email.value, password.value)
  .then(checkProfile)
  .catch(e=>msg.innerText=e.message);
}

function checkProfile(){
  db.collection("users").doc(auth.currentUser.uid).get()
  .then(d=>{
    if(d.exists) location='home.html';
    else location='profile.html';
  });
}

/* PROFILE */
function saveProfile(){
  const u = username.value.toLowerCase();
  db.collection("users").doc(auth.currentUser.uid).set({
    username:u, name:name.value, bio:bio.value
  }).then(()=>location='home.html');
}

/* SEARCH */
function searchUser(){
  results.innerHTML='';
  db.collection("users").where("username","==",search.value.toLowerCase())
  .get().then(q=>{
    q.forEach(d=>{
      results.innerHTML+=`<div onclick="openChat('${d.id}','${d.data().username}')">@${d.data().username}</div>`;
    });
  });
}

/* CHAT */
let otherId='';
function openChat(id,name){
  localStorage.chat=id;
  localStorage.chatName=name;
  location='chat.html';
}

if(location.pathname.includes("chat")){
  otherId=localStorage.chat;
  chatWith.innerText='@'+localStorage.chatName;

  db.collection("messages")
  .where("room","in",[auth.currentUser.uid+otherId,otherId+auth.currentUser.uid])
  .orderBy("time")
  .onSnapshot(s=>{
    messages.innerHTML='';
    s.forEach(d=>{
      const m=d.data();
      messages.innerHTML+=`<div class="${m.from==auth.currentUser.uid?'msg-me':'msg-other'}">${m.text}</div>`;
    });
  });
}

function sendMessage(){
  db.collection("messages").add({
    room:auth.currentUser.uid+otherId,
    from:auth.currentUser.uid,
    text:text.value,
    time:firebase.firestore.FieldValue.serverTimestamp()
  });
  text.value='';
}
