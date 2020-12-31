import cookie from "js-cookie";
import axios from 'axios'

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


export function validate_token(token, userid) {

    if (token == null) {
        return false
    }

    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}users/get_user_by_token?token=${token}`
    })
    .then(response => {
        const data = response.data;
        console.log("USERID")
        console.log(userid)
        console.log(data.userid)
        if (parseInt(data.userid) === parseInt(userid)) {
            console.log("its true")
            return true
        }

        return false;
    })
    

}