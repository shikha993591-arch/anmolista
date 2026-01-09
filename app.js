firebase.initializeApp({
  apiKey:"YOUR_KEY",
  authDomain:"anmolista.firebaseapp.com",
  projectId:"anmolista"
});

const db=firebase.firestore();
const auth=firebase.auth();

// SAVE PROFILE
function saveProfile(){
 const u=auth.currentUser;
 db.collection("users").doc(u.uid).set({
  name:name.value,
  username:username.value,
  bio:bio.value,
  online:true,
  lastSeen:Date.now()
 });
 alert("Saved");
}

// SEND MESSAGE
function sendMessage(){
 const chatId=localStorage.chatId;
 db.collection("messages").doc(chatId)
 .collection("chat").add({
  text:msg.value,
  sender:auth.currentUser.uid,
  time:Date.now()
 });
 msg.value="";
}

// LISTEN CHAT
function loadChat(chatId){
 db.collection("messages").doc(chatId)
 .collection("chat").orderBy("time")
 .onSnapshot(s=>{
  messages.innerHTML="";
  s.forEach(d=>{
   let div=document.createElement("div");
   div.className="msg "+(d.data().sender==auth.currentUser.uid?"me":"other");
   div.innerText=d.data().text;
   messages.appendChild(div);
  });
 });
}
