<!--
 * @Description: ytTable组件的使用 页面
 * @Author: mhf
 * @Date: 2023/11/10 22:46
-->
<template>
  <div class="uesYtTable">
    <el-button type="primary" @click="handleResetSelection">
      {{ isSelectAll ? "全选" : "取消全选" }}
    </el-button>
    <ytTable
      ref="ytTable"
      expandOnly
      idName="deId"
      :tableData="tableData"
      :tableConfig="tableConfig"
      :height="tableHeight"
      :tableDataColumn="tableDataColumn"
      :rowStyle="{}"
      :headerRowStyle="{
        background: '#F7F8FA',
        boxShadow: 'inset 0px -1px 0px 0px #EEEEEE',
        fontFamily: 'MicrosoftYaHei-Bold, MicrosoftYaHei',
        fontWeight: 'bold',
        color: '#515a6e',
      }"
      @handleSelectionChange="handleSelectionChange"
      @handleCellDbClick="handleCellDbClick"
    >
      <!-- 自定义类型插槽 -->
      <template slot="type" slot-scope="scope">
        <span
          :style="{
            color: changeColor(scope.row.type),
          }"
        >
          {{ scope.row.type | changeType }}
        </span>
      </template>

      <!-- 展开 -->
      <template slot="expand" slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="行id：">
            <span>{{ scope.row.deId }}</span>
          </el-form-item>
          <el-form-item label="名称：">
            <span>{{ scope.row.typeName }}</span>
          </el-form-item>
          <el-form-item label="描述：">
            <span>{{ scope.row.description }}</span>
          </el-form-item>
          <el-form-item label="更新时间：">
            <span>{{ scope.row.updateTime }}</span>
          </el-form-item>
          <el-form-item label="类型：">
            <span>{{ scope.row.type | changeType }}</span>
          </el-form-item>
          <el-form-item label="商品介绍：">
            <span>{{ scope.row.desc }}</span>
          </el-form-item>
          <el-form-item label="店铺名：">
            <span>{{ scope.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品分类：">
            <span>{{ scope.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>

      <!-- 操作 -->
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

      <!-- 自定义表头插槽 -->
      <template slot="slotHeader">
        <el-tag type="success">标签二</el-tag>
        <!-- 目前只支持自定义静态表头，后续再更新输入框等其它组件 -->
        <!-- <el-input v-model="inputValue" size="mini" placeholder="输入关键字搜索" /> -->
      </template>

      <template slot="slotContent" slot-scope="scope">
        {{ scope.row.desc }}
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
      tableHeight: "500", // 表格高度
      tableConfig: {
        loading: false,
        stripe: true, // 是否为斑马纹 table
        border: false, // 是否带有纵向边框
        resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        isAddIndex: true, // 是否将分页后的序号进行累加
      }, // 表格的配置项
      tableDataColumn: [
        { type: "selection", width: 50, fixed: "left" },
        {
          type: "expand",
          label: "展开",
          width: 50,
          fixed: "left",
          slotName: "",
        },
        { type: "index", label: "序号", width: 50, fixed: "left" },
        { label: "名称", value: "typeName", width: 100, sortable: false },
        {
          label: "类型",
          value: "type",
          width: "250",
          sortable: false,
          isSlot: true,
        },
        { label: "描述", value: "description", width: "200", sortable: false },
        { label: "更新时间", value: "updateTime", sortable: false },
        {
          type: "customSlot",
          slotHeader: "slotHeader",
          slotContent: "slotContent",
          value: "",
        },
        {
          type: "operationSlot",
          label: "操作",
          width: "400",
          fixed: "right",
          slotName: "",
        },
      ], // 表头配置项
      total: 0,
      ids: [],
      isSelectAll: true, // 是否全选
      // inputValue: "",
    };
  },
  methods: {
    /**
     * @Event 获取选中行组成的ids数组和选中行的数据
     * @description: passData = {
     *         ids: ids, // 选中行组成的ids数组
     *         selection, // 选中行的数据
     *       }
     * @author: mhf
     * @time: 2023-11-16 23:10:39
     **/
    handleSelectionChange(data) {
      console.log(data);
    },

    /**
     * @Event 表格单行双击事件
     * @description:
     * @author: mhf
     * @time: 2023-11-16 23:15:00
     **/
    handleCellDbClick(rowData) {
      console.log(rowData);
    },

    /**
     * @Event 表格多选框全部取消选中
     * @description:
     * @author: mhf
     * @time: 2023-11-16 23:19:24
     **/
    handleResetSelection() {
      this.$refs.ytTable.handleResetSelection(
        this.isSelectAll ? this.tableData : null
      );
      this.isSelectAll = !this.isSelectAll;
    },

    /**
     * @Event 表格单行的操作按钮点击事件
     * @description: data单行数据 type操作按钮类型
     * @author: mhf
     * @time: 2023-11-16 23:11:22
     **/
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
            updateTime:
              "更新时间1更新时间1更新时间1更新时间1更新时间1更新时间1更新时间111更新时间11更新时间1更新时间1更新时间1更新时间1",
            type: "type1",
            desc: "荷兰优质淡奶，奶香浓而不腻1",
            shop: "王小虎夫妻店1",
            category: "江浙小吃、小吃零食1",
          },
          {
            deId: 2,
            typeName: "名称2",
            description: "描述2",
            updateTime: "更新时间2更新时间2更新时间2更新时间2更新时间2",
            type: "type2",
            desc: "荷兰优质淡奶，奶香浓而不腻2荷兰优质淡奶，荷兰优质淡奶，奶香浓而不腻2荷兰优质淡奶，奶香浓而不腻2荷兰优质淡奶，奶香浓而不腻2荷兰优质淡奶，奶香浓而不腻2",
            shop: "王小虎夫妻店2",
            category: "江浙小吃、小吃零食2",
          },
          {
            deId: 3,
            typeName: "名称3名称3名称3名称3名称3名称3名称3名称3",
            description: "描述3",
            updateTime: "更新时间3",
            type: "type3",
            desc: "荷兰优质淡奶，奶香浓而不腻3",
            shop: "王小虎夫妻店3",
            category: "江浙小吃、小吃零食3",
          },
          {
            deId: 4,
            typeName: "名称4",
            description:
              "描述4描述4描述4描述4描述4描述4描述4描述4描述4描述4描述4描述4描述4描述4",
            updateTime: "更新时间4",
            type: "type4",
            desc: "荷兰优质淡奶，奶香浓而不腻4",
            shop: "王小虎夫妻店4",
            category: "江浙小吃、小吃零食4",
          },
          {
            deId: 5,
            typeName: "名称5",
            description: "描述5",
            updateTime: "更新时间5",
            type: "type5",
            desc: "荷兰优质淡奶，奶香浓而不腻5",
            shop: "王小虎夫妻店5",
            category: "江浙小吃、小吃零食5",
          },
        ];
        this.tableConfig.loading = false;
      }, 200);
    },

    changeColor(item) {
      switch (item) {
        case "type1":
          return "lightgreen";
        case "type2":
          return "lightblue";
        case "type3":
          return "red";
        case "type4":
          return "purple";
        case "type5":
          return "pink";
        default:
          return "yellow";
      }
    },
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
