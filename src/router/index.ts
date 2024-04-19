import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import appLayout from '@/layout/index.vue';
import { taskRoutes } from './task';
import { wordpressRoutes } from './wordpress';
import {projectRoutes} from './project';
import {toolsRoutes} from './tools';
import { requestRoutes } from './request';
import { llmRoutes } from './llm'

/**
 * menu-routes
 */
const menuRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'Folder',
        },
    },
    // componentRoutes,
    // wordpressRoutes,
    projectRoutes,
    toolsRoutes,
    taskRoutes,
    requestRoutes,
    llmRoutes
];

/**
 * routers
 */
const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: '',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: '',
        },
        children: menuRoutes,
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/not-found/404.vue'),
        meta: {
            title: '404',
        },
    },
];

/**
 * router
 */
const router = createRouter({
    // 历史模式
    history: createWebHistory(),
    routes,
});

export default router;
export { menuRoutes, routes };
