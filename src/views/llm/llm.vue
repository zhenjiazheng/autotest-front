<template>
    <div>
        <LLM
            ref="llmRef"
            header=""
            row-key="id"
            show-index
            height="300px"
            :columns="editColumns"
            class="component"
        >
            <template #operation>
                <el-button type="success" @click="addDialog()">新增</el-button>
                <x-dialog-form
                    ref="llmRef"
                    v-model="visible"
                    v-model:data="newLLMForm"
                    title="新建模型"
                    width="30%"
                    :schemas="schemasLLM"
                    @submit="addLLM"
                ></x-dialog-form>
            </template>

            <template #default>
                <LLMItem v-for="(item, index) in editColumns" :key="index" v-bind="item">
                    <template #edit="{ row }"></template>
                </LLMItem>
                <LLMItem label="操作" :required="false" fixed="right" width="240">
                    <template #edit="{ actions, index }">
                        <el-button  type="primary" @click="actions.viewDetail(index)">详情</el-button>
                        <el-button  type="primary" @click="actions.finetune(index)">微调</el-button>
                        <el-button  type="primary" @click="actions.chat(index)">对话</el-button>
                    </template>
                </LLMItem>
            </template>
        </LLM>
    </div>
</template>

<script setup lang="ts">
import { editColumns, schemasLLM, newLLMForm } from './conf';
import RequestAPI from '@/api/llm';
import { OPERATION_NOTICE } from '@/constant/base';
/**
 * table ref
 */
const llmRef = ref();

const router = useRouter();

const visible = ref<boolean>(false);

/**
 * 打开弹窗
 */
function addDialog() {
    // formReg.value.account = '';
    visible.value = true;
}

/**
 * 新建项目
 */
async function addLLM(): Promise<void> {

    const res = await RequestAPI.getLLmModelsList(newLLMForm.value);
    if (!res) {
        ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
        // loading.value = false;
        return;
    }

    ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
    // loading.value = false;
    visible.value = false;
    // 重定向
    router.push({ path: '/llm/model/list' });

}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>