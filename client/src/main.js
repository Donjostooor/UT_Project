import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/auth.module'
import VeeValidate from 'vee-validate/dist/vee-validate';

// css maintainer
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'aos/dist/aos.css'

// css argon templace 
import './assets/css/argon-design-system.css'

// js maintainer
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

// AOS maintain
import AOS from 'aos/dist/aos.js';

const app = createApp(App)
app.use(router)
app.use(store) 
app.use(VeeValidate);
app.use(bootstrap)
app.use(AOS.init())
app.mount('#app')
