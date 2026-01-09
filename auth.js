<script type="module">
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  window.login = () => {
    signInWithEmailAndPassword(auth,
      email.value,
      password.value
    ).then(() => {
      location.href = "chat.html";
    }).catch(e => alert(e.message));
  };

  window.signup = () => {
    createUserWithEmailAndPassword(auth,
      email.value,
      password.value
    ).then(() => {
      location.href = "chat.html";
    }).catch(e => alert(e.message));
  };
</script>
