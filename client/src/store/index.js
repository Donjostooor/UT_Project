import { createApp } from 'vue';
import App from '../App.vue';
import Vuex from 'vuex';
import Axios from 'axios';
import AuthService from '../services/auth.service';

const app = createApp(App)
app.use(Vuex);

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: {
        initialState,
        admin: [],
        menu: [],
        model: [],
        predict: [],
        users: [],
    },
    mutations: {
        set_admin: (state, admin) => (state.admin = admin),
        set_menu: (state, menu) => (state.menu = menu),
        set_model: (state, model) => (state.model = model),
        set_predict: (state, predict) => (state.predict = predict),
        set_users: (state, users) => (state.users = users),
        
        loginSuccess(state, user) {
            state.user = user;
        },
        loginFailure(state) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        },
    },
    actions: {
        set_admin: ({ commit }) => Axios.get('http://localhost:3036/admin').then((res) => commit('set_admin', res.data)),
        //set_menu: ({ commit }) => Axios.get('http://localhost:3036/menu').then((res) => commit('set_menu', res.data)),
        set_model: ({ commit }) => Axios.get('http://localhost:3036/model').then((res) => commit('set_model', res.data)),
        set_predict: ({ commit }) => Axios.get('http://localhost:3036/predict').then((res) => commit('set_predict', res.data)),
        set_users: ({ commit }) => Axios.get('http://localhost:3036/user').then((res) => commit('set_users', res.data)),
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        loginAdmin({ commit }, user) {
            return AuthService.loginAdmin(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
    },
};
