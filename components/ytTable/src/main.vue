<!--
 * @Description: 基于el-table封装的表格组件（非树形结构） 页面
 * @Author: mhf
 * @Date: 2023/11/10 22:44
-->
<template>
  <div class="page">
    <el-table
      ref="tableRef"
      v-loading="tableConfig.loading"
      :border="tableConfig.border"
      :stripe="tableConfig.stripe"
      :resizable="tableConfig.resizable"
      :isAddIndex="tableConfig.isAddIndex"
      :height="height"
      :data="tableData"
      :expand-row-keys="expandRowKeys"
      :row-key="handleRowKey"
      @expand-change="handleExpandChange"
      @cell-dblclick="handleCellDbClick"
      @selection-change="handleSelectionChange"


      :header-row-style="{
background: '#ff0000',
boxShadow: 'inset 0px -1px 0px 0px #EEEEEE',
fontFamily: 'MicrosoftYaHei-Bold, MicrosoftYaHei',
fontWeight: 'bold',
color: '#333333',
}"
      :row-style="rowStyle"
    >
      <template v-for="(item, index) in tableDataColumn">
        <!--  序号 默认按照顺序排列，不固定 index -->
        <el-table-column
          v-if="item.type === 'index'"
          type="index"
          :key="index"
          :index="indexMethod"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"
        />

        <!--  多选 selection -->
        <el-table-column
          v-else-if="item.type === 'selection'"
          type="selection"
          :key="index"
          :reserve-selection="true"
          :width="item.width"
          :fixed="item.fixed"
        />

        <!-- 可展开 显示为一个可展开的按钮 expand -->
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

        <!-- 自定义表头 customSlot -->
        <el-table-column
          v-else-if="item.type === 'customSlot'"
          show-overflow-tooltip
          :key="index"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template slot="header" slot-scope="scope">
            <!-- 表头 -->
            <slot :name="item.slotHeader" :row="scope" />
          </template>

          <template slot-scope="scope">
            <!-- 内容 -->
            <slot :name="item.slotContent" :row="scope.row" />
          </template>
        </el-table-column>

        <!--  操作 默认按照顺序排列，不固定 operationSlot -->
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
          show-overflow-tooltip
          :label="item.label"
          :prop="item.value"
          :sortable="item.sortable"
          :width="item.width"
          :fixed="item.fixed"
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
          isAddIndex: true, // 是否将分页后的序号进行累加（如为true则分页后有10条数据，第二页第一条的数据序号为11）
        };
      },
    }, // 表格的配置项
    rowStyle: {
      type: Object,
      default: () => {
        return {
          background: '#fafafa',
          boxShadow: 'inset 0px -1px 0px 0px #EEEEEE',
          fontFamily: 'MicrosoftYaHei',
          color: '#606266',
          height: "24px",


        };
      },
    }, // 表格行样式
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
    expandOnly: {
      type: Boolean,
      default: false,
    }, // 是否只允许展开一行
  },
  data() {
    return {
      ids: [], // 选中的行的ids数组
      expandRowKeys: [], // 存储展开行的 keys
      search: "",
    };
  },
  methods: {
    /**
     * @Event 当用户对某一行展开或者关闭的时候会触发该事件
     * @description: 展开行时，回调的第二个参数为 expandedRows；树形表格时第二个参数为 expanded
     * @author: mhf
     * @time: 2023-11-12 14:08:29
     **/
    handleExpandChange(row) {
      if (!this.expandOnly) {
        return;
      }
      const rowKey = row[this.idName];
      if (this.expandRowKeys === [] || this.expandRowKeys.length === 0) {
        // 如果没有行展开，则添加当前行的 key 到 expandRowKeys 中
        this.expandRowKeys.push(rowKey);
      } else {
        // 如何再次点击当前行，就收起当前行 : 如果第一次点击这一行，就将当前行的 key 放入 expandRowKeys 中
        this.expandRowKeys = this.expandRowKeys.includes(rowKey)
          ? []
          : [rowKey];
      }
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
     * @Event 当某个单元格被双击时会触发该事件
     * @description:
     * */
    handleCellDbClick(rowData) {
      this.$emit("handleCellDbClick", rowData);
    },

    /**
     * @Event 表格多选框全选/全部取消选中
     * @description: rows: 表格数据
     * */
    handleResetSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.tableRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.tableRef.clearSelection();
      }
    },

    /**
     * @Event 方法
     * @description: 设置表格后一页的index在前一页的index基础上累加
     * */
    indexMethod(index) {
      if (!this.tableConfig.isAddIndex) {
        return index + 1;
      }
      return (
        index +
        this.paginationConfig.pageSize * (this.paginationConfig.pageNum - 1) +
        1
      );
    },
  },
  created() {
    // console.log(this.tableDataColumn);
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
