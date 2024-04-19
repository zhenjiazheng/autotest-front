<template>
    <el-table-column v-bind="$attrs" :label="label" :prop="prop" align="center" min-width="150" :width="width">
        <template #default="{ $index, row, column }">
            <el-form-item
                v-if="edit && isEditing($index)"
                :prop="required ? `model.${$index}.formData.${prop}` : ''"
                :rules="required ? [{ required: true, message: `${label}不能为空`, trigger: 'blur' }] : []"
                class="cell-form-item"
            >
                <slot name="edit" :index="$index" :row="getEditRow($index)" :column="column" :actions="taskActions">
                    {{ modelValue(row) }}
                </slot>
            </el-form-item>

            <slot v-else :index="$index" :row="row" :column="column" :actions="taskActions">
                {{ modelValue(row) }}
            </slot>
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import type { TaskActions, FormModel, FormModelItem } from './interface';

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


const defaultTaskActions: TaskActions = {
    runRow: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    saveEdit: () => {},
};

/**
 * 注入
 */
const taskActions = inject<TaskActions | undefined>('taskActions') ?? defaultTaskActions;
const taskFormModel = inject<Ref<FormModel | undefined>>('taskFormModel');

/**
 * 字段值
 */
// const modelValue = (row: Record<string, any>) => row?.[props.prop];
function modelValue(row: Record<string, any>) {
    // console.log(props.prop);
    if (props.prop == 'env'){
        // console.log(JSON.stringify(row?.[props.prop]).toString())
        return JSON.stringify(row?.[props.prop]).toString();
    } else {
        return row?.[props.prop];
    }
}
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
    if (!taskFormModel || !taskFormModel.value?.model) {
        return {
            isEditing: false,
            // isNew: false,
            formData: {},
            data: {},
        };
    }
    // console.log(index)
    // console.log(taskFormModel.value.model[index]);
    return taskFormModel.value.model[index];
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
