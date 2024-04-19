<template>
    <el-card :header="header" :shadow="shadow" :body-style="bodyStyle">
        <el-descriptions
            :title="title"
            :border="border"
            :column="column"
            :size="size"
            :extra="extra"
            :direction="direction"
        >
            <el-descriptions-item v-for="(item, index) in columns" :key="index" v-bind="item">
                <!-- 具名插槽 -->
                <slot v-if="item?.type === 'slot' && data[item.prop]" :name="`${item.prop}`" />

                <!-- 默认渲染文字 -->
                <span v-else>{{ data[item.prop] }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>
<script setup lang="ts">
import type { XDescriptionColumn } from './interface';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XDescription',
});

/**
 * props
 */
withDefaults(
    defineProps<{
        /** el-card-header */
        header: string;
        /** el-card-shadow */
        shadow?: 'hover' | 'always' | 'never';
        /** card-body-style */
        bodyStyle?: Record<string, string>;
        /** 标题 */
        title: string;
        /** 边框 */
        border: boolean;
        /** 列 */
        column: number;
        /** 尺寸 */
        size: 'small' | 'default' | 'large';
        /** 操作区文本 */
        extra: string;
        /** 方向 */
        direction: 'horizontal' | 'vertical';
        /** 描述列列表 */
        columns: XDescriptionColumn[];
        /** 描述列数据 */
        data: Record<string, any>;
    }>(),
    {
        header: '',
        shadow: 'hover',
        bodyStyle: () => {
            return {
                padding: '15px',
            };
        },
        title: '',
        border: true,
        column: 4,
        size: 'default',
        extra: '',
        direction: 'horizontal',
        columns: () => [],
        data: () => ({}),
    },
);
</script>
