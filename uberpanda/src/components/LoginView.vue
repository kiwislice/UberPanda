<template>
  <div class="loginview position-fixed">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button
        v-if="!$auth.isAuthenticated"
        @click="clickUserIcon"
        class="btn btn-info float-right"
      >
        路人
      </button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" class="btn btn-info">
        {{ $auth.user.name }}
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
  name: "loginview",
  data() {
    return {
      uid: null,
      loading: true,
      username: null,
      showLoginCard: false,
      loginable: false,
    };
  },
  components: {},
  watch: {
    username: function (newVal, oldVal) {
      this.loginable = !!(newVal && newVal.trim());
    },
  },
  methods: {
    // Log the user in
    clickUserIcon() {
      this.showLoginCard = !this.showLoginCard;
    },
    login() {
      console.log("login.");
      this.$auth.login(this.username).then(() => {
        this.showLoginCard = false;
        this.uid = this.$auth.user.uid;
        this.username = this.$auth.user.name;
      });
    },
  },
  mounted: function () {},
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
