import type { RouteRecordRaw } from 'vue-router';
import type IconNameMap from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';

type IconTypes = keyof typeof IconNameMap;

/**
 * 生成缓存数组
 * @param { RouteRecordRaw[] } routes 路由数组
 * @param { string[] | undefined } permissions 权限数组
 * @returns { string[] } 缓存数组
 */
function generateCacheList(routes: RouteRecordRaw[], permissions?: string[]): string[] {
    const cloneRoutes = cloneDeep(routes);
    const cacheList: string[] = [];

    for (let i = 0; i < cloneRoutes.length; i += 1) {
        const currentRoute = cloneRoutes[i];

        if (!currentRoute.meta) {
            continue;
        }

        // 过滤掉无权限的路由
        if (permissions && !permissions.includes(currentRoute.meta?.title as string)) {
            continue;
        }

        // 更新缓存路由数组
        if (currentRoute.meta.keepAlive) {
            cacheList.push(currentRoute.name as string);
        }

        // 区分 menu 类型
        if (currentRoute.children && currentRoute.children.length > 0) {
            // 递归 children
            const childCacheList = generateCacheList(currentRoute.children, permissions);

            // 更新缓存路由数组
            cacheList.push(...childCacheList);
        }
    }

    return cacheList;
}

/**
 * 生成可用路由
 * @param { RouteRecordRaw[] } routes 路由数组
 * @param { string[] | undefined } permissions 权限数组
 * @returns { RouteRecordRaw[] } 可用路由
 */
function generateActiveRoutes(routes: RouteRecordRaw[], permissions?: string[]): RouteRecordRaw[] {
    const cloneRoutes = cloneDeep(routes);
    const activeRoutes: RouteRecordRaw[] = [];

    for (let i = 0; i < cloneRoutes.length; i += 1) {
        const currentRoute = cloneRoutes[i];

        if (!currentRoute.meta) {
            continue;
        }

        // 过滤掉无权限的路由
        if (permissions && !permissions.includes(currentRoute.meta?.title as string)) {
            continue;
        }

        // 区分 menu 类型
        if (currentRoute.children && currentRoute.children.length > 0) {
            // 递归 children
            currentRoute.children = generateActiveRoutes(currentRoute.children, permissions);

            // 修改重定向
            currentRoute.redirect = currentRoute.children.at(0)?.path;
        }

        activeRoutes.push(currentRoute);
    }

    return activeRoutes;
}

/**
 * 生成菜单路由
 * @param { RouteRecordRaw[] } routes 路由数组
 * @param { string[] | undefined } permissions 权限数组
 * @returns  { RouteRecordRaw[] } 菜单路由
 */
function generateShowMenus(routes: RouteRecordRaw[], permissions?: string[]): RouteRecordRaw[] {
    const cloneRoutes = cloneDeep(routes);
    const showMenus: RouteRecordRaw[] = [];

    for (let i = 0; i < cloneRoutes.length; i += 1) {
        const currentRoute = cloneRoutes[i];

        if (!currentRoute.meta) {
            continue;
        }

        // 过滤掉无权限的路由
        if (permissions && !permissions.includes(currentRoute.meta?.title as string)) {
            continue;
        }

        // 过滤掉隐藏的路由
        if (currentRoute.meta.hidden) {
            continue;
        }

        // 区分 menu 类型
        if (currentRoute.children && currentRoute.children.length > 0) {
            // 递归 children
            currentRoute.children = generateShowMenus(currentRoute.children, permissions);

            // 修改重定向
            currentRoute.redirect = currentRoute.children.at(0)?.path;
        }

        showMenus.push(currentRoute);
    }

    return showMenus;
}

export { type IconTypes, generateCacheList, generateActiveRoutes, generateShowMenus };
