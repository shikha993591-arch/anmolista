function getUsers() {
  return JSON.parse(localStorage.getItem("anmolista_users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("anmolista_users", JSON.stringify(users));
}

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

signupBtn.onclick = () => {
  const email = emailInput();
  const username = usernameInput();
  const password = passwordInput();

  if (!email || !username || !password) {
    alert("All fields required");
    return;
  }

  const users = getUsers();
  if (users.find(u => u.email === email || u.username === username)) {
    alert("User already exists");
    return;
  }

  users.push({ email, username, password });
  saveUsers(users);

  localStorage.setItem("currentUser", username);
  location.href = "home.html";
};

loginBtn.onclick = () => {
  const value = emailInput();
  const password = passwordInput();

  const user = getUsers().find(
    u =>
      (u.email === value || u.username === value) &&
      u.password === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", user.username);
  location.href = "home.html";
};

function emailInput() {
  return document.getElementById("email").value.trim();
}
function usernameInput() {
  return document.getElementById("username").value.trim();
}
function passwordInput() {
  return document.getElementById("password").value.trim();
}
