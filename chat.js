const db=firebase.firestore();
const me=localStorage.getItem("username");
const other=localStorage.getItem("chatUser");
document.getElementById("chatWith").innerText=other;

const chatId=[me,other].sort().join("_");

db.collection("chats").doc(chatId)
.collection("messages").orderBy("time")
.onSnapshot(snap=>{
  const box=document.getElementById("messages");
  box.innerHTML="";
  snap.forEach(d=>{
    const m=d.data();
    box.innerHTML+=`
      <div style="margin:8px;
      text-align:${m.from===me?'right':'left'};
      color:white">
      <span style="background:#10b98122;
      padding:8px;border-radius:10px">${m.text}</span>
      </div>`;
  });
});

function sendMsg(){
  const t=document.getElementById("msg");
  if(!t.value)return;
  db.collection("chats").doc(chatId)
  .collection("messages").add({
    from:me,text:t.value,time:Date.now()
  });
  t.value="";
}
