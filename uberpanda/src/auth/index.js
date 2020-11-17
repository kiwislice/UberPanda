

import axios from "axios";

const SERVER = "http://localhost:3000";


async function getCookie() {
  var rtn = null;
  await axios.get(SERVER).then(response => console.log(response)).catch(error => console.log(error));
  console.log(rtn);
  return rtn;
}

const AUTH_OBJ = {
  uid: null,
  isAuthenticated: false,
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


async function login() {
  var auth = getLocalStorage('auth');
  if (auth && auth.isAuthenticated)
    return;

  var rtn = {};
  await axios.get(SERVER + '/auth/login')
    .then(response => {
      rtn = response.data;
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  if (rtn.uid) {
    auth = Object.assign({}, AUTH_OBJ);
    auth.uid = rtn.uid;
    auth.isAuthenticated = true;
    setLocalStorage('auth', auth);
  }
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


