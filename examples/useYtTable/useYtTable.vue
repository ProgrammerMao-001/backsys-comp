<!--
 * @Description: ytTable组件的使用 页面
 * @Author: mhf
 * @Date: 2023/11/10 22:46
-->
<template>
  <div class="uesYtTable">
    <ytTable
      idName="deId"
      :tableData="tableData"
      :tableConfig="tableConfig"
      :height="'350'"
      :tableDataColumn="tableDataColumn"
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
      return value.replace("type", "类型");
    },
  },
  data() {
    return {
      tableData: [], // 表格数据
      tableConfig: {
        loading: false,
        stripe: false, // 是否为斑马纹 table
        border: true, // 是否带有纵向边框
        resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
      }, // 表格的配置项
      tableDataColumn: [
        { type: "index", label: "序号", width: 50 },
        { type: "selection", width: 40 },
        { label: "名称", value: "typeName", width: "100", sortable: true },
        { label: "描述", value: "description", width: "200", sortable: false },
        { label: "更新时间", value: "updateTime", sortable: false },
        {
          label: "类型",
          value: "type",
          width: "250",
          sortable: true,
          isSlot: true,
        },
        { type: "operationSlot", label: "操作", isSlot: true, width: "400" },
      ], // 表头配置项
      total: 0,
      ids: [],
    };
  },
  methods: {
    handleSelectionChange(data) {
      console.log(data);
    },

    doSomething(data, type) {
      console.log(data, type);
    },

    getTableData() {
      this.tableConfig.loading = true;
      setTimeout(() => {
        this.tableData = [
          {
            deId: 1,
            typeName: "名称1",
            description: "描述1",
            updateTime: "更新时间1",
            type: "type1",
          },
          {
            deId: 2,
            typeName: "名称2",
            description: "描述2",
            updateTime: "更新时间2",
            type: "type2",
          },
          {
            deId: 3,
            typeName: "名称3",
            description: "描述3",
            updateTime: "更新时间3",
            type: "type3",
          },
          {
            deId: 4,
            typeName: "名称4",
            description: "描述4",
            updateTime: "更新时间4",
            type: "type4",
          },
          {
            deId: 5,
            typeName: "名称5",
            description: "描述5",
            updateTime: "更新时间5",
            type: "type5",
          },
        ];
        this.tableConfig.loading = false;
      }, 500);
    },
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
