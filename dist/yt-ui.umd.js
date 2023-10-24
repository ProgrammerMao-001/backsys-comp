(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["yt-ui"] = factory();
	else
		root["yt-ui"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytComp/src/main.vue?vue&type=template&id=4db69105&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._v(" " + _vm._s(_vm.pageName) + " ")]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytComp/src/main.vue?vue&type=script&lang=js
/* harmony default export */ var mainvue_type_script_lang_js = ({
  name: "ytComp",
  components: {},
  props: {
    pageName: {
      type: String,
      default: "ytComp"
    }
  },
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  destroyed() {}
});
;// CONCATENATED MODULE: ./components/ytComp/src/main.vue?vue&type=script&lang=js
 /* harmony default export */ var src_mainvue_type_script_lang_js = (mainvue_type_script_lang_js); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./components/ytComp/src/main.vue





/* normalize component */
;
var component = normalizeComponent(
  src_mainvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "4db69105",
  null
  
)

/* harmony default export */ var main = (component.exports);
;// CONCATENATED MODULE: ./components/ytComp/index.js

main.install = Vue => {
  Vue.component(main.name, main);
};
/* harmony default export */ var ytComp = (main);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytDemo/src/main.vue?vue&type=template&id=75d99d1c&scoped=true
var mainvue_type_template_id_75d99d1c_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm._m(0);
};
var mainvue_type_template_id_75d99d1c_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('div', {
    staticClass: "a"
  }, [_vm._v(" a "), _c('div', {
    staticClass: "b"
  }, [_vm._v("b")])])]);
}];

;// CONCATENATED MODULE: ./components/ytDemo/src/main.vue?vue&type=template&id=75d99d1c&scoped=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytDemo/src/main.vue?vue&type=script&lang=js
/* harmony default export */ var ytDemo_src_mainvue_type_script_lang_js = ({
  name: "ytDemo",
  components: {},
  props: {},
  computed: {},
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  destroyed() {}
});
;// CONCATENATED MODULE: ./components/ytDemo/src/main.vue?vue&type=script&lang=js
 /* harmony default export */ var components_ytDemo_src_mainvue_type_script_lang_js = (ytDemo_src_mainvue_type_script_lang_js); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytDemo/src/main.vue?vue&type=style&index=0&id=75d99d1c&prod&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./components/ytDemo/src/main.vue?vue&type=style&index=0&id=75d99d1c&prod&lang=scss&scoped=true

;// CONCATENATED MODULE: ./components/ytDemo/src/main.vue



;


/* normalize component */

var main_component = normalizeComponent(
  components_ytDemo_src_mainvue_type_script_lang_js,
  mainvue_type_template_id_75d99d1c_scoped_true_render,
  mainvue_type_template_id_75d99d1c_scoped_true_staticRenderFns,
  false,
  null,
  "75d99d1c",
  null
  
)

/* harmony default export */ var src_main = (main_component.exports);
;// CONCATENATED MODULE: ./components/ytDemo/index.js

