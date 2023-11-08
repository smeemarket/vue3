<template>
  <div class="form-floating mb-3">
    <input
      :type="type"
      class="form-control"
      placeholder="floatingကြောင့်"
      :name="name"
    />
    <label for="">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "input_name",
    },
    label: {
      type: String,
      default: "Label Name",
    },
  },
};
</script>

<style lang="scss" scoped></style>
