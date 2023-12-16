<!--
 * @Description: 搜索栏+按钮组+表格+分页模板 页面
 * @Author: mhf
 * @Date: 2023/11/27 22:00
-->
<template>
  <div class="ytPageComp">
    <div class="search-box">
      <!-- 顶部搜索栏 -->
      <collapseTransition mode="out-in">
        <yt-form
          class="formComponent"
          v-show="showSearch"
          v-if="formLabel.length > 0"
          :inline="inline"
          :form="paginationConfig"
          :form-label="formLabel"
          :form-rules="formRules"
          :form-size="formSize"
          :label-width="labelWidth"
          :show-operation-btn="showOperationBtn"
          :reset-btn-name="resetBtnName"
          :search-btn-name="searchBtnName"
          @selectClick="selectClick"
          @handleSearch="handleSearch"
          @handleResetFrom="handleResetFrom"
        ></yt-form>
      </collapseTransition>
      <!-- 顶部搜索栏 -->

      <!-- 水平分割线 -->
      <div class="lineH" v-show="showSearch" v-if="formLabel.length > 0" />
      <!-- 水平分割线 -->

      <!-- 顶部按钮工具栏 -->
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
      <!-- 顶部按钮工具栏 -->
    </div>

    <!-- 表格数据 -->
    <!--    <transition name="page-transition" mode="out-in">-->
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
      :rowStyle="rowStyle"
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
    <!--    </transition>-->
    <!-- 表格数据 -->

    <!-- 分页 -->
    <div class="paginationComponent dfr">
      <yt-pagination
        v-if="total > 0"
        :total="total"
        :page="paginationConfig.pageNum"
        :limit="paginationConfig.pageSize"
        :page-sizes="pageSizes"
        :paginationColor="paginationColor"
        @pagination="handleChangePagination"
      >
      </yt-pagination>
    </div>
    <!-- 分页 -->
  </div>
</template>
<script>
import { debounce, isEmptyArray } from "../../utils/publicFun";

export default {
  name: "ytPageComp",
  components: {},
  props: {
    inline: {
      type: Boolean,
      default: true,
    }, // 行内表单模式 true / false
    formLabel: {
      type: Array,
      default: () => [],
    }, // 搜索条件
    formRules: {
      type: Object,
      default: () => {},
    }, // 表单规则校验对象
    labelWidth: {
      type: String,
      default: "",
    }, // 表单标签label宽度
    formSize: {
      type: String,
      default: "small",
    }, // 组件尺寸 small / mini / medium
    showOperationBtn: {
      type: Boolean,
      default: true,
    }, // 是否展示 (查询、重置)按钮
    searchBtnName: {
      type: String,
      default: "查询",
    }, // 查询按钮名称
    resetBtnName: {
      type: String,
      default: "重置",
    }, // 重置按钮名称

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
          loading: false,
          stripe: true, // 是否为斑马纹 table
          border: true, // 是否带有纵向边框
          resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
          isAddIndex: true, // 是否将分页后的序号进行累加（如为true则分页后有10条数据，第二页第一条的数据序号为11）
        };
      },
    }, // 表格的配置项
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
    rowStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    paginationColor: {
      type: Object,
      default() {
        return {
          "--activeBgColor": "#409eff", // 选中的背景色
          "--fontColor": "#ffffff", // 选中的字体颜色
          "--hoverColor": "#409eff", // 鼠标悬停的字体颜色
        };
      },
    }, // 分页按钮的样式
    noSelection: {
      type: String,
      default: "请先选择要删除的数据！",
    }, // 没有选择数据时的提示信息
  },
  watch: {
    showSearch(newValue) {
      let ac = document.querySelector(".ytPageComp"); // 最外层整个盒子
      let sb = document.querySelector(".search-box"); // 左侧按钮组 + 右侧的显示隐藏那一栏
      let pc = document.querySelector(".paginationComponent"); // 分页
      if (!newValue) {
        /* 筛选隐藏时 */
        setTimeout(() => {
          this.tableHeight = `calc(${ac.clientHeight}px - ${sb.clientHeight}px - ${pc.clientHeight}px)`;
        }, 301);
      } else {
        /* 筛选显示时 */
        setTimeout(() => {
          this.tableHeight = `calc(${ac.clientHeight}px - ${sb.clientHeight}px - ${pc.clientHeight}px)`;
        }, 301);
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
      selectionObj: {
        ids: [], //  保存多选选中的行的id
        selection: [], // 保存多选选中的行的数据
      },
      tableHeight: "0", // 表格的高度
      resizeE: null, // 监听器
      showTable: false, // 是否展示表格
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
    selectClick(selected) {
      this.$emit("selectClick", selected);
    },

    /**
     * @Event yt-form 组件中重置按钮点击
     * @description: 查询按钮的点击事件
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
     * @Event yt-form 组件中
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
      // this.showTable = false;
      await this.$emit("getTableData");
      // this.$nextTick(() => {
      //   this.showTable = true;
      // });
    },

    /**
     * @Event 方法
     * @description: 将点击的按钮的名称传递给父组件
     * @use: 父组件中 @on-response="getBtnType" 用来接收按钮类型名称
     * @warning!!!: 目前 新增、删除 已经实现功能，无需在父组件中重复编写
     * */
    changeBtn(type) {
      this.$emit("on-response", type);
      if (type === "新增") {
        this.$emit("showPublicDialog", null, type);
      }
      if (type === "删除") {
        if (!isEmptyArray(this.selectionObj.ids)) {
          this.$emit("deleteRows");
        } else {
          this.$message.error(this.noSelection);
        }
      }
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
      this.selectionObj = selection;
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
        this.showTable = true;
      });
    },
  },

  created() {
    this.getList(); // 获取表格数据
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
