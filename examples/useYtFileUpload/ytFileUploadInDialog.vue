<!--
 * @Description: ytFileUpload在弹窗中的使用，并实现数据回显 页面
 * @Author: mhf
 * @Date: 2023/10/28 19:25
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visibleFlag"
    v-if="visibleFlag"
    width="900px"
    append-to-body
    @close="hideDialog"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="110px"
    >
      <el-form-item label="附件 :" prop="annexUrl">
        <ytFileUpload
          :headerObj="headerObj"
          :actionUrl="actionUrl"
          :utilsObj="utilsObj"
          @getFileUploadYt="getFileUploadYt"
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="hideDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "attachConfigDialog",
  dicts: ["sys_annex_type"],
  data() {
    return {
      title: "",
      visibleFlag: false,
      formData: {
        annexUrl: [],
      },
      headerObj: {
        AuthorizationSys: "放在请求头上的token",
      },
      actionUrl:
        process.env.VUE_APP_BASE_API + "/tlxx-modules-annex/annexAction/upload",
      utilsObj: {
        isDisabled: false, // 是否禁用附件上传的功能
        fileList: [], // 已经上传的附件列表
        limitNum: 2, // 限制上传的文件数量 （个）
        fileSize: 50, // 单文件上传大小（MB）
        typeStyle: 0, // 文件上传的样式控制
        isMultiple: false, // 是否支持同时选择多个文件
        btnSize: "medium", // 上传按钮的尺寸 如：medium / small / mini
        btnIcon: "el-icon-upload", // 上传按钮展示的图标
        btnType: "text", // 上传按钮的样式类型 如：primary / success / warning / danger / info / text
        btnContent: "上传附件",
      },
    };
  },
  methods: {
    hideDialog() {
      this.visibleFlag = false;
      this.formData = {};
      this.$parent.getList();
      this.utilsObj.fileList = []; // 关闭弹窗时，清空附件列表
    },
    showDialog(data) {
      this.visibleFlag = true;
      this.title = data.title;
      if (this.title === "修改项目附件配置") {
        this.getDetail(data.data.id);
      }
    },

    /**
     * @Interface 详情接口
     * @description:
     * @author: mhf
     * @time: 2023-10-28 19:32:21
     **/
    getDetail(id) {
      function detailInterface() {} // 模拟请求
      detailInterface(id).then((res) => {
        if (res.code === 1) {
          this.formData = res.data;
          this.formData.annexUrl = JSON.parse(res.data.annexUrl);
          if (!this.formData.annexUrl) {
            this.formData.annexUrl = [];
          }
          this.utilsObj.fileList = this.formData.annexUrl; // 附件回显
        } else {
          this.$message.error("获取详情数据失败！");
        }
      });
    },
    submitForm() {
      function updateProjectAnnex() {} // 模拟请求
      function addProjectAnnex() {} // 模拟请求
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === "修改") {
            this.formData.annexUrl !== []
              ? (this.formData.annexUrl = JSON.stringify(
                  this.formData.annexUrl
                ))
              : (this.formData.annexUrl = []);
            updateProjectAnnex(this.formData)
              .then((res) => {
                if (res.code === 1) {
                  this.$message.success("修改成功！");
                  this.hideDialog();
                } else {
                  this.$message.warning(res.message);
                }
              })
              .catch((e) => {
                throw e;
              });
          }
          if (this.title === "新增项目附件配置") {
            this.formData.annexUrl !== []
              ? (this.formData.annexUrl = JSON.stringify(
                  this.formData.annexUrl
                ))
              : (this.formData.annexUrl = []);
            addProjectAnnex(this.formData)
              .then((res) => {
                if (res.code === 1) {
                  this.$message.success("添加成功！");
                  this.hideDialog();
                } else {
                  this.$message.warning(res.message);
                }
              })
              .catch((e) => {
                throw e;
              });
          }
        } else {
          return false;
        }
      });
    },

    /**
     * @Event 获取组件上传得到的最终文件数组
     * @description:
     * @author: mhf
     * @time: 2023-10-28 19:34:24
     **/
    getFileUploadYt(e) {
      this.formData.annexUrl = e;
      console.log(e, "获取到的文件 e");
    },
  },

  destroyed() {},
};
</script>

<style scoped></style>
