<template>
  <NavBar />
  <router-view />
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import "bootstrap";

export default {
  components: { NavBar },
  created() {
    if (localStorage.getItem("token") && localStorage.getItem("auth")) {
      this.$store.dispatch("setAuth", JSON.parse(localStorage.getItem("auth")));
      this.$store.dispatch("setToken", localStorage.getItem("token"));

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
  },
};
</script>

<style lang="scss">
@import "app.scss";
</style>
