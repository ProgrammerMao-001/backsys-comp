<!--
 * @Description: 文件上传通用组件 页面
 * @Author: mhf
 * @Date: 2023/10/27 17:49
 * @todo: 完善上传成功之后的回调以及参数配置
-->
<template>
  <div class="ytFileUpload">
    <el-upload
        :disabled="utilsObj.isDisabled"
        :action="actionUrl"
        :headers="headerObj"
        :file-list="utilsObj.fileList"
        :limit="utilsObj.limitNum"
        :multiple="utilsObj.isMultiple"
        :on-preview="handlePreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :before-upload="handBeforeUpload"
        :on-exceed="handleExceed"
    >
      <!-- 默认上传按钮样式 -->
      <div v-if="utilsObj.typeStyle === 0">
        <el-button
            :disabled="utilsObj.isDisabled"
            :size="utilsObj.btnSize"
            :icon="utilsObj.btnIcon"
            :type="utilsObj.btnType"
        >{{ utilsObj.btnContent }}
        </el-button>
      </div>

      <!--  自定义样式  -->
      <div v-if="utilsObj.typeStyle === 1">
        <slot></slot>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "ytFileUpload",
  components: {},
  props: {
    utilsObj: {
      type: Object,
      default: () => ({
        isDisabled: false, // 是否禁用附件上传的功能
        fileList: [], // 已经上传的附件列表
        limitNum: 3, // 限制上传的文件数量 （个）
        fileSize: 50, // 单文件上传大小（MB）
        typeStyle: 0, // 文件上传的样式控制
        isMultiple: false, // 是否支持同时选择多个文件
        btnSize: "medium", // 上传按钮的尺寸 如：medium / small / mini
        btnIcon: "el-icon-upload", // 上传按钮展示的图标
        btnType: "text", // 上传按钮的样式类型 如：primary / success / warning / danger / info / text
        btnContent: "上传附件", // 上传按钮展示的文字内容
      }),
    }, // 附件上传的配置项

    actionUrl: {
      type: String,
      default: ""
    }, // 文件上传的接口: 如：process.env.VUE_APP_BASE_API + "/file/upload",

    headerObj: {
      type: Object,
      default: function () {
        return {};
      },
    }, // 文件上传请求头参数（放在requestHeaders请求头中，一般存放token 如：{AuthorizationSys: "tokenKey"}）

    uploadType: {
      type: Object,
      default: () => ({
        fileType: [
          "application/vnd.android.package-archive",
          "application/x-zip-compressed",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ], // 默认可上传的类型
        fileName: ["apk","zip","pdf","doc","docx","xls","xlsx"] // 默认可上传的类型对应的后缀名
      })
    }, // 文件上传类型控制（如需添加自定义文件类型：请查看 handBeforeUpload(file) {// file.type}）
  },
  data() {
    return {
      resFileArr: [], // 最终保存的文件数据
    };
  },
  methods: {
    /**
     * @Event 点击文件列表中已上传的文件时的钩子
     * @description:
     * @author: mhf
     * @time: 2023-10-27 23:59:11
     **/
    handlePreview(file) {
      console.log(file, "点击文件列表中已上传的文件时的钩子")
      if (file.response) {
        // 上传文件的时候 查看
        window.open(file.response.data.url);
      } else {
        // 文件上传成功之后返回值 查看
        window.open(file.url);
      }
    },

    /**
     * @Event 文件上传成功时的钩子
     * @description: 将文件上传成功之后所保存的文件数组传给父组件
     * @author: mhf
     * @time: 2023-10-27 23:59:34
     **/
    handleSuccess(file) {
      console.log(file, "文件上传成功时的钩子")
      if (file) {
        this.resFileArr.push(file.data);
        this.$emit("getFileUploadYt", this.resFileArr);
      } else {
        this.$message.warning(file.message, "上传失败！");
      }
    },

    /**
     * @Event 文件列表移除文件时的钩子
     * @description: 将文件移除成功之后所保存的文件数组传给父组件
     * @author: mhf
     * @time: 2023-10-28 00:00:37
     **/
    handleRemove(file) {
      console.log(file, "文件列表移除文件时的钩子")
      if (file.response) {
        this.resFileArr.map((item, index) => {
          if (
              item === file.response.data ||
              item.url === file.response.data.url
          ) {
            this.resFileArr.splice(index, 1);
            this.$emit("getFileUploadYt", this.resFileArr);
          }
        });
      } else {
        this.resFileArr.map((item, index) => {
          if (item === file || item.url === file.url) {
            this.resFileArr.splice(index, 1);
            this.$emit("getFileUploadYt", this.resFileArr);
          }
        });
      }
    },

    /**
     * @Event 上传文件之前的钩子
     * @description: 1.限制上传的文件类型：apk、zip、pdf、doc、docx、xls、xlsx的文件；2.限制上传文件大小
     * @author: mhf
     * @time: 2023-10-28 00:01:13
     **/
    handBeforeUpload(file) {
      console.log(file,file.type, "上传文件之前的钩子")
      if (this.uploadType.fileType.indexOf(file.type) === -1
      ) {
        this.$message.error(`请上传后缀名为 ${this.uploadType.fileName.join("、")} 的文件`);
        return false;
      }
      if (file.size > this.utilsObj.fileSize * 1024 * 1024) {
        this.$message.error(`文件大小不能超过 ${this.utilsObj.fileSize}MB`);
        return false;
      }
    },

    /**
     * @Event 文件超出个数限制时的钩子
     * @description:
     * @author: mhf
     * @time: 2023-10-28 00:03:21
     **/
    handleExceed(files, fileList) {
      console.log(files, fileList, "文件超出个数限制时的钩子")
      this.$message.warning(
          `当前限制选择 ${this.utilsObj.limitNum} 个文件，本次选择了 ${
              files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    /**
     * @Event 回显附件列表
     * @description:
     * @author: mhf
     * @time: 2023-10-28 00:03:42
     **/
    getFileList() {
      setTimeout(() => {
        console.log(this.utilsObj, "回显附件列表")
        if (this.utilsObj.fileList) {
          this.resFileArr = this.utilsObj.fileList;
        }
      }, 500);
    }
  },
  created() {
  },
  mounted() {
    this.getFileList()
  },
};
</script>

<style lang="scss" scoped>
.ytFileUpload {
  &-fileBox {
    height: 36px;
    background: rgba(255, 255, 255, 0);
    border-radius: 4px;
    display: flex;
    align-items: center;
    color: #1492ff;
    font-weight: bold;
    font-size: 16px;

    i {
      margin-right: 5px;
    }
  }
}
</style>
