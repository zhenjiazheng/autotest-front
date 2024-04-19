<template>
    <!-- <el-card header="工具类型" shadow="hover" class="component">
        <x-select v-model="selectValue" :all-choose="true" :options="selectOptions"></x-select>
    </el-card> -->
    <el-card header="NovaChat" shadow="hover" class="component">
        <el-form ref="formRef" :model="data">
        <el-form-item label="Model" prop="模型">
            <el-input v-model="data.id"></el-input>
        </el-form-item>
        <el-form-item label="Messages" prop="Messages">
            <el-input v-model="data.messages" :autosize="{ minRows: 4, maxRows: 16 }" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit(data.messages)">对话</el-button>
        </el-form-item>
        </el-form>
    </el-card>
    <el-card shadow="hover" header="会话" class="component whole-node">
                {{data.recv}}
    </el-card>

</template>
   
<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import  type {Form} from './conf'
import RequestAPI from '@/api/llm';


const router = useRouter();

// console.log(JSON.parse(history.state.data));
const llm_data: any = history.state.chat;
/**
 * select
 */

 console.log(llm_data);



const data = ref<Form>({
    id : llm_data,
    recv : "",
    messages: ""
})


/**
 * form-ref
 */
const formRef = ref();

let loaded = false
/**
 * 提交
 */
 async function handleSubmit(content: string) {
    // console.log(selectValue.value, data)
    let params = {'model_id': data.value.id, 'messages': [{'role': "user", "content": content}]}
    const res: any = await RequestAPI.postLLmChatCompletions(params);
        
    data.value.recv = res.data.choices
    loaded = true
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