<!--
 * @Description: 使用ytPageComp快速新建模板组件 页面
 * @Author: mhf
 * @Date: 2023/11/27 22:04
-->

<template>
  <div class="useYtPageComp">
    <ytPageComp
      class="useYtPageComp-ytPageComp bgreen"
      ref="ytPageComp"
      :idName="idName"
      :inline="inline"
      :formLabel="formLabel"
      :formRules="formRules"
      :labelWidth="labelWidth"
      :formSize="formSize"
      :showOperationBtn="showOperationBtn"
      :searchBtnName="searchBtnName"
      :resetBtnName="resetBtnName"
      :btnList="btnList"
      :permiArr="permiArr"
      :tableData="tableData"
      :tableConfig="tableConfig"
      :tableDataColumn="tableDataColumn"
      :isNeedRowDbClick="isNeedRowDbClick"
      :total="total"
      :paginationConfig.sync="paginationConfig"
      :pageSizes="pageSizes"
      :background="background"
      :paginationColor="paginationColor"
      :init-table-data="true"
      @selectClick="selectClick"
      @getBtnType="getBtnType"
      @showPublicDialog="showPublicDialog"
      @deleteRows="deleteRows"
      @getTableData="getTableData"
      @handleCellDbClick="handleCellDbClick"
    >
      <template slot="img" slot-scope="scope">
        <el-image
          style="width: 80px; height: 110px"
          :src="scope.row.img"
          :preview-src-list="[scope.row.img]"
        />
      </template>

      <template slot="sc" slot-scope="scope">
        {{ scope.row.sc === 0 ? "暂无评分" : scope.row.sc }}
      </template>

      <template slot="operationSlot" slot-scope="scope">
        <el-button
          type="text"
          size="small"
          icon="iconfont if-biaodancaozuo-xiangqing"
          @click="doSomething(scope.row, '详情')"
          >详情
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="iconfont if-biaodancaozuo-xiugai"
          @click="doSomething(scope.row, '修改')"
          >修改
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="iconfont if-biaodancaozuo-shanchu"
          style="color: #fc5c5c"
          @click="doSomething(scope.row, '删除')"
          >删除
        </el-button>
      </template>
    </ytPageComp>
    <demoDialog ref="demoDialog" />
  </div>
</template>

