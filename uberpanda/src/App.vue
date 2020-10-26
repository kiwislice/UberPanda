<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-link to="/">Go to </router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-link to="/foo">Go to Foo</router-link>
     <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="card">
      <h5>Basic</h5>
      <InputText type="text" v-model="value" />
      <span :style="{marginLeft: '.5em'}">{{value}}</span>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import InputText from 'primevue/inputtext';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
export default {
  name: 'App',
  data() {
		return {
            value: '',
		}
	},
  components: {
    InputText,
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
