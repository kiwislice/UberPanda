<template>
  <div>
    <div class="comment position-fixed" @click="closeCommentDialog()"></div>
    <div class="commentStyle position-fixed">
      <div class="tile title-tile">
        <div class="place-description">{{ singleStore.name }}</div>
      </div>
      <div class="nameStyle text-center">
        <div class="Af21Ie">{{ $auth.user.name }}</div>
      </div>
      <div class="col-12 pr-0">
        <div class="row d-flex justify-content-center">
          <div class="col-1 p-0">
            <img
              :src="sureStar1 || Star1"
              class="imgStarStyle"
              @mouseover="starMouseOver(1)"
              @mouseout="starMouseOut(1)"
              @click="sureStarFunc(1)"
            />
          </div>
          <div class="col-1 p-0">
            <img
              :src="sureStar2 || Star2"
              class="imgStarStyle"
              @mouseover="starMouseOver(2)"
              @mouseout="starMouseOut(2)"
              @click="sureStarFunc(2)"
            />
          </div>
          <div class="col-1 p-0">
            <img
              :src="sureStar3 || Star3"
              class="imgStarStyle"
              @mouseover="starMouseOver(3)"
              @mouseout="starMouseOut(3)"
              @click="sureStarFunc(3)"
            />
          </div>
          <div class="col-1 p-0">
            <img
              :src="sureStar4 || Star4"
              class="imgStarStyle"
              @mouseover="starMouseOver(4)"
              @mouseout="starMouseOut(4)"
              @click="sureStarFunc(4)"
            />
          </div>
          <div class="col-1 p-0">
            <img
              :src="sureStar5 || Star5"
              class="imgStarStyle"
              @mouseover="starMouseOver(5)"
              @mouseout="starMouseOut(5)"
              @click="sureStarFunc(5)"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <textarea
          class="form-control"
          v-model="comment"
          rows="3"
          placeholder="撰寫評論........."
        ></textarea>
      </div>
      <div class="col-12 text-center">
        <button
          label="新增"
          @click="saveComment($event)"
          class="mx-auto btn btn-primary my-1 animate__animated"
        >
          存檔
        </button>
        <div
          id="msg"
          class="alert alert-success animate__animated animate__delay-1s d-none"
          role="alert"
        >
          {{ msg }}
        </div>
      </div>
      <div class="col-12">
        <div class="Af21Ie">其他人評論</div>
      </div>
      <div class="col-12">
        <div v-for="(item, index) in allComment" :key="index">
          <div class="row otherCommentName">{{ item.user_name }}</div>
          <div class="row otherComment">{{ item.comment }}</div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const EMPTYSTAR = require("../assets/ic_star_rate_empty_14.png");
const RATESTAR = require("../assets/ic_star_rate_14.png");

import db from "./Repository.js";
import tools from "./Tools";
export default {
  name: "CommentDialog",
  props: {
    value: { name: null },
  },
  data() {
    return {
      dialogIsShow: false,
      singleStore: {},
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
      fraction: 0,
      comment: "",
      allComment: [],
      msg: "存檔成功",
    };
  },
  methods: {
    starMouseOver: function (value) {
      for (var i = 1; i <= value; i++) {
        this["Star" + i] = RATESTAR;
      }
    },
    starMouseOut: function (value) {
      for (var i = 1; i <= value; i++) {
        this["Star" + i] = EMPTYSTAR;
      }
    },
    closeCommentDialog: function () {
      this.$parent.getStore(false);
    },
    sureStarFunc: function (value) {
      this.fraction = 0;
      for (var j = 1; j <= 5; j++) {
        this["sureStar" + j] = "";
      }
      for (var i = 1; i <= value; i++) {
        this["sureStar" + i] = RATESTAR;
        this.fraction += 1;
      }
    },
    saveComment: function (event) {
      var obj = {};
      obj.user_id = this.$auth.user.uid;
      obj.store_id = this.singleStore.id;
      obj.score = this.fraction;
      obj.comment = this.comment;
      db.saveStoreScore(obj, (response) => console.log(response));
      tools.addAnimate(event.srcElement, "animate__fadeIn");
      tools.removeClass(document.getElementById("msg"), "d-none");
      tools.addAnimate(document.getElementById("msg"), "animate__fadeOut");
    },
  },
  components: {},
};
</script>
<style>
.comment {
  background-color: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  z-index: 2000;
}
.commentStyle {
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  overflow-x: hidden;
  position: fixed;
  width: 580px;
  z-index: 2001;
  border-radius: 10px;
  max-height: 550px;
}
.title-tile {
  background-color: transparent;
  padding-bottom: 10px;
  padding-top: 20px;
  z-index: 100;
}
.tile {
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
}
.place-description {
  color: rgba(0, 0, 0, 0.7);
  font-size: 30px;
  font-weight: 400;
  overflow: hidden;
  padding-top: 4px;
  text-align: center;
  text-overflow: ellipsis;
}
.nameStyle {
  display: inline-block;
  padding-left: 16px;
  padding-right: 16px;
  vertical-align: top;
  width: 100%;
}
.Af21Ie {
  color: #3c4043;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}
.imgStarStyle {
  height: 30px;
  width: 30px;
}
.otherCommentName {
  font-size: 14px;
  padding-left: 20px;
}
.otherComment {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
