const me = localStorage.getItem("currentUser");

if(document.getElementById("myUser")){
  myUser.innerText="@"+me;
  loadChats();
}

function startChat(){
  const u = searchUser.value.trim();
  if(!u) return;
  localStorage.setItem("openChat", u);
  location.href="chat.html";
}

function loadChats(){
  chatList.innerHTML="";
  for(let k in localStorage){
    if(k.startsWith("chat_"+me+"_")){
      const u = k.split("_")[2];
      const d = document.createElement("div");
      d.className="chat-item";
      d.innerText=u;
      d.onclick=()=>{localStorage.setItem("openChat",u);location.href="chat.html";}
      chatList.appendChild(d);
    }
  }
}

if(document.getElementById("chatUser")){
  const u = localStorage.getItem("openChat");
  chatUser.innerText=u;
  loadMsgs(u);
}

function sendMsg(){
  const u = localStorage.getItem("openChat");
  const t = msgInput.value.trim();
  if(!t) return;
  const k="chat_"+me+"_"+u;
  const arr=JSON.parse(localStorage.getItem(k)||"[]");
  arr.push({me:true,text:t});
  localStorage.setItem(k,JSON.stringify(arr));
  msgInput.value="";
  loadMsgs(u);
}

function loadMsgs(u){
  messages.innerHTML="";
  const k="chat_"+me+"_"+u;
  const arr=JSON.parse(localStorage.getItem(k)||"[]");
  arr.forEach(m=>{
    const d=document.createElement("div");
    d.className="msg "+(m.me?"me":"other");
    d.innerText=m.text;
    messages.appendChild(d);
  });
}

function goBack(){location.href="home.html";}
