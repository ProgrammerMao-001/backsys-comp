import Vue from 'vue'
import App from './App.vue'

/* element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
/* element-ui */

/* 全局样式 */
import "../components/assets/styles/index.scss"
/* 全局样式 */
import ytRealCanvas from "../components/ytRealCanvas";
import ytFileUpload from "../components/ytFileUpload";
import ytForm from "../components/ytForm";
import ytTableBtn from "../components/ytTableBtn";
import ytIsShowForm from "../components/ytIsShowForm";
import ytTable from "../components/ytTable";
import ytPagination from "../components/ytPagination";
import ytPageComp from "../components/ytPageComp";
Vue.use(ytRealCanvas)
Vue.use(ytFileUpload)
Vue.use(ytForm)
Vue.use(ytTableBtn)
Vue.use(ytIsShowForm)
Vue.use(ytTable)
Vue.use(ytPagination)
Vue.use(ytPageComp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
