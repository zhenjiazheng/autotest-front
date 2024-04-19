import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const taskRoutes: RouteRecordRaw = {
    path: '/task',
    name: 'task',
    // FIXME: 等价写法
    // component: () => import('@dev/views/menu1/index.vue'),
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/task',
    meta: {
        title: 'CI测试任务',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/task/list',
            name: '任务列表',
            component: () => import('@/views/task/task.vue'),
            meta: {
                title: '任务列表',
                icon: '',
                keepAlive: true,
            },
        },
    ],
};
