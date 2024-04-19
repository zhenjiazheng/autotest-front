import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const componentRoutes: RouteRecordRaw = {
    path: '/component',
    name: 'component',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/component/demo1',
    meta: {
        title: 'component',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/component/demo1',
            name: 'demo1',
            component: () => import('@/views/component/demo1.vue'),
            meta: {
                title: 'demo1',
                icon: '',
            },
        },
        {
            path: '/component/demo2',
            name: 'demo2',
            component: () => import('@/views/component/demo2.vue'),
            meta: {
                title: 'demo2',
                icon: '',
            },
        },
    ],
};
