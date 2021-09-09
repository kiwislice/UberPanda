<template>
  <div class="row align-items-center" style="height: 120px">
    <div class="col-10">
      <a :href="store_val.url" target="_blank" style="text-decoration: none">
        <div class="card">
          <div class="row no-gutters">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-2">
              <img
                :src="img_url"
                class="card-img img-center"
                style="max-width: 50px; max-height: 50px"
              />
            </div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-10">
              <div class="card-body">
                <p class="card-text">
                  {{ title }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="col-2 p-0">
      <div class="row mx-auto">
        <div class="col-12 p-0">
          <label style="font-size: 30px; margin-bottom: -0.5rem">{{ score }}</label>
        </div>
        <div class="col-12 pr-0">
          <div class="row">
            <div class="col-2 p-0">
              <img :src="sureStar1 || Star1" class="StarStyle" />
            </div>
            <div class="col-2 p-0">
              <img :src="sureStar2 || Star2" class="StarStyle" />
            </div>
            <div class="col-2 p-0">
              <img :src="sureStar3 || Star3" class="StarStyle" />
            </div>
            <div class="col-2 p-0">
              <img :src="sureStar4 || Star4" class="StarStyle" />
            </div>
            <div class="col-2 p-0">
              <img :src="sureStar5 || Star5" class="StarStyle" />
            </div>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="row">
            <div class="col-6 p-0" style="margin: auto">
              <button
                type="button"
                class="btn btn-primary CommentBtn"
                @click="updateValue()"
              >
                評論
              </button>
            </div>
            <div class="col-6 p-0">
              <div class="row">
                <a
                  :href="store_val.googleSearchUrl"
                  target="_blank"
                  style="display: block; margin-left: auto; margin-right: auto;width=1em"
                  class="hovershadow"
                >
                  <img src="../assets/google.jpeg" class="googleImgStyle" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const EMPTYSTAR = require("../assets/ic_star_rate_empty_14.png");
const HALFYSTAR = require("../assets/ic_star_rate_half_14.png");
const RATESTAR = require("../assets/ic_star_rate_14.png");
import axios from "axios";
import db from "./Repository.js";
import panda_icon from "../assets/panda.jpeg";
import ubereat_icon from "../assets/ubereat_icon.jpeg";
const panda_regex = /<title>([\s\S]*?)<\/title>/m;
const panda_dec = /<meta name="description" content="(.*)">/i;
const uber_title_reg = /meta data-rh="true" property="og:title" content="(.*$)"\/>/;
const uber_dec = /meta data-rh="true" name="description" content="(.*)"\/>/;
const uber_img_reg = /meta data-rh="true" property="og:image" content="(.*$.jpeg)"\/>/;
// const cors = "https://cors-anywhere.herokuapp.com/";
const cors = "https://boiling-ravine-52236.herokuapp.com/";
const GOOGLE_SEARCH = "https://www.google.com/search?q=";
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
      score: 0,
      storeFraction_obj: {},
      storeFraction_subobj: { time: null, score: 0 },
      ticker: 0,
      checked: false,
      showModal: false,
      Star1: EMPTYSTAR,
      Star2: EMPTYSTAR,
      Star3: EMPTYSTAR,
      Star4: EMPTYSTAR,
      Star5: EMPTYSTAR,
      sureStar1: "",
      sureStar2: "",
      sureStar3: "",
      sureStar4: "",
      sureStar5: "",
    };
  },
  component: {},
  methods: {
    girPage() {
      this.score = this.store_val.score;
      this.store_val.googleSearchUrl = `${GOOGLE_SEARCH}${this.store_val.name}`;
      if (this.store_val.title === null) {
        this.notHaveTitleValue();
      } else {
        this.haveTitleValue();
      }
      this.sureStar();
    },
    notHaveTitleValue: function () {
      this.getStoreInfo();
    },
    haveTitleValue: function () {
      if (this.store_val.url.match(/panda/)) {
        this.img_url = panda_icon;
      } else if (this.store_val.url.match(/ubereat/) && this.store_val.image === "") {
        this.img_url = ubereat_icon;
      } else {
        this.img_url = this.store_val.image;
      }
      this.title = this.store_val.title;
      this.description = this.store_val.description;
    },
    getStoreInfo: function () {
      const url = this.store_val.url;
      axios.get(`${cors}${url}`).then(
        (response) => {
          const msg = response.data;
          if (url.match(/panda/)) this.pandaOption(msg);
          else if (url.match(/ubereat/)) this.ubereatOption(msg);
          this.store_val.title = this.title;
          this.updataStore();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    pandaOption: function (msg) {
      this.title = msg.match(panda_regex)[1];
      this.img_url = panda_icon;
      this.store_val.description = msg.match(panda_dec)[1];
      this.store_val.image = "";
    },
    ubereatOption: function (msg) {
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
    },
    updataStore: function () {
      var o = Object.assign({}, this.store_val);
      db.updateStoreOg(o, (response) => console.log(response));
    },
    sureStar: function () {
      var number = Math.floor(this.score);
      var rem = this.score - number;
      for (var j = 1; j <= number; j++) {
        this["sureStar" + j] = RATESTAR;
        if (j === number && rem != 0) this["sureStar" + (j + 1)] = HALFYSTAR;
      }
    },
    setStar: function () {
      for (var i = 1; i <= 5; i++) {
        this["sureStar" + i] = EMPTYSTAR;
      }
      this.sureStar();
    },
    updateValue: function () {
      this.$emit("single-store", true, this.store_val);
    },
  },
  created: function () {
    this.girPage();
  },
};
</script>
<style>
.row .no-gutters {
  height: 120px;
}
.row .no-gutters img {
  width: 100px;
  height: 100px;
}
.img-center {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.box {
  transition: box-shadow 0.3s;
  float: left;
}
.card:hover {
  box-shadow: 0 0 20px rgba(33, 33, 33, 0.2);
}
.bi-hand-thumbs-up:hover {
  box-shadow: 0 0 20px rgba(0, 102, 51, 0.8);
}
.bi-hand-thumbs-down:hover {
  box-shadow: 0 0 20px rgba(0, 102, 51, 0.8);
}
.hovershadow:hover {
  box-shadow: 0 0 20px rgba(33, 33, 33, 0.2);
  border-radius: 50px;
}
.googleImgStyle {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #939699;
}
.StarStyle {
  width: 15px;
  height: 15px;
}
.CommentBtn {
  width: 4em;
  padding: 3px;
  font-size: 0.5rem;
}
</style>
