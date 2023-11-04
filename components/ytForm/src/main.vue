<!--
 * @Description: 搜索表单组件 页面
 * @Author: mhf
 * @Date: 2023/10/29 11:19
-->

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="ytForm">
    <!-- 表单区域 -->
    <el-form ref="formRef"
             :model="form"
             :inline="inline"
             :rules="formRules"
             :label-width="labelWidth"
    >
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

        <template v-if="item.type === 'radio'">
          <el-radio
              v-for="items in item.opts"
              v-model="form[item.value]"
              :size="formSize"
              :key="items.value"
              :label="items.value"
          >{{ items.label }}
          </el-radio>
        </template>

        <el-switch
            v-if="item.type === 'switch'"
            v-model="form[item.value]"
            :size="formSize"
            :active-color="item.activeColor"
            :inactive-color="item.inactiveColor"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText">
        </el-switch>

        <el-date-picker
            type="date"
            v-if="item.type === 'date'"
            v-model="form[item.value]"
            :placeholder="item.placeholder || '请选择日期'"
            :value-format="item.valueFormat || 'yyyy-MM-dd'"
            :size="formSize"
        />

        <el-date-picker
            v-if="item.type === 'daterange' || item.type === 'datetimerange'"
            v-model="form[item.value]"
            :size="formSize"
            :type="item.type"
            :picker-options="item.pickerOptions || pickerOptions"
            :range-separator="item.rangeSeparator"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :align="item.align || 'center'"
            :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
        />
      </el-form-item>

      <el-form-item>
        <slot/>
      </el-form-item>

      <div v-if="showOperationBtn" class="ytForm-btn">
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
          <slot name="btnSlot"/>
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
    }, // 行内表单模式	true / false
    // eslint-disable-next-line vue/require-default-prop
    form: {
      type: Object,
      required: true,
    }, // 表单数据 formData
    // eslint-disable-next-line vue/require-default-prop
    formLabel: {
      type: Array,
      required: true,
    }, // 表单类型数组
    // eslint-disable-next-line vue/require-default-prop
    formRules: {
      type: Object,
      default: () => {
        return {};
      },
    }, // 表单规则校验对象
    labelWidth: {
      type: String,
      default: "",
    }, // 表单标签label宽度
    formSize: {
      type: String,
      default: "small"
    }, // 组件尺寸 small / mini / medium
    showOperationBtn: {
      type: Boolean,
      default: true,
    }, // 是否展示 (查询、重置)按钮
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
      this.$emit("selectClick", {item, items});
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
.ytForm {
  &-btn {
    display: inline-block;
  }
}
</style>
