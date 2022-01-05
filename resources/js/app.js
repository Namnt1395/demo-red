require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue"
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Default from './layout/wrappers/BaseLayout'
import Main from "./Main";
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ElementUI, {locale});

Vue.component('default-layout', Default);
Vue.component('app-layout', Main);

const app = new Vue({
    mode: 'history',
    el: '#app',
    router: router,
});
