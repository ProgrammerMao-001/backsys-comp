<!--
 * @Description: canvas实时展示输入的内容的使用 页面
 * @Author: mhf
 * @Date: 2023/10/21
-->
<template>
  <div>
    <ytRealCanvas
      :dialogTitle="'弹窗标题'"
      :canEdit="canEdit"
      :inputSize="'mini'"
      :inputRows="{ minRows: 1, maxRows: 3 }"
      :receivedForm="formData"
    />
    <hr />
    <el-form ref="form" label-width="120px">
      <el-form-item label="是否可编辑 : ">
        <el-radio-group v-model="canEdit">
          <el-radio
            v-for="(item, index) in canEditOption"
            :label="item.value"
            :key="index"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "useYtRealCanvas",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      formData: {
        programContent: "@mhfwork/yt-ui组件库@mhfwork/yt-ui组件库",
        textFont: "20",
        textCase: "隶书",
        textColor: "#FFF",
        background: "#000",
        textHeight: "40",
        haveGrid: true,
        leftNum: 20,
        topNum: 40,
        byteLength: 21,
      },
      canEdit: false,
      canEditOption: [
        {
          label: "是",
          value: true,
        },
        {
          label: "否",
          value: false,
        },
      ],
    };
  },
  methods: {
    getFormData() {
      console.log(this.formData);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
