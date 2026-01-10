function signup() {
  const email = emailInput();
  const username = usernameInput();
  const password = passwordInput();

  if (!email || !username || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[username]) {
    alert("Username already exists");
    return;
  }

  users[username] = { email, password };
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", username);
  location.href = "home.html";
}

function login() {
  const email = emailInput();
  const password = passwordInput();

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  const user = Object.entries(users).find(
    ([_, u]) => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid login");
    return;
  }

  localStorage.setItem("currentUser", user[0]);
  location.href = "home.html";
}

function emailInput() {
  return document.getElementById("email").value.trim();
}
function usernameInput() {
  return document.getElementById("username").value.trim();
}
function passwordInput() {
  return document.getElementById("password").value.trim();
}
