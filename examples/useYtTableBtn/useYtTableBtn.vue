<!--
 * @Description: ytTableBtn 自定义按钮组的使用 页面
 * @Author: mhf
 * @Date: 2023/11/5 13:09
-->
<template>
  <div>
    <ytTableBtn
      ref="ytTableBtn"
      :btnList="btnList"
      :permiArr="permiArr"
      @sendClick="getClick"
    >
    </ytTableBtn>
  </div>
</template>

<script>
export default {
  name: "useYtTableBtn",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      btnList: [
        {
          name: "无权限1",
          icon: "el-icon-delete",
          color: "#fc5c5c",
        },
        {
          name: "无权限2",
          icon: "el-icon-delete",
          color: "green",
        },
        {
          name: "新增",
          icon: "el-icon-plus",
          color: "#1492FF",
          hasPermi: "system:user:add",
        },
        {
          name: "导入",
          icon: "el-icon-download",
          color: "#1492FF",
          hasPermi: "system:user:import",
        },
        {
          name: "导出",
          icon: "el-icon-upload2",
          color: "#1492FF",
          hasPermi: "system:user:export",
        },
        {
          name: "删除",
          icon: "el-icon-delete",
          color: "#fc5c5c",
          hasPermi: "system:user:delete",
        },
      ],
      permiArr: ["system:user:add", "system:user:export", "system:user:delete"],
    };
  },
  methods: {
    /**
     * @Event 接收点击的按钮类型
     * @description:
     * @author: mhf
     * @time: 2023-11-05 13:58:34
     **/
    getClick(name) {
      this.$message.success(`点击了${name}`)
      console.log(name);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
