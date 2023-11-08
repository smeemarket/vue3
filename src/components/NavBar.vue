<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" to="/">SMee Market</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/about">About</router-link>
          </li>
          <template v-if="auth === null">
            <li class="nav-item">
              <router-link class="nav-link active" to="/login"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/register"
                >Register</router-link
              >
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link active" to="/vocabulary"
                >Vocabulary</router-link
              >
            </li>
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle active"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Product
              </a>
              <ul class="dropdown-menu w-25">
                <li>
                  <router-link class="dropdown-item" to="/product/create"
                    >Create Product</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/product"
                    >Product List</router-link
                  >
                </li>
              </ul>
            </li> -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle active"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ auth.name }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/dashboard"
                    >Dashboard</router-link
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout()">Logout</a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["auth", "token"]),
    ...mapGetters(["getUrl"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      // or
      // localStorage.clear();

      let headers = new Headers();

      headers.append("Authorization", "Bearer " + this.token);
      fetch(this.getUrl("/logout"), {
        method: "POST",
        headers,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success === true) {
            this.$store.dispatch("logout");
          }
        })
        .finally(() => this.$router.push("/"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
