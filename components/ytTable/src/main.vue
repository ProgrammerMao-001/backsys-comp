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
        border
        ref="tableRef"
        v-loading="tableConfig.isLoading"
        :height="height"
        :data="tableData"
        :row-key="handleRowKey"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDbClick"
        @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in tableDataColumn">
        <div :key="index">
          <el-table-column
              v-if="item.name === '序号'"
              type="index"
              :label="item.name"
              :index="indexMethod"
              fixed="left"
          />
          <el-table-column
              v-else-if="item.name === '多选'"
              :reserve-selection="true"
              type="selection"
          />
          <el-table-column
              v-else-if="item.name === '操作'"
              :key="index"
              label="操作"
              align="right"
              :width="btnWidth"
              fixed="right"
          >
            <template slot-scope="scope">
              <slot name="operationSlot" :row="scope.row"/>
            </template>
          </el-table-column>
          <el-table-column
              v-else
              :key="index"
              :label="item.name"
              :prop="item.value"
              :width="item.width"
              :sortable="item.sortable"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="item.isSlot">
                <slot :name="item.value" :row="scope.row"/>
              </div>
              <div v-else>{{ scope.row[item.value] }}</div>
            </template>
          </el-table-column>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ytTable",
  props: {
    btnWidth: {
      type: String,
      default: "240px",
    }, // 操作栏宽度
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }, // 表格数据
    tableDataColumn: {
      type: Array,
      default: () => {
        return []
      }
    }, // 表头数据
    tableConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }, // loading配置
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
     * @Event 方法
     * @description: 切换分页时，保持选中状态的标识
     * */
    handleRowKey(row) {
      return row[this.idName];
    },

    /**
     * @Event 监听多选操作
     * @description:
     * */
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },

    /**
     * @Event 当某个单元格被点击时会触发该事件
     * @description:
     * */
    handleCellClick(val) {
      console.log(val)
    },

    /**
     * @Event 当某个单元格被双击时会触发该事件
     * @description:
     * */
    handleCellDbClick(val) {
      console.log(val)
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
    console.log(this.tableDataColumn)
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table--border .el-table__cell {
  border: none !important;
}

::v-deep .el-table--group,
.el-table--border {
  border: none !important;
}
</style>
