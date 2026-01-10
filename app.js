function tempLogin() {
  const u = document.getElementById("username").value;
  if (!u) return alert("Enter username");
  localStorage.setItem("user", u);
  location.href = "home.html";
}

function startChat() {
  const u = document.getElementById("searchUser").value;
  if (!u) return;
  localStorage.setItem("chatWith", u);
  location.href = "chat.html";
}

function goBack() {
  location.href = "home.html";
}

function sendMsg() {
  const box = document.getElementById("messages");
  const msg = document.getElementById("msg").value;
  if (!msg) return;

  const div = document.createElement("div");
  div.className = "msg-me";
  div.innerText = msg;
  box.appendChild(div);

  document.getElementById("msg").value = "";
  box.scrollTop = box.scrollHeight;
}

window.onload = () => {
  const cu = localStorage.getItem("chatWith");
  if (document.getElementById("chatUser")) {
    document.getElementById("chatUser").innerText = cu;
  }
};
