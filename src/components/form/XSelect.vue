<template>
    <el-select :model-value="selectedValue" v-bind="attrs" @change="handleChange" @update:model-value="updateData">
        <el-checkbox
            v-if="attrs.allChoose"
            v-model="isAllChoose"
            :indeterminate="isIndeterminate"
            :style="{
                marginLeft: '20px',
            }"
            @change="handleAllChoose"
        >
            全选
        </el-checkbox>

        <el-option v-for="(item, i) in attrs.options" :key="i" :label="item.label" :value="item.value"> </el-option>
    </el-select>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import type { XSelectMultiProp } from './interface';

/**
 * useAttrs
 * 可以将父组件中子组件标签身上的属性和属性值传递给子组件内部，且可以获取自定义事件
 */
const attrs = useAttrs() as XSelectMultiProp;

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
}>();

/**
 * 全选状态
 */
const isAllChoose = ref<boolean>(false);

/**
 * 半选状态
 */
const isIndeterminate = ref<boolean>(false);

/**
 * 选中的数据
 */
const selectedValue = ref<any>(attrs.modelValue);
const selectedAll = attrs.options.map((item: any) => item.value);

/**
 * 改变选择
 */
function handleChange(val: any) {
    selectedValue.value = val;

    isAllChoose.value = val.length === attrs.options.length;
    isIndeterminate.value = val.length > 0 && val.length < attrs.options.length;
    emits('change', selectedValue.value);
}

/**
 * 是否全选
 */
function handleAllChoose(val: any) {
    selectedValue.value = val ? selectedAll : [];
    isIndeterminate.value = false;
    emits('update:modelValue', selectedValue.value);
}

/**
 * 更新选中的数据
 */
function updateData(val: any): void {
    emits('update:modelValue', val);
}

/**
 * 监听
 */
// watchEffect(() => {
//     selectedValue.value = attrs.modelValue;
// });
</script>
