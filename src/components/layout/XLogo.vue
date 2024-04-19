<template>
    <div class="x-logo">
        <img width="30" height="30" :src="logo" :alt="alt" />
        <div class="x-logo-title" :class="logoTitleClass">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** logo url */
        logo?: string;
        /** logo alt */
        alt?: string;
        /** 系统名称 */
        title?: string;
        /** 是否折叠系统名称 */
        collapsed?: boolean;
    }>(),
    {
        logo: '',
        alt: '',
        title: '',
        collapsed: false,
    },
);

/**
 * 系统名称是否展示
 */
const logoTitleClass = computed<string>(() => (props.collapsed ? 'x-logo-title--collapsed' : ''));
</script>

<style lang="scss" scoped>
.x-logo {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    color: var(--el-color-white);
}

.x-logo-title {
    margin-left: 8px;
    transition: var(--el-transition-duration);
    overflow: hidden;
    white-space: nowrap;

    &--collapsed {
        margin-left: 0;
        width: 0;
    }
}
</style>
