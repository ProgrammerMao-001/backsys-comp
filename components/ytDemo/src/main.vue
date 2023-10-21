<!--
 * @Description: main 页面
 * @Author: mhf
 * @Date: 2023/10/21
-->
<template>
  <div>
    <div class="a">
      a
      <div class="b">b</div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ytDemo",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.a {
  width: 200px;
  height: 200px;
  border: 1px solid red;

  .b {
    width: 100px;
    height: 100px;
    border: 1px solid green;
  }
}
</style>
