import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import sassStyles from './assets/sass/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  sassStyles,
  render: h => h(App)
}).$mount('#app')
