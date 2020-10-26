<template>
  <div id="list">
    <h5>店家清單</h5>
    <div class="row">
    <div class="col-6">
      <div v-for="(value, name) in foodpanda" :key="name">
          <div class="col-sm-12">
            <a :href="value.url" target="_blank">{{ value.name }}</a>
          </div>
      </div>
    </div>
    <div class="col">
      <div v-for="(value, index) in ubereat" :key="index">
          <div class="col-sm-12">
            <a :href="value.url" target="_blank">{{ value.name }}</a>
          </div>
      </div>
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
          // operationName: "...",
          // variables: { myVariable: "someValue", ... },
        })
        .then(
          (response) => (
            (this.stores = response.data.data.store),
            this.stores.forEach((element) => {
              if (element.url.search("ubereat") > 0) this.ubereat.push(element);
              if (element.url.search("foodpanda") > 0)
                this.foodpanda.push(element);
            })
          )
        );
      // const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
      // const url = 'https://www.foodpanda.com.tw/restaurant/e1hu/cheng-tai-wan-shi-mu-yu-zhuan-mai-dian-gu-shan-mei-shu-dian'; // origin api url
      // var  parser, xmlDoc;

      /** fetch api url by cors-anywhere */
      // axios.get(`${cors}${url}`)
      //   .then((response) => {
      //      const msg = response.data;
      //     // document.body.innerHTML = JSON.stringify(msg);
      //     parser = new DOMParser();
      //     xmlDoc = parser.parseFromString(msg,"text/xml");

      //     console.log(xmlDoc.getElementsByTagName("title"));

      //     // console.log(msg);
      //   },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );
    },
  },
  created: function () {
    this.query();
  },
};
</script>

<style>
</style>