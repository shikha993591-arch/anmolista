function signup() {
  const email = email.value;
  const user = username.value;
  const pass = password.value;

  if (!email || !user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("anmolista_user", JSON.stringify({
    email, user
  }));

  window.location.href = "dashboard.html";
}

function login() {
  if (!localStorage.getItem("anmolista_user")) {
    alert("No account found");
    return;
  }
  window.location.href = "dashboard.html";
}
