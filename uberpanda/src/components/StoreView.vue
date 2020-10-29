<template>
  <div id="storeview" class="container">
    <div class="row">
      <div class="col">
        <a
          @click="onFoodpandaClick"
          href="https://www.foodpanda.com.tw/restaurants/new?lat=22.6506979&lng=120.3038248&vertical=restaurants"
        >
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
        <a
          @click="onUbereatClick"
          href="https://www.ubereats.com/tw/feed?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMiVFNSU4RCU5QSVFNiU4NCU5QiVFNCVCOCU4MCVFOCVCNyVBRjM2NiVFOCU5OSU5RjE0JUU4JTk5JTlGJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSlU1bnkwZnNFYmpRUlhfQWlMSGl6a2tBJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTIyLjY1MDU1MDYlMkMlMjJsb25naXR1ZGUlMjIlM0ExMjAuMzAzNjI1NCU3RA%3D%3D"
        >
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
// import axios from "axios";
import db from "./Repository.js";

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
      db.getAllStores(
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