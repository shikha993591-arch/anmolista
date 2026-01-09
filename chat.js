<script type="module">
  import {
    collection, addDoc, onSnapshot, query, orderBy
  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

  const q = query(collection(db, "messages"), orderBy("time"));

  onSnapshot(q, snap => {
    messages.innerHTML = "";
    snap.forEach(d => {
      messages.innerHTML += `<div class="bubble">${d.data().text}</div>`;
    });
  });

  window.send = async () => {
    await addDoc(collection(db,"messages"),{
      text: msg.value,
      time: Date.now()
    });
    msg.value="";
  };
</script>
