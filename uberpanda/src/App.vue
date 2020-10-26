<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-link to="/" class="m-3">店家清單</router-link>
    <router-link to="/foo" class="m-3">新增頁面</router-link>
     <router-view></router-view>
     </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {
    
  },
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
