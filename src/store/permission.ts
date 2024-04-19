import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import { generateActiveRoutes, generateCacheList, generateShowMenus } from '@/components/hooks/router-helper';
import router, { menuRoutes } from '@/router/index';
import { savePermission } from '@/utils/storage';
import appLayout from '@/layout/index.vue';

/**
 * 权限缓存状态
 */
const usePermissionStore: any = defineStore('permission', () => {
    // ================= 权限 =================
    /**
     * 是否开启权限设置
     */
    const usable = ref<boolean>(false);

    /**
     * 开启权限
     */
    function enablePermission(): void {
        usable.value = true;
    }

    /**
     * 关闭权限
     */
    function disablePermission(): void {
        usable.value = false;
    }

    /**
     * 权限数组
     */
    const permissions = ref<string[]>([]);

    /**
     * 更新权限数组
     */
    function setPermission(value: string[]): void {
        permissions.value = ['首页', ...(value ?? [])];
        savePermission(permissions.value);
    }

    // ================= 路由 =================
    /**
     * 路由数组
     */
    const routes = ref<RouteRecordRaw[]>([]);

    /**
     * 更新路由数组
     */
    function setRoutes(value: RouteRecordRaw[]): void {
        routes.value = value;
        // console.log(value)
    }

    /**
     * 根据路由与权限数据生成可用路由
     */
    const activeRoutes = computed<RouteRecordRaw[]>(() => {
        // if (usable.value) {
        //     return generateActiveRoutes(routes.value, permissions.value);
        // }

        return generateActiveRoutes(routes.value);
    });

    // ================= 缓存 =================
    /**
     * 是否使用缓存
     */
    const useCache = ref<boolean>(true);

    /**
     * 使用缓存
     */
    function enableCache(): void {
        useCache.value = true;
    }

    /**
     * 禁用缓存
     */
    function disableCache(): void {
        useCache.value = false;
    }

    /**
     * 根据路由与权限数组生成缓存数组
     */
    const cacheList = computed<string[]>(() => {
        if (!useCache.value) {
            return [];
        }

        if (usable.value) {
            return generateCacheList(routes.value, permissions.value);
        }

        return generateCacheList(routes.value);
    });

    // ================= menu =================
    /**
     * 根据路由与权限数组生成菜单路由
     */
    const showMenus = computed<RouteRecordRaw[]>(() => {
        if (usable.value) {
            return generateShowMenus(routes.value, permissions.value);
        }

        return generateShowMenus(routes.value);
    });

    // ================= 页面 menu =================
    /**
     * 筛选带有权限的 menus ==> 搭配 parentMenuView 使用
     */
    function getPermissionMenus(routes: RouteRecordRaw[]) {
        if (usable.value) {
            return routes.filter(route => permissions.value.includes(route.meta?.title as string));
        }

        return routes;
    }

    /**
     * FIXME: 动态加载路由？
     */
    function setActiveRouteList() {
        router.addRoute({
            path: '/',
            name: '/',
            component: markRaw(appLayout),
            redirect: activeRoutes.value[0].path,
            meta: {
                title: '',
            },
            children: activeRoutes.value,
        });
    }

    return {
        usable,
        enablePermission,
        disablePermission,
        permissions,
        setPermission,
        routes,
        setRoutes,
        activeRoutes,
        useCache,
        enableCache,
        disableCache,
        cacheList,
        showMenus,
        getPermissionMenus,
        setActiveRouteList,
    };
});

/**
 * 设置路由
 */
function setPermissionRoute() {
    const permissionStore = usePermissionStore();

    permissionStore.setRoutes(menuRoutes);
    permissionStore.setActiveRouteList();
}

export { usePermissionStore, setPermissionRoute };
