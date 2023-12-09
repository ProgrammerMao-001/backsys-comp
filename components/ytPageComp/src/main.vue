<!--
 * @Description: 搜索栏+按钮组+表格+分页模板 页面
 * @Author: mhf
 * @Date: 2023/11/27 22:00
-->
<template>
  <div class="ytPageComp">
    <div class="search-box">
      <!-- 搜索条件 -->
      <collapseTransition mode="out-in">
        <yt-form
          class="formComponent"
          v-show="showSearch"
          v-if="formLabel.length > 0"
          :form="paginationConfig"
          :form-label="formLabel"
          @handleSearch="handleSearch"
          @handleResetFrom="handleResetFrom"
        ></yt-form>
      </collapseTransition>
      <!-- 搜索条件 -->

      <!-- 分割线 -->
      <div class="lineH" v-show="showSearch" v-if="formLabel.length > 0" />
      <!-- 分割线 -->

      <!-- 工具栏 -->
      <div
        class="tools-config dfr"
        v-if="btnList.length > 0 || formLabel.length > 0"
      >
        <!-- 左侧按钮组 -->
        <div class="left">
          <yt-table-btn
            v-if="btnList.length > 0"
            :btn-list="btnList"
            :permiArr="permiArr"
            @sendClick="changeBtn"
          >
          </yt-table-btn>
        </div>
        <!-- 左侧按钮组 -->

        <!-- 右侧显示/隐藏 -->
        <div class="right">
          <yt-is-show-form
            v-if="formLabel.length > 0"
            :show-search.sync="showSearch"
          >
          </yt-is-show-form>
        </div>
        <!-- 右侧显示/隐藏 -->
      </div>
      <!-- 工具栏 -->
    </div>

    <!-- 表格数据 -->
    <transition name="page-transition" mode="out-in">
      <yt-table
        v-if="showTable"
        class="tableComponent"
        ref="tableComponent"
        :table-data="tableData"
        :table-config="tableConfig"
        :table-data-column="tableDataColumn"
        :height="tableHeight"
        :idName="idName"
        :paginationConfig="paginationConfig"
        :btnWidth="btnWidth"
        @handleSelectionChange="handleSelectionChange"
      >
        <template
          v-for="item in tableSlotArr"
          :slot="item.value"
          slot-scope="scope"
        >
          <slot :name="item.value" :row="scope.row" />
        </template>
      </yt-table>
    </transition>
    <!-- 表格数据 -->

    <!-- 分页区域 -->
    <div class="paginationComponent dfr">
      <yt-pagination
        v-if="total > 0"
        :total="total"
        :page="paginationConfig.pageNum"
        :limit="paginationConfig.pageSize"
        :page-sizes="pageSizes"
        @pagination="handleChangePagination"
      >
      </yt-pagination>
    </div>
    <!-- 分页区域 -->
  </div>
