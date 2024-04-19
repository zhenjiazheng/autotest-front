import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const toolsRoutes: RouteRecordRaw = {
    path: '/tools',
    name: '工具',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/tools',
    meta: {
        title: '工具',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/tools/records',
            name: 'records',
            component: () => import('@/views/tools/records.vue'),
            meta: {
                title: '执行记录',
                icon: '',
            },
        },
        // {
        //     path: '/tools/bm_monitor',
        //     name: 'bm_monitor',
        //     component: () => import('@/views/tools/bm_monitor.vue'),
        //     meta: {
        //         title: '硬件监控',
        //         icon: '',
        //     },
        // },
        {
            path: '/tools/run_tool',
            name: 'run_tool',
            component: () => import('@/views/tools/run_tool.vue'),
            meta: {
                title: '调用工具',
                icon: '',
            },
            props: true
        },
        // {
        //     path: '/tools/b_protocol',
        //     name: 'b_protocol',
        //     component: () => import('@/views/tools/b_protocol.vue'),
        //     meta: {
        //         title: 'B协议',
        //         icon: '',
        //     },
        // },
    ],
};
