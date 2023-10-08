import { createRouter, createWebHistory } from 'vue-router'

// import components
import Home from '/src/view/HomeView.vue'
import Scan from '/src/components/Scan.vue'
import Test from '/src/components/Test.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/carbonscan',
            name: 'scan',
            component: Scan
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
})

export default router

