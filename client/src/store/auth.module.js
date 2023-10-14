import { createApp } from 'vue';
import App from '../App.vue';
import Vuex from 'vuex';
import { auth } from './index';

const app = createApp(App)
app.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    }
});