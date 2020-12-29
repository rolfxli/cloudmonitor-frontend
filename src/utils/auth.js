import cookie from "js-cookie";

export function handleLogin(token) {
  cookie.set("token", token);
}


export function handleLogout() {
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
}
