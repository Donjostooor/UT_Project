import { createRouter, createWebHistory } from 'vue-router'

// import components
import Home from '/src/view/HomeView.vue'
import Scan from '/src/components/Scan.vue'
import Login from '/src/view/Login.vue'
import Register from '/src/view/Register.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //View
        { path: '/', name: 'home', component: Home },
        { path: '/carbonscan', name: 'scan', component: Scan },

        //Log-in - Register
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register},
    ]
})

export default router

