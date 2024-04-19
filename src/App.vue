<template>
    <router-view />
</template>
<style lang="scss">
@import '@/styles/index.scss';
</style>
<style lang="scss">
* {
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
}

#app {
    width: 100%;
    height: 100%;
}

/**
 * 左侧 menu 样式宏
 */
:root {
    --el-route-menu-bg-color: #304156 !important; // 主要主体颜色
    --el-route-menu-hover-bg-color: #263445 !important; // 菜单背景颜色
    --el-route-menu-text-color: #b8babf !important; // 鼠标移上菜单背景颜色
    --el-route-menu-hover-text-color: #bfcbd9 !important; // 菜单文字颜色
    --el-route-menu-active-color: var(--el-color-primary) !important; // 鼠标移上菜单文字颜色
    --el-route-menu-active-bg-color: #304156 !important; // 菜单选中背景颜色
    --el-route-menu-inline-bg-color: #263445 !important; // 展开的子菜单背景颜色
}
</style>
