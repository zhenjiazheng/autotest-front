<template>
    <div>
        <Project
            ref="projectRef"
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
                    ref="projectRef"
                    v-model="visible"
                    v-model:data="newProjectForm"
                    title="新建项目"
                    width="30%"
                    :schemas="schemasProject"
                    @submit="addProject"
                ></x-dialog-form>
                <!-- <el-button type="primary" @click="editTableSubmit">提交</el-button> -->
                <!-- <el-button type="warning" @click="handleExport">导出</el-button> -->
            </template>

            <template #default>
                <ProjectItem v-for="(item, index) in editColumns" :key="index" v-bind="item">
                    <template #edit="{ row }">
                        <el-input v-model="row[item.prop]" placeholder="请输入"></el-input>
                    </template>
                </ProjectItem>
                <ProjectItem label="操作" :required="false" fixed="right" width="160">
                    <template #default="{ actions, index }">
                        <el-button text type="primary" @click="actions.startEdit(index)">编辑</el-button>
                        <el-button text type="primary" @click="actions.deleteRow(index)">删除</el-button>
                    </template>
                    <template #edit="{ actions, index }">
                        <el-button text type="primary" @click="actions.saveEdit(index)">保存</el-button>
                        <el-button text type="primary" @click="actions.cancelEdit(index)">取消</el-button>
                        <!-- <el-button text type="primary" @click="actions.deleteRow(index)">删除</el-button> -->
                    </template>
                </ProjectItem>
            </template>
        </Project>
    </div>
</template>

<script setup lang="ts">
// import useExcelJs from '@/utils/use-exceljs';
// import { getPermissionAction } from '@/utils/permission-action';
// import type { XFormInstance} from '@/components/form/interface';
import { editColumns, schemasProject, newProjectForm } from './prj_conf';
import RequestAPI from '@/api/project';
import { OPERATION_NOTICE } from '@/constant/base';
/**
 * table ref
 */
const projectRef = ref();

// /**
//  * form ref
//  */
// const formRef = ref();

// // const data = inject<Record<string, any>[]>('tableData');
// /**
//  * 注入
//  */
// const data = inject('tableData');
// console.log(data)

const router = useRouter();

// /**
//  * use-exceljs
//  */
// const { exportExcelByList } = useExcelJs(columns, data);
// /**
//  * 导出
//  */
// function handleExport() {
//     exportExcelByList();
// }

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
async function addProject(): Promise<void> {

    const res = await RequestAPI.createProject(newProjectForm.value);
    if (!res) {
        ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
        // loading.value = false;
        return;
    }

    ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
    // loading.value = false;
    visible.value = false;
    // 重定向
    router.push({ path: '/project/list' });
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