<script>
import tableData from "./tableData";
import demoDialog from "./demoDialog.vue";
export default {
  name: "useYtPageComp",
  components: { demoDialog },
  props: {},
  dicts: [],
  data() {
    return {
      inline: true, // （可省略） 行内表单模式 true / false
      formLabel: [
        {
          label: "电影名",
          value: "nm",
          type: "input",
        },
        {
          label: "主演",
          value: "star",
          type: "input",
        },
        {
          label: "导演",
          value: "dir",
          type: "input",
        },
        {
          label: "版本",
          value: "version",
          type: "select",
          opts: [
            {
              version: "v2d imax",
            },
            {
              version: "v3d",
            },
          ],
          optLabel: "version",
          optValue: "version",
        },
        {
          label: "类型",
          value: "cat",
          type: "select",
          opts: [
            {
              cat: "剧情",
              value: "1",
            },
            {
              cat: "犯罪",
              value: "2",
            },
            {
              cat: "悬疑",
              value: "3",
            },
            {
              cat: "喜剧",
              value: "4",
            },
            {
              cat: "动画",
              value: "5",
            },
            {
              cat: "奇幻",
              value: "6",
            },
            {
              cat: "冒险",
              value: "7",
            },
            {
              cat: "谍战",
              value: "8",
            },
            {
              cat: "家庭",
              value: "9",
            },
            {
              cat: "科幻",
              value: "10",
            },
            {
              cat: "动作",
              value: "11",
            },
            {
              cat: "爱情",
              value: "12",
            },
            {
              cat: "青春",
              value: "13",
            },
          ],
          optLabel: "cat",
          optValue: "cat",
        },
        {
          label: "上映时间",
          value: "rt",
          type: "daterange",
        },
      ], // 搜索条件
      formRules: {
        nm: [
          {
            required: true,
            message: "请输入电影名",
            trigger: "blur",
          },
        ],
      }, // （可省略）表单规则校验对象
      labelWidth: "", //（可省略） 表单标签label宽度
      formSize: "mini", //（可省略） 组件尺寸 small(默认) / mini / medium
      showOperationBtn: true, //（可省略） 是否展示 (查询、重置)按钮
      searchBtnName: "搜索", //（可省略） 查询按钮名称
      resetBtnName: "重置", //（可省略） 重置按钮名称
      btnList: [
        {
          name: "新增",
          icon: "el-icon-plus",
          color: "#1492FF",
          hasPermi: "system:user:add",
        },
        {
          name: "导入",
          icon: "el-icon-s-promotion",
          color: "#1492FF",
          hasPermi: "system:user:import",
        },
        {
          name: "导出",
          icon: "el-icon-upload",
          color: "#1492FF",
          hasPermi: "system:user:export",
        },
        {
          name: "删除",
          icon: "el-icon-minus",
          color: "#fc5c5c",
          hasPermi: "system:user:delete",
        },
      ], // 工具栏按钮组(新增、删除、导入、导出等)
      permiArr: ["system:user:add", "system:user:delete", "system:user:import"],
      tableData: [],
      tableConfig: {
        loading: false,
        stripe: true, // 是否为斑马纹 table
        border: false, // 是否带有纵向边框
        resizable: false, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        isAddIndex: true, // 是否将分页后的序号进行累加（如为true则分页后有10条数据，第二页第一条的数据序号为11）
      },
      tableDataColumn: [
        { label: "多选", type: "selection" },
        { label: "序号", type: "index" },
        { label: "海报", value: "img", isSlot: true, width: 100 },
        { label: "唯一标识", value: "movieId" },
        { label: "电影名", value: "nm" },
        { label: "类型", value: "cat" },
        { label: "观众评分", value: "sc", sortable: true, isSlot: true },
        { label: "主演", value: "star" },
        { label: "导演", value: "dir" },
        { label: "版本", value: "version" },
        { label: "演出信息", value: "showInfo" },
        { label: "上映时间", value: "rt" },
        { label: "操作", value: "operationSlot", isSlot: true, width: 120 },
      ],
      total: 0,
      isNeedRowDbClick: true,
      paginationConfig: {
        pageNum: 1,
        pageSize: 10,
      },
      pageSizes: [5, 10, 15, 20],
      background: true, // 是否需要自定义分页的背景颜色
      paginationColor: {
        "--activeBgColor": "pink", // 选中的背景色
        "--fontColor": "yellow", // 选中的字体颜色
        "--hoverColor": "#ff0000", // 鼠标悬停的字体颜色
      },
      idName: "movieId", // id唯一标识
    };
  },
  methods: {
    /**
     * @Event yt-form 组件中 下拉列表里面的项点击
     * @description: 组件下拉列表里面的项点击事件
     * @param: item: formLabel里被点击的那个对象，items: formLabel里被点击的那个对象（opt数组）中选中的那个对象
     * @author: mhf
     * @time: 2023-10-29 13:30:25
     **/
    selectClick(checked) {
      console.log(checked, "checked");
    },

    /**
     * @Event yt-table-btn 组件中，获取按钮点击的类型
     * @description: 点击获取按钮的类型，需注意 新增和删除按钮已经封装好对应的方法，其他的按钮需要自行判断
     * @param: 新增：传入showPublicDialog()方法
     * @param: 删除：传入deleteRows()方法
     * @author: mhf
     * @time: 2023-12-17 00:40:18
     **/
    getBtnType(type) {
      if (type === "导入") this.$message.success("你点击了导入按钮");
    },

    /**
     * @Event yt-table-btn 组件中,传入的新增按钮的点击事件
     * @description: 新增、修改、详情按钮的点击事件（前提是新增、修改、详情的弹窗是公共的）
     * @author: mhf
     * @time: 2023-12-17 00:44:53
     **/
    showPublicDialog(data, type) {
      this.$refs.demoDialog.showDialog({ data, type });
    },

    /**
     * @Event yt-table 組件中表格单行的双击事件（需要先设置isNeedRowDbClick为true）
     * @description:
     * @author: mhf
     * @time: 2023-12-17 02:59:43
     **/
    handleCellDbClick(rowData) {
      this.$message.success(`你双击了该行数据${JSON.stringify(rowData)}`);
    },

    getTableData() {
      this.tableConfig.loading = true;
      setTimeout(() => {
        this.$message.success("查询表格");
        this.tableData = tableData.slice(
          (this.paginationConfig.pageNum - 1) * this.paginationConfig.pageSize,
          this.paginationConfig.pageNum * this.paginationConfig.pageSize
        );
        this.total = tableData.length;
        this.tableConfig.loading = false;
      }, 200);
    },

    doSomething(data, type) {
      if (type === "详情" || type === "修改") {
        this.showPublicDialog(data, type);
      } else if (type === "删除") {
        this.deleteRows(data[this.idName]);
      }
    },

    /**
     * @Event 固定写法，方法名可自定义
     * @description: 删除数据，可多选删除或者删除单行数据
     * @author: mhf
     * @time: 2023-12-11 23:32:14
     **/
    deleteRows(id) {
      let ids = id || this.$refs.ytPageComp.selectionObj.ids;
      console.log(ids, "ids");
      // doSomething ...
      this.$message.success(`删除数据: ${ids}`);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.useYtPageComp {
  width: 100vw;
  height: 100vh;
  position: relative;

  &-ytPageComp {
    width: calc(100vw - 200px);
    height: calc(100vh - 70px);
    position: absolute;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
