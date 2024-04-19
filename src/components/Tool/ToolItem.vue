<template>
    <el-table-column v-bind="$attrs" :label="label" :prop="prop" align="center" min-width="150" :width="width">
        <template #default="{ $index, row, column }">
            <el-form-item class="cell-form-item">
                <slot name="edit" :index="$index" :row="row" :column="column" :actions="toolActions">
                    {{ modelValue(row) }}
                </slot>
            </el-form-item>
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import type { ToolActions } from './interface';
import {ToolOptions} from '@/constant/base';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        prop?: string;
        label: string;
        width?: string;
        required?: boolean;
    }>(),
    {
        prop: '',
        label: '',
        width: '',
        required: false,
    },
);


const defaultToolActions: ToolActions = {
    runRow: () => {},
    deleteRow: () => {},
    // startEdit: () => {},
    // cancelEdit: () => {},
    // saveEdit: () => {},
};

/**
 * 注入
 */
const toolActions = inject<ToolActions | undefined>('toolActions') ?? defaultToolActions;

/**
 * convert an array into an object
 * @param array 
 * @param key 
 */
const convertArrayToObject = (array: any[], key: string | number) => {
  const initialValue = {};
  return array.reduce((obj: any, item: { [x: string]: any; }) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const tool_selections = convertArrayToObject(ToolOptions, 'value')
/**
 * 字段值
 */
// const modelValue = (row: Record<string, any>) => row?.[props.prop];
function modelValue(row: Record<string, any>) {
    if (props.prop == 'type'){
         return tool_selections[row?.[props.prop]].label
    } else {
        return row?.[props.prop]
    }
}



// /**
//  * 行编辑状态
//  * @param index 行索引
//  */
// const isEditing = (index: number): boolean => getEditModel(index).isEditing ?? false;

// /**
//  * 获取当前编辑行的对象数据
//  * @param index 行索引
//  */
// const getEditModel = (index: number): FormModelItem => {
//     if (!toolModel || !toolModel.value?.model) {
//         return {
//             // isEditing: false,
//             // isNew: false,
//             formData: {},
//             data: {},
//         };
//     }
//     return toolModel.value.model[index];
// };

// /**
//  * 获取当前编辑行的表单数据
//  * @param index 行索引
//  */
// const getEditRow = (index: number): Record<string, unknown> => getEditModel(index).formData;
</script>
<style lang="scss">
// 修改 el-form-item 的样式，但提示文字也被隐藏了；
.cell-form-item {
    margin-bottom: 0px !important;
}
</style>
