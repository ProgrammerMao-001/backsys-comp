<!--
 * @Description: 文件上传通用组件的使用 页面
 * @Author: mhf
 * @Date: 2023/10/27 17:52
-->
<template>
  <div>
    <ytFileUpload
      ref="ytFileUpload"
      :utilsObj="utilsObj"
      :actionUrl="actionUrl"
      :uploadType="uploadType"
      @getFileUploadYt="getFileUploadYt"
    />
  </div>
</template>

<script>
export default {
  name: "useYtFileUpload",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {
      utilsObj: {
        isDisabled: false, // 是否禁用附件上传的功能
        fileList: [], // 已经上传的附件列表
        limitNum: 3, // 限制上传的文件数量 （个）
        fileSize: 50, // 单文件上传大小（MB）
        typeStyle: 0, // 文件上传的样式控制
        isMultiple: false, // 是否支持同时选择多个文件
        btnSize: "medium", // 上传按钮的尺寸 如：medium / small / mini
        btnIcon: "el-icon-upload", // 上传按钮展示的图标
        btnType: "primary", // 上传按钮的样式类型 如：primary / success / warning / danger / info / text
        btnContent: "上传附件", // 上传按钮展示的文字内容
      },
      actionUrl: "http://127.0.0.1:3002/api/upload",
      uploadType: {
        fileType: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
        fileName: ["pdf", "doc", "docx", "xls", "xlsx"],
      },
    };
  },
  methods: {
    getFileUploadYt(data) {
      // this.formData.annexUrl = data;
      console.log(data);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
