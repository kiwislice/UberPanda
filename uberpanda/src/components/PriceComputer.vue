<template>
  <div class="pricecomputer text-center">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="ctr1"
        value="%"
        v-model="computeType"
        @change="change"
      />
      <label class="form-check-label" for="ctr1"> 優惠% </label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="ctr2"
        value="P"
        v-model="computeType"
        @change="change"
      />
      <label class="form-check-label" for="ctr2"> 優惠固定金額 </label>
    </div>

    <div class="input-group mb-3 mx-auto w-50" v-if="isComputeByPercent()">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">優惠折扣%，例：85折請輸入0.85</span>
      </div>
      <input
        type="number"
        class="form-control"
        v-model="discountPercent"
        @change="change"
      />
    </div>
    <div class="input-group mb-3 mx-auto w-50" v-if="!isComputeByPercent()">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">優惠折扣金額</span>
      </div>
      <input
        type="number"
        class="form-control"
        v-model="discount"
        @change="change"
      />
    </div>
    <div class="input-group mb-3 mx-auto w-50">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">外送費</span>
      </div>
      <input
        type="number"
        class="form-control"
        v-model="deliveryFee"
        @change="change"
      />
    </div>
    <div class="input-group mb-3 mx-auto w-50">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">人數</span>
      </div>
      <input
        type="number"
        class="form-control"
        v-model="personCount"
        @change="change"
      />
    </div>

    <div class="alert alert-warning mx-auto w-50" role="alert">
      應收總額：{{ realTotal }}
    </div>
    <div
      class="input-group my-2 mx-auto w-50"
      v-for="per in personalFee"
      :key="per.index"
    >
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1"
          >單人金額{{ per.index }}</span
        >
      </div>
      <input
        type="number"
        class="form-control"
        v-model="per.originalPrice"
        @change="change"
      />
      <div class="input-group-append">
        <span class="input-group-text">應收金額：{{ per.realPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const ComputeType_Percent = "%";

export default {
  name: "PriceComputer",
  data() {
    return {
      computeType: ComputeType_Percent,
      discount: 0,
      discountPercent: 1.0,
      deliveryFee: 0,
      personCount: 0,
      personalFee: [],
      realTotal: 0,
    };
  },
  methods: {
    change: function () {
      this.initPersonalFee();
      if (this.isComputeByPercent()) this.computeByPercent();
      else this.computeByPrice();
    },
    computeByPrice: function () {
      var per = (this.discount - this.deliveryFee) / this.personCount;
      per = Math.round(per);
      this.personalFee.forEach(
        (elm) => (elm.realPrice = elm.originalPrice - per)
      );
      this.realTotal = this.personalFee.map(x=>x.realPrice).reduce((a, b) => a + b, 0);
    },
    computeByPercent: function () {
      var per = this.deliveryFee / this.personCount;
      this.personalFee.forEach(
        (elm) => (elm.realPrice = Math.round(elm.originalPrice*this.discountPercent + per))
      );
      this.realTotal = this.personalFee.map(x=>x.realPrice).reduce((a, b) => a + b, 0);
    },
    isComputeByPercent() {
      return this.computeType == ComputeType_Percent;
    },
    initPersonalFee() {
      while (this.personCount < this.personalFee.length) {
        this.personalFee.pop();
      }
      while (this.personCount > this.personalFee.length) {
        this.personalFee.push({
          index: this.personalFee.length + 1,
          originalPrice: 0,
          realPrice: 0,
        });
      }
    },
  },
  mounted: function () {},
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
