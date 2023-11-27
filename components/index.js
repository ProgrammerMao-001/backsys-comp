// 全局样式
import "./assets/styles/index.scss";
// 公共方法
import "./utils/publicFun";
// 统一导入所有组件
import ytRealCanvas from "./ytRealCanvas";
import ytFileUpload from "./ytFileUpload";
import ytForm from "./ytForm";
import ytTableBtn from "./ytTableBtn";
import ytIsShowForm from "./ytIsShowForm";
import ytTable from "./ytTable";
import ytPagination from "./ytPagination";
import ytPageComp from "./ytPageComp";

const components = [
  ytRealCanvas,
  ytFileUpload,
  ytForm,
  ytTableBtn,
  ytIsShowForm,
  ytTable,
  ytPagination,
  ytPageComp,
];
// 定义install方法
const install = function (Vue) {
  if (install.installed) return;
  // 注册所有的组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
// 导出install方法
export default {
  install,
  ...components,
};
