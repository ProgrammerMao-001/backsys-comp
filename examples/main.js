import Vue from 'vue'
import App from './App.vue'

import "../components/css/index.scss"
import ytDemo from "../components/lib/ytDemo";
import ytComp from "../components/lib/ytComp";
Vue.use(ytDemo)
Vue.use(ytComp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
