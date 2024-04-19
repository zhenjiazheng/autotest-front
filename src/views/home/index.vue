<template>
    <el-card shadow="hover" class="home">
        <div class="home__greeting">
            <h3>{{ `${greeting}${userInfo?.username || ''}` }}</h3>
            <p>欢迎使用 {{APP_NAME}}工具平台！</p>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { handleFormatAxis } from '@/utils/hooks';
import { getUserInfo } from '@/utils/storage';
import { APP_NAME } from '@/constant/global';

const greeting = handleFormatAxis(new Date());
const userInfo = ref(getUserInfo());
</script>

<style scoped>
.home {
    width: 100%;
}
</style>
