<template>
    <el-form-item :prop="schema.prop as string" :label="schema.label" v-bind="formItemProps">
        <slot v-if="schema.components === 'custom'" :name="schema.slotName"></slot>

        <component
            :is="isComponent"
            :model-value="currentValue"
            v-bind="componentProps"
            class="form-item-element"
            @update:model-value="handleUpdate"
            @keydown.enter="handleEnter"
        ></component>
    </el-form-item>
</template>

<script setup lang="ts">
import type { XFormItemSchema, SelectOption } from './interface';
import { mergeProps, markRaw } from 'vue';
import { isNumber, isString, get, set } from 'lodash-es';
import {
    ElDivider,
    ElSwitch,
    ElButton,
    ElRadio,
    ElCheckbox,
    ElInput,
    ElInputNumber,
    ElSelectV2,
    ElDatePicker,
    ElCascader,
} from 'element-plus';
import XRadio from './XRadio.vue';
import XSelect from './XSelect.vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 表单配置子项 */
        schema: XFormItemSchema;
        /** form 表单 */
        modelValue: any;
    }>(),
    {
        schema: () => ({
            components: 'el-input',
            prop: '',
            label: '',
        }),
        modelValue: undefined,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: unknown): void;
    (e: 'enter'): void;
}>();

/**
 * markRaw
 * 可以有选择地避开默认的深度响应/只读转换，并在状态关系谱中嵌入原始的、非代理的对象；
 * 它们可能出于各种各样的原因被使用：有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象；
 */
const maps = {
    'el-divider': markRaw(ElDivider),
    'el-button': markRaw(ElButton),
    'el-switch': markRaw(ElSwitch),
    'el-radio': markRaw(ElRadio),
    'el-checkbox': markRaw(ElCheckbox),
    'el-input': markRaw(ElInput),
    'el-input-number': markRaw(ElInputNumber),
    'el-select-v2': markRaw(ElSelectV2),
    'el-date-picker': markRaw(ElDatePicker),
    'el-cascader': markRaw(ElCascader),
    'x-radio': markRaw(XRadio),
    'x-select': markRaw(XSelect),
};

/**
 * 当响应式数据为 props 时
 * toRef 复制数据时，一次可以复制 props 中的一个数据
 * toRefs 复制数据时，一次可以复制 props 中的一个或多个数据
 */
const { modelValue: modelForm } = toRefs(props);
const { schema } = toRefs(props);

/**
 * item props
 */
const formItemProps = computed(() => {
    return typeof schema.value.elFormItemProps === 'function'
        ? schema.value.elFormItemProps(props.modelValue)
        : schema.value.elFormItemProps;
});

/**
 * is component
 */
const isComponent = computed<any>(() => {
    return get(maps, schema.value.components, undefined);
});

/**
 * _.get(object, path, [defaultValue])
 * 根据 object 对象的 path 路径获取值，如果解析 value 是 undefined 会以 defaultValue 取代；
 *
 * 此处：get(modelForm, schema.value.prop, undefined)
 * 等价于：modelForm[schema.value.prop] ?? undefined
 */
const currentValue = ref<unknown>(get(modelForm, schema.value.prop, undefined));

/**
 * extra props
 * 用于解决 computed 属性不触发更新的问题
 */
const extraProps = ref({
    options: [],
});

/**
 * 查询
 */
function handleEnter(): void {
    emits('enter');
}

/**
 * 获取下拉的 label
 */
function getSelectedLabel(value: any | any[]) {
    if (componentProps.value.multiple) {
        const selectedLabels =
            value
                .map((id: any) => componentProps.value.options.find((item: SelectOption) => item.value === id))
                .map((item: SelectOption) => item.label) ?? '';
        emits('update:modelValue', set(modelForm.value, componentProps.value.labelSchema, selectedLabels.toString()));
    } else {
        const selectedLabel =
            componentProps.value.options.find((item: SelectOption) => item.value === value)?.label ?? '';
        emits('update:modelValue', set(modelForm.value, componentProps.value.labelSchema, selectedLabel));
    }
}

/**
 * 更新当前值
 */
function handleUpdate(value: string | number | null | undefined): void {
    let updateValue = value;

    // 文本字符串/数字
    if (isString(currentValue.value)) {
        updateValue = updateValue ?? '';
    } else if (isNumber(currentValue.value)) {
        if (updateValue === undefined || updateValue === null) {
            updateValue = null;
        }
    }

    // 下拉
    if (['el-select-v2', 'x-select'].includes(schema.value.components)) {
        if (componentProps.value.labelSchema) {
            getSelectedLabel(updateValue);
        }
    }

    currentValue.value = updateValue;
    emits('update:modelValue', set(modelForm.value, schema.value.prop, updateValue));
}

/**
 * 获取下拉列表
 */
async function getResource(): Promise<boolean> {
    if (
        schema.value.components !== 'el-select-v2' &&
        schema.value.components !== 'el-cascader' &&
        schema.value.components !== 'x-select'
    ) {
        return false;
    }

    if (!schema.value.api) {
        return false;
    }

    const res = await schema.value.api(props.modelValue);

    // 更新下拉列表
    extraProps.value = {
        options: res,
    };

    // 通过 label 回显
    const label = props.modelValue[schema.value.elProps?.labelSchema];

    if (!label) {
        return true;
    }

    const item = componentProps.value.options.find((item: SelectOption) => item.label === label);

    if (!item) {
        return true;
    }

    handleUpdate(item.value);
    return true;
}

/**
 * component props
 */
const componentProps = computed<any>(() => {
    const defaultProps = {
        placeholder: schema.value.label,
        clearable: true,
    };

    if (schema.value.components === 'custom') {
        return undefined;
    }

    if (['el-select-v2', 'x-select', 'el-cascader'].includes(schema.value.components)) {
        Object.assign(defaultProps, {
            onVisibleChange: async (val: boolean): Promise<void> => {
                if (!val) {
                    return;
                }

                await getResource();
            },
            filterable: true,
            options: [],
        });
    }

    // merge props
    if (typeof schema.value.elProps === 'function') {
        // props.modelValue => form 表单
        const sec = schema.value.elProps(props.modelValue);
        return mergeProps(defaultProps, extraProps.value, sec);
    } else {
        return mergeProps(defaultProps, extraProps.value, schema.value.elProps);
    }
});

/**
 * 监听外部数据变化
 */
watchEffect(() => {
    currentValue.value = get(modelForm.value, schema.value.prop, undefined);
});

/**
 * 页面渲染
 */
onMounted(() => {
    getResource();
});
</script>

<style lang="scss">
.form-item-element {
    width: 100%;
}
</style>
