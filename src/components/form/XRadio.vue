<template>
    <el-radio-group :model-value="radioValue" v-bind="elProps" @change="handleChange" @update:model-value="updateData">
        <component :is="isComponent" v-for="(option, index) in options" :key="index" v-bind="option">
            {{ option.labelName }}
        </component>
    </el-radio-group>
</template>

<script setup lang="ts">
import { ElRadio, ElRadioButton, type RadioGroupProps } from 'element-plus';
import type { RadioType, RadioValueType, RadioOption } from './interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        modelValue?: RadioValueType;
        options?: RadioOption[];
        type?: RadioType;
        elProps?: Partial<RadioGroupProps>;
    }>(),
    {
        modelValue: undefined,
        options: () => [],
        type: 'cycle',
        elProps: undefined,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: RadioValueType): void;
    (e: 'change', value: RadioValueType): void;
}>();

/**
 * 动态组件
 */
const isComponent = computed<Component>(() => {
    return props.type === 'button' ? markRaw(ElRadioButton) : markRaw(ElRadio);
});

/**
 * 选中的值
 */
const radioValue = ref<RadioValueType>(props.modelValue);

/**
 * 改变选中值
 */
function handleChange(value: RadioValueType): void {
    emits('change', value);
}

/**
 * 更新选中的数据
 */
function updateData(value: RadioValueType): void {
    emits('update:modelValue', value);
}

/**
 * 监听
 */
watchEffect(() => {
    radioValue.value = props.modelValue;
});
</script>
