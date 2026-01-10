import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, setDoc, addDoc, collection,
  query, where, getDocs, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.signup = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  const cred = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db,"users",cred.user.uid),{
    username,
    email
  });

  location.href = "home.html";
};

window.login = async () => {
  await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
  location.href = "home.html";
};

window.startChat = async () => {
  const q = query(
    collection(db,"users"),
    where("username","==",searchUser.value)
  );
  const snap = await getDocs(q);
  snap.forEach(d=>{
    localStorage.setItem("chatUser",d.id);
    location.href="chat.html";
  });
};

window.sendMessage = async () => {
  await addDoc(collection(db,"messages"),{
    from: auth.currentUser.uid,
    to: localStorage.getItem("chatUser"),
    text: messageInput.value,
    time: Date.now()
  });
  messageInput.value="";
};

if (location.pathname.includes("chat")) {
  onSnapshot(collection(db,"messages"),snap=>{
    messages.innerHTML="";
    snap.forEach(d=>{
      const m=d.data();
      const div=document.createElement("div");
      div.className="msg "+(m.from===auth.currentUser.uid?"me":"other");
      div.innerText=m.text;
      messages.appendChild(div);
    });
  });
}
