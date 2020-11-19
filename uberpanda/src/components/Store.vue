<template>
  <div id="Store">
    <div class="editstore text-center">
      <input
        type="text"
        v-model="editStore.name"
        placeholder="店家名稱"
        class="mx-auto w-50 form-control"
      />
      <input
        type="text"
        v-model="editStore.url"
        placeholder="店家在Uber或Panda的網址"
        class="mx-auto w-50 form-control mt-1"
      />
      <button
        label="新增"
        @click="createStore($event)"
        class="mx-auto btn btn-primary my-1 animate__animated"
      >
        新增
      </button>
      <div
        id="msg"
        class="alert alert-success animate__animated animate__delay-1s d-none"
        role="alert"
      >
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
import db from "./Repository.js";
import tools from "./Tools";

export default {
  name: "Store",
  data() {
    return {
      value: "",
      stores: [{ id: 1, name: "wait", url: "wait" }],
      editStore: { name: null, url: null, eaten: false },
      msg: "新增完成",
    };
  },
  methods: {
    createStore: function (event) {
      // var vm = this.$data;
      var o = Object.assign({}, this.editStore);
      console.log(o);
      db.createStore(o, (response) => console.log(response));
      tools.addAnimate(event.srcElement, "animate__fadeIn");
      tools.removeClass(document.getElementById("msg"), "d-none");
      tools.addAnimate(document.getElementById("msg"), "animate__fadeOut");
    },
    getStores: function () {
      db.getAllStores((response) => (this.stores = response.data.data.store));
    },
  },
  mounted: function () {
    this.getStores();
  },
  components: {
    // InputText,
    // Button,
    // HelloWorld
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
