<!--
 * @Description: 基于el-table封装的表格组件（非树形结构） 页面
 * @Author: mhf
 * @Date: 2023/11/10 22:44
-->

<!--:header-row-style="{-->
<!--background: '#F7F8FA',-->
<!--boxShadow: 'inset 0px -1px 0px 0px #EEEEEE',-->
<!--fontFamily: 'MicrosoftYaHei-Bold, MicrosoftYaHei',-->
<!--fontWeight: 'bold',-->
<!--color: '#333333',-->
<!--}"-->
<!--:row-style="{-->
<!--background: '#FFFFFF',-->
<!--boxShadow: 'inset 0px -1px 0px 0px #EEEEEE',-->
<!--fontFamily: 'MicrosoftYaHei',-->
<!--color: '#333333',-->
<!--}"-->

<template>
  <div class="page">
    <el-table
      ref="tableRef"
      v-loading="tableConfig.loading"
      :border="tableConfig.border"
      :stripe="tableConfig.stripe"
      :resizable="tableConfig.resizable"
      :height="height"
      :data="tableData"
      :row-key="handleRowKey"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDbClick"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in tableDataColumn">
        <!--  序号 默认按照顺序排列，不固定  -->
        <el-table-column
          v-if="item.type === 'index'"
          type="index"
          :key="index"
          :index="indexMethod"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"
        />

        <!--  多选  -->
        <el-table-column
          v-else-if="item.type === 'selection'"
          type="selection"
          :key="index"
          :reserve-selection="true"
          :width="item.width"
          :fixed="item.fixed"
        />

        <!-- 可展开 显示为一个可展开的按钮 -->
        <el-table-column
          v-else-if="item.type === 'expand'"
          type="expand"
          :key="index"
          :width="item.width"
          :label="item.label"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <!-- 可自定义插槽名称(slotName)，如未指定则默认为item.type(operationSlot) -->
            <slot :name="item.slotName || item.type" :row="scope.row" />
          </template>
        </el-table-column>

        <!--  操作 默认按照顺序排列，不固定 -->
        <el-table-column
          v-else-if="item.type === 'operationSlot'"
          :key="index"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <!-- 可自定义插槽名称(slotName)，如未指定则默认为item.type(operationSlot) -->
            <slot :name="item.slotName || item.type" :row="scope.row" />
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="index"
          :label="item.label"
          :prop="item.value"
          :sortable="item.sortable"
          :width="item.width"
          :fixed="item.fixed"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="item.isSlot">
              <slot :name="item.value" :row="scope.row" />
            </div>
            <div v-else>{{ scope.row[item.value] }}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ytTable",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 表格数据
    tableDataColumn: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 表头数据
    tableConfig: {
      type: Object,
      required: true,
      default: () => {
        return {
          loading: false,
          stripe: true, // 是否为斑马纹 table
          border: true, // 是否带有纵向边框
          resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        };
      },
    }, // 表格的配置项
    height: {
      type: String,
      default: "45vh",
    }, // 表格的高度
    idName: {
      type: String,
      default: "id",
    }, // 表格行的唯一标识
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    }, // 分页参数
  },
  data() {
    return {
      ids: [], // 选中的行的ids数组
      expandRowKeys: [], // 存储展开行的 keys
    };
  },
  methods: {
    /**
     * @Event 方法
     * @description: 删除操作
     * */
    handleDeleteData(row) {
      this.$emit("handleDeleteData", row);
    },

    /**
     * @Event 方法
     * @description: 编辑操作
     * */
    handleUpdateData(row) {
      this.$emit("handleUpdateData", row);
    },

    /**
     * @Event 切换分页时，保持选中状态的标识
     * @description:
     * */
    handleRowKey(row) {
      return row[this.idName];
    },

    /**
     * @Event 监听多选操作
     * @description: 将选中行组成的ids数组和选中行的数据传递出去
     * */
    handleSelectionChange(selection) {
      let ids = selection.map((row) => row[this.idName]);
      let passData = {
        ids: ids, // 选中行组成的ids数组
        selection, // 选中行的数据
      };
      this.$emit("handleSelectionChange", passData);
    },

    /**
     * @Event 当某个单元格被点击时会触发该事件
     * @description:
     * */
    handleCellClick(val) {
      console.log(val);
    },

    /**
     * @Event 当某个单元格被双击时会触发该事件
     * @description:
     * */
    handleCellDbClick(val) {
      console.log(val);
    },

    /**
     * @Event 方法
     * @description: 表格 -> 取消选择
     * */
    handleResetSelection() {
      this.$refs.tableRef.clearSelection();
    },

    /**
     * @Event 方法
     * @description: 设置表格后一页的index在前一页的index基础上累加
     * */
    indexMethod(index) {
      // return index + 1 // 如果不想要累加效果，请打开此项
      return (
        index +
        this.paginationConfig.pageSize * (this.paginationConfig.pageNum - 1) +
        1
      );
    },
  },
  created() {
    console.log(this.tableDataColumn);
  },
};
</script>

<style lang="scss" scoped>
//::v-deep .el-table--border .el-table__cell {
//  border: none !important;
//}
//
//::v-deep .el-table--group,
//.el-table--border {
//  border: none !important;
//}
</style>
