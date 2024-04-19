<template>
    <el-table-column v-bind="$attrs" :label="label" :prop="prop" align="center" min-width="150" :width="width">
        <template #default="{ $index, row, column }">
            <el-form-item class="cell-form-item">
                <slot name="edit" :index="$index" :row="row" :column="column" :actions="llmActions">
                    {{ modelValue(row) }}
                </slot>
            </el-form-item>
            
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import type { LLMActions, FormModel, FormModelItem } from './interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        prop?: string;
        label: string;
        width?: string;
        edit?: boolean;
        required?: boolean;
    }>(),
    {
        prop: '',
        label: '',
        width: '',
        edit: false,
        required: false,
    },
);


const defaultActions: LLMActions = {
    viewDetail: () => {},
    finetune: () => {},
    chat: ()=> {},
};

/**
 * 注入
 */
const llmActions = inject<LLMActions | undefined>('llmActions') ?? defaultActions;
const llmformModel = inject<Ref<FormModel | undefined>>('llmformModel');

/**
 * 字段值
 */
const modelValue = (row: Record<string, any>) => row?.[props.prop];

</script>
<style lang="scss">
// 修改 el-form-item 的样式，但提示文字也被隐藏了；
.cell-form-item {
    margin-bottom: 0px !important;
}
</style>
