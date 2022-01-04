import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [// Dashboards
        {
            path: '/', name: 'dasboard', component: () => import('../pages/Dasboard.vue'),
        },
        // Category
        {
            path: '/cate', name: 'cate', component: () => import('../pages/category/List.vue'),
        },]
})
