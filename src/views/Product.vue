<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <caption class="display-6">
          Products
        </caption>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th class="text-start">Name</th>
              <th class="text-end">Price</th>
              <th class="text-end">Stock</th>
              <th>Date</th>
              <th>Time</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows.data" class="text-center align-middle">
              <td>{{ row.id }}</td>
              <td class="text-start">{{ row.name }}</td>
              <td class="text-end">{{ row.price }}</td>
              <td class="text-end">{{ row.stock }}</td>
              <td>{{ row.date }}</td>
              <td>{{ row.time }}</td>
              <td>
                <div class="btn-group">
                  <button
                    @click="fetchProduct(row.id)"
                    class="btn btn-sm btn-outline-primary"
                  >
                    <i class="bi bi-info"></i>
                  </button>
                  <router-link
                    :to="'/product/edit/' + row.id"
                    class="btn btn-sm btn-outline-primary"
                  >
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <button
                    @click.prevent="deleteProduct(row.id)"
                    class="btn btn-sm btn-outline-primary"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <Pagination
            v-if="rows.meta"
            @fetchLink="fetchProducts"
            :links="rows.meta.links"
          />
          <div class="w-25">
            <Search @search="search" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import Search from "@/components/Search.vue";

export default {
  data() {
    return {
      rows: {},
    };
  },

  computed: {
    ...mapGetters(["getUrl"]),
  },

  methods: {
    search(keyword) {
      console.log(keyword);
      this.fetchProducts(this.getUrl("/products?keyword=" + keyword));
    },
    showToast(icon, message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: icon,
        title: message,
      });
    },

    fetchProducts(url) {
      axios.get(url).then((res) => {
        this.rows = res.data;
      });
    },

    fetchProduct(id) {
      axios.get(this.getUrl("/products/") + id).then((res) => console.log(res));
    },

    deleteProduct(id) {
      axios.delete(this.getUrl("/products/") + id).then((res) => {
        this.fetchProducts(
          this.rows.meta.links.find((link) => link.active === true).url
        );
        this.showToast("success", res.data.message);
      });
    },
  },

  mounted() {
    this.fetchProducts(this.getUrl("/products"));
  },

  components: {
    Pagination,
    Search,
  },
};
</script>

<style lang="scss" scoped></style>
