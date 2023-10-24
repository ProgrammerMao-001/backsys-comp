import Vue from 'vue'
import App from './App.vue'

/* element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
/* element-ui */

import ytDemo from "../components/ytDemo";
import ytComp from "../components/ytComp";
import ytRealCanvas from "../components/ytRealCanvas";
Vue.use(ytDemo)
Vue.use(ytComp)
Vue.use(ytRealCanvas)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
