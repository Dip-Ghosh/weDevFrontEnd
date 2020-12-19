import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line no-unused-vars
import Swal from 'sweetalert2'
// eslint-disable-next-line no-undef
window.Swal = Swal;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
