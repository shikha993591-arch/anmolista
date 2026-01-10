if (!localStorage.getItem("anmolista_user")) {
  window.location.href = "index.html";
}

const chats = [
  { user: "Rahul", last: "Kya haal bhai?", time: "10:30" },
  { user: "Neha", last: "Call me", time: "09:12" },
  { user: "Amit", last: "Kal milte", time: "Yesterday" }
];

const list = document.getElementById("chatList");
if (list) {
  chats.forEach(c => {
    list.innerHTML += `
      <div class="chat-row" onclick="openChat('${c.user}')">
        <div class="avatar"></div>
        <div class="chat-info">
          <b>${c.user}</b>
          <p>${c.last}</p>
        </div>
        <span class="time">${c.time}</span>
      </div>
    `;
  });
}

function openChat(u) {
  localStorage.setItem("currentChat", u);
  window.location.href = "chat.html";
}

const cu = document.getElementById("chatUser");
if (cu) {
  cu.innerText = localStorage.getItem("currentChat");
  document.getElementById("messages").innerHTML = `
    <div class="msg recv">Hello 👋</div>
    <div class="msg send">Hi bhai 😄</div>
  `;
}

function goBack() {
  window.location.href = "dashboard.html";
}
