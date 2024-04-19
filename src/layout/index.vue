<template>
    <el-config-provider :locale="zhCn">
        <x-layout :routes="showMenus" :include-list="[]">
            <template #logo="{ collapsed }">
                <x-logo logo="/logo.png" :title="APP_NAME" :collapsed="collapsed"></x-logo>
            </template>

            <template #header-right>
                <div class="header-right">
                    <!-- <el-input
                        v-if="ENV !== 'production'"
                        v-model="baseUrl"
                        class="header-right__item"
                        @blur="handleBlur"
                    ></el-input> -->

                    <x-user
                        :user-name="userInfo?.username"
                        :dropdown-items="dropdownItems"
                        class="header-right__item"
                    ></x-user>
                </div>
            </template>
        </x-layout>

        <x-dialog-form
            ref="formRef"
            v-model="visible"
            v-model:data="form"
            title="修改密码"
            width="30%"
            :schemas="schemas"
            :loading="loading"
            @submit="changePassword"
        ></x-dialog-form>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { usePermissionStore } from '@/store/permission';
import { ENV, APP_NAME } from '@/constant/global';
import useIndex from './useIndex';

const { showMenus } = usePermissionStore();

const { baseUrl, userInfo, dropdownItems, schemas, visible, formRef, loading, form, handleBlur, changePassword } =
    useIndex();
</script>
<style lang="scss" scoped>
.header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &__item {
        max-width: 200px;
        margin-left: 10px;
    }
}
</style>
