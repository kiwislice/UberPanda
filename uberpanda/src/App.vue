<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <ul class="nav nav-pills justify-content-center">
      <router-link
        to="/"
        :class="classFunc(isHoveringRoot)"
        v-on:mouseover.native="isHoveringRoot = true"
         v-on:mouseleave.native="isHoveringRoot = false"
        exact
        >店家清單</router-link
      >
      <router-link
        to="/foo"
        :class="classFunc(isHoveringfoo)"
        v-on:mouseover.native="isHoveringfoo = true"
         v-on:mouseleave.native="isHoveringfoo = false"
        >新增頁面</router-link
      >
      <router-link
        to="/pricecomputer"
        :class="classFunc(isHoveringPricecomputer)"
      v-on:mouseover.native="isHoveringPricecomputer = true"
         v-on:mouseleave.native="isHoveringPricecomputer = false"
        >金額計算</router-link
      >
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
      isHoveringRoot: false,
      isHoveringfoo: false,
      isHoveringPricecomputer: false,
    };
  },
  methods: {
    changePageTo: function(index) {
      console.log("changePageTo " + index);
      this.currentPage = index;
    },
    classFunc: function(isHovering) {
      return [
        "m-3",
        "nav-link",
        { animate__animated: isHovering },
        { animate__fadeIn: isHovering },
      ];
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
