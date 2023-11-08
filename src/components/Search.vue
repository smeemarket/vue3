<template>
  <div class="input-group">
    <input
      type="search"
      v-model="keyword"
      class="form-control"
      placeholder="Search"
      autofocus
    />
    <!-- <button @click="search" class="btn btn-primary">
      <i class="bi bi-search"></i>
    </button> -->
  </div>
</template>

<script>
import { throttle, debounce } from "lodash";

export default {
  data() {
    return {
      keyword: null,
    };
  },
  methods: {
    search: throttle(function () {
      //   console.log(this.keyword);
      this.$emit("search", this.keyword);
    }, 500),
  },
  watch: {
    keyword: debounce(function () {
      // x is new value & y is old value
      //   console.log(x, y);
      this.$emit("search", this.keyword);
    }, 300),
  },
};
</script>

<style lang="scss" scoped></style>
