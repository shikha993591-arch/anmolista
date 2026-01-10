function login() {
  const u = document.getElementById("username").value;
  if(!u) return alert("Enter username");
  localStorage.setItem("user", u);
  location.href = "home.html";
}

function signup() {
  login();
}

function searchUser() {
  const u = document.getElementById("searchUser").value;
  if(!u) return;
  localStorage.setItem("chatWith", u);
  location.href = "chat.html";
}

function goBack() {
  location.href = "home.html";
}

if(document.getElementById("chatWith")) {
  document.getElementById("chatWith").innerText =
    localStorage.getItem("chatWith");
}

function sendMsg() {
  const msg = document.getElementById("msg").value;
  if(!msg) return;

  const div = document.createElement("div");
  div.className = "msg me";
  div.innerText = msg;
  document.getElementById("messages").appendChild(div);
  document.getElementById("msg").value="";
}
