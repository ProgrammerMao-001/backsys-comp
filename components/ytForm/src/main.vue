<!--
 * @Description: 搜索表单组件 页面
 * @Author: mhf
 * @Use: type可选值：'',numberInput,select,dept,radio,switch,date,daterange,dateNoTime,datetimerange
 * @Date: 2023/10/29 11:19
-->

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="search-component">
    <!-- 表单区域 -->
    <el-form ref="formRef" :model="form" :inline="inline" :rules="formRules">
      <el-form-item
          v-for="(item, index) in formLabel"
          :key="index"
          :label="item.label ? item.label + ' :' : item.label"
          :prop="item.value"
      >
        <el-input
            v-if="item.type === 'input'"
            v-model.trim="form[item.value]"
            :size="formSize"
            :placeholder="'请输入' + item.label"
        />

        <el-select
            v-if="item.type === 'select'"
            v-model.trim="form[item.value]"
            filterable
            clearable
            :placeholder="'请选择' + item.label"
            :size="formSize"
        >
          <el-option
              v-for="(items, index) in item.opts"
              :key="index"
              :label="items[item.optLabel]"
              :value="items[item.optValue]"
              @click.native="selectClick(item, items)"
          />
        </el-select>

        <!--        <treeselect-->
        <!--            v-if="item.type === 'dept'"-->
        <!--            v-model="form[item.value]"-->
        <!--            class="treeBox"-->
        <!--            :options="item.opts"-->
        <!--            :show-count="true"-->
        <!--            :placeholder="'请选择' + item.label"-->
        <!--        />-->
        <template v-if="item.type === 'radio'">
          <el-radio
              v-for="items in item.opts"
              :key="items.value"
              v-model="form[item.value]"
              :label="items.value"
          >{{ items.label }}
          </el-radio>
        </template>
        <el-switch v-if="item.type === 'switch'" v-model="form[item.value]"/>
        <el-date-picker
            v-if="item.type === 'date'"
            v-model="form[item.value]"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-date-picker
            v-if="item.type === 'dateNoTime'"
            v-model="form[item.value]"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
        />
        <el-date-picker
            v-if="item.type === 'datetimerange'"
            v-model="form[item.value]"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-date-picker
            v-if="item.type === 'daterange'"
            v-model="form[item.value]"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <slot/>
      </el-form-item>
      <div v-if="showOperationBtn" class="right-handle">
        <el-form-item>
          <el-button
              type="primary"
              :size="formSize"
              icon="el-icon-search"
              @click="handleSearch"
          >查询
          </el-button>
          <el-button
              :size="formSize"
              icon="el-icon-refresh"
              @click="handleResetFrom"
          >重置
          </el-button>
        </el-form-item>
        <el-form-item/>
        <el-form-item>
          <slot name="handleSlot"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ytForm",
  props: {
    inline: {
      type: Boolean,
      default: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    form: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    formLabel: {
      type: Array,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    formRules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    labelWidth: {
      type: Number,
      default: 90,
    },
    formSize: {
      type: String,
      default: "small"
    }, // small / mini / medium
    showOperationBtn: {
      type: Boolean,
      default: true,
    },
  },
  // 用来以对象方式存放数据
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const startTime = new Date(new Date().setHours(0, 0, 0));
              const endTime = new Date(new Date().setHours(23, 59, 59));
              // const endTime = new Date(); //
              picker.$emit("pick", [startTime, endTime]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },

  created() {
  },
  mounted() {
  },
  methods: {
 /**
    * @Event 下拉列表里面的项点击
    * @description:
    * @author: mhf
    * @time: 2023-10-29 13:30:25
    **/
    selectClick(item, items) {
      console.log(item, items, "item, items")
    },
    handleSearch() {
      this.$emit("handleSearch", this.form);
    },
    handleResetFrom() {
      this.$emit("handleResetFrom");
    },
  },
};
</script>

<style lang="scss" scoped>
.search-component {
  .right-handle {
    display: inline-block;
    margin-left: 30px;
  }
}

.treeBox {
  width: 242px;
}

::v-deep .el-input--small .el-input__inner {
  height: 32px !important;
}

::v-deep .el-form-item--medium .el-form-item__label {
  //font-size: 14px !important;
}

::v-deep .el-button--small {
  //font-size: 14px !important;
}
</style>
