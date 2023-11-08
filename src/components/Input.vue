<template>
  <label class="form-label" :for="name">
    {{ label }}
    <span class="text-danger">{{ required ? " *" : "" }}</span>
  </label>
  <input
    :class="{ 'is-invalid': errors }"
    class="form-control"
    :type="type"
    :name="name"
    :id="name"
    :autofocus="autofocus"
    :required="required"
    :multiple="multiple"
    :value="value"
  />
  <!-- <div class="text-danger" v-if="errors[name.replace('[]', '')]">
    {{ errors[name.replace("[]", "")][0] }}
  </div> -->
  <div class="invalid-feedback" v-if="errors">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Input Label",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "input_name",
    },
    errors: {
      type: Object,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
