import 'sanitize.css'
import './assets/essential.css' // imports the absolute essential root css
import './assets/form.css'
import Vue from 'vue'
import './mixins/inflection'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
