import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const requestRoutes: RouteRecordRaw = {
    path: '/request',
    name: '接口测试',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/request',
    meta: {
        title: 'PostAPI',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/request',
            name: 'request',
            component: () => import('@/views/request/index.vue'),
            meta: {
                title: '接口测试',
                icon: '',
            },
        },
    ],
};
