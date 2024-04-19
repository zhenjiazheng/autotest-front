<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="width"
        append-to-body
        destroy-on-close
        @opened="handleOpen"
        @close="handleClose"
    >
        <template #header>
            <slot name="title"></slot>
        </template>

        <x-form
            ref="formRef"
            :model-value="modelForm"
            :el-form-props="elFormProps"
            :schemas="schemas"
            @update:model-value="handleUpdate"
        >
        </x-form>

        <!-- <el-form ref="formRef" :model="modelForm" v-bind="elFormProps">
            <el-row>
                <el-col v-for="(schema, index) in schemas" :key="index" :span="12" v-bind="schema.colProps">
                    <x-form-item :model-value="modelForm" :schema="schema" @update:model-value="handleUpdate">
                        <template #[customSlotName(schema)]>
                            <slot :name="customSlotName(schema)" :form="modelForm"></slot>
                        </template>
                    </x-form-item>
                </el-col>
            </el-row>
        </el-form> -->

        <template #footer>
            <slot name="action" :form="modelForm" :form-ref="formRef"></slot>

            <el-button v-if="isShowConfirm" type="primary" :loading="loading" @click="handleSubmit"> 确认 </el-button>
            <el-button @click="handleCancel"> 取消 </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { FormProps } from 'element-plus';
import type { XFormInstance, XFormItemSchema } from './interface';
import XForm from './XForm.vue';
// import XFormItem from './XFormItem.vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 双向绑定：是否打开弹窗 */
        modelValue: boolean;
        /** 弹窗标题 */
        title?: string;
        /** 弹窗宽度 */
        width?: number | string;
        /** 双向绑定：form 表单 */
        data?: any;
        /** 表单配置 */
        schemas?: XFormItemSchema[];
        /** form props */
        elFormProps?: Partial<FormProps>;
        /** 是否展示提交按钮 */
        isShowConfirm?: boolean;
        /** 提交 loading */
        loading?: boolean;
    }>(),
    {
        modelValue: false,
        title: '新增',
        width: '40%',
        data: () => ({}),
        schemas: () => [],
        elFormProps: () => ({ labelWidth: '120px' }),
        isShowConfirm: true,
        loading: false,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    /** 双向绑定：弹窗是否打开 */
    (e: 'update:modelValue', value: boolean): void;
    /** 双向绑定：form 表单 */
    (e: 'update:data', value: any): void;
    /** 打开弹窗回调 */
    (e: 'open', form: any): void;
    /** 关闭弹窗回调 */
    (e: 'close'): void;
    /** 提交回调 */
    (e: 'submit', form: any): void;
}>();

/**
 * slot-name
 */
// function customSlotName(schema: XFormItemSchema): string {
//     return schema.components === 'custom' ? schema.slotName : '';
// }

/**
 * 是否展示弹窗
 */
const visible = computed({
    get: () => props.modelValue,
    set: newValue => {
        emits('update:modelValue', newValue);
    },
});

/**
 * form ref
 */
const formRef = ref<XFormInstance>();

/**
 * form
 */
const modelForm = computed<any>({
    get: () => props.data,
    set: value => emits('update:data', value),
});

/**
 * 更新表单数据
 */
function handleUpdate(): void {
    emits('update:data', modelForm.value);
}

/**
 * 打开弹窗
 */
function handleOpen() {
    emits('open', modelForm.value);
}

/**
 * 关闭弹窗
 */
function handleClose() {
    // 重置表单值
    formRef.value?.resetFields();
    modelForm.value = {};
    emits('close');
}

/**
 * 提交
 */
function handleSubmit() {
    emits('submit', modelForm.value);
}

/**
 * 取消
 */
function handleCancel() {
    visible.value = false;
}

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
