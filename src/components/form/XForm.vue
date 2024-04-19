<template>
    <el-form ref="formRef" :model="modelValue" v-bind="elFormProps">
        <el-row>
            <el-col v-for="(schema, index) in schemas" :key="index" :span="12" v-bind="schema.colProps">
                <x-form-item :model-value="modelValue" :schema="schema" @update:model-value="handleUpdate">
                    <template #[customSlotName(schema)]>
                        <slot :name="customSlotName(schema)" :form="modelValue"></slot>
                    </template>
                </x-form-item>
            </el-col>
            <slot name="action"></slot>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormProps } from 'element-plus';
import type { XFormItemSchema } from './interface';
import XFormItem from './XFormItem.vue';

/**
 * props
 */
withDefaults(
    defineProps<{
        /** form 表单 */
        modelValue: any;
        /** 表单配置列表 */
        schemas: XFormItemSchema[];
        /** form props */
        elFormProps?: Partial<FormProps>;
    }>(),
    {
        modelValue: () => ({}),
        schemas: () => [],
        elFormProps: undefined,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: any): void;
}>();

/**
 * slot-name
 */
function customSlotName(schema: XFormItemSchema): string {
    return schema.components === 'custom' ? schema.slotName : '';
}

/**
 * 更新数据
 */
function handleUpdate(value: any): void {
    emits('update:modelValue', value);
}

/**
 * form ref
 */
const formRef = ref<FormInstance>();

/**
 * 表单校验
 */
async function validate(): Promise<boolean> {
    const valid = await formRef.value?.validate();

    if (!valid) {
        return false;
    }

    return true;
}

/**
 * 重置表单
 */
function resetFields() {
    formRef.value?.resetFields();
}

/**
 * 暴露方法
 */
defineExpose({
    validate,
    resetFields,
});
</script>
