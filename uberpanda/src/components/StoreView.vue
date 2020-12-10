<template>
  <div id="storeview">
    <div class="row">
      <div class="col text-center">
        <a @click="onFoodpandaClick" href="https://www.foodpanda.com.tw/restaurants/new?lat=22.6506979&lng=120.3038248&vertical=restaurants">
          <img alt="foodpanda" src="../assets/foodpanda.jpg" class="rounded img-thumbnail mb-1" style="max-width: 200px; cursor: pointer" />
        </a>

        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="border: none" v-for="(value, index) in foodpanda" :key="index">
            <div class="">
              <SingleStore v-model="foodpanda[index]" @single-store="getStore"></SingleStore>
            </div>
          </li>
        </ul>
      </div>
      <div class="col text-center">
        <a
          @click="onUbereatClick"
          href="https://www.ubereats.com/tw/feed?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMiVFNSU4RCU5QSVFNiU4NCU5QiVFNCVCOCU4MCVFOCVCNyVBRjM2NiVFOCU5OSU5RjE0JUU4JTk5JTlGJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSlU1bnkwZnNFYmpRUlhfQWlMSGl6a2tBJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTIyLjY1MDU1MDYlMkMlMjJsb25naXR1ZGUlMjIlM0ExMjAuMzAzNjI1NCU3RA%3D%3D"
        >
          <img alt="ubereat" src="../assets/ubereat.jpg" class="rounded img-thumbnail mb-1" style="max-width: 200px; cursor: pointer"
        /></a>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="border: none" v-for="(value, index) in ubereat" :key="index">
            <div class="">
              <SingleStore v-model="ubereat[index]" @single-store="getStore"></SingleStore>
              <!-- <StoreScore v-model="ubereat[index]"></StoreScore> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <CommentDialog v-show="showModal" v-model="store" ref="input"></CommentDialog>
  </div>
</template>

<script>
// import axios from "axios";
import db from "./Repository.js";
import SingleStore from "../components/SingleStore.vue";
import StoreScore from "../components/StoreScore.vue";
export default {
  name: "App",
  data() {
    return {
      value: "",
      products: null,
      test:
        "https://www.ubereats.com/kaohsiung/food-delivery/%E8%B1%AA%E9%A3%BD%E6%8E%92%E9%AA%A8%E4%BE%BF%E7%95%B6/OgxyZ1-nSuup42Ol3-3Rgw?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMiVFNSU4RCU5QSVFNiU4NCU5QiVFNCVCOCU4MCVFOCVCNyVBRjM2NiVFOCU5OSU5RjE0JUU4JTk5JTlGJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSlU1bnkwZnNFYmpRUlhfQWlMSGl6a2tBJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTIyLjY1MDU1MDYlMkMlMjJsb25naXR1ZGUlMjIlM0ExMjAuMzAzNjI1NCU3RA%3D%3D",
      stores: [],
      ubereat: [],
      foodpanda: [],
      currentPlatform: "foodpanda",
      showModal:false,
      store:{}
    };
  },
  components: { SingleStore, StoreScore },
  methods: {
    query: function () {
      db.getAllStores(
        (response) => (
          (this.stores = response.data.data.store),
          //  console.log(response.data.data.store),
          this.stores.forEach((element) => {
            if (element.url.search("ubereat") > 0) this.ubereat.push(element);
            if (element.url.search("foodpanda") > 0) this.foodpanda.push(element);
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
    getStore: function (value,param) {
      if(value === true){
         Object.assign(this.store,param); 
        this.$refs.input.singleStore = param;
        this.getScoreComment(param.id);
      }
     this.showModal = value;
    //  console.log(this.value);
    },
    getScoreComment:function(store_id){
      var o = {};
      o.user_id = this.$auth.user.uid;
      o.store_id = store_id;
      db.getOneStoreScore(o,(response) =>{
        this.$refs.input.allComment = response.data.data.store_score;
        if(response.data.data.store_score_by_pk != null){
           this.$refs.input.sureStarFunc(response.data.data.store_score_by_pk.score );
        this.$refs.input.comment =response.data.data.store_score_by_pk.comment;
        }else{
           this.$refs.input.sureStarFunc(0);
           this.$refs.input.comment ="";
        }
      });
    }
  },
  created: function () {
    this.query();
  },
  mounted: function () {

  },
};
</script>

<style></style>
