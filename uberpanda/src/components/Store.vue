<template>
  <div>
    <div class="editstore">
      <input type="text" v-model="editStore.name" placeholder="店名" class="mx-auto w-50 form-control"/>
      <input type="text" v-model="editStore.url" placeholder="URL" class="mx-auto w-50 form-control mt-1"/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="editStore.eaten" for="eatenCheck"/>
        <label class="form-check-label" for="eatenCheck">
          吃過了
        </label>
      </div>
      <button label="新增" @click="createStore($event)" class="mx-auto btn btn-primary my-1">新增</button>
    </div>
    <div class="storelist">
      <div v-for="store in stores" :key="store.id">
        {{ store.id }}
        {{ store.name }}
      </div>
    </div>
  </div>
</template>

<script>
// import InputText from "primevue/inputtext";
// import Button from "primevue/button";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

const ALL_STORE = gql`
  query allStore {
    store(distinct_on: id) {
      id
      name
      url
    }
  }
`;

const ADD_STORE = gql`
  mutation addStore($name: String!, $url: String!, $eaten: Boolean!) {
    insert_store_one(object: {name: $name, url: $url, eaten: $eaten}) {
      id
    }
  }
`;

export default {
  name: "Store",
  data() {
    return {
      value: "",
      stores: [{ id: 1, name: "wait", url: "wait" }],
      editStore: {name:null,url:null,eaten:false},
    };
  },
  methods: {
    createStore: function () {
      // var vm = this.$data;
      var o = Object.assign({}, this.editStore);
      console.log(o);
      axios
        .post("https://evident-lamprey-59.hasura.app/v1/graphql", {
          query: print(ADD_STORE),
          variables: o,
        })
        .then((response) => console.log(response));
    },
    getStores: function () {
      axios
        .post("https://evident-lamprey-59.hasura.app/v1/graphql", {
          query: print(ALL_STORE),
        })
        .then((response) => (this.stores = response.data.data.store));
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
