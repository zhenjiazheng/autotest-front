<template>
    <el-card :header="header" :shadow="shadow" class="x-search-form">
        <el-form ref="formRef" :model="modelForm" v-bind="elFormProps">
            <el-row>
                <template v-for="(schema, index) in schemas" :key="index">
                    <el-collapse-transition>
                        <el-col v-if="showMore ? !showFormItem(index) : true" v-bind="schemaColProps(schema.colProps)">
                            <x-form-item
                                :model-value="modelForm"
                                :schema="schema"
                                @update:model-value="handleUpdate"
                                @enter="handleEnter"
                            >
                                <template #[customSlotName(schema)]>
                                    <slot :name="customSlotName(schema)" :form="modelForm" :index="0"></slot>
                                </template>
                            </x-form-item>
                        </el-col>
                    </el-collapse-transition>
                </template>

                <el-col v-bind="actionColProps">
                    <div class="x-search-form__actions">
                        <slot name="action" :form="modelForm" :form-ref="formRef"></slot>

                        <el-button type="primary" :loading="loading" @click="handleSearch">
                            {{ searchBtnText }}
                        </el-button>
                        <el-button v-if="showRestButton" @click="handleReset"> 重置 </el-button>
                        <el-button v-if="showCollapse" circle @click="handleCollapse">
                            <el-icon>
                                <component :is="collapsed ? ArrowDownBold : ArrowUpBold"></component>
                            </el-icon>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import type { ColProps, FormProps } from 'element-plus';
import type { XFormInstance, XFormItemSchema } from './interface';
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
import XFormItem from './XFormItem.vue';

/**
 * 扩展 HTMLElement
 */
export interface FormElement extends HTMLElement {
    validate: () => Promise<boolean>;
    resetFields: () => void;
}

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** el-card-header */
        header: string;
        /** el-card-shadow */
        shadow?: 'hover' | 'never' | 'always';
        /** form 表单 */
        modelValue?: any;
        /** 表达配置 */
        schemas: XFormItemSchema[];
        /** el-form-props */
        elFormProps?: Partial<FormProps>;
        /** 查询 loading */
        loading?: boolean;
        /** 查询按钮文字 */
        searchBtnText?: string;
        /** 是否展示重置按钮 */
        showRestButton?: boolean;
    }>(),
    {
        header: '',
        shadow: 'hover',
        modelValue: undefined,
        schemas: () => [],
        elFormProps: () => ({
            labelWidth: '120px',
        }),
        loading: false,
        searchBtnText: '查询',
        showRestButton: true,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: any): void;
    (e: 'search', value: any): void;
    (e: 'reset', form: any): void;
}>();

/**
 * formItem col props
 */
function schemaColProps(colProps?: Partial<ColProps>): Partial<ColProps> {
    return {
        xs: 24,
        sm: colProps ?? 12,
        md: colProps ?? 8,
        lg: colProps ?? 6,
        xl: colProps ?? 6,
    };
}

/**
 * slot name
 */
function customSlotName(schema: XFormItemSchema): string {
    return schema.components === 'custom' ? schema.slotName : '';
}

/**
 * 渲染 ArrowDownBold 或者 ArrowUpBold
 */
const collapsed = ref(true);

/**
 * 计算 form 表单字段数量
 */
const countFormItems = computed(() => {
    const showMore = props.schemas.length > 7 ? true : false;
    const count = props.schemas.length && collapsed.value === true ? 7 : props.schemas.length;

    return {
        showMore,
        count,
    };
});

/**
 * 计算 action 占用的 span
 */
const actionColProps = computed(() => {
    return {
        xs: { span: 24 },
        sm: { span: 24 - ((countFormItems.value.count * 12) % 24) },
        md: { span: 24 - ((countFormItems.value.count * 8) % 24) },
        lg: { span: 24 - ((countFormItems.value.count * 6) % 24) },
        xl: { span: 24 - ((countFormItems.value.count * 6) % 24) },
    };
});

/**
 * 是否收缩查询表单
 */
const showMore = ref(countFormItems.value.showMore);
const showCollapse = computed(() => countFormItems.value.showMore);

/**
 * 是否渲染 formItem
 */
function showFormItem(itemIndex: number) {
    // 默认展示两行，7个搜索框
    let count = 0;

    // 第 7 个搜索框的位置
    let location = 7;

    props.schemas.forEach((item: XFormItemSchema, index: number) => {
        count = count + 1;

        if (count === 7) {
            location = index;
        }
    });

    // 超过 7 的部分
    if (itemIndex > location) {
        return true;
    }

    // 不超过 7 的部分
    return false;
}

/**
 * 改变展开/收起
 */
function handleCollapse() {
    collapsed.value = !collapsed.value;

    if (collapsed.value) {
        showMore.value = true;
    } else {
        showMore.value = false;
    }
}

/**
 * form ref
 */
const formRef = ref<XFormInstance>();

/**
 * form 表单
 */
const { modelValue: modelForm } = toRefs(props);

/**
 * 更新数据
 */
function handleUpdate() {
    emits('update:modelValue', modelForm.value);
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
 * 查询
 */
function handleSearch(): void {
    emits('search', modelForm.value);
}

/**
 * enter 事件
 */
function handleEnter(): void {
    emits('search', modelForm.value);
}

/**
 * 重置
 */
function handleReset(): void {
    modelForm.value = undefined;
    props.schemas.forEach((schema: any) => {
        if (schema.elProps && schema.elProps.labelSchema) {
            modelForm.value[schema.elProps.labelSchema] = undefined;
        }
    });

    formRef.value?.resetFields();
    emits('reset', modelForm.value);
}

/**
 * 暴露的属性与方法
 */
defineExpose({
    validate,
    resetFields,
});
</script>

<style lang="scss" scoped>
.x-search-form {
    margin-bottom: 15px;
}
.x-search-form :deep(.el-card__body) {
    padding-bottom: 0;
}

.x-search-form__actions {
    width: 100%;
    text-align: right;
    margin-bottom: 18px;
}
</style>
