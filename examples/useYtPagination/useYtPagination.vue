<!--
 * @Description: ytPagination分页组件的使用 页面
 * @Author: mhf
 * @Date: 2023/11/26 16:09
-->
<template>
  <div class="ytPagination">
    <ytPagination
      :background="false"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="pageSizes"
      :pagination-color="paginationColor"
      @pagination="getTableData"
    />
  </div>
</template>

<script>
export default {
  name: "useYtPagination",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      total: 120,
      pageSizes: [5, 10, 15, 20],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      paginationColor: {
        "--activeBgColor": "transparent",
        "--fontColor": "orange",
        "--hoverColor": "green",
      },
    };
  },
  methods: {
    getTableData() {
      console.log(this.queryParams);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.ytPagination {
}
</style>
