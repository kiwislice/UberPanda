<template>
  <div class="storescore">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button
        v-if="!isAuthenticated"
        @click="clickUserIcon"
        class="btn btn-info float-right"
      >
        路人
      </button>
      <!-- show logout when authenticated -->
      <button v-if="isAuthenticated" class="btn btn-info">
        {{ username }}
      </button>
    </div>

    <div class="card float-right" style="width: 18rem" v-if="showLoginCard">
      <div class="card-body">
        <h5 class="card-title">建立帳號</h5>
        <p class="card-text">隨便給個名稱就好</p>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="在這裡打字"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="login"
              :disabled="!loginable"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "storescore",
  data() {
    return {
      uid: null,
      isAuthenticated: false,
      loading: true,
      username: null,
      showLoginCard: false,
      loginable: false,
    };
  },
  components: {},
  watch: {
    // username: function (newVal, oldVal) {
    //   this.loginable = !!(newVal && newVal.trim());
    // },
  },
  methods: {
    // Log the user in
    clickUserIcon() {
      this.showLoginCard = !this.showLoginCard;
    },
    login() {
      console.log("login.");
      auth.login(this.username).then(() => {
        this.checkLogined();
        this.showLoginCard = false;
      });
    },
    async checkLogined() {
      var res = await auth.getAuthObj();
      this.uid = res.uid;
      this.isAuthenticated = res.isAuthenticated;
      this.username = res.uname;
      this.loading = false;
      // console.log("username: " + this.username);
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

</style>
