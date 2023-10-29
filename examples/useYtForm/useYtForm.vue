<!--
 * @Description: 搜索表单组件的使用 页面
 * @Author: mhf
 * @Date: 2023/10/29 11:20
-->
<template>
  <div>
    <ytForm
        v-show="showSearch"
        v-if="formLabel.length > 0"
        :form="paginationConfig"
        :form-label="formLabel"
        @handleSearch="handleSearch"
        @handleResetFrom="handleResetFrom"
    />
  </div>
</template>

<script>
export default {
  name: "useYtForm",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      showSearch: true,
      formLabel: [
        {
          type: "input",
          label: "input",
          value: "input",
        },
        {
          label: "主管单位",
          value: "deptId",
          type: "select",
          opts: [
            {
              deptName: '单位1',
              deptId: '1'
            },
            {
              deptName: '单位2',
              deptId: '2'
            },
            {
              deptName: '单位3',
              deptId: "3"
            }
          ],
          optLabel: "deptName",
          optValue: "deptId",
        },

      ],
      paginationConfig: {
        // pageNum: 1,
        // pageSize: 10,
      }, // 分页参数
    };
  },
  methods: {
    handleSearch(formData) {
      console.log(formData)
      this.getTableData()
    },

    handleResetFrom() {
      this.paginationConfig = {}; // 分页参数
      this.getTableData()
    },

    getTableData() {
      console.log("获取表格数据")
    },

  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped></style>
