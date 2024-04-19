<template>
    <div>
        <Task
            ref="taskRef"
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
                    ref="taskRef"
                    v-model="visible"
                    v-model:data="newTaskForm"
                    title="新建任务"
                    width="30%"
                    :schemas="schemasTask"
                    @submit="addTask"
                ></x-dialog-form>
            </template>
            <template #default>
                <TaskItem v-for="(item, index) in editColumns" :key="index" v-bind="item">
                    <template #edit="{ row }">
                        <el-input v-model="row[item.prop]" placeholder="请输入"></el-input>
                    </template>
                </TaskItem>
                <TaskItem label="操作" :required="false" fixed="right" width="160">
                    <template #default="{ actions, index }">
                        <el-button type="primary" @click="actions.startEdit(index)">编辑</el-button>
                        <el-button type="primary" @click="actions.runRow(index)">运行</el-button>
                    </template>
                    <template #edit="{ actions, index }">
                        <el-button type="primary" @click="actions.saveEdit(index)">保存</el-button>
                        <el-button type="primary" @click="actions.cancelEdit(index)">取消</el-button>
                        <!-- <el-button text type="primary" @click="actions.deleteRow(index)">删除</el-button> -->
                    </template>
                </TaskItem>
            </template>
        </Task>
    </div>
</template>

<script setup lang="ts">
// import useExcelJs from '@/utils/use-exceljs';
// import { getPermissionAction } from '@/utils/permission-action';
// import type { XFormInstance} from '@/components/form/interface';
import { editColumns, schemasTask, newTaskForm} from './conf';
/**
 * table ref
 */
const taskRef = ref();

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
async function addTask(): Promise<void> {

    const res = await RequestAPI.run(newTaskForm.value);
    if (!res) {
        ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
        // loading.value = false;
        return;
    }

    ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
    // loading.value = false;
    visible.value = false;
    // 重定向
    router.push({ path: '/task/list' });
    // const redirectPath = router.currentRoute.value.query.redirect;
    // if (redirectPath) {
    //     router.push({ path: redirectPath as string });
    // } else {
    //     router.push({ path: '/project/list' });
    // }

}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>