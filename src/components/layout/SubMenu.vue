<template>
    <component :is="menuComponent" :index="menu?.path">
        <template #title>
            <!-- icon -->
            <el-icon v-if="menu?.meta?.icon">
                <component :is="Icons[menu.meta.icon as IconTypes]"></component>
            </el-icon>

            <!-- menu -->
            <span>{{ menu?.meta?.title }}</span>

            <!-- tag：小铃铛 -->
            <el-tag
                v-if="showMenuInfo(menu?.meta?.title as string)"
                class="tag"
                size="small"
                effect="dark"
                type="danger"
            >
                {{ menuInfo?.get(menu?.meta?.title as string) }}
            </el-tag>
        </template>

        <sub-menu
            v-for="submenuItem in menu?.children"
            :key="submenuItem.path"
            :menu="submenuItem"
            :menu-info="menuInfo"
        ></sub-menu>
    </component>
</template>

<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue';
import { ElMenuItem, ElSubMenu } from 'element-plus';
// import { computed, markRaw, type Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import type { IconTypes } from '@/components/hooks/router-helper';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        menu?: RouteRecordRaw;
        /** menu info */
        menuInfo?: Map<string, number>;
    }>(),
    {
        menu: undefined,
        menuInfo: undefined,
    },
);

/**
 * 通过判断有无 children 渲染组件
 */
const menuComponent = computed<Component | undefined>(() => {
    if (!props.menu) {
        return undefined;
    }

    if (props.menu.children && props.menu.children.length > 0) {
        return markRaw(ElSubMenu);
    } else {
        return markRaw(ElMenuItem);
    }
});

/**
 * 是否展示标题信息
 */
function showMenuInfo(title?: string): boolean {
    if (!title) {
        return false;
    }

    return !!props.menuInfo && !!props.menuInfo.get(title);
}
</script>

<style lang="scss" scoped>
.tag {
    margin-left: 6px;
}
</style>
