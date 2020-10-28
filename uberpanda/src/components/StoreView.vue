<template>
  <div id="storeview" class="container">
    <div class="row">
      <div class="col">
        <a @click="onFoodpandaClick">
          <img
            alt="foodpanda"
            src="../assets/foodpanda.jpg"
            class="rounded img-thumbnail"
            style="max-width: 200px; cursor: pointer"
          />
        </a>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="(value, name) in foodpanda"
            :key="name"
          >
            <div class="">
              <a :href="value.url" target="_blank">{{ value.name }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="col">
        <a @click="onUbereatClick">
          <img
            alt="ubereat"
            src="../assets/ubereat.jpg"
            class="rounded img-thumbnail"
            style="max-width: 200px; cursor: pointer"
        /></a>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="(value, index) in ubereat"
            :key="index"
          >
            <div class="col-sm-12">
              <a :href="value.url" target="_blank">{{ value.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      value: "",
      products: null,

      stores: [],
      ubereat: [],
      foodpanda: [],
      currentPlatform: "foodpanda",
    };
  },
  components: {},
  methods: {
    query: function () {
      axios
        .post("https://evident-lamprey-59.hasura.app/v1/graphql", {
          query: `query MyQuery {
              store(distinct_on: id) {
                id
                name
                url
              }
            } `,
        })
        .then(
          (response) => (
            (this.stores = response.data.data.store),
            this.stores.forEach((element) => {
              console.log(element);
              if (element.url.search("ubereat") > 0) this.ubereat.push(element);
              if (element.url.search("foodpanda") > 0)
                this.foodpanda.push(element);
            })
          )
        );
    },
    onFoodpandaClick: function () {
      this.currentPlatform = "foodpanda";
    },
    onUbereatClick: function () {
      this.currentPlatform = "ubereat";
    },
  },
  created: function () {
    this.query();
  },
};
</script>

<style>
</style>