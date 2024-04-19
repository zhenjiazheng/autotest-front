<template>
    <div class="wrap">
        <toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" class="wrap__toolbar" />
        <editor
            v-model="editorValue"
            :default-config="editorConfig"
            :mode="mode"
            :style="editorStyle"
            @on-created="handleCreated"
            @on-change="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import useIndex from './useIndex';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XRichTextEditor',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 双向绑定 */
        modelValue: string;
        /** 上传地址 */
        uploadUrl?: string;
        /** 文件名 */
        fileName?: string;
        /** 编辑器模式 */
        mode?: 'default' | 'simple';
        /** 编辑器样式 */
        editorStyle?: Record<string, string | number>;
    }>(),
    {
        modelValue: '<p>hello</p>',
        uploadUrl: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GLOB_UPLOAD_URL}`,
        fileName: 'file',
        mode: 'simple',
        editorStyle: () => ({
            height: '400px',
            overflowY: 'hidden',
        }),
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    /** 更新弹窗是否显示 */
    (e: 'update:modelValue', value: string): void;
    /** change */
    (event: 'change', value: any): void;
}>();

/**
 * use-index
 */
const {
    editorRef,
    editorValue,
    toolbarConfig,
    editorConfig,
    handleCreated,
    handleChange,
    disable,
    enable,
    clear,
    confirm,
} = useIndex(props, emits);

/**
 * 暴露的属性/方法
 */
defineExpose({
    editorRef,
    editorValue,
    disable,
    enable,
    clear,
    confirm,
});
</script>
<style lang="scss" scoped>
.wrap {
    border: 1px solid #ccc;

    &__toolbar {
        border-bottom: 1px solid #ccc;
    }
}
</style>
