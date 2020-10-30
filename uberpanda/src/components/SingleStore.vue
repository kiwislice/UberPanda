<template>
  <a :href="store_val.url" target="_blank">
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="img_url" class="card-img img-center" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p class="card-text">
              {{ title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import axios from "axios";
import db from "./Repository.js";
import panda_icon from "../assets/panda.jpeg";
import ubereat_icon from "../assets/ubereat_icon.jpeg";
const panda_regex = /<title>([\s\S]*?)<\/title>/m;
const panda_dec = /<meta name="description" content="(.*)">/i;
const uber_title_reg = /<meta data-rh="true" name="og:title" content="(.*)"\/><meta data-rh="true" name="description"/;
const uber_dec = /meta data-rh="true" name="description" content="(.*)" itemprop="description"\/>/;
const uber_img_reg = /meta data-rh="true" property="og:image" content="(.*.jpeg)"\/>/;
export default {
  name: "SingleStore",
  props: {
    value: {},
  },
  data() {
    return {
      title: null,
      img_url: null,
      description: null,
      store_val: this.value,
    };
  },
  methods: {
    StoreTitle() {
      if (this.store_val.title === null) {
        this.getStoreInfo();
      } else {
        if (this.store_val.url.match(/panda/) && this.store_val.image === "") {
          this.img_url = panda_icon;
        }else if (this.store_val.url.match(/ubereat/) && this.store_val.image === "")
          this.img_url = ubereat_icon;
        else
          this.img_url = this.store_val.image;
        this.title = this.store_val.title;
        this.description = this.store_val.description;
      }
    },
    getStoreInfo: function() {
      const cors = "https://cors-anywhere.herokuapp.com/";
      const url = this.store_val.url;

      axios.get(`${cors}${url}`).then(
        (response) => {
          const msg = response.data;
          if (url.match(/panda/)) {
            console.log(msg.match(panda_regex));
            this.title = msg.match(panda_regex)[1];
            
            this.img_url = panda_icon;
            this.store_val.description = msg.match(panda_dec)[1];
            this.store_val.image = "";
          } else if (url.match(/ubereat/)) {
            var ubereat_img = msg.match(uber_img_reg);
            this.title = msg.match(uber_title_reg)[1];
            this.store_val.description = msg.match(uber_dec)[1];
            if (ubereat_img === null) {
              this.img_url = ubereat_icon;
              this.store_val.image = "";
            } else {
              this.img_url = ubereat_img[1];
              this.store_val.image = this.img_url;
            }
          }
          this.store_val.title = this.title;
          this.updataStore();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    pandaOption:function(){

    },
    ubereatOption:function(){

    },
    updataStore: function() {
      var o = Object.assign({}, this.store_val);
      db.updateStoreOg(o, (response) => console.log(response))
    },
  },
  created: function() {
    this.StoreTitle();
  },
};
</script>
<style>
.row .no-gutters img {
  width: 60%;
  height: 85%;
}
.img-center{
  position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
