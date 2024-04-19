<template>
    <el-breadcrumb class="x-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" :to="breadcrumb">
            {{ breadcrumb.meta?.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, type RouteRecordRaw } from 'vue-router';

const breadcrumbs = computed<RouteRecordRaw[]>(() => useRoute().matched);
</script>

<style lang="scss" scoped>
.x-breadcrumb {
    min-width: 400px;
}
</style>
