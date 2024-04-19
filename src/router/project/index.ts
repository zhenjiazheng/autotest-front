import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const projectRoutes: RouteRecordRaw = {
    path: '/project',
    name: 'project',
    // FIXME: 等价写法
    // component: () => import('@dev/views/menu1/index.vue'),
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/project',
    meta: {
        title: '项目',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/project/list',
            name: '项目列表',
            component: () => import('@/views/project/project.vue'),
            meta: {
                title: '项目列表',
                icon: '',
                keepAlive: true,
            },
        },
    ],
};
