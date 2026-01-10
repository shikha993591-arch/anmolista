const currentUser = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("anmolista_users")) || [];

if (document.getElementById("chatList")) {
  const chatList = document.getElementById("chatList");
  const search = document.getElementById("searchUser");

  function render(list) {
    chatList.innerHTML = "";
    list.forEach(u => {
      if (u.username === currentUser) return;
      const div = document.createElement("div");
      div.className = "chat-row";
      div.innerHTML = `<div class="avatar"></div><strong>${u.username}</strong>`;
      div.onclick = () => {
        localStorage.setItem("chatWith", u.username);
        location.href = "chat.html";
      };
      chatList.appendChild(div);
    });
  }

  render(users);

  search.oninput = e => {
    render(users.filter(u => u.username.includes(e.target.value)));
  };
}

/* CHAT SCREEN */
if (document.getElementById("sendBtn")) {
  const withUser = localStorage.getItem("chatWith");
  document.getElementById("chatWithName").innerText = withUser;

  const box = document.getElementById("messages");
  const input = document.getElementById("messageInput");

  const key = [currentUser, withUser].sort().join("_");
  let chats = JSON.parse(localStorage.getItem("chats")) || {};

  function draw() {
    box.innerHTML = "";
    (chats[key] || []).forEach(m => {
      const d = document.createElement("div");
      d.className = m.from === currentUser ? "sent" : "received";
      d.innerText = m.text;
      box.appendChild(d);
    });
  }

  document.getElementById("sendBtn").onclick = () => {
    if (!input.value.trim()) return;
    chats[key] = chats[key] || [];
    chats[key].push({ from: currentUser, text: input.value });
    localStorage.setItem("chats", JSON.stringify(chats));
    input.value = "";
    draw();
  };

  draw();
}
