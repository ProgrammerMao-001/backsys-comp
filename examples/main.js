import Vue from 'vue'
import App from './App.vue'

/* element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
/* element-ui */

import ytRealCanvas from "../components/ytRealCanvas";
import ytFileUpload from "../components/ytFileUpload";
import ytForm from "../components/ytForm";
Vue.use(ytRealCanvas)
Vue.use(ytFileUpload)
Vue.use(ytForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
