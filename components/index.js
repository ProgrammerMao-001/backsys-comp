// 整个包的入口文件
// 统一导出
import ytRealCanvas from "./ytRealCanvas";
import ytFileUpload from "./ytFileUpload";
const components = [ytRealCanvas, ytFileUpload];
// 定义install方法
const install = function (Vue) {
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
  ytRealCanvas,
  ytFileUpload,
};
