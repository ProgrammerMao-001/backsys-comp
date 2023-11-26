<!--
 * @Description: 表格分页组件 页面
 * @Author: mhf
 * @Date: 2023/11/26 16:07
-->
<template>
  <el-pagination
      :style="pageColor"
      v-bind="$attrs"
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: "ytPagination",
  props: {
    total: {
      type: Number,
      default: 0,
    }, // 总条目数
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    }, // 每页显示个数选择器的选项设置
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7,
    }, // 页码按钮的数量，当总页数超过该值时会折叠(大于等于 5 且小于等于 21 的奇数)
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    }, // 组件布局，子组件名用逗号分隔 (sizes, prev, pager, next, jumper, ->, total, slot)
    background: {
      type: Boolean,
      default: true,
    }, // 是否为分页按钮添加背景色
    paginationColor: {
      type: Object,
      default() {
        return {
          "--activeBgColor": "pink", // 选中的背景色
          "--fontColor": "yellow", // 选中的字体颜色
          "--hoverColor": "#ff0000", // 鼠标悬停的字体颜色
        };
      },
    }, // 分页按钮的样式
  },
  data() {
    return {};
  },
  computed: {
    pageColor() {
      return this.paginationColor;
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit("pagination", {page: this.currentPage, limit: val});
    },
    handleCurrentChange(val) {
      this.$emit("pagination", {page: val, limit: this.pageSize});
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .active {
  background-color: var(--activeBgColor) !important;
  color: var(--fontColor) !important;
}

::v-deep .el-pager li:hover {
  color: var(--hoverColor) !important;
}
</style>
