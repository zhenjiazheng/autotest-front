<template>
    <div>

        <el-card header="APITest" shadow="hover" class="component">
            <x-form ref="formRef" v-model="ReqRef" :schemas="schemas"> </x-form>
            <!-- <x-select v-model="selectMethodValue" :all-choose="true" :options="ReqMethodsOption"></x-select> -->
            <!-- <el-input v-model="ReqRef.headers"></el-input> -->
            <!-- <el-divider></el-divider> -->
            <!-- <el-form-item label="URL" prop="url"></el-form-item> -->
            <!-- <el-input v-model="ReqRef.url"></el-input> -->
            <!-- </el-form-item> -->
            <el-divider></el-divider>
            <el-form-item label="参数" prop="params">
            <el-input v-model="ReqRef.params" :autosize="{ minRows: 4, maxRows: 16 }" type="textarea"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleTest"> TEST </el-button>
        </el-card>

        <el-card shadow="hover" header="响应" class="component whole-node">
            <!-- <el-descriptions v-model="ReqRef"> -->
                {{ReqRef.resp_data}}
            <!-- </el-descriptions> -->
        </el-card>
    </div>
</template>

<script setup lang="ts">
// import type { SelectValueType, XFormItemSchema } from '@/components/form/interface';
// import { type FormProps, type ColProps } from 'element-plus';
// import {ReqMethodsOption} from '@/constant/base'
import { schemas } from './req'
import RequestAPI from '@/api/tool';


const formRef = ref();

/**
 * form 表单类型
 */
 interface Form {
    method: any;
    url: string;
    headers: string;
    params: string;
    file: string;
    cert: string;
    resp_data: string;
}   




const ReqRef = ref<Form>({
    method: "",
    url: "",
    headers: "",
    params: "",
    file: "",
    cert: "",
    resp_data : ""
});



/**
 * select
 */
// const selectMethodValue = ref<SelectValueType>();
// /**
//  * 默认值
//  */
// function handleDefault() {
//     selectMethodValue.value = 1;
// }

// /**
//  * 清空
//  */
// function handleRest() {
//     selectMethodValue.value = 1;
// }

let loaded = false

/**
 * 测试
 */
 async function handleTest() {
    // ReqRef.value.method = selectMethodValue.value;
    console.log(ReqRef.value)
    const res: any = await RequestAPI.runApiTest(ReqRef.value);
    // console.log(res);
    loaded =true;
    ReqRef.value.resp_data = res.data;
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
./req