</template>
<script>
export default {
  name: "ytPageComp",
  dicts: [],
  components: {},
  props: {
    formLabel: {
      type: Array,
      default: () => [],
    }, // 搜索条件
    btnWidth: {
      type: String,
      default: "240px",
    }, // 操作栏宽度
    btnList: {
      type: Array,
      default: () => [],
    }, // 工具栏按钮组(新增、删除、导入、导出等)
    permiArr: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    }, // 表格数据
    tableConfig: {
      type: Object,
      default: () => {
        return {
          isLoading: false,
        };
      },
    }, // 表格loading配置项
    tableDataColumn: {
      type: Array,
      default: () => [],
    }, // 表格的表头数据
    total: {
      type: Number,
      default: 0,
    }, // 表格数据长度
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    }, // 表格的分页参数
    pageSizes: {
      type: Array,
      default: () => [5, 10, 15, 20],
    }, // 表格分页大小
    idName: {
      type: String,
      default: "id",
    }, // 表格单行数据的唯一标识（默认为 id）
    importData: {
      type: Object,
      default: () => {
        return {
          fileTitle: null, // 导入的文件名称（即弹窗的标题） String
          importType: null, // 导入文件时选择的微服务类型 String
          importUrl: null, // 导入的接口地址 String
          templateType: null, // 模板下载使用的微服务名称 String
          templateUrl: null, // 模板下载地址 String
        };
      },
    }, // 导入文件时需要的参数
    exportTypeAndUrl: {
      type: Object,
      default: () => {
        return {
          isCustom: false, // 是否需要其他的自定义传参
          exportType: null, // 导出文件时的微服务类型 String
          exportUrl: null, // 导出的接口地址 String
        };
      },
    }, // 导出的文件接口路径 需要的格式如：{ exportType: 'forklift', exportUrl: '/forklift/driverInfo/exportCardInfo' }
    customObj: {
      type: Object,
      default: () => {
        return {};
      },
    }, // 自定义导出文件的参数 exportTypeAndUrl.isCustom = true 的时候需要传递的参数
  },
  watch: {
    showSearch(newValue) {
      let ac = document.querySelector(".ytPageComp"); // 最外层整个盒子
      // let fc = document.querySelector(".formComponent"); // 筛选条件那一栏
      let sb = document.querySelector(".search-box"); // 左侧按钮组 + 右侧的显示隐藏那一栏
      let pc = document.querySelector(".paginationComponent"); // 分页
      if (!newValue) {
        /* 筛选隐藏时 */
        setTimeout(() => {
          this.tableHeight = `calc(${ac.clientHeight}px - ${sb.clientHeight}px - ${pc.clientHeight}px)`;
        }, 1);
      } else {
        /* 筛选显示时 */
        setTimeout(() => {
          this.tableHeight = `calc(${ac.clientHeight}px - ${sb.clientHeight}px - ${pc.clientHeight}px)`;
        }, 1);
      }
    },
  },
  computed: {
    tableSlotArr() {
      /* 需要插槽（字典、操作栏）[tableDataColumn中isSlot===true组成的数组] */
      return this.tableDataColumn.filter((item) => item.isSlot);
    }, // 初始化插槽数组
  },
  data() {
    return {
      showSearch: true, // 显示搜索条件
      ids: [], // 表格中选中的id
      xlsData: {
        title: null,
        open: false,
        url: null,
        templateUrl: null,
      }, // 文件上传需要的参数

      /* 完整的 xlsData demo */
      // xlsData: {
      //   title: "物资入库导入",
      //   open: false,
      //   url:
      //     process.env.VUE_APP_BASE_API +
      //     requestType.road +
      //     "/direct/resourceApply/importApply", // 上传接口
      //   templateUrl: requestType.road + "/direct/resourceApply/downTemplate", // 下载接口
      // },
      /* 完整的 xlsData demo */

      tableHeight: "0", // 表格的高度
      resizeE: null, // 监听器
      showTable: false, // 是否展示表格
    };
  },
  methods: {
    /**
     * @Event 方法
     * @description: 查询
     * @more: 重置分页参数并查询指定的表单条件
     * */
    handleSearch(searchData) {
      let updateData = {
        ...searchData,
        pageNum: 1,
        pageSize: 10,
      };
      this.$emit("update:paginationConfig", updateData);
      this.getList();
    },

    /**
     * @Event 方法
     * @description: 重置表单并重新获取表格数据
     * @more: 配合父组件中 .sync使用，:update实现更新父组件传递进来的数据
     * */
    handleResetFrom() {
      let updateData = {
        pageNum: 1,
        pageSize: 10,
      }; // 分页参数
      this.$emit("update:paginationConfig", updateData);
      this.$refs.tableComponent.handleResetSelection();
      this.$emit("resetForm"); // 父组件中自定义的重置筛选框的方法（如父组件中筛选项需设置默认值）
      this.getList();
    },

    /**
     * @Event 方法
     * @description: 接收父组件传递来的 获取表格数据 的方法
     * @use: @getTableData="父组件中获取表格数据的Event"
     * */
    async getList() {
      this.showTable = false;
      await this.$emit("getTableData");
      this.$nextTick(() => {
        this.showTable = true;
      });
    },

    /**
     * @Interface 接口
     * @description: 初始化搜索栏的数据(字典)
     * */
    getCardTypeOptions() {
      console.log(this.formLabel, "formLabel");
      // this.formLabel.forEach((item) => {
      //   if (item.dict) {
      //     getDicts(item.dict).then((res) => {
      //       item.opts = res.data;
      //     });
      //   }
      // });
    },

    /**
     * @Event 方法
     * @description: 将点击的按钮的名称传递给父组件
     * @use: 父组件中 @on-response="getBtnType" 用来接收按钮类型名称
     * @warning!!!: 目前 新增、导入、导出、删除 已经实现功能，无需在父组件中重复编写
     * */
    changeBtn(type) {
      this.$emit("on-response", type);

      if (type === "新增") {
        this.$emit("showPublicDialog", null, type);
      }
      // if (type === "导入") {
      //   this.xlsData = {
      //     title: this.importData.fileTitle,
      //     open: false,
      //     url:
      //         process.env.VUE_APP_BASE_API +
      //         requestType[this.importData.importType] +
      //         this.importData.importUrl, // 文件上传接口
      //     templateUrl:
      //         requestType[this.importData.templateType] +
      //         this.importData.templateUrl, // 模板下载接口
      //   };
      //   this.handleImport();
      // }
      // if (type === "导出") {
      //   this.download(
      //       requestType[this.exportTypeAndUrl.exportType] +
      //       this.exportTypeAndUrl.exportUrl,
      //       `xxx.xlsx`,
      //       this.exportTypeAndUrl.isCustom
      //           ? this.customObj
      //           : this.paginationConfig
      //   );

      /* 完整的导出接口 demo */
      // this.download(
      //   requestType.road + "/maintainRoad/ManagementDevice/export",
      //   `设备数据.xlsx`,
      //   this.paginationConfig
      // );
      /* 完整的导出接口 demo */
      // }
      // if (type === "删除") {
      //   if (this.ids.length === 0) {
      //     this.$message.error("请先至少选择一条数据");
      //   } else {
      //     this.$emit("deleteRows", this.ids);
      //   }
      // }
    },

    /**
     * @Event 方法
     * @description: 分页变化事件
     * */
    handleChangePagination(obj) {
      let updateData = {
        ...this.paginationConfig,
        pageNum: obj.page,
        pageSize: obj.limit,
      };
      this.$emit("update:paginationConfig", updateData);
      this.getList();
    },

    /**
     * @Event 方法
     * @description: 接收 tableComponent 传来的选中行的数据
     * @param: selection: 选中的表格的行数组， idName: 需要处理的id的名称（默认id）
     * */
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item[this.idName]);
    },

    /**
     * @Event 方法
     * @description: 打开导入组件
     * */
    handleImport() {
      this.xlsData.open = true;
    },

    /**
     * @Event 方法
     * @description: 完成导入
     * */
    importSubmit() {
      this.xlsData.open = false;
      this.getList();
    },

    /**
     * @Event 方法
     * @description: 初始化表格高度
     * */
    initTableHeight() {
      this.$nextTick(() => {
        let ac = document.querySelector(".ytPageComp"); // 最外层整个盒子
        let sb = document.querySelector(".search-box"); // 搜索栏 + 工具栏（左侧按钮组 + 右侧的显示隐藏）
        let pc = document.querySelector(".paginationComponent"); // 分页
        this.tableHeight = `calc(${ac.clientHeight}px - ${sb.clientHeight}px - ${pc.clientHeight}px)`;
        console.log(this.tableHeight);
      });
    },
  },

  created() {
    function debounce(func, wait) {
      //定时器变量
      var timeout;
      return function () {
        //每次触发scrolle，先清除定时器
        clearTimeout(timeout);
        //指定多少秒后触发事件操作handler
        timeout = setTimeout(func, wait);
      };
    }

    this.getList(); // 获取表格数据
    this.getCardTypeOptions(); // 获取搜索栏字典的数据
    this.initTableHeight(); // 初始化表格高度
    this.resizeE = debounce(this.initTableHeight, 300); // 防抖
    window.addEventListener("resize", this.resizeE);
  },

  mounted() {},

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeE);
  },
};
</script>

<style lang="scss">
.ytPageComp {
  width: 100%;
  height: 100%;
  font-size: 14px !important;
}

::v-deep .el-table .cell .el-dropdown .el-dropdown-link {
  font-size: 14px !important;
  //color: red !important;
}

.search-box {
}

.formComponent {
}

.tableComponent {
}

.paginationComponent {
  height: 50px;
  align-items: center;
  flex-direction: row-reverse;
  padding: 10px 10px 0 0;
}

.lineH {
  height: 1px;
  background: #eeeeee;
  width: 100%;
  margin-bottom: 10px;
}

.tools-config {
  justify-content: space-between;
  align-items: baseline;
  padding: 0 10px;
  min-height: 48px;

  .left {
  }

  .right {
    min-width: 84px;
  }
}
</style>
