<!-- <template>
  <div>
    <h1>Login</h1>
    <h1>{{ myName }}</h1>
    <h1>{{ myNameLength }}</h1>
    <h1>{{ myNameToUpper }}</h1>
  </div>
</template> -->

<template>
  <div class="col-4 mx-auto mt-5">
    <h3 class="mb-3">Login Form</h3>
    <form action="" @submit.prevent="login" ref="loginForm">
      <FloatingInput type="email" name="email" label="Your email" />
      <FloatingInput type="password" name="password" label="Password" />
      <SubmitButton value="Login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import FloatingInput from "@/components/FloatingInput.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    FloatingInput,
    SubmitButton,
  },
  computed: {
    // ...mapState(["myName"]),
    // ...mapGetters(["myNameLength", "myNameToUpper"]),
    ...mapState(["auth", "token"]),
    ...mapGetters(["getUrl"]),
  },
  methods: {
    login() {
      let formData = new FormData(this.$refs.loginForm);
      // console.log(formData.get("name"), formData.get("email"));
      fetch(this.getUrl("/login"), {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success === true) {
            localStorage.setItem("auth", JSON.stringify(json.auth));
            localStorage.setItem("token", json.token);

            this.$store.dispatch("setAuth", json.auth);
            this.$store.dispatch("setToken", json.token);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("token");

            this.$router.push("/dashboard");
          } else {
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
