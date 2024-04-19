<template>
    <el-table-column v-bind="$attrs" :label="label" :prop="prop" align="center" min-width="150" :width="width">
        <template #default="{ $index, row, column }">
            <el-form-item
                v-if="edit && isEditing($index)"
                :prop="required ? `model.${$index}.formData.${prop}` : ''"
                :rules="required ? [{ required: true, message: `${label}不能为空`, trigger: 'blur' }] : []"
                class="cell-form-item"
            >
                <slot name="edit" :index="$index" :row="getEditRow($index)" :column="column" :actions="editActions">
                    {{ modelValue(row) }}
                </slot>
            </el-form-item>

            <slot v-else :index="$index" :row="row" :column="column" :actions="editActions">
                {{ modelValue(row) }}
            </slot>
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import type { EditActions, FormModel, FormModelItem } from './interface';

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
        edit: true,
        required: false,
    },
);


const defaultEditActions: EditActions = {
    addRow: () => {},
    deleteRow: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    saveEdit: () => {},
};

/**
 * 注入
 */
const editActions = inject<EditActions | undefined>('editActions') ?? defaultEditActions;
const formModel = inject<Ref<FormModel | undefined>>('formModel');

/**
 * 字段值
 */
const modelValue = (row: Record<string, any>) => row?.[props.prop];

/**
 * 行编辑状态
 * @param index 行索引
 */
const isEditing = (index: number): boolean => getEditModel(index).isEditing ?? false;

/**
 * 获取当前编辑行的对象数据
 * @param index 行索引
 */
const getEditModel = (index: number): FormModelItem => {
    if (!formModel || !formModel.value?.model) {
        return {
            isEditing: false,
            isNew: false,
            formData: {},
            data: {},
        };
    }
    // console.log(formModel.value.model[index]);
    return formModel.value.model[index];
};

/**
 * 获取当前编辑行的表单数据
 * @param index 行索引
 */
const getEditRow = (index: number): Record<string, unknown> => getEditModel(index).formData;
</script>
<style lang="scss">
// 修改 el-form-item 的样式，但提示文字也被隐藏了；
.cell-form-item {
    margin-bottom: 0px !important;
}
</style>
