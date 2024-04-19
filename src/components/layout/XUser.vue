<template>
    <el-dropdown>
        <div class="user-name">{{ userName }}</div>

        <template #dropdown>
            <el-dropdown-item v-for="(item, index) in dropdownItems" :key="index" @click="item.onClick">
                {{ item.title }}
            </el-dropdown-item>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
interface DropdownItem {
    title: string;
    onClick?: () => void;
}

withDefaults(
    defineProps<{
        /** 用户名称 */
        userName?: string;
        /** dropdown 配置 */
        dropdownItems?: DropdownItem[];
    }>(),
    {
        userName: 'Admin',
        dropdownItems: () => [
            {
                title: '注销',
            },
        ],
    },
);
</script>

<style lang="scss" scoped>
.user-name {
    outline: none;
    cursor: pointer;
}
</style>