src_main.install = Vue => {
  Vue.component(src_main.name, src_main);
};
/* harmony default export */ var ytDemo = (src_main);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytRealCanvas/src/main.vue?vue&type=template&id=5dc70541&scoped=true
var mainvue_type_template_id_5dc70541_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "textBox"
  }, [_c('el-row', {
    attrs: {
      "gutter": 24
    }
  }, [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('div', {
    staticClass: "textBox-left"
  }, [_c('el-form', {
    ref: "formData",
    attrs: {
      "model": _vm.formData,
      "rules": _vm.formDataRules,
      "label-width": "120px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "文本内容 :",
      "prop": "programContent"
    }
  }, [_c('el-input', {
    attrs: {
      "resize": "none",
      "type": "textarea",
      "placeholder": "",
      "disabled": !_vm.canEdit,
      "autosize": _vm.inputRows
    },
    on: {
      "input": _vm.fontChange
    },
    model: {
      value: _vm.formData.programContent,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "programContent", $$v);
      },
      expression: "formData.programContent"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "文本颜色 : ",
      "prop": "textColor"
    }
  }, [_c('el-input', {
    attrs: {
      "size": _vm.inputSize,
      "placeholder": "",
      "disabled": !_vm.canEdit
    },
    model: {
      value: _vm.formData.textColor,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "textColor", $$v);
      },
      expression: "formData.textColor"
    }
  }, [_c('template', {
    slot: "suffix"
  }, [_c('el-color-picker', {
    attrs: {
      "disabled": !_vm.canEdit
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.textColor,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "textColor", $$v);
      },
      expression: "formData.textColor"
    }
  })], 1)], 2)], 1), _c('el-form-item', {
    attrs: {
      "label": "文本字体 : ",
      "prop": "textCase"
    }
  }, [_c('el-select', {
    attrs: {
      "size": _vm.inputSize,
      "placeholder": "",
      "disabled": !_vm.canEdit
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.textCase,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "textCase", $$v);
      },
      expression: "formData.textCase"
    }
  }, _vm._l(_vm.textCaseList, function (item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    });
  }), 1)], 1), _c('el-form-item', {
    attrs: {
      "label": "文本字号 : ",
      "prop": "textFont"
    }
  }, [_c('el-input-number', {
    attrs: {
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit,
      "controls-position": "right",
      "min": 1,
      "max": 100
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.textFont,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "textFont", $$v);
      },
      expression: "formData.textFont"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "文本行高 : ",
      "prop": "textHeight"
    }
  }, [_c('el-input-number', {
    attrs: {
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit,
      "controls-position": "right",
      "min": 1,
      "max": 100
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.textHeight,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "textHeight", $$v);
      },
      expression: "formData.textHeight"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "单行文本数量 : ",
      "prop": "byteLength"
    }
  }, [_c('el-input-number', {
    attrs: {
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit,
      "controls-position": "right",
      "min": 5
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.byteLength,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "byteLength", $$v);
      },
      expression: "formData.byteLength"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "文本距离左侧值 : ",
      "prop": "leftNum"
    }
  }, [_c('el-input-number', {
    attrs: {
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit,
      "controls-position": "right"
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.leftNum,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "leftNum", $$v);
      },
      expression: "formData.leftNum"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "文本距离顶部值 : ",
      "prop": "topNum"
    }
  }, [_c('el-input-number', {
    attrs: {
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit,
      "controls-position": "right"
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.topNum,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "topNum", $$v);
      },
      expression: "formData.topNum"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "背景颜色 : ",
      "prop": "background"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "",
      "size": _vm.inputSize,
      "disabled": !_vm.canEdit
    },
    model: {
      value: _vm.formData.background,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "background", $$v);
      },
      expression: "formData.background"
    }
  }, [_c('template', {
    slot: "suffix"
  }, [_c('el-color-picker', {
    attrs: {
      "disabled": !_vm.canEdit
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.background,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "background", $$v);
      },
      expression: "formData.background"
    }
  })], 1)], 2)], 1), _c('el-form-item', {
    attrs: {
      "label": "是否绘制网格 : ",
      "prop": "haveGrid"
    }
  }, [_c('el-radio-group', {
    attrs: {
      "disabled": !_vm.canEdit
    },
    on: {
      "change": _vm.fontChange
    },
    model: {
      value: _vm.formData.haveGrid,
      callback: function ($$v) {
        _vm.$set(_vm.formData, "haveGrid", $$v);
      },
      expression: "formData.haveGrid"
    }
  }, _vm._l(_vm.haveGridOption, function (item, index) {
    return _c('el-radio', {
      key: index,
      attrs: {
        "label": item.value
      }
    }, [_vm._v(_vm._s(item.label) + " ")]);
  }), 1)], 1)], 1)], 1)]), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('div', {
    staticClass: "textBox-right"
  }, [_c('span', {
    staticClass: "textBox-right-font"
  }, [_vm._v(" 预览 : ")]), _c('div', {
    staticClass: "textBox-right-board"
  }, [_c('div', {
    staticClass: "textBox-right-board-group"
  }, [_c('div', {
    staticClass: "borderContainer",
    on: {
      "click": _vm.showDialog
    }
  }, [_c('canvas', {
    attrs: {
      "id": "myCanvas"
    }
  })])])])])])], 1), _c('el-dialog', {
    staticClass: "textBox-Dialog",
    attrs: {
      "title": _vm.dialogTitle,
      "width": "606px",
      "append-to-body": "",
      "visible": _vm.dialogVisible,
      "before-close": _vm.hideDialog
    },
    on: {
      "update:visible": function ($event) {
        _vm.dialogVisible = $event;
      }
    }
  }, [_c('div', [_c('el-image', {
    staticStyle: {
      "width": "546px",
      "height": "306px"
    },
    attrs: {
      "src": _vm.imgUrl
    }
  })], 1)])], 1);
};
var mainvue_type_template_id_5dc70541_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytRealCanvas/src/main.vue?vue&type=script&lang=js
/* harmony default export */ var ytRealCanvas_src_mainvue_type_script_lang_js = ({
  name: "ytRealCanvas",
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: "预览图片"
    },
    // 预览图片的弹窗标题
    canEdit: {
      type: Boolean,
      default: true
    },
    // 是否可以编辑
    inputSize: {
      type: String,
      default: "small"
    },
    // 所有input的尺寸（medium / small / mini）
    inputRows: {
      type: Object,
      default: () => {
        return {
          minRows: 1,
          maxRows: 5
        };
      }
    },
    // 设置输入框默认高度，最小接收行数和最大行数
    receivedForm: {
      type: Object,
      default: () => {
        return {};
      }
    } // 设置接收到的formData数据
  },

  data() {
    return {
      formData: {
        programContent: "@mhfwork/yt-ui组件库",
        // 文本内容
        textFont: "24",
        // 文本字号
        textCase: "微软雅黑",
        // 文本字体
        textColor: "#FFF",
        // 文本颜色
        background: "#000",
        // 背景颜色
        textHeight: "40",
        // 文本行高
        haveGrid: true,
        // 是否绘制网格
        leftNum: 20,
        // 文本距离左侧值
        topNum: 40,
        // 文本距离顶部值
        byteLength: 20 // 单行文本数量
      },

      formDataRules: {},
      textCaseList: [{
        label: "微软雅黑",
        value: "微软雅黑"
      }, {
        label: "华文行楷",
        value: "华文行楷"
      }, {
        label: "宋体",
        value: "宋体"
      }, {
        label: "隶书",
        value: "隶书"
      }],
      haveGridOption: [{
        label: "是",
        value: true
      }, {
        label: "否",
        value: false
      }],
      dialogVisible: false,
      imgUrl: null
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
        byteLength: this.formData.byteLength,
        text: this.formData.programContent,
        startLeft: this.formData.leftNum,
        startTop: this.formData.topNum
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
        bgStepY
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
        this.makeGrid({
          canvas,
          lineStepX,
          lineStepY,
          context
        });
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
        context.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), startLeft, (i2 - 1) * lineHeight + startTop); // 用来填充的文本信息,填充文本的起点横坐标,填充文本的起点纵坐标
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
      let {
        canvas,
        lineStepX,
        lineStepY,
        context
      } = params;
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
        element: "#myCanvas",
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
        startTop: this.formData.topNum
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
     * @Event 接收到的receivedForm存在，则 替换formData
     * @description:
     * @author: mhf
     * @time: 2023-10-24 23:54:47
     **/
    getFormData() {
      console.log(this.receivedForm, this.isEmptyObject(this.receivedForm));
      if (this.isEmptyObject(this.receivedForm)) {
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
          byteLength: 20
        };
      } else {
        this.formData = this.receivedForm;
      }
    }
  },
  created() {
    this.getFormData();
  },
  mounted() {
    this.initMyCanvas();
  }
});
;// CONCATENATED MODULE: ./components/ytRealCanvas/src/main.vue?vue&type=script&lang=js
 /* harmony default export */ var components_ytRealCanvas_src_mainvue_type_script_lang_js = (ytRealCanvas_src_mainvue_type_script_lang_js); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./components/ytRealCanvas/src/main.vue?vue&type=style&index=0&id=5dc70541&prod&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./components/ytRealCanvas/src/main.vue?vue&type=style&index=0&id=5dc70541&prod&lang=scss&scoped=true

