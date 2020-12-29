import cookie from "js-cookie";

export function handleLogin(token, userid, email) {
  cookie.set("token", token);
  cookie.set("userid", userid);
  cookie.set("email", email);
}


export function handleLogout() {
  cookie.remove("token");
  cookie.remove("userid");
  cookie.remove("email");
  window.localStorage.setItem("logout", Date.now());
}


export function validate_token(token) {

    if (token == null) {
        return false
    }
    

}