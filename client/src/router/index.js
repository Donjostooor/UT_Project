import { createRouter, createWebHistory } from 'vue-router'

// import components
import Home from '/src/view/HomeView.vue'
import Scan from '/src/components/Scan.vue'
import Login from '/src/view/Login.vue'
import Register from '/src/view/Register.vue'
import Profile from '/src/components/User/Profile.vue'
import EditProfile from '/src/components/User/EditProfile.vue'
import DashBoard from '/src/components/Admin/DashBoard.vue'
import LoginAdmin from '/src/view/LoginAdmin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //View
        { path: '/', name: 'home', component: Home },
        { path: '/carbonscan', name: 'scan', component: Scan },

        //Log-in - Register
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },

        //User
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/edit', name: 'edit', component: EditProfile },

        //Admin 
        { path: '/admin/login', name: 'adminlogin', component: LoginAdmin },
        { path: '/admin/dashboard', name: 'dashboard', component: DashBoard },
        //optional

    ]
})
/*
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/carbonscan'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/');
    } else {
        next();
    }
});*/

export default router

