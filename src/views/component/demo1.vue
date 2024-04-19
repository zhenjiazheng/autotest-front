<template>
    <div>
        <el-card header="x-radio" shadow="hover" class="component">
            <x-radio v-model="radioValue" :options="radioOptions"></x-radio>
        </el-card>

        <el-card header="x-checkbox" shadow="hover" class="component">
            <x-checkbox v-model="checkboxValue" :all-choose="true" :options="checkboxOptions"></x-checkbox>
        </el-card>

        <el-card header="x-select" shadow="hover" class="component">
            <x-select v-model="selectValue" :all-choose="true" :options="selectOptions"></x-select>
        </el-card>

        <el-card shadow="hover" class="component">
            <el-button @click="handleDefault"> DEFAULT </el-button>
            <el-button @click="handleRest"> REST </el-button>
            <el-button type="primary" @click="handleTest"> TEST </el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { RadioValueType, SelectValueType } from '@/components/Form/interface';

/**
 * radio
 */
const radioValue = ref<RadioValueType>();
const radioOptions = [
    {
        labelName: '北京',
        label: 'bj',
    },
    {
        labelName: '上海',
        label: 'sh',
    },
    {
        labelName: '南京',
        label: 'nj',
    },
];

/**
 * checkbox
 */
const checkboxValue = ref<any>();
const checkboxOptions = [
    {
        labelName: '北京',
        label: 'bj',
    },
    {
        labelName: '上海',
        label: 'sh',
    },
    {
        labelName: '南京',
        label: 'nj',
    },
];

/**
 * select
 */
const selectValue = ref<SelectValueType>();
const selectOptions = [
    {
        label: '北京',
        value: 'bj',
    },
    {
        label: '上海',
        value: 'sh',
    },
    {
        label: '南京',
        value: 'nj',
    },
];

/**
 * 默认值
 */
function handleDefault() {
    radioValue.value = 'sh';
    checkboxValue.value = ['sh', 'nj'];
    selectValue.value = 'sh';
}

/**
 * 清空
 */
function handleRest() {
    radioValue.value = '';
    checkboxValue.value = [];
    selectValue.value = '';
}

/**
 * 测试
 */
function handleTest() {
    console.log('radio: ', radioValue.value);
    console.log('checkbox: ', checkboxValue.value);
    console.log('select', selectValue.value);
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
