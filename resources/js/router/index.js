import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const routes = [// Dashboards
    {
        path: '/', name: 'dasboard', component: () => import('../pages/Dasboard.vue'),
    },
    // Restfull
    {
        path: '/cate',
        name: 'cate',
        component: () => import('../pages/category/Category'),
        redirect: {
            name: 'cate.list'
        },
        children: [
            {
                path: 'create',name:'cate_create', component: () => import('../pages/category/Create.vue'),
                meta: {
                    title: 'Create'
                }
            },
            {
                alias: '',
                path: '',name:'cate.list', component: () => import('../pages/category/List'),
                meta: {
                    title: 'Create'
                }
            },

        ]
    },

]


export default new Router({
    mode: 'history',
    base: __dirname,
    routes
})
