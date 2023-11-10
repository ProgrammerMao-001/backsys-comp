<!--
 * @Description: ytTable组件的使用 页面
 * @Author: mhf
 * @Date: 2023/11/10 22:46
-->
<template>
  <div class="uesYtTable">
    <ytTable
        :table-data="tableData"
        :table-config="tableConfig"
        :table-data-column="tableDataColumn"
        @handleSelectionChange="handleSelectionChange"
    >
      <template slot="type" slot-scope="scope">
        <span> {{ scope.row.type | changeType }} </span>
      </template>
      <template slot="operationSlot" slot-scope="scope">
        <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="doSomething(scope.row, '详情')"
        >详情
        </el-button>
        <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="doSomething(scope.row, '修改')"
        >修改
        </el-button>

      </template>
    </ytTable>

  </div>
</template>

<script>
export default {
  name: "useYtTable",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {
    changeType(value) {
      return value.replace("type", "类型")
    }
  },
  data() {
    return {
      tableData: [
      ],
      tableConfig: {
        isLoading: false,
      }, // 表格配置
      tableDataColumn: [
        { name: "序号", value: "index" },
        { name: "多选", value: "select" },
        { name: "名称", value: "typeName" },
        { name: "描述", value: "description" },
        { name: "类型", value: "type", isSlot: true },
        { name: "操作", value: "operationSlot", isSlot: true },
      ], // 表头数据
      total: 0,
      ids: [],
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      console.log(this.ids)
    },

    doSomething(data, type) {
      console.log(data, type)
    }
  },
  created() {
    this.tableConfig.isLoading = true
    setTimeout(() =>{
      this.tableData = [
        {
          id: 1,
          typeName: "名称1",
          description: "描述1",
          type: "type1"
        },
        {
          id: 2,
          typeName: "名称2",
          description: "描述2",
          type: "type2"
        },
        {
          id: 3,
          typeName: "名称3",
          description: "描述3",
          type: "type3"
        },
        {
          id: 4,
          typeName: "名称4",
          description: "描述4",
          type: "type4"
        },
        {
          id: 5,
          typeName: "名称5",
          description: "描述5",
          type: "type5"
        },]
      this.tableConfig.isLoading = false
    }, 500)
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped></style>
