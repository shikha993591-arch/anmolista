function login(){
  const u=document.getElementById("username").value;
  if(!u) return alert("Enter anything");
  localStorage.me=u;
  location='home.html';
}

function go(p){location=p}
function back(){history.back()}

const demoUsers=["anmol","rahul","sneha","neha"];

if(document.getElementById("chatList")){
  chatList.innerHTML=demoUsers.map(u=>`
    <div class="chat" onclick="openChat('${u}')">
      <b>${u}</b><br><small>Tap to chat</small>
    </div>
  `).join("");
}

function openChat(u){
  localStorage.chat=u;
  location='chat.html';
}

if(document.getElementById("chatName")){
  chatName.innerText=localStorage.chat;
}

function send(){
  const t=msg.value;
  if(!t) return;
  messages.innerHTML+=`<div class="bubble me">${t}</div>`;
  msg.value="";
}

if(document.getElementById("me")){
  me.innerText=localStorage.me;
}

function searchUser(){
  results.innerHTML=demoUsers
    .filter(u=>u.includes(searchInput.value))
    .map(u=>`<div class="chat" onclick="openChat('${u}')">${u}</div>`)
    .join("");
}

