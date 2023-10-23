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
              ref="formData"
              :model="formData"
              :rules="formDataRules"
              label-width="96px"
          >
            <el-form-item label="文本内容 :" prop="programContent">
              <el-input
                  v-model="formData.programContent"
                  resize="none"
                  rows="3"
                  type="textarea"
                  placeholder=""
                  :disabled="!canEdit"
                  @input="fontChange"
              />
            </el-form-item>

            <el-form-item label="文本颜色 : " prop="textColor">
              <el-input
                  v-model="formData.textColor"
                  placeholder=""
                  :disabled="!canEdit"
              >
                <template slot="suffix">
                  <el-color-picker
                      v-model="formData.textColor"
                      :disabled="!canEdit"
                      @change="fontChange"
                  ></el-color-picker>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="文本字体 : " prop="textCase">
              <el-select
                  v-model="formData.textCase"
                  placeholder=""
                  :disabled="!canEdit"
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
                  v-model="formData.textFont"
                  placeholder=""
                  :disabled="!canEdit"
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

            <el-form-item label="文本行高 : " prop="textHeight">
              <el-select
                  v-model="formData.textHeight"
                  placeholder=""
                  :disabled="!canEdit"
                  @change="fontChange"
              >
                <el-option
                    v-for="item in textHeightList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="背景颜色 : " prop="background">
              <el-input
                  v-model="formData.background"
                  placeholder=""
                  :disabled="!canEdit"
              >
                <template slot="suffix">
                  <el-color-picker
                      v-model="formData.background"
                      :disabled="!canEdit"
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
              <div class="borderContainer" @click="showDialog">
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
        :title="dialogTitle"
        width="580px"
        append-to-body
        :visible.sync="dialogVisible"
        :before-close="hideDialog"
    >
      <div>
        <el-image style="width: 546px; height: 306px" :src="imgUrl"></el-image>
      </div>
    </el-dialog>


    <!--  todo 要删除   -->
    <el-button @click="exportFormData" type="primary">buttonCont</el-button>
  </div>
</template>

<script>
export default {
  name: "ytRealCanvas",
  components: {},
  props: {

    dialogTitle: {
      type: String,
      default: "预览图片"
    }, // 预览图片的弹窗标题
    canEdit: {
      type: Boolean,
      default: true,
    }, // 是否可以编辑
  },
  data() {
    return {
      formData: {
        textFont: "24px",
        textCase: "微软雅黑",
        textColor: "#FFF",
        background: "#000",
        textHeight: "24",
      },
      formDataRules: {
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
      textHeightList: [
        {
          label: 16,
          value: 16,
        },
        {
          label: 24,
          value: 24,
        },
        {
          label: 30,
          value: 30,
        },
        {
          label: 36,
          value: 36,
        },
        {
          label: 42,
          value: 42,
        },
      ],
      dialogVisible: false,
      imgUrl: null,
    };
  },
  methods: {
    /**
     * @Event 初始化默认 canvas 对象
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:39:23
     **/
    initMyCanvas() {
      this.drawCanvas({
        element: "#myCanvas",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.formData.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: this.formData.textHeight,
        byteLength: 20,
        text: this.formData.programContent,
        startLeft: 20,
        startTop: 40,
      });
    },

    /**
     * @Event 绘制 canvas 图像
     * @description: canvas 文本设置 / canvas 绘制网格背景 / 文本自动换行
     * element       canvas 对象
     * lineHeight    段落文本行高
     * byteLength    设置单字节文字一行内的数量
     * text          写入画面的段落文本
     * startLeft     开始绘制文本的 x 坐标位置（相对于画布）
     * startTop      开始绘制文本的 y 坐标位置（相对于画布）
     * */
    drawCanvas(params) {
      console.log(params, "params")
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
      for (let i = lineStepX + 0.5; i < canvas.width; i += lineStepX) {
        context.beginPath();
        context.moveTo(i, 0 + 0.5);
        context.lineTo(i, canvas.height + 0.5);
        context.stroke();
      }
      for (let i1 = lineStepY + 0.5; i1 < canvas.height; i1 += lineStepY) {
        context.beginPath();
        context.moveTo(0 + 0.5, i1);
        context.lineTo(canvas.width, i1);
        context.stroke();
      }

      context.fillStyle = this.formData.textColor;
      context.font = `${this.formData.textFont} ${this.formData.textCase}`;

      /* 获取字符串的真实长度（字节长度） */
      function getTrueLength(str) {
        let len = str ? str.length : 0,
            truelen = 0;
        for (let x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            truelen += 2;
          } else {
            truelen += 1;
          }
        }
        return truelen;
      }

      /* 按字节长度截取字符串，返回substr截取位置 */
      function cutString(str, strLength) {
        let len = str ? str.length : 0,
            tLen = len,
            nLen = 0;
        for (let x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            if (nLen + 2 < strLength) {
              nLen += 2;
            } else {
              tLen = x;
              break;
            }
          } else {
            if (nLen + 1 < strLength) {
              nLen += 1;
            } else {
              tLen = x;
              break;
            }
          }
        }
        return tLen;
      }

      for (let i2 = 1; getTrueLength(text) > 0; i2++) {
        let tl = cutString(text, byteLength);
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

    /**
     * @Event 更新 canvas
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:38:42
     **/
    fontChange() {
      this.drawCanvas({
        element: "#myCanvas",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.formData.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: this.formData.textHeight,
        byteLength: 20,
        text: this.formData.programContent,
        startLeft: 20,
        startTop: 40,
      });
    },

    /**
     * @Event  查看 canvas 图片的弹窗打开事件
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:41:57
     **/
    showDialog() {
      let canvas = document.getElementById("myCanvas");
      this.dialogVisible = true;
      this.imgUrl = canvas.toDataURL(); // 得到图片的base64地址
    },

    /**
     * @Event 查看 canvas 图片的弹窗关闭事件
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:40:16
     **/
    hideDialog() {
      this.imgUrl = null;
      this.dialogVisible = false;
    },

    /**
     * @Event 父组件中使用，用来获取 formData 对象
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:33:49
     **/
    exportFormData() {
      console.log(this.formData)
      return this.formData
    }

  },
  created() {
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
