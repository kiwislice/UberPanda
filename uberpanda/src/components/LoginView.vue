<template>
  <div class="loginview position-fixed">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!loading">
      <!-- show login when not authenticated -->
      <button
        v-if="!isAuthenticated"
        @click="login"
        class="btn btn-info float-right"
      >
        登入
      </button>
      <!-- show logout when authenticated -->
      <button v-if="isAuthenticated" class="btn btn-info">
        {{ user.name }}
      </button>
    </div>

    <div class="card float-right" style="width: 18rem" v-if="!loading">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <input
          type="text"
          v-model="user.name"
          placeholder="店家在Uber或Panda的網址"
          class="mx-auto w-50 form-control mt-1"
        />
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>


<script>
import auth from "../auth/index.js";

export default {
  name: "loginview",
  data() {
    return {
      uid: null,
      isAuthenticated: false,
      loading: true,
      user: {},
    };
  },
  components: {  },
  methods: {
    // Log the user in
    login() {
      // auth.login().then(() => this.checkLogined());
    },
    async checkLogined() {
      var res = await auth.getAuthObj();
      this.uid = res.uid;
      this.isAuthenticated = res.isAuthenticated;
      this.loading = false;
      console.log("loading complete. " + this.isAuthenticated);
    },
  },
  mounted: function () {
    // this.checkLogined();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginview {
  top: 2em;
  right: 2em;
  z-index: 10;
}
.loginview * {
  right: 0;
}
</style>
