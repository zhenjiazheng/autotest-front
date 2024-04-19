import type { Router } from 'vue-router';
import { getUserToken } from '@/utils/storage';

export function setupRouterGuard(router: Router) {
    router.beforeEach(async (to: any, _: any, next: any) => {
        const token = getUserToken();

        if (to.path === '/login') {
            next();
            return;
        }

        /**
         * 没有 token 回到登录页
         */
        if (!token) {
            next({ path: `/login?redirect=${router.currentRoute.value.path}` });
        }

        next();
        return;
    });
}
