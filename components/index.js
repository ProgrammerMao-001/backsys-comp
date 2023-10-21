import Demo from "./demo";
import aComp from "./aComp"

const Components = {
    Demo,
    aComp
}
const install = function (Vue) {
    if (install.installed) return // 如果已经安装过，直接返回
    // install.installed = true
    Object.keys(Components).forEach(key => {
        Vue.component(Components[key].name, Components[key])
    })
}

const API = {
    install
}

export default API
