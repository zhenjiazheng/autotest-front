import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/layout/ParentView.vue';

export const llmRoutes: RouteRecordRaw = {
    path: '/llm',
    name: 'llm',
    // FIXME: 等价写法
    // component: () => import('@dev/views/menu1/index.vue'),
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/llm/models',
    meta: {
        title: 'LLM',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/llm/models',
            name: '模型列表',
            component: () => import('@/views/llm/llm.vue'),
            meta: {
                title: '模型列表',
                icon: '',
                keepAlive: true,
            },
        },
        {
            path: '/llm/chat',
            name: 'chat',
            component: () => import('@/views/llm/llmchat.vue'),
            meta: {
                title: '对话',
                icon: '',
                keepAlive: true,
            },
        },
    ],
};
