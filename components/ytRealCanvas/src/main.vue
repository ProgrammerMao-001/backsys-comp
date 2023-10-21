<!--
 * @Description: canvas实时展示输入的内容 页面
 * @Author: mhf
 * @Date: 2023/10/21
-->
<template>
  <div class="textBox">
    <el-row :gutter="24">
      <el-col :span="14">
        <div class="textBox-left">
          <el-form
              ref="textForm"
              :model="textForm"
              :rules="textFormRules"
              label-width="96px"
          >
            <el-form-item label="文本内容 :" prop="programContent">
              <el-input
                  v-model="textForm.programContent"
                  resize="none"
                  rows="3"
                  type="textarea"
                  placeholder=""
                  :disabled="title === '详情'"
                  @input="fontChange"
              />
            </el-form-item>

            <el-form-item label="文本颜色 : " prop="textColor">
              <el-input
                  v-model="textForm.textColor"
                  placeholder=""
                  :disabled="title === '详情'"
              >
                <template slot="suffix">
                  <el-color-picker
                      v-model="textForm.textColor"
                      :disabled="title === '详情'"
                      @change="fontChange"
                  ></el-color-picker>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="文本字体 : " prop="textCase">
              <el-select
                  v-model="textForm.textCase"
                  placeholder=""
                  :disabled="title === '详情'"
                  @change="fontChange"
              >
                <el-option
                    v-for="item in textCaseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文本字号 : " prop="textFont">
              <el-select
                  v-model="textForm.textFont"
                  placeholder=""
                  :disabled="title === '详情'"
                  @change="fontChange"
              >
                <el-option
                    v-for="item in textFontList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="背景颜色 : " prop="background">
              <el-input
                  v-model="textForm.background"
                  placeholder=""
                  :disabled="title === '详情'"
              >
                <template slot="suffix">
                  <el-color-picker
                      v-model="textForm.background"
                      :disabled="title === '详情'"
                      @change="fontChange"
                  ></el-color-picker>
                </template>
              </el-input>
            </el-form-item>

          </el-form>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="textBox-right">
          <span class="textBox-right-font"> 预览 : </span>
          <div class="textBox-right-board">
            <div class="textBox-right-board-group">
              <div class="borderContainer" @click="getCanvasImg">
                <canvas
                    width="273x"
                    height="153px"
                    style="border: grey 1px solid"
                    id="myCanvas"
                >
                </canvas>
              </div>
              <span> (1920 * 1080) </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
        title="预览"
        width="580px"
        append-to-body
        :visible.sync="dialogVisible"
        :before-close="hideDialog"
    >
      <div>
        <el-image style="width: 546px; height: 306px" :src="imgUrl"> </el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ytRealCanvas",
  components: {},
  props: {
    typeForm: {
      type: Object,
      default: () => {
      },
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      textForm: {
        textFont: "24px",
        textCase: "微软雅黑",
        textColor: "#FFF",
        background: "#000",
      },
      textFormRules: {
        // duration: [
        //   { required: true, message: "持续时间不能为空" },
        //   { type: "number", message: "持续时间必须为数字值" },
        // ],
      },
      textCaseList: [
        {
          label: "微软雅黑",
          value: "微软雅黑",
        },
        {
          label: "华文行楷",
          value: "华文行楷",
        },
        {
          label: "宋体",
          value: "宋体",
        },
        {
          label: "隶书",
          value: "隶书",
        },
      ],
      textFontList: [
        {
          label: "16px",
          value: "16px",
        },
        {
          label: "24px",
          value: "24px",
        },
        {
          label: "30px",
          value: "30px",
        },
        {
          label: "36px",
          value: "36px",
        },
        {
          label: "42px",
          value: "42px",
        },
      ],
      dialogVisible: false,
      imgUrl: null,
    };
  },
  methods: {
    getTextForm() {
      if (this.typeForm) {
        this.textForm = this.typeForm;
      }
    },

    initMyCanvas() {
      this.drawCanvas({
        element: "#myCanvas",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.textForm.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: 20,
        byteLength: 20,
        text: this.textForm.programContent,
        startLeft: 20,
        startTop: 40,
      });
    },

    /**
     * @Event 方法
     * @description: canvas 文本设置 / canvas 绘制网格背景 / 文本自动换行
     * element       canvas 对象
     * lineHeight    段落文本行高
     * byteLength    设置单字节文字一行内的数量
     * text          写入画面的段落文本
     * startLeft     开始绘制文本的 x 坐标位置（相对于画布）
     * startTop      开始绘制文本的 y 坐标位置（相对于画布）
     * */
    drawCanvas(params) {
      let {
        element,
        lineHeight,
        byteLength,
        text,
        startLeft,
        startTop,
        lineColor,
        lineStepX,
        lineStepY,
        bgColor,
        bgStepX,
        bgStepY,
      } = params;
      const canvas = document.querySelector(element);
      const context = canvas.getContext("2d");

      context.save();
      context.lineWidth = 0.5;
      context.strokeStyle = lineColor;
      context.fillStyle = bgColor;
      context.fillRect(bgStepX, bgStepY, canvas.width, canvas.height);
      context.setLineDash([]);
      context.beginPath();
      for (var i = lineStepX + 0.5; i < canvas.width; i += lineStepX) {
        context.beginPath();
        context.moveTo(i, 0 + 0.5);
        context.lineTo(i, canvas.height + 0.5);
        context.stroke();
      }
      for (var i1 = lineStepY + 0.5; i1 < canvas.height; i1 += lineStepY) {
        context.beginPath();
        context.moveTo(0 + 0.5, i1);
        context.lineTo(canvas.width, i1);
        context.stroke();
      }

      context.fillStyle = this.textForm.textColor;
      context.font = `${this.textForm.textFont} ${this.textForm.textCase}`;

      function getTrueLength(str) {
        //获取字符串的真实长度（字节长度）
        var len = str ? str.length : 0,
            truelen = 0;
        for (var x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            truelen += 2;
          } else {
            truelen += 1;
          }
        }
        return truelen;
      }
      function cutString(str, leng) {
        //按字节长度截取字符串，返回substr截取位置
        var len = str ? str.length : 0,
            tlen = len,
            nlen = 0;
        for (var x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            if (nlen + 2 < leng) {
              nlen += 2;
            } else {
              tlen = x;
              break;
            }
          } else {
            if (nlen + 1 < leng) {
              nlen += 1;
            } else {
              tlen = x;
              break;
            }
          }
        }
        return tlen;
      }
      for (var i2 = 1; getTrueLength(text) > 0; i2++) {
        var tl = cutString(text, byteLength);
        context.fillText(
            text.substr(0, tl).replace(/^\s+|\s+$/, ""),
            startLeft,
            (i2 - 1) * lineHeight + startTop
        );
        text = text.substr(tl);
      }

      context.restore();
      context.closePath();
    },

    fontChange() {
      this.drawCanvas({
        element: "#myCanvas",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.textForm.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: 20,
        byteLength: 20,
        text: this.textForm.programContent,
        startLeft: 20,
        startTop: 40,
      });
    },

    getCanvasImg() {
      var canvas = document.getElementById("myCanvas");
      console.log(canvas.toDataURL());
      this.dialogVisible = true;
      this.imgUrl = canvas.toDataURL();
    },

    hideDialog() {
      this.imgUrl = null;
      this.dialogVisible = false;
    },

    /**
     * @Event 校验文本form 方法
     * @description:
     * @author: mhf
     * @time: 2023-10-16 14:49:19
     **/
    validateTextForm() {
      let flag = false;
      this.$refs.textForm.validate((valid) => (flag = valid));
      return flag;
    },
  },
  created() {
    this.getTextForm();
  },
  mounted() {
    this.initMyCanvas();
  },
};
</script>

<style lang="scss" scoped>
.textBox {
  width: 800px;
  height: 410px;

  &-left {
  }

  &-right {
    &-font {
      display: block;
      font-family: MicrosoftYaHei;
      color: #333333;
      line-height: 21px;
    }

    &-board {
      width: calc(100% - 40px);
      float: right;
      overflow-y: auto;
      height: 374px;

      &-group {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;

        .borderContainer {
          cursor: pointer;
        }

        span {
          font-family: MicrosoftYaHei;
          color: #333333;
          line-height: 40px;
        }
      }
    }
  }
}

::v-deep .el-color-picker--medium .el-color-picker__trigger {
  margin: 12px -4px 0 0;
}

::v-deep .el-color-picker__mask {
  margin: 8px -4px 0 0;
}
</style>
