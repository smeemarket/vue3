<template>
  <div class="col-4 mx-auto mt-5">
    <h3 class="mb-3">Register Form</h3>
    <form action="" @submit.prevent="register" ref="registerForm">
      <FloatingInput name="name" label="Your name" />
      <FloatingInput type="email" name="email" label="Email address" />
      <FloatingInput type="password" name="password" label="Password" />
      <FloatingInput type="password" name="password_confirmation" label="Confirm password" />    
      <SubmitButton value="Register" />
    </form>
  </div>
</template>

<script>
fetch;
import SubmitButton from "@/components/SubmitButton.vue";
import FloatingInput from "@/components/FloatingInput.vue";
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    // ...mapState(["apiUrl"]),
    ...mapGetters(["getUrl"]),
  },
  methods: {
    register() {
      let formData = new FormData(this.$refs.registerForm);
      // console.log(formData.get("name"), formData.get("email"));

      fetch(this.getUrl("/register"), {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success === true) {
            this.$router.push("/login");
          }
        });
    },
  },
  components: { FloatingInput, SubmitButton },
};
</script>

<style lang="scss" scoped></style>
