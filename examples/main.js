import Vue from 'vue'
import App from './App.vue'

import "../components/css/index.scss"
import Demo from "../components/lib/demo";
import AComp from "../components/lib/aComp";
Vue.use(Demo)
Vue.use(AComp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
