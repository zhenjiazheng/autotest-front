import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const wordpressRoutes: RouteRecordRaw = {
    path: '/wordpress',
    name: 'wordpress',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/wordpress/doc',
    meta: {
        title: 'wordpress',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/wordpress/doc',
            name: 'doc',
            component: () => import('@/views/wordpress/doc.vue'),
            meta: {
                title: 'doc',
                icon: '',
            },
        }
    ],
};
