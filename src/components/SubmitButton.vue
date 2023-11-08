<template>
  <button class="btn btn-sm btn-primary" :disabled="disable">
    <span
      v-show="loading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "Submit",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style lang="scss" scoped></style>
