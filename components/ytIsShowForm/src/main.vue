<!--
 * @Description: ytIsShowForm 显示隐藏筛选框 组件
 * @Author: mhf
 * @Date: 2023-11-7 00:03:20
-->
<template>
  <div class="top-right-btn">
    <el-row>
      <div class="isSHowBtn" @click="toggleSearch()">
        <div
          :style="{
            marginRight: '6px',
            color: showSearch ? '#999999' : '#1492ff',
          }"
        >
          {{ showSearch ? "隐藏筛选" : "显示筛选" }}

          <i
            :style="{ color: showSearch ? '#999999' : '#1492ff' }"
            :class="['iconfont', showSearch ? 'if-yincang' : 'if-xianshi']"
          ></i>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ytIsShowForm",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  watch: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
  },
};
</script>
<style lang="scss" scoped>
.isSHowBtn {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: "Microsoft YaHei";
  margin: 0 15px 5px 0;
  color: #999999;

  :hover {
    color: #1492ff !important;
    i {
      color: #1492ff !important;
    }
  }
}
</style>
