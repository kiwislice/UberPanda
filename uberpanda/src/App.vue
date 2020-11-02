<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <ul class="nav nav-pills justify-content-center">
      <router-link to="/" class="m-3 nav-link" exact>店家清單</router-link>
      <router-link to="/foo" class="m-3 nav-link">新增頁面</router-link>
      <router-link to="/pricecomputer" class="m-3 nav-link">金額計算</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    changePageTo: function (index) {
      console.log("changePageTo " + index);
      this.currentPage = index;
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