;// CONCATENATED MODULE: ./components/ytRealCanvas/src/main.vue



;


/* normalize component */

var src_main_component = normalizeComponent(
  components_ytRealCanvas_src_mainvue_type_script_lang_js,
  mainvue_type_template_id_5dc70541_scoped_true_render,
  mainvue_type_template_id_5dc70541_scoped_true_staticRenderFns,
  false,
  null,
  "5dc70541",
  null
  
)

/* harmony default export */ var ytRealCanvas_src_main = (src_main_component.exports);
;// CONCATENATED MODULE: ./components/ytRealCanvas/index.js

ytRealCanvas_src_main.install = Vue => {
  Vue.component(ytRealCanvas_src_main.name, ytRealCanvas_src_main);
};
/* harmony default export */ var ytRealCanvas = (ytRealCanvas_src_main);
;// CONCATENATED MODULE: ./components/index.js
// 整个包的入口文件
// 统一导出



const components = [ytComp, ytDemo, ytRealCanvas];
// 定义install方法
const install = function (Vue) {
  // 注册所有的组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
// 导出install方法
/* harmony default export */ var components_0 = ({
  install,
  ytDemo: ytDemo,
  ytComp: ytComp,
  ytRealCanvas: ytRealCanvas
});
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (components_0);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=yt-ui.umd.js.map