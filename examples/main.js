import Vue from 'vue'
import App from './App.vue'

import "../components/css/index.scss"
import Demo from "../components/lib/demo";
Vue.use(Demo)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
