<!--
 * @Description: canvas实时展示输入的内容 页面
 * @Author: mhf
 * @Date: 2023/10/21
-->
<template>
  <div class="ytRealCanvas">
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="ytRealCanvas-left">
          <el-form
            ref="formData"
            :model="formData"
            :rules="formDataRules"
            label-width="120px"
          >
            <el-form-item label="文本内容 :" prop="programContent">
              <el-input
                v-model="formData.programContent"
                resize="none"
                type="textarea"
                placeholder=""
                :disabled="!canEdit"
                :autosize="inputRows"
                @input="fontChange"
              />
            </el-form-item>

            <el-form-item label="文本颜色 : " prop="textColor">
              <el-input
                :size="inputSize"
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
                :size="inputSize"
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
              <el-input-number
                :size="inputSize"
                :disabled="!canEdit"
                controls-position="right"
                v-model="formData.textFont"
                @change="fontChange"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="文本行高 : " prop="textHeight">
              <el-input-number
                :size="inputSize"
                :disabled="!canEdit"
                controls-position="right"
                v-model="formData.textHeight"
                @change="fontChange"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="单行文本数量 : " prop="byteLength">
              <el-input-number
                :size="inputSize"
                :disabled="!canEdit"
                controls-position="right"
                v-model="formData.byteLength"
                @change="fontChange"
                :min="5"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="文本距离左侧值 : " prop="leftNum">
              <el-input-number
                :size="inputSize"
                :disabled="!canEdit"
                controls-position="right"
                v-model="formData.leftNum"
                @change="fontChange"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="文本距离顶部值 : " prop="topNum">
              <el-input-number
                :size="inputSize"
                :disabled="!canEdit"
                controls-position="right"
                v-model="formData.topNum"
                @change="fontChange"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="背景颜色 : " prop="background">
              <el-input
                v-model="formData.background"
                placeholder=""
                :size="inputSize"
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

            <el-form-item label="是否绘制网格 : " prop="haveGrid">
              <el-radio-group
                :disabled="!canEdit"
                v-model="formData.haveGrid"
                @change="fontChange"
              >
                <el-radio
                  v-for="(item, index) in haveGridOption"
                  :label="item.value"
                  :key="index"
                  >{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="ytRealCanvas-right">
          <span class="ytRealCanvas-right-font"> 预览 : </span>
          <div class="ytRealCanvas-right-board">
            <div class="ytRealCanvas-right-board-group">
              <div class="ytRealCanvas-right-board-group-container" @click="showDialog">
                <canvas id="ytRealCanvasBox"></canvas>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      class="ytRealCanvas-Dialog"
      :title="dialogTitle"
      width="606px"
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="hideDialog"
    >
      <div>
        <el-image style="width: 546px; height: 306px" :src="imgUrl"></el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ytRealCanvas",
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: "预览图片",
    }, // 预览图片的弹窗标题
    canEdit: {
      type: Boolean,
      default: true,
    }, // 是否可以编辑
    inputSize: {
      type: String,
      default: "small",
    }, // 所有input的尺寸（medium / small / mini）
    inputRows: {
      type: Object,
      default: () => {
        return {
          minRows: 1,
          maxRows: 5,
        };
      },
    }, // 设置输入框默认高度，最小接收行数和最大行数
    receivedForm: {
      type: Object,
      default: () => {
        return {};
      },
    }, // 设置接收到的formData数据
  },
  data() {
    return {
      formData: {
        programContent: "@mhfwork/yt-ui组件库", // 文本内容
        textFont: "24", // 文本字号
        textCase: "微软雅黑", // 文本字体
        textColor: "#FFF", // 文本颜色
        background: "#000", // 背景颜色
        textHeight: "40", // 文本行高
        haveGrid: true, // 是否绘制网格
        leftNum: 20, // 文本距离左侧值
        topNum: 40, // 文本距离顶部值
        byteLength: 20, // 单行文本数量
      },
      formDataRules: {},
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
      haveGridOption: [
        {
          label: "是",
          value: true,
        },
        {
          label: "否",
          value: false,
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
        element: "#ytRealCanvasBox",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.formData.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: this.formData.textHeight,
        byteLength: this.formData.byteLength,
        text: this.formData.programContent,
        startLeft: this.formData.leftNum,
        startTop: this.formData.topNum,
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
      console.log(params, "params");
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
      if (this.formData.haveGrid) {
        this.makeGrid({ canvas, lineStepX, lineStepY, context });
      }
      context.fillStyle = this.formData.textColor;
      context.font = `${this.formData.textFont}px ${this.formData.textCase}`;

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
        ); // 用来填充的文本信息,填充文本的起点横坐标,填充文本的起点纵坐标
        text = text.substr(tl);
      }
      context.restore();
      context.closePath();
    },

    /**
     * @Event canvas 绘制网格背景
     * @description:
     * @author: mhf
     * @time: 2023-10-23 23:27:37
     **/
    makeGrid(params) {
      let { canvas, lineStepX, lineStepY, context } = params;
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
    },

    /**
     * @Event 更新 canvas
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:38:42
     **/
    fontChange() {
      this.drawCanvas({
        element: "#ytRealCanvasBox",
        lineColor: "rgba(238,238,238,0.6)",
        lineStepX: 10,
        lineStepY: 10,
        bgColor: this.formData.background,
        bgStepX: 0,
        bgStepY: 0,
        lineHeight: this.formData.textHeight,
        byteLength: this.formData.byteLength,
        text: this.formData.programContent,
        startLeft: this.formData.leftNum,
        startTop: this.formData.topNum,
      });
    },

    /**
     * @Event  查看 canvas 图片的弹窗打开事件
     * @description:
     * @author: mhf
     * @time: 2023-10-23 22:41:57
     **/
    showDialog() {
      let canvas = document.getElementById("ytRealCanvasBox");
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
     * @Event 接收到的receivedForm存在，则 替换formData
     * @description:
     * @author: mhf
     * @time: 2023-10-24 23:54:47
     **/
    getFormData() {
      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      }

      if (isEmptyObject(this.receivedForm)) {
        this.formData = {
          programContent: "@mhfwork/yt-ui组件库",
          textFont: "24",
          textCase: "微软雅黑",
          textColor: "#FFF",
          background: "#000",
          textHeight: "40",
          haveGrid: true,
          leftNum: 20,
          topNum: 40,
          byteLength: 20,
        };
      } else {
        this.formData = this.receivedForm;
      }
    },
  },
  created() {
    this.getFormData();
  },
  mounted() {
    this.initMyCanvas();
  },
};
</script>

<style lang="scss" scoped>
.ytRealCanvas {
  width: 100%;

  &-left {
    ::v-deep .el-color-picker__trigger {
      height: 30px;
      width: 30px;
      padding: 2px;
      margin-top: 6px;
    }
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

      &-group {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;

        &-borderContainer {
          cursor: pointer;
        }
      }
    }
  }
}

.ytRealCanvas-Dialog {
  ::v-deep .el-dialog__body {
    padding: 4px 30px 10px;
  }
}
</style>
