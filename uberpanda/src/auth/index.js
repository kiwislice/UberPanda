

import axios from "axios";


const SERVER = process.env.VUE_APP_SERVER_URI || "https://soft-group-linebot-83714.herokuapp.com";


async function getCookie() {
  var rtn = null;
  await axios.get(SERVER).then(response => console.log(response)).catch(error => console.log(error));
  console.log(rtn);
  return rtn;
}

const AUTH_OBJ = {
  uid: null,
  isAuthenticated: false,
  uname: null,
};

function setLocalStorage(name, data) {
  if (data) {
    var s = JSON.stringify(data);
    localStorage.setItem(name, s);
    console.log(`set localStorage ${name}=${s}`)
  }
}

function getLocalStorage(name) {
  var data = localStorage.getItem(name);
  var rtn = JSON.parse(data);
  console.log(`get localStorage ${name}=${rtn}`)
  return rtn;
}

/**
 * 建立帳號並登入
 * @param {string} username 名稱
 */
async function login(username) {
  var auth = getLocalStorage('auth');
  if (auth && auth.isAuthenticated)
    return;

  await axios.post(SERVER + '/auth/login', { name: username })
    .then(response => {
      var rtn = response.data;
      console.log(response);

      if (rtn.success) {
        auth = Object.assign({}, AUTH_OBJ);
        auth.uid = rtn.uid;
        auth.isAuthenticated = true;
        auth.uname = username;
        setLocalStorage('auth', auth);
      }
    })
    .catch(error => {
      console.log(error);
    });
}


async function getAuthObj() {
  var auth = getLocalStorage('auth');
  if (!auth)
    return Object.assign({}, AUTH_OBJ);
  // var rtn = null;
  // await axios.get(SERVER + `/auth/isAuthenticated/${uid}`)
  //   .then(response => {
  //     rtn = response.data;
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  console.log(auth);
  return auth;
}


export default {
  login,
  getAuthObj,
};


