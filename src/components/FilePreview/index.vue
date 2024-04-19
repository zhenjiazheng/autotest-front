<template>
    <el-dialog v-model="dialogVisible" :title="title" fullscreen :show-close="false" destroy-on-close>
        <template #header="{ close }">
            <div class="dialog-header">
                <el-button type="success" @click="download()">下载</el-button>
                <el-button @click="close"> 关闭 </el-button>
            </div>
        </template>

        <!-- 容器 -->
        <div v-if="fileType === FileType['word']" ref="wordRef"></div>
        <div v-if="fileType === FileType['excel']" id="luckysheetId" class="luckysheet"></div>
    </el-dialog>
</template>

<script lang="ts" setup>
import useIndex from './useIndex';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XFilePreview',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 是否展示 */
        visible: boolean;
        /** 弹窗标题 */
        title?: string;
        /** 文档路径 */
        url: string;
    }>(),
    {
        visible: false,
        title: '弹窗标题',
        url: '',
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
    (event: 'close'): void;
}>();

/**
 * use-index
 */
const { FileType, fileType, dialogVisible, wordRef, download } = useIndex(props, emits);
</script>
<style lang="scss" scoped>
.dialog-header {
    display: flex;
    justify-content: end;
}

// FIXME: class 不用 luckysheet 不生效？
.luckysheet {
    width: 100%;
    height: 100%;
}
</style>
