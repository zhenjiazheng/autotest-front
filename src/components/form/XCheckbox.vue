<template>
    <div>
        <el-checkbox v-if="allChoose" v-model="isAllChoose" :indeterminate="isIndeterminate" @change="handleAllChoose">
            全选
        </el-checkbox>

        <el-checkbox-group
            :model-value="checkedValue"
            v-bind="elProps"
            @change="handleChange"
            @update:model-value="updateData"
        >
            <component :is="isComponent" v-for="(option, index) in options" :key="index" v-bind="option">
                {{ option.labelName }}
            </component>
        </el-checkbox-group>
    </div>
</template>

<script setup lang="ts">
import {
    ElCheckbox,
    ElCheckboxButton,
    type CheckboxGroupProps,
    type CheckboxGroupValueType,
    type CheckboxValueType,
} from 'element-plus';
import type { Component } from 'vue';
import type { CheckBoxOption, CheckboxType } from './interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        modelValue?: CheckboxGroupValueType;
        options?: CheckBoxOption[];
        type?: CheckboxType;
        allChoose?: boolean;
        elProps?: Partial<CheckboxGroupProps>;
    }>(),
    {
        modelValue: undefined,
        options: () => [],
        type: 'box',
        allChoose: false,
        elProps: undefined,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: CheckboxGroupValueType): void;
    (e: 'change', value: CheckboxGroupValueType): void;
}>();

/**
 * 动态组件
 */
const isComponent = computed<Component>(() => {
    return props.type === 'button' ? markRaw(ElCheckboxButton) : markRaw(ElCheckbox);
});

/**
 * 全选状态
 */
const isAllChoose = ref();

/**
 * 半选状态
 */
const isIndeterminate = ref(false);

/**
 * 选中的值
 */
const checkedValue = ref<any>(props.modelValue);
const checkedAll = props.options.map(item => item.label);

/**
 *
 * @param val 改变选中值
 */
function handleChange(val: CheckboxValueType[]): void {
    checkedValue.value = val;

    isAllChoose.value = val.length === props.options.length;
    isIndeterminate.value = val.length > 0 && val.length < props.options.length;
    emits('change', checkedValue.value as CheckboxGroupValueType);
}

/**
 * 全选
 */
function handleAllChoose(val: CheckboxValueType): void {
    checkedValue.value = val ? checkedAll : [];
    isIndeterminate.value = false;
    emits('update:modelValue', checkedValue.value);
}

/**
 * 更新选中数据
 */
function updateData(val: CheckboxGroupValueType): void {
    emits('update:modelValue', val);
}

/**
 * 监听
 */
watchEffect(() => {
    checkedValue.value = props.modelValue;
});
</script>
