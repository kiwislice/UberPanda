
<template >
  <div class="page-wrapper chiller-theme" :class="toggled">
    <a
      id="show-sidebar"
      class="btn btn-sm btn-dark"
      href="#"
      v-on:click="sidebarOpen()"
      style="z-index:1040"
    >
      <i class="fas fa-bars"></i>
    </a>
    <nav id="sidebar" class="sidebar-wrapper" style="z-index:1040">
      <div class="sidebar-content">
        <div class="sidebar-brand">
          <a href="#" style="font-size: 25px;text-transform: capitalize;">FIS-UberPanda</a>
          <div id="close-sidebar" v-on:click="sidebarClose()">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="sidebar-header">
          <div class="user-pic">
            <img
              class="img-responsive img-rounded"
              src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
              alt="User picture"
            />
          </div>
          <div class="user-info">
            <span class="user-name"
              >Jhon
              <strong>Smith</strong>
            </span>
            <span class="user-role">Administrator</span>
            <span class="user-status">
              <i class="fa fa-circle"></i>
              <span>Online</span>
            </span>
          </div>
        </div>
        <!-- sidebar-header  -->
         <!-- s<div class="sidebar-search">
          <div>
            <div class="input-group">
              <input
                type="text"
                class="form-control search-menu"
                placeholder="Search..."
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>-->
        <!-- sidebar-search  -->
        <div class="sidebar-menu">
          <ul>
              <li class="header-menu">
              <span>Menu</span>
            </li>
            <li>
              <LoginView></LoginView>
            </li>
            <li>
              <router-link
                to="/"
                :class="classFunc(isHoveringRoot)"
                v-on:mouseover.native="isHoveringRoot = true"
                v-on:mouseleave.native="isHoveringRoot = false"
                exact
              >
                <i class="fa fa-shopping-cart"></i>
                <span>店家清單</span></router-link
              >
            </li>
            <li>
              <router-link
                to="/foo"
                :class="classFunc(isHoveringfoo)"
                v-on:mouseover.native="isHoveringfoo = true"
                v-on:mouseleave.native="isHoveringfoo = false"
                ><i class="far fa-edit"></i>
                <span>店家新增</span></router-link
              >
            </li>
            <li>
              <router-link
                to="/pricecomputer"
                :class="classFunc(isHoveringPricecomputer)"
                v-on:mouseover.native="isHoveringPricecomputer = true"
                v-on:mouseleave.native="isHoveringPricecomputer = false"
                ><i class="fas fa-dollar-sign"></i>
                <span>金額計算</span></router-link
              >
            </li>
            <li class="header-menu">
              <span>測試</span>
            </li>
            <li class="sidebar-dropdown" v-on:click="toggle()">
              <a href="#">
                <i class="fa fa-tachometer-alt"></i>
                <span>Dashboard測試</span>
                <span class="badge badge-pill badge-warning">New</span>
              </a>
              <slide-up-down :active="active" :duration="500" class="slide-up-down">
                <ul>
                  <li>
                    <a href="#"
                      >Dashboard 1
                    </a>
                  </li>
                  <li>
                    <a href="#">Dashboard 2</a>
                  </li>
                  <li>
                    <a href="#">Dashboard 3</a>
                  </li>
                </ul>
              </slide-up-down>
            </li>
          </ul>
        </div>
        <!-- sidebar-menu  -->
      </div>
      <!-- sidebar-content  -->
      <div class="sidebar-footer">
        <a href="#">
          <i class="fa fa-bell"></i>
          <span class="badge badge-pill badge-warning notification">3</span>
        </a>
        <a href="#">
          <i class="fa fa-envelope"></i>
          <span class="badge badge-pill badge-success notification">7</span>
        </a>
        <a href="#">
          <i class="fa fa-cog"></i>
          <span class="badge-sonar"></span>
        </a>
        <a href="#">
          <i class="fa fa-power-off"></i>
        </a>
      </div>
    </nav>
    <!-- sidebar-wrapper  -->
    <div class="page-content">
      <div class="container-fluid">
       <!-- <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="height:50px;background-color: #2196F3;"></nav>-->
         <router-view ></router-view>
      </div>
    </div>
    <!-- page-content" -->
  </div>
</template>

<script>
import LoginView from "./components/LoginView.vue";

export default {
  name: "App",
  data() {
    return {
      currentPage: 1,
      isHoveringRoot: false,
      isHoveringfoo: false,
      isHoveringPricecomputer: false,
      toggled: "toggled",
      active: false,
    };
  },
  methods: {
    changePageTo: function (index) {
      console.log("changePageTo " + index);
      this.currentPage = index;
    },
    classFunc: function (isHovering) {
      return [
        // "m-3",
        // "nav-link",
        { animate__animated: isHovering },
        { animate__fadeIn: isHovering },
      ];
    },
    sidebarOpen: function () {
      this.toggled = "toggled";
    },
    sidebarClose: function () {
      this.toggled = null;
    },
    toggle() {
      this.active = !this.active;
    },
  },
  components: {
    LoginView,
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
a.exact-active.active.m-3.nav-link {
  color: #fff;
  background-color: #007bff;
  opacity: 1;
}
a.m-3.nav-link {
  color: #fff;
  background-color: #007bff;
  opacity: 0.3;
}
/* a.backg {
    color: #fff;
    background-color: #007bff;
    opacity:0.5;
} */
</style>
