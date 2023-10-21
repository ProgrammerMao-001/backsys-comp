import Vue from 'vue'
import App from './App.vue'

import ytDemo from "../components/ytDemo";
import ytComp from "../components/ytComp";
Vue.use(ytDemo)
Vue.use(ytComp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
