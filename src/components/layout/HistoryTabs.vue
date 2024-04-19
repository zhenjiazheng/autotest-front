<template>
    <div class="history-tabs">
        <!-- pre icon -->
        <span class="icon-button" @click="handlePre">
            <span>
                <d-arrow-left></d-arrow-left>
            </span>
        </span>

        <el-scrollbar ref="scrollbarRef" class="scroll">
            <div ref="tabWrapRef" class="tab-wrap">
                <div
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="['tab', activeTabClass(index)]"
                    @click="handleTabClick(index, tab)"
                >
                    <div class="tab_title">{{ tab.title }}</div>

                    <span v-if="showClose(index)" class="tab_icon-wrap" @click.stop="handleTabClose(index)">
                        <span class="tab_icon">
                            <close></close>
                        </span>
                    </span>
                </div>
            </div>
        </el-scrollbar>

        <!-- after icon -->
        <span class="icon-button" @click="handleAfter">
            <span>
                <d-arrow-right></d-arrow-right>
            </span>
        </span>

        <!-- refresh icon -->
        <span class="icon-button" @click="handleRefresh">
            <span>
                <refresh-right></refresh-right>
            </span>
        </span>

        <!-- setting icon -->
        <!-- <span class="icon-button">
            <span>
                <setting></setting>
            </span>
        </span> -->
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, ref } from 'vue';
import { useRouter, type RouteRecordName } from 'vue-router';
import { ElScrollbar } from 'element-plus';
import { DArrowLeft, Close, DArrowRight, RefreshRight, Setting } from '@element-plus/icons-vue';

interface Tab {
    path: string;
    name: string;
    title: string;
}

const router = useRouter();
const proxy = getCurrentInstance()?.proxy;

const tabWrapRef = ref<InstanceType<typeof HTMLElement>>();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const currentIndex = ref<number>(0);
const tabs = ref<Tab[]>([
    {
        path: router.currentRoute.value.path as string,
        name: router.currentRoute.value.name as string,
        title: router.currentRoute.value.meta.title as string,
    },
]);

/**
 * 更新滚动条
 */
async function updateScroll(): Promise<void> {
    // nextTick: 在 history-tab 节点生成，且 close 显示状态切换后，再获取子节点 offsetLeft
    await nextTick();

    const el = tabWrapRef.value?.children[currentIndex.value] as HTMLElement;

    if (el) {
        scrollbarRef.value?.setScrollLeft(el.offsetLeft);
    }
}

/**
 * 路由跳转结束后存储 tab
 */
router.afterEach((to: any) => {
    const nextIndex = tabs.value.findIndex(tab => tab.name === to.name);

    // 存在
    if (nextIndex >= 0) {
        currentIndex.value = nextIndex;
        updateScroll();
        return true;
    }

    // 若 name 不存在
    if (!to.name) {
        return new Error(`router.name is undefined, ${to.fullPath}`);
    }

    // 激活并存储
    tabs.value.push({
        title: to.meta.title as string,
        name: to.name,
        path: to.fullPath,
    });

    currentIndex.value = tabs.value.length - 1;
    updateScroll();
    return true;
});

/**
 * tab click
 */
function handleTabClick(index: number, tab: Tab): void {
    currentIndex.value = index;
    router.push(tab);
    updateScroll();
}

/**
 * 是否激活
 */
function isActive(index: number): boolean {
    return currentIndex.value === index;
}

/**
 * 激活 tab class
 */
function activeTabClass(index: number): string {
    return isActive(index) ? 'tab-active' : '';
}

/**
 * 是否显示关闭按钮
 */
function showClose(index: number): boolean {
    return isActive(index) && tabs.value.length > 1;
}

/**
 * 关闭 tab
 */
function handleTabClose(index: number) {
    tabs.value.splice(index, 1);

    if (index - 1 < 0) {
        handleTabClick(index, tabs.value[index]);
    } else {
        handleTabClick(index - 1, tabs.value[index - 1]);
    }
}

/**
 * 刷新
 */
function handleRefresh(): void {
    // 触发全局刷新事件
    proxy?.$bus.emit('refresh', {
        path: router.currentRoute.value.fullPath,
        name: router.currentRoute.value.name as string,
    });
}

/**
 * 向前
 */
function handlePre() {
    if (currentIndex.value !== 0) {
        handleTabClick(currentIndex.value - 1, tabs.value[currentIndex.value - 1]);
    }
}

/**
 * 向后
 */
function handleAfter() {
    if (currentIndex.value < tabs.value.length - 1) {
        handleTabClick(currentIndex.value + 1, tabs.value[currentIndex.value + 1]);
    }
}
</script>

<style lang="scss" scoped>
.history-tabs {
    display: flex;
    width: 100%;
    height: 35px;
    border-bottom: var(--el-border);
}

.icon-button {
    display: flex;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    span {
        display: block;
        width: 18px;
        height: 18px;
    }
}

.scroll {
    width: 100%;
}

.tab-wrap {
    display: flex;
    width: calc(100% - 140px);
    height: 34px;
    align-items: center;
}

.tab {
    display: flex;
    padding: 0 8px;
    margin: 0 2px;
    height: 28px;
    align-items: center;
    flex-shrink: 0;
    font-size: 12px;
    color: var(--el-text-color-regular);
    background-color: transparent;
    border: 1px solid var(--el-border-color);
    cursor: default;

    &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary-light-7);
    }

    &_icon-wrap {
        margin-left: 4px;
        display: flex;
        height: 14px;
        width: 14px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            color: var(--el-color-primary-light-3);
            background-color: var(--el-color-white);
        }
    }

    &_icon {
        display: block;
        width: 14px;
        height: 14px;
    }
}

.tab-active {
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
    border-color: var(--el-color-primary-dark-2);

    &:hover {
        color: var(--el-color-white);
        background-color: var(--el-color-primary-light-3);
    }
}
</style>
