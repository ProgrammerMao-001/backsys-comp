<!--
 * @Description: main 页面
 * @Author: mhf
 * @Date: 2023/10/21
-->
<template>
  <div>
    {{pageName}}
  </div>
</template>

<script>
export default {
  name: "ytComp",
  components: {},
  props: {
    pageName: {
      type: String,
      default: "ytComp"
    }
  },
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped></style>
