<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between mt-3">
          <h3>Vocabulary</h3>
          <Pagination
            v-if="rows.meta"
            @fetchLink="fetchVocabularies"
            :links="rows.meta.links"
          />
        </div>
        <div class="row">
          <table class="table table-hover">
            <thead>
              <tr class="text-center">
                <th>ID</th>
                <th>Korean</th>
                <th>Myanmar</th>
                <th>English</th>
                <th>Action</th>
              </tr>
              <form
                action=""
                @submit.prevent="addVocabulary"
                ref="vocabularyCreate"
                id="createForm"
              ></form>
              <tr class="align-middle">
                <th class="text-center">#</th>
                <th>
                  <input
                    v-model="keyword_korean"
                    form="createForm"
                    type="search"
                    name="korean"
                    class="form-control form-control-sm text-center"
                    :class="{ 'is-invalid': errors_create.korean }"
                    autocomplete="off"
                    autofocus
                  />
                </th>
                <th>
                  <input
                    v-model="keyword_myanmar"
                    form="createForm"
                    type="search"
                    name="myanmar"
                    class="form-control form-control-sm text-center"
                    :class="{ 'is-invalid': errors_create.myanmar }"
                    autocomplete="off"
                  />
                </th>
                <th>
                  <input
                    v-model="keyword_english"
                    form="createForm"
                    type="search"
                    name="english"
                    class="form-control form-control-sm text-center"
                    :class="{ 'is-invalid': errors_create.english }"
                    autocomplete="off"
                  />
                </th>
                <th class="text-center">
                  <!-- <SubmitButton
                    form="createForm"
                    value="Create"
                    :loading="isLoading_create"
                    :disable="isDisabled_create"
                  /> -->
                  <SubmitButton form="createForm" value="Create" />
                </th>
              </tr>
            </thead>
            <tbody>
              <form
                action=""
                @submit.prevent="updateVocabulary"
                ref="vocabularyUpdate"
                id="updateForm"
              ></form>
              <!-- v-for loop ထဲ ဝင်လို့မရ -->
              <tr v-for="row in rows.data" class="text-center align-middle">
                <td class="text-right">{{ row.id }}.</td>
                <td v-if="row.id === toUpdate">
                  <input
                    v-model="row.korean"
                    form="updateForm"
                    type="text"
                    name="korean"
                    class="form-control form-control-sm text-center"
                    :class="{ 'is-invalid': errors_update.korean }"
                  />
                </td>
                <td v-else>{{ row.korean }}</td>
                <td v-if="row.id === toUpdate">
                  <input
                    v-model="row.myanmar"
                    form="updateForm"
                    type="text"
                    name="myanmar"
                    class="form-control form-control-sm text-center"
                  />
                </td>
                <td v-else>{{ row.myanmar }}</td>
                <td v-if="row.id === toUpdate">
                  <input
                    v-model="row.english"
                    form="updateForm"
                    type="text"
                    name="english"
                    class="form-control form-control-sm text-center"
                    :class="{ 'is-invalid': errors_update.english }"
                  />
                </td>
                <td v-else>{{ row.english }}</td>
                <td v-if="row.id === toUpdate">
                  <!-- <SubmitButton
                    form="updateForm"
                    value="Save"
                    :loading="isLoading_update"
                    :disable="isDisabled_update"
                  /> -->
                  <SubmitButton form="updateForm" value="Save" />
                </td>
                <td v-else>
                  <div class="btn-group">
                    <button
                      @click.prevent="editVocabulary(row.id)"
                      class="btn btn-sm btn-outline-primary"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      @click.prevent="deleteVocabulary(row.id)"
                      class="btn btn-sm btn-outline-primary"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import SubmitButton from "@/components/SubmitButton.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination.vue";
import Search from "@/components/Search.vue";
import { throttle, debounce } from "lodash";

export default {
  watch: {
    keyword_korean: debounce(function () {
      this.searchKorean(this.keyword_korean);
    }, 300),
    keyword_myanmar: debounce(function () {
      this.searchMyanmar(this.keyword_myanmar);
    }, 300),
    keyword_english: debounce(function () {
      this.searchEnglish(this.keyword_english);
    }, 300),
  },
  data() {
    return {
      keyword_korean: null,
      keyword_myanmar: null,
      keyword_english: null,
      rows: {},
      errors_create: {},
      errors_update: {},
      isLoading_create: false,
      isDisabled_create: false,
      isLoading_update: false,
      isDisabled_update: false,
      toUpdate: "",
    };
  },
  computed: {
    ...mapGetters(["getUrl"]),
  },
  methods: {
    searchKorean(keyword) {
      this.fetchVocabularies(
        this.getUrl("/vocabularies?keyword_korean=" + keyword)
      );
    },
    searchMyanmar(keyword) {
      this.fetchVocabularies(
        this.getUrl("/vocabularies?keyword_myanmar=" + keyword)
      );
    },
    searchEnglish(keyword) {
      this.fetchVocabularies(
        this.getUrl("/vocabularies?keyword_english=" + keyword)
      );
    },
    showToast(icon, message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
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
    fetchVocabularies(url) {
      axios.get(url).then((res) => {
        this.rows = res.data;
      });
    },
    addVocabulary: throttle(function () {
      this.isLoading_create = true;
      this.isDisabled_create = true;
      let formData = new FormData(this.$refs.vocabularyCreate);

      axios
        .post(this.getUrl("/vocabularies"), formData)
        .then((res) => {
          // this.errors_create = {};
          if (res.data.success === true) {
            this.keyword_korean = "";
            this.keyword_myanmar = "";
            this.keyword_english = "";
            this.showToast("success", res.data.message);
            // this.$refs.vocabularyCreate.reset();
            this.fetchVocabularies(this.getUrl("/vocabularies"));
          }
          // this.$router.push("/vocabulary");
        })
        .catch((e) => {
          // console.log(e.response.data.message);
          if (e.response.status === 422) {
            this.errors_create = e.response.data.errors;

            this.showToast("error", e.response.data.message);
          }
        })
        .finally((_) => {
          this.isLoading_create = false;
          this.isDisabled_create = false;
        });
    }, 500),
    editVocabulary(id) {
      // console.log(id);
      this.toUpdate = id;
    },
    updateVocabulary: throttle(function () {
      this.isLoading_update = true;
      this.isDisabled_update = true;
      let formData = new FormData(this.$refs.vocabularyUpdate);

      axios
        .put(
          this.getUrl("/vocabularies/" + this.toUpdate),
          new URLSearchParams(formData).toString()
        )
        .then((res) => {
          // this.errors_update = {};
          if (res.data.success === true) {
            this.fetchVocabularies(
              this.rows.meta.links.find((link) => link.active === true).url
            );
            this.showToast("success", res.data.message);
          }
          this.toUpdate = null;
        })
        .catch((e) => {
          // console.log(e.response.data.message);
          if (e.response.status === 422) {
            this.errors_update = e.response.data.errors;

            this.showToast("error", e.response.data.message);
          }
        })
        .finally((_) => {
          this.isLoading_update = false;
          this.isDisabled_update = false;
        });
    }, 500),
    deleteVocabulary(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(this.getUrl("/vocabularies/") + id).then((res) => {
            this.fetchVocabularies(
              this.rows.meta.links.find((link) => link.active === true).url
            );
            this.showToast("success", res.data.message);
          });
        }
      });
    },
  },
  mounted() {
    this.fetchVocabularies(this.getUrl("/vocabularies"));
  },
  components: {
    Pagination,
    SubmitButton,
  },
};
</script>

<style lang="scss" scoped></style>
