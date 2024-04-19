<template>
    <!-- <el-card header="工具类型" shadow="hover" class="component">
        <x-select v-model="selectValue" :all-choose="true" :options="selectOptions"></x-select>
    </el-card> -->
    <el-card header="调用工具" shadow="hover" class="component">
        <el-form-item label="工具" prop="type">
            <x-select placeholder="请选择" v-model="selectValue" :all-choose="true" :options="selectOptions"></x-select>
        </el-form-item>
        <el-form ref="formRef" :model="data">
        <el-form-item label="参数" prop="params">
            <el-input v-model="data.params" :autosize="{ minRows: 4, maxRows: 16 }" type="textarea" :rules="rules"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">运行</el-button>
            <el-button type="primary" @click="handleDefault"> 默认 </el-button>
        </el-form-item>
        </el-form>
    </el-card>
    <!-- <el-button type="primary" @click="handleSubmit">运行</el-button>
    <el-button type="primary" @click="handleDefault"> 默认 </el-button> -->
    <el-card shadow="hover" header="请求响应数据" class="component whole-node">
        <el-descriptions v-model="data.recv">
            <el-descriptions-item labelStyle="width: 150px" contentStyle="width: 250px" v-for="(item, index) in data.recv">
                <template slot="label"><i class="el-icon-user"></i>{{item}}</template>
                {{data.recv[index]}}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>

</template>
   
<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElDescriptions } from 'element-plus';
import RequestAPI from '@/api/tool';
import type { SelectValueType } from '@/components/form/interface';
import type { Form } from './tool_conf';
import {ToolOptions} from '@/constant/base';


const router = useRouter();

// console.log(JSON.parse(history.state.data));
const trans_data: any = history.state.data? JSON.parse(history.state.data): "";
/**
 * select
 */
const selectValue = ref<SelectValueType>();

selectValue.value = trans_data ? trans_data.type: 2;

const selectOptions = ToolOptions;

/**
 * 默认值
 */
function handleDefault() {
    selectValue.value = 2;
    data.value.params = "";
    data.value.recv = "";
}

// console.log(trans_data.params)
const data = ref<Form>({
    params : trans_data ? JSON.stringify(trans_data.params): "",
    recv : "",
})

   
const rules = ref({
    params: [
    { required: true, message: 'params is required', trigger: 'blur' },
    // { min: 3, max: 16, message: 'Length should be between 3 and 16', trigger: 'blur' }
]
})

/**
 * form-ref
 */
const formRef = ref();

let loaded = false
/**
 * 提交
 */
 async function handleSubmit() {
    // console.log(selectValue.value, data)
    if (selectValue.value == 1){
        const res: any = await RequestAPI.runHwMonitorTask(data.value.params);
        
        data.value.recv = res.data
        loaded = true
    } else if (selectValue.value == 2){
        const res: any = await RequestAPI.runIEC104Task(data.value.params);
        data.value.recv = res.data
        loaded = true
    } else if (selectValue.value == 3){
        const res: any = await RequestAPI.runBProtocolTestTask(data.value.params);
        // console.log(res)
        data.value.recv = res.data
        loaded = true
        // console.log(loaded)
        // console.log(data)
    } else {
        console.log(selectValue.value);
    }
} 



// /**
//  * 静态赋值时更新 tableData
//  */
//  watch(() => run_start, async (run_start) => {
//       if (run_start) {
//         handleSubmit();
//       }
//     });

</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}</style>