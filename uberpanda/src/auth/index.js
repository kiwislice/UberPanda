

import Vue from "vue";
import axios from "axios";


const SERVER = process.env.VUE_APP_SERVER_URI || "https://soft-group-linebot-83714.herokuapp.com";


async function getCookie() {
  var rtn = null;
  await axios.get(SERVER).then(response => console.log(response)).catch(error => console.log(error));
  console.log(rtn);
  return rtn;
}

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



let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  // onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  // redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {
          uid: null,
          name: null,
        },
        error: null
      };
    },
    methods: {
      /**
       * 建立帳號並登入
       * @param {string} username 名稱
       */
      login: async function (username) {
        await axios.post(SERVER + '/auth/login', { name: username })
          .then(response => {
            var rtn = response.data;
            console.log(response);

            if (rtn.success) {
              this.user = { uid: rtn.uid, name: username, }
              this.isAuthenticated = true;
              setLocalStorage('auth', this.user);
            }
          })
          .catch(error => {
            this.error = error;
            console.log(error);
          });
      },

      /**
       * 取得LocalStorage儲存的登入資料
       */
      getAuthObj: async function () {
        var auth = getLocalStorage('auth');
        if (!auth)
          return Object.assign({}, { uid: null, name: null, });
        console.log(`getAuthObj=${auth}`);
        return auth;
      },

      /**
       * 檢查uid是否存在
       * @param {string} uid uid
       * @returns {boolean} true=存在
       */
      existByUserId: async function (uid) {
        if (uid) {
          var rtn = null;
          await axios.get(SERVER + `/auth/isAuthenticated/${uid}`)
            .then(response => {
              rtn = response.data;
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        }
        return rtn.isAuthenticated;
      },

    },
    async created() {
      var obj = await this.getAuthObj();
      if (obj.uid && await this.existByUserId(obj.uid)) {
        // 已登入
        this.isAuthenticated = true;
        this.user = obj;
        this.error = null;
      } else {
        localStorage.clear();
        obj = await this.getAuthObj();
        this.isAuthenticated = false;
        this.user = obj;
      }
      this.loading = false;
      console.log("loading complete. " + this.isAuthenticated);
    },
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(Vue, options) {
    console.log(`Auth0Plugin, install`);
    Vue.prototype.$auth = useAuth0(options);
  }
};
