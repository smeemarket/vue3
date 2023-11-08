<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-12">
        <h1>Product Edit</h1>
        <form action="" @submit.prevent="updateProduct" ref="productEdit">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <Input
                  label="Product Name"
                  name="name"
                  :value="product.name"
                  autofocus
                  :errors="errors.name"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <Input
                  label="Price"
                  type="number"
                  name="price"
                  :value="product.price"
                  :errors="errors.price"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <Input
                  label="Stock"
                  type="number"
                  name="stock"
                  :value="product.stock"
                  :errors="errors.stock"
                />
              </div>
            </div>
          </div>
          <SubmitButton
            value="Update Product"
            :loading="isLoading"
            :disable="isLoading"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Input from "@/components/Input.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      errors: {},
      isLoading: false,
      product: {},
    };
  },

  components: { Input, SubmitButton },

  computed: {
    ...mapGetters(["getUrl"]),
  },

  methods: {
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

    updateProduct() {
      this.isLoading = true;
      this.isDisabled = true;
      let formData = new FormData(this.$refs.productEdit);

      axios
        .put(
          this.getUrl("/products/" + this.$route.params.id),
          // `name=${formData.get("name")}&price=${formData.get(
          //   "price"
          // )}&stock=${formData.get("stock")}`

          // or

          // {
          //   name: formData.get("name"),
          //   price: formData.get("price"),
          //   stock: formData.get("stock"),
          // }

          // or

          new URLSearchParams(formData).toString()
        )
        .then((res) => {
          console.log(res);
          this.errors = {};
          if (res.data.success === true) {
            this.showToast("success", res.data.message);
            this.product = res.data.product;
          }
        })
        .catch((e) => {
          // console.log(e.response.data.message);
          if (e.response.status === 422) {
            this.errors = e.response.data.errors;

            this.showToast("error", e.response.data.message);
          }
        })
        .finally((_) => {
          this.isLoading = false;
        });
    },

    fetchProduct(id) {
      axios
        .get(this.getUrl("/products/" + id))
        .then((res) => (this.product = res.data.data));
    },
  },

  mounted() {
    this.fetchProduct(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped></style>
