firebase.initializeApp({
  apiKey:"YOUR_API_KEY",
  authDomain:"anmolista.firebaseapp.com",
  projectId:"anmolista"
});

const auth=firebase.auth();
const db=firebase.firestore();

// LOGIN
function login(){
 auth.signInWithEmailAndPassword(email.value,password.value)
 .then(checkProfile)
 .catch(()=>auth.createUserWithEmailAndPassword(email.value,password.value)
 .then(checkProfile));
}

function checkProfile(){
 const u=auth.currentUser;
 db.collection("users").doc(u.uid).get().then(d=>{
  location=d.exists?"home.html":"setup.html";
 });
}

// SAVE PROFILE
function saveProfile(){
 const u=auth.currentUser;
 db.collection("users").doc(u.uid).set({
  name:name.value,
  username:username.value,
  bio:bio.value
 }).then(()=>location="home.html");
}

// SEARCH USER
if(document.getElementById("searchUser")){
 searchUser.oninput=()=>{
  db.collection("users").where("username","==",searchUser.value)
  .get().then(s=>{
   searchResult.innerHTML="";
   s.forEach(d=>{
    searchResult.innerHTML+=`<div onclick="startChat('${d.id}','${d.data().username}')">${d.data().username}</div>`;
   });
  });
 };
}

// START CHAT
function startChat(uid,username){
 localStorage.chatWith=uid;
 localStorage.chatName=username;
 location="chat.html";
}

// CHAT
function sendMessage(){
 const chatId=[auth.currentUser.uid,localStorage.chatWith].sort().join("_");
 db.collection("messages").doc(chatId).collection("chat").add({
  text:msg.value,
  sender:auth.currentUser.uid,
  time:Date.now()
 });
 msg.value="";
 db.collection("chats").doc(chatId).set({
  users:[auth.currentUser.uid,localStorage.chatWith],
  lastMessage:msg.value
 });
}

if(document.getElementById("messages")){
 chatWith.innerText=localStorage.chatName;
 const chatId=[auth.currentUser.uid,localStorage.chatWith].sort().join("_");
 db.collection("messages").doc(chatId).collection("chat")
 .orderBy("time").onSnapshot(s=>{
  messages.innerHTML="";
  s.forEach(d=>{
   let div=document.createElement("div");
   div.className="msg "+(d.data().sender==auth.currentUser.uid?"me":"other");
   div.innerText=d.data().text;
   messages.appendChild(div);
  });
 });
}

function goHome(){location="home.html";}
