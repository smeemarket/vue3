<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-12">
        <h1>Product Create</h1>
        <form action="" @submit.prevent="addProduct" ref="productCreate">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <Input
                  label="Product Name"
                  name="name"
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
                  :errors="errors.stock"
                />
              </div>
            </div>
          </div>
          <div class="col-6 mb-4">
            <!-- <label for="photos" class="form-label">Product Photos</label>
            <input
              type="file"
              id="photos"
              class="form-control"
              name="photos[]"
              multiple
            /> -->
            <Input
              label="Product Photos"
              type="file"
              name="photos[]"
              :errors="errors.photos"
              multiple
            />
          </div>
          <SubmitButton
            value="Add Product"
            :loading="isLoading"
            :disable="isLoading"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "lodash";
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
    addProduct: throttle(function () {
      this.isLoading = true;
      this.isDisabled = true;
      let formData = new FormData(this.$refs.productCreate);

      axios
        .post(this.getUrl("/products"), formData)
        .then((res) => {
          console.log(res);
          this.errors = {};
          if (res.data.success === true) {
            this.showToast("success", res.data.message);
            this.$refs.productCreate.reset();
          }
          this.$router.push("/product");
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
    }, 500),
  },
};
</script>

<style lang="scss" scoped></style>
