import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from "vue-socket.io"
import io from "socket.io-client"

import {router} from "./router/router"

import {store} from "./store/store"

import VueNoty from 'vuejs-noty'
 


Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  layout: 'bottomRight'
})
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  connection: io("http://localhost:3000/", { transports: ['websocket'] })
}))



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
