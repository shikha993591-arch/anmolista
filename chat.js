const me = localStorage.getItem("currentUser");
if (!me) location.href = "index.html";

if (document.getElementById("me")) {
  document.getElementById("me").innerText = me;
  loadChats();
}

function startChat() {
  const u = document.getElementById("searchUser").value.trim();
  if (!u || u === me) return alert("Invalid user");

  localStorage.setItem("chatWith", u);
  location.href = "chat.html";
}

function loadChats() {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const list = document.getElementById("chatList");
  list.innerHTML = "";

  Object.keys(users).forEach(u => {
    if (u !== me) {
      const div = document.createElement("div");
      div.className = "chat-row";
      div.innerText = u;
      div.onclick = () => {
        localStorage.setItem("chatWith", u);
        location.href = "chat.html";
      };
      list.appendChild(div);
    }
  });
}

if (document.getElementById("chatWith")) {
  document.getElementById("chatWith").innerText = localStorage.getItem("chatWith");
  render();
}

function send() {
  const text = document.getElementById("msg").value;
  if (!text) return;

  const key = me + "_" + localStorage.getItem("chatWith");
  let msgs = JSON.parse(localStorage.getItem(key) || "[]");
  msgs.push({ from: me, text });
  localStorage.setItem(key, JSON.stringify(msgs));
  document.getElementById("msg").value = "";
  render();
}

function render() {
  const box = document.getElementById("messages");
  const key = me + "_" + localStorage.getItem("chatWith");
  let msgs = JSON.parse(localStorage.getItem(key) || "[]");

  box.innerHTML = "";
  msgs.forEach(m => {
    const d = document.createElement("div");
    d.className = m.from === me ? "bubble me" : "bubble";
    d.innerText = m.text;
    box.appendChild(d);
  });
}

function back() {
  location.href = "home.html";
}
function logout() {
  localStorage.clear();
  location.href = "index.html";
}
