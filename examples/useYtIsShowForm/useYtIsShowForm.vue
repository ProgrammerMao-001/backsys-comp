<!--
 * @Description: 使用ytIsShowForm 显示隐藏筛选框组件 页面
 * @Author: mhf
 * @Date: 2023/11/7 0:05
-->
<template>
  <div>
    <!--    :showSetting="showSetting"-->
    <!--    :hideSetting="hideSetting"-->
    <ytIsShowForm ref="ytIsShowForm" :showSearch.sync="showSearch" />
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
      showSearch: true, // 是否显示
      showSetting: {
        name: "显示123",
        icon: "el-icon-s-grid",
        color: "red",
      },
      hideSetting: {
        name: "隐藏321",
        icon: "el-icon-d-caret",
        color: "green",
      },
    };
  },
  methods: {},
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
