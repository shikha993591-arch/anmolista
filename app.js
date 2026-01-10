// 🔥 FIREBASE CONFIG (ALREADY ADDED)
const firebaseConfig = {
  apiKey: "AIzaSyBpF3Q1ESL76ywrp2_OVOoOJiFOv322z5M",
  authDomain: "anmolista.firebaseapp.com",
  projectId: "anmolista"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* LOGIN */
function login() {
  const u = document.getElementById("username").value.trim();
  if (!u) return alert("Enter username");

  localStorage.setItem("user", u);
  location.href = "home.html";
}

/* START CHAT */
function startChat() {
  const to = document.getElementById("searchUser").value.trim();
  if (!to) return alert("Enter username");

  localStorage.setItem("chatWith", to);
  location.href = "chat.html";
}

/* SEND MESSAGE */
function sendMsg() {
  const msg = document.getElementById("msg").value;
  if (!msg) return;

  db.collection("messages").add({
    from: localStorage.getItem("user"),
    to: localStorage.getItem("chatWith"),
    text: msg,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("msg").value = "";
}

/* LOAD CHAT */
function loadChat() {
  const me = localStorage.getItem("user");
  const other = localStorage.getItem("chatWith");

  db.collection("messages")
    .orderBy("time")
    .onSnapshot(snap => {
      const box = document.getElementById("messages");
      box.innerHTML = "";

      snap.forEach(doc => {
        const d = doc.data();
        if (
          (d.from === me && d.to === other) ||
          (d.from === other && d.to === me)
        ) {
          const div = document.createElement("div");
          div.className = d.from === me ? "msg-me" : "msg-other";
          div.innerText = d.text;
          box.appendChild(div);
        }
      });

      box.scrollTop = box.scrollHeight;
    });
}

function goBack() {
  location.href = "home.html";
}

window.onload = () => {
  if (document.getElementById("chatUser")) {
    document.getElementById("chatUser").innerText =
      localStorage.getItem("chatWith");
    loadChat();
  }
};
        
