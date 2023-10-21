// import Demo from "./demo";
// import aComp from "./aComp"
//
// const Components = {
//     Demo,
//     aComp
// }
// const install = function (Vue) {
//     if (install.installed) return // 如果已经安装过，直接返回
//     // install.installed = true
//     Object.keys(Components).forEach(key => {
//         Vue.component(Components[key].name, Components[key])
//     })
// }
//
// const API = {
//     install
// }
//
// export default API



// 整个包的入口
// 统一导出
import ytComp from "./ytComp";
import ytDemo from "./ytDemo";
const components = [
    ytComp,
    ytDemo,
]
// 定义install方法
const install = function (Vue) {
    // 注册所有的组件
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
// 导出install方法
export default {
    install,
    ytDemo,
    ytComp
}
// 支持按需导入
// export {
//     install,
//     ytDemo,
//     ytComp
// }
