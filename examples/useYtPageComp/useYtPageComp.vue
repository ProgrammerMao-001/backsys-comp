<!--
 * @Description: 使用ytPageComp快速新建模板组件 页面
 * @Author: mhf
 * @Date: 2023/11/27 22:04
-->

<template>
  <div>
    <ytPageComp
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

      <template slot="operationSlot" slot-scope="scope">
        <el-button
            v-hasPermi="['system:user:resetPwd']"
            type="text"
            size="small"
            icon="iconfont if-biaodancaozuo-xiangqing"
            @click="doSomething(scope.row, '详情')"
        >详情
        </el-button>
        <el-button
            v-hasPermi="['system:user:resetPwd']"
            type="text"
            size="small"
            icon="iconfont if-biaodancaozuo-xiugai"
            @click="doSomething(scope.row, '修改')"
        >修改
        </el-button>
        <el-button
            v-hasPermi="['system:user:resetPwd']"
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

export default {
  name: "howToUse",
  components: {},
  props: {},
  dicts: [],
  data() {
    return {
      formLabel: [
        {
          label: "公告标题",
          value: "noticeTitle",
          type: "input",
        },
        {
          label: "创建人",
          value: "createBy",
          type: "select",
          opts: [],
          optLabel: "deptName",
          optValue: "deptId",
        },
        {
          label: "类型",
          value: "noticeType",
          type: "select",
          opts: [],
          dict: "sys_notice_type",
          optLabel: "dictLabel",
          optValue: "dictValue",
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
          hasPermi: "system:user:input",
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
      permiArr: ["system:user:add", "system:user:delete"],
      tableData: [],
      tableConfig: {
        loading: false,
      },
      tableDataColumn: [
        {label: "多选", type: "selection"},
        {label: "序号", type: "index"},
        {label: "日期", value: "date"},
        {label: "姓名", value: "name"},
        {label: "省份", value: "province"},
        {label: "地址", value: "address"},
        {label: "邮编", value: "zip"},
        {label: "操作", value: "operationSlot", isSlot: true},
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
      setTimeout(() => {
        this.tableData = [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
        this.tableConfig.loading = false;
      }, 500)
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
      console.log(id)
    },

    showPublicDialog(data, type) {
      console.log(data, type)
    },

    showDetailDialog(data, type) {
      let passData = {data, type};
      console.log(passData, "passData");
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped></style>
