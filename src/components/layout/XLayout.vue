<template>
    <el-container class="x-layout">
        <!-- 侧边栏容器 -->
        <el-aside width="250px" class="x-aside" :class="collapsedClass">
            <slot name="logo" :collapsed="collapsed"> </slot>

            <div class="x-menu-wrap">
                <el-scrollbar>
                    <el-menu
                        class="x-menu"
                        mode="vertical"
                        router
                        :default-active="activeRoute"
                        :collapse="collapsed"
                        v-bind="menuStyle"
                    >
                        <sub-menu v-for="menu in routes" :key="menu.path" :menu="menu" :menu-info="menuInfo"></sub-menu>
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>

        <!-- 外层容器 -->
        <el-container>
            <!-- 顶栏容器 -->
            <el-header class="x-header">
                <div class="x-header__collapse" @click="toggleMenu">
                    <span class="x-header__collapse__icon">
                        <expand v-if="collapsed"></expand>
                        <fold v-else></fold>
                    </span>
                </div>

                <breadcrumb></breadcrumb>

                <h4 v-if="isBoxVisible" class="x-header__center">{{ title }}</h4>

                <div class="x-header__right">
                    <slot name="header-right"></slot>
                </div>
            </el-header>

            <!-- 历史页面面包屑 -->
            <history-tabs></history-tabs>

            <!-- 主要区域容器 -->
            <el-scrollbar>
                <el-main class="x-main">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <keep-alive :max="max" :include="includeList" :exclude="excludeList">
                                <component :is="Component" :key="componentKey"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { useRoute, type RouteRecordRaw } from 'vue-router';
import { Fold, Expand } from '@element-plus/icons-vue';
import SubMenu from './SubMenu.vue';
import HistoryTabs from './HistoryTabs.vue';
import Breadcrumb from './Breadcrumb.vue';
import { useRefresh } from './use-refresh';

interface MenuStyle {
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
}

/**
 * props
 */
withDefaults(
    defineProps<{
        /** 路由数组 */
        routes?: RouteRecordRaw[];
        /** include */
        includeList?: string[];
        /** 最大缓存数量 */
        max?: number;
        /** 标题 */
        title?: string;
        /** menu 样式 */
        menuStyle?: MenuStyle;
        /** menu info */
        menuInfo?: Map<string, number>;
    }>(),
    {
        routes: () => [],
        includeList: undefined,
        max: undefined,
        title: '',
        menuStyle: () => ({
            backgroundColor: '#304156',
            textColor: '#b8babf',
            activeTextColor: '#409eff',
        }),
        menuInfo: undefined,
    },
);

/**
 * route
 */
const route = useRoute();

/**
 * useRefresh
 */
const { componentKey, excludeList } = useRefresh({ matchedIndex: 1 });

/**
 * 当前激活的路由
 */
const activeRoute = computed<string>(() => {
    let path = route.fullPath;

    // 查找 matched 中第一个不隐藏的路由
    for (let i = route.matched.length - 1; i > 0; i -= 1) {
        if (!route.matched[i].meta.hidden) {
            path = route.matched[i].path;
            break;
        }
    }

    return path;
});

/**
 * 是否收起菜单
 */
const collapsed = ref<boolean>(false);

/**
 * 菜单开关样式类
 */
const collapsedClass = computed<string>(() => (collapsed.value ? 'x-aside--collapsed' : ''));

/**
 * title 是否展示
 */
const isBoxVisible = ref<boolean>(true);

/**
 * 手动开关菜单
 */
function toggleMenu(): void {
    collapsed.value = !collapsed.value;
}

/**
 * 根据窗口宽度自动开关菜单
 */
function handleResize() {
    if (window.innerWidth < 1300) {
        collapsed.value = true;
        isBoxVisible.value = false;
    } else {
        collapsed.value = false;
        isBoxVisible.value = true;
    }
}

/**
 * 页面渲染
 */
onMounted(() => {
    window.addEventListener('resize', handleResize);
});
</script>

<style lang="scss">
html,
body,
#app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

*,
::after,
::before {
    box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.x-layout {
    height: 100%;
}

.x-aside {
    transition: var(--el-transition-duration);
    background-color: v-bind('menuStyle?.backgroundColor');

    &--collapsed {
        width: 64px;
    }
}

.x-menu-wrap {
    height: calc(100% - 60px);
}

.x-menu {
    border: none;
}

.x-header {
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-shadow: var(--el-box-shadow-lighter);

    &__collapse {
        display: flex;
        height: 100%;
        width: 40px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background-color: var(--el-color-primary-light-9);
        }

        &__icon {
            color: var(--el-text-color-secondary);
            display: block;
            width: 18px;
            height: 18px;
        }
    }

    &__center {
        flex: 1;
        text-align: center;
    }

    &__right {
        flex: 1;
        text-align: right;
    }
}

.x-main {
    background-color: var(--el-bg-color-page);
    min-height: calc(100vh - 95px);
}

// 进入 & 离开动画的生效状态
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

// 进入动画的起始状态
.fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

// 离开动画的结束状态
.fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
