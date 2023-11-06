<!--
 * @Description: 使用ytIsShowForm 显示隐藏筛选框组件 页面
 * @Author: mhf
 * @Date: 2023/11/7 0:05
-->
<template>
  <div>
    <ytIsShowForm
      ref="ytIsShowForm"
      v-if="formLabel.length > 0"
      :show-search.sync="showSearch"
    />
  </div>
</template>

<script>
export default {
  name: "useYtIsShowForm",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      formLabel: [11, 2],
      showSearch: true, // 显示搜索条件
    };
  },
  methods: {},
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
