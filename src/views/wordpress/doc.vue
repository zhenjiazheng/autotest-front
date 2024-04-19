<template>
    <div class="component">
        <div v-if="showDom" id="domId">
            <el-card shadow="hover" header="x-file-preview" class="component whole-node">
                <el-button @click="preview({ url: wordUrl })"> WORD </el-button>
                <el-button @click="preview({ url: excelUrl })"> EXCEl </el-button>
            </el-card>

            <el-card shadow="hover" header="x-rich-text-editor" class="component whole-node">
                <x-rich-text-editor
                    ref="editorRef"
                    v-model="editorValue"
                    class="component"
                    @change="handleChange"
                ></x-rich-text-editor>

                <div class="ignore-node">
                    <el-button @click="handleDisable"> DISABLE </el-button>
                    <el-button @click="handleEnable"> ENABLE </el-button>
                    <el-button @click="handleConfirm"> CONFIRM </el-button>
                    <el-button @click="handleClear"> CLEAR </el-button>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useCommandComponent } from '@/components/hooks/command-dialog-helper';
import XFilePreview from '@/components/FilePreview/index.vue';

/**
 * file-preview-dialog
 */
const preview = useCommandComponent(XFilePreview);

/**
 * file-url
 */
const wordUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743570966电脑添加打印机.docx');
const excelUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743598502绿菱条码模板.xlsx');

/**
 * 编辑器实例
 */
const editorRef = shallowRef();

/**
 * 默认值
 */
const editorValue = ref<string>(
    '<p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>工具栏配置 - 插入新菜单，屏蔽某个菜单等</strong></em></span></p><p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>编辑器配置 - 兼听各个生命周期，自定义粘贴</strong></em></span></p><p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>菜单配置 - 配置颜色、字体、字号、链接校验、上传图片、视频等</strong></em></span></p>',
);

/**
 * 编辑器内容、选区变化的回调
 */
function handleChange(content: any) {
    console.log('change', content);
}

/**
 * 禁用
 */
function handleDisable() {
    editorRef.value.disable();
}

/**
 * 使用
 */
function handleEnable() {
    editorRef.value.enable();
}

/**
 * 确认
 */
function handleConfirm() {
    const content = editorRef.value.confirm();
    console.log('confirm', content);
}

/**
 * 清空
 */
function handleClear() {
    editorRef.value.clear();
}

</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
