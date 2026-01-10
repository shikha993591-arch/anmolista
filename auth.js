function signup(){
  const u = username.value.trim();
  const p = password.value.trim();
  if(!u||!p) return alert("Fill all fields");

  localStorage.setItem("user_"+u, p);
  localStorage.setItem("currentUser", u);
  location.href="home.html";
}

function login(){
  const u = email.value.trim();
  const p = password.value.trim();
  if(localStorage.getItem("user_"+u)===p){
    localStorage.setItem("currentUser", u);
    location.href="home.html";
  } else {
    alert("Invalid login");
  }
}

function logout(){
  localStorage.removeItem("currentUser");
  location.href="index.html";
}
