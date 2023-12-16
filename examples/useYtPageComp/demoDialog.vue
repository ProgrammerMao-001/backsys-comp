<!--
 * @Description: 新增、修改、详情的公共demo弹窗 页面
 * @Author: mhf
 * @Date: 2023/12/17 0:47
-->
<template>
  <el-dialog
    width="300px"
    v-if="dialogVisible"
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :before-close="hideDialog"
  >
    <span>这是个新增、修改、详情的公共demo弹窗</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "demoDialog",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      dialogVisible: false, // 控制弹窗的显示隐藏
      title: "",
    };
  },
  methods: {
    showDialog({ data, type }) {
      console.log(data, type);
      this.title = type;
      this.dialogVisible = true;
    },

    hideDialog() {
      this.dialogVisible = false;
      this.$parent.getTableData();
    },

    submitForm() {
      this.$message.success("点击了提交按钮");
      this.hideDialog();
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
