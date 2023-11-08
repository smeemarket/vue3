<template>
  <nav>
    <ul class="pagination">
      <li v-for="link in links" class="page-item">
        <!-- <a class="page-link" href="#" v-html="link.label"></a> -->
        <!-- v-html is security warning -->
        <a
          class="page-link"
          @click.prevent="go(link.url)"
          :class="{ active: link.active, disabled: !link.url }"
          href=""
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
    },
  },
  methods: {
    go(url) {
      // console.log(url);
      this.$emit("fetchLink", url);
    },
    changeLinks() {
      this.links[0].label = "PREV";
      this.links[this.links.length - 1].label = "NEXT";
    },
  },
  mounted() {
    this.changeLinks();
  },
  updated() {
    this.changeLinks();
  },
};
</script>

<style lang="scss" scoped></style>
