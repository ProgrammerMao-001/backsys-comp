<!--
 * @Description: 搜索表单组件的使用 页面
 * @Author: mhf
 * @Date: 2023/10/29 11:20
-->
<template>
  <div>
    <ytForm
      v-show="showSearch"
      v-if="formLabel.length > 0"
      :inline="inline"
      :form="searchForm"
      :formSize="formSize"
      :formLabel="formLabel"
      :formRules="formRules"
      @handleSearch="handleSearch"
      @handleResetFrom="handleResetFrom"
      @selectClick="selectClick"
    >
      <template slot="formSlot">
        <el-date-picker
          type="years"
          v-model="searchForm.formSlotValue"
          value-format="yyyy"
          placeholder="选择一个或多个年"
          :size="formSize"
        >
        </el-date-picker>
      </template>

      <template slot="btnSlot">
        <el-button type="primary" :size="formSize">
          自定义按钮（插槽）
        </el-button>
      </template>

      <template slot="otherSlot">
        <span> 在这里写其他自定义内容 </span>
      </template>
    </ytForm>
  </div>
</template>

<script>
export default {
  name: "useYtForm",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      showSearch: true,
      inline: true,
      formSize: "mini",
      labelWidth: "120px",
      formLabel: [
        {
          type: "input",
          label: "输入框",
          value: "inputValue",
        },
        {
          label: "下拉选择器",
          value: "selectValue",
          type: "select",
          opts: [
            {
              deptName: "单位1",
              deptId: "单位1",
            },
            {
              deptName: "单位2",
              deptId: "单位2",
            },
            {
              deptName: "单位3",
              deptId: "单位3",
            },
          ],
          optLabel: "deptName",
          optValue: "deptId",
        },
        {
          label: "单选框",
          value: "radioValue",
          type: "radio",
          opts: [
            {
              label: "男",
              value: "男",
            },
            {
              label: "女",
              value: "女",
            },
            {
              label: "未知",
              value: "未知",
            },
          ],
        },
        {
          type: "switch",
          label: "Switch开关",
          value: "switchValue",
          activeColor: "#13ce66",
          inactiveColor: "#ff4949",
          activeText: "打开",
          inactiveText: "关闭",
        },
        {
          type: "date",
          label: "DatePicker日期选择器",
          value: "dateValue",
          placeholder: "请选择日期",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
        {
          type: "datetimerange",
          label: "DatePicker 日期选择器",
          value: "datetimerangeValue",
          pickerOptions: [],
          align: "left",
          rangeSeparator: "~",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
        {
          type: "daterange",
          label: "DatePicker 日期选择器",
          value: "daterangeValue",
          pickerOptions: [],
          align: "left",
          rangeSeparator: "~",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          valueFormat: "yyyy-MM-dd",
        },
      ],
      formRules: {
        inputValue: {
          required: true,
          message: "请输入输入框内容",
          trigger: "blur",
        },
      }, // 表单规则校验
      searchForm: {}, // 表单查询的条件
    };
  },
  methods: {
    handleSearch(formData) {
      console.log(formData);
      this.getTableData();
    },

    handleResetFrom() {
      this.searchForm = {};
      this.getTableData();
    },

    getTableData() {
      console.log("获取表格数据");
    },

    selectClick(obj) {
      console.log("下拉列表项点击了：", obj);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
