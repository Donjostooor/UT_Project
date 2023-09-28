import { createApp } from 'vue'
// import App
import App from './App.vue'
// import router
import router from './plugins/router'
// css maintainer
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// css argon templace 
import './assets/css/argon-design-system.css'
// js maintainer
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

createApp(App).use(bootstrap)
createApp(App).use(router).mount('#app')
