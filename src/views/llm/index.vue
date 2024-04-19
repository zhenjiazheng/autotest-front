<template>
    <parent-view :matched-index="2" :cache-list="cacheList"></parent-view>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store/permission';

const { cacheList } = usePermissionStore();
</script>
