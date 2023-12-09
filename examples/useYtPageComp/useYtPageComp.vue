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
      idName="id"
      :formLabel="formLabel"
      :btnList="btnList"
      :permiArr="permiArr"
      :tableData="tableData"
      :tableConfig="tableConfig"
      :tableDataColumn="tableDataColumn"
      :total="total"
      :paginationConfig.sync="paginationConfig"
      :pageSizes="pageSizes"
      :importData="importData"
      :exportTypeAndUrl="exportTypeAndUrl"
      @on-response="getBtnType"
      @getTableData="getTableData"
      @showPublicDialog="showPublicDialog"
      @deleteRows="deleteRows"
    >
      <!--      <template slot="noticeType" slot-scope="scope">-->
      <!--        <dict-tag-->
      <!--            :options="dict.type.sys_notice_type"-->
      <!--            :value="scope.row.noticeType"-->
      <!--        />-->
      <!--      </template>-->

      <!--      <template slot="status" slot-scope="scope">-->
      <!--        <dict-tag-->
      <!--            :options="dict.type.sys_notice_status"-->
      <!--            :value="scope.row.status"-->
      <!--        />-->
      <!--      </template>-->

      <template slot="img" slot-scope="scope">
        <el-image
          style="width: 80px; height: 110px"
          :src="scope.row.img"
          :preview-src-list="[scope.row.img]"
          width="160"
          height="220"
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
  </div>
</template>

<script>
import tableData from "./tableData";

export default {
  name: "useYtPageComp",
  components: {},
  props: {},
  dicts: [],
  data() {
    return {
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
            },
            {
              cat: "犯罪",
            },
            {
              cat: "悬疑",
            },
            {
              cat: "喜剧",
            },
            {
              cat: "动画",
            },
            {
              cat: "奇幻",
            },
            {
              cat: "冒险",
            },
            {
              cat: "谍战",
            },
            {
              cat: "家庭",
            },
            {
              cat: "科幻",
            },
            {
              cat: "动作",
            },
            {
              cat: "爱情",
            },
            {
              cat: "青春",
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
      ],
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
      ],
      permiArr: ["system:user:add", "system:user:delete", "system:user:import"],
      tableData: [],
      tableConfig: {
        loading: false,
      },
      tableDataColumn: [
        { label: "多选", type: "selection" },
        { label: "序号", type: "index" },
        { label: "海报", value: "img", isSlot: true, width: 100 },
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
      paginationConfig: {
        pageNum: 1,
        pageSize: 10,
      },
      pageSizes: [5, 10, 15, 20],
      importData: {
        fileTitle: "用户导入",
        importType: "system",
        importUrl: "/system/user/importData",
        templateType: "system",
        templateUrl: "/system/user/importTemplate",
      },
      exportTypeAndUrl: {
        exportType: "system",
        exportUrl: "/system/user/export",
      },
    };
  },
  methods: {
    getTableData() {
      this.tableConfig.loading = true;
      console.log(this.paginationConfig, "paginationConfig")
      setTimeout(() => {
        this.tableData = tableData.slice((this.paginationConfig.pageNum - 1) * this.paginationConfig.pageSize, this.paginationConfig.pageNum * this.paginationConfig.pageSize);
        this.total = tableData.length;
        this.tableConfig.loading = false;
      }, 200);
    },

    getBtnType(type) {
      console.log(type);
    },

    doSomething(data, type) {
      console.log(data, type);
      if (type === "详情" || type === "修改") {
        this.showPublicDialog(data, type);
      } else if (type === "删除") {
        this.deleteRows(data.id);
      }
    },

    deleteRows(id) {
      console.log(id);
    },

    showPublicDialog(data, type) {
      console.log(data, type);
    },

    showDetailDialog(data, type) {
      let passData = { data, type };
      console.log(passData, "passData");
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
