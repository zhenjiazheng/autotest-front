<template>
    <div :style="{ height: height, width: width }">
        <el-auto-resizer>
            <template #default="{ height: autoHeight, width: autoWidth }">
                <el-card :shadow="shadow" :header="header" :body-style="bodyStyle">
                    <!-- 顶部区域 -->
                    <div class="table__header">
                        <div class="table__header__title">
                            <slot name="title">
                                <span>{{ title }}</span>

                                <el-tooltip v-if="tooltipContent" :content="tooltipContent" placement="top">
                                    <el-icon class="icon">
                                        <info-filled />
                                    </el-icon>
                                </el-tooltip>
                            </slot>
                        </div>

                        <el-scrollbar>
                            <div class="table__header__operation">
                                <slot name="operation"></slot>
                            </div>
                        </el-scrollbar>
                    </div>

                    <!-- 表格主体 -->
                    <el-form ref="formRef" :model="taskTableData" class="table__main'">
                        <el-table 

                            :width="autoWidth"
                            :height="autoHeight"
                            :row-height="rowHeight"
                            :header-height="headerHeight"
                            :columns="tableColumns"
                            :data="taskTableData"
                            v-bind="$attrs" border size="small" :row-key="rowKey">
                            <!-- loading -->
                            <template v-if="loading" #overlay>
                                <div class="el-loading-mask table__main__loading">
                                    <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                                        <loading-icon />
                                    </el-icon>
                                </div>
                            </template>

                            <!-- empty -->
                            <template v-if="!taskTableData.length" #empty>
                                <el-empty :description="emptyText" />
                            </template>
                            <!-- 索引列 -->
                            <el-table-column v-if="showIndex" type="index" align="center" width="50px" label="序号" />

                            <!-- slot -->
                            <slot> </slot>
                        </el-table>
                    </el-form>

                    <!-- 底部区域 -->
                    <div v-if="taskTableData.length" class="table__bottom">
                        <div v-if="pagination.limit !== -1" class="table__bottom__pagination">
                            <el-pagination
                                v-model:current-page="pagination.page"
                                v-model:page-size="pagination.limit"
                                :page-sizes="[10, 20, 50, 100]"
                                :total="pagination.total"
                                :background="true"
                                layout=" ->, slot,total, sizes, prev, pager, next, jumper"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                            >
                                <template #default> </template>
                            </el-pagination>
                        </div>

                        <div v-else class="table__bottom__total">共 {{ taskTableData.length }} 条</div>
                    </div>
                </el-card>
            </template>
        </el-auto-resizer>
    </div>
</template>

<script lang="ts" setup>
import type { TaskActions, FormModel, FormModelItem} from './interface';
import type { EditColumn, Pagination, Prop } from '../interface';
import { InfoFilled } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import { message } from '@/utils/message'
import RequestAPI from '@/api/task';

/**
 * 定义组件选项
 */
 defineOptions({
    name: 'Task',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<Prop>(),
    {
        width: '100%',
        height: '700px',
        header: '',
        shadow: 'hover',
        bodyStyle: () => {
            return {
                padding: '15px',
            };
        },
        title: '',
        tooltipContent: '',
        showIndex: false,
        // selectable: false,
        rowKey: 'id',
        rowHeight: 45,
        headerHeight: 45,
        loading: false,
        emptyText: '暂无数据',
        api: undefined,
        apiParams: () => ({}),
        apiKeyMap: () => ({
            queryCurrentPageKey: 'page',
            queryPageSizeKey: 'limit',
            returnCurrentPageKey: 'current',
            returnTotalKey: 'total',
            returnPagesKey: 'pages',
            returnRecordKey: 'data',
        }),
        columns: () => [],
        data: () => [],
        dividePage: true,
        paginationProp: () => ({
            pageSize: 10,
        }),
        // headerClass: null,
        // rowClass: null,
        lazy: true,
        scroll: false,
    },
);



const router = useRouter();


/**
 * 查询条件
 */
const searchData = ref<Record<string, string | number>>({});
/**
 * 表单
 */
const formRef = ref();
const taskFormModel = ref<FormModel>({model: [],});

/**
 * 表格数据
 */
const taskTableData = computed(() => taskFormModel.value.model.map(({ data }) => data));

    /**
 * 结果数据
 */
const resultData = computed(() =>
taskFormModel.value.model.reduce((result: Record<string, unknown>[], modelItem: FormModelItem) => {

        result.push({
            ...modelItem.data,
        });

        return result;
    }, []),
);

/**
 * 处理数据结构进行渲染
 */
const convertFormModel = (data: Record<string, unknown>[]): FormModelItem[] =>
data.map(
    (row: Record<string, unknown>): FormModelItem => ({
        data: { ...row },
        formData: { ...row },
        isEditing: false,
    }),
);

/**
 * 分页设置
 */
const pagination = ref<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
});
/**
 * @description 初始化表格数据
 * @param query 查询条件
 */
async function loadData(query: Record<string, string | number> = {}): Promise<void> {
    // 保存请求的查询条件，分页时切换页码时作为入参
    searchData.value = query;
    let model = []
    // 更新每页渲染数量
    // pagination.value.pageSize = query.value.pageSize ?? 10;
    // 1.动态赋值，分页接口
    if (props.dividePage) {
        const params = {
            ...props.apiParams,
            ...query,
            [props.apiKeyMap?.queryCurrentPageKey ?? 'page']: pagination.value.page,
            [props.apiKeyMap?.queryPageSizeKey ?? 'limit']: pagination.value.limit,
        };
        // console.log(params)

        const res: any = await RequestAPI.getTaskList(params);
        // console.log(res)
        if (!res) {
            return;
        }
        // model = res.data ?? [];
        // tableData.value = res.data;
        // console.log(tableData.value)
        pagination.value.page = res[props.apiKeyMap?.returnCurrentPageKey ?? 'page'];
        pagination.value.limit = res[props.apiKeyMap?.returnCurrentSizeKey ?? 'limit'];
        pagination.value.total = res[props.apiKeyMap?.returnTotalKey ?? 'total'];
        taskFormModel.value.model = convertFormModel(res.data)
    }
    // 2.动态赋值，非分页接口，不渲染分页
    if (!props.dividePage) {
        pagination.value.limit = -1;

        const params = {
            ...props.apiParams,
            ...query,
        };

        const res: any = await RequestAPI.getTaskList(params);

        if (!res) {
            return;
        }

        // model = res.data ?? [];
        // tableData.value = res.data;
        taskFormModel.value.model = convertFormModel(res.data)
    } 
}

/**
 * 改变每页数量
 */
async function handleSizeChange() {
    await loadData(pagination.value);
}

/**
 * 改变页码
 */
async function handleCurrentChange() {
    await loadData(pagination.value);
}

/**
 * 静态赋值时更新 tableData
 */
watch(
    () => props.data,
    newValue => {
        if (Array.isArray(newValue)) {
            loadData({});
        }
    },
    {
        deep: true,
    },
    
);


/**
 * 表格列配置
 */
const tableColumns = computed(() => {
    // 设置每列默认宽度与默认对齐方式
    const columns: EditColumn[] = cloneDeep(props.columns).map(item => {
        return {
            ...item,
            width: 150,
            align: 'center',
        };
    });


    return columns;
});

/**
 * 运行任务
 * @param row 行数据
 */
const runRow = (index: number) => {
    RequestAPI.runTask(taskFormModel.value.model[index].data);
};

// /**
//  * 删除行
//  * @param index 行索引
//  */
// const deleteRow = (index: number) => {
//     const data = tableData.value[index]
    
//     ElMessageBox.confirm(
//         data ? `确认删除后${data.name} 后无法恢复`: "", "提示",
//         {type: "warning"}
//         )
//     .then(() => {
//         RequestAPI.deleteProject(data)
//         message("删除成功", { type: "success" });
//         formModel.value.model.splice(index, 1);
//     })
//     .catch(() => {});
//     // loadData()
//     // router.push({ path: '/project/list' });
// };

/**
 * 编辑行
 * @param index 行索引
 */
const startEdit = (index: number) => {
    taskFormModel.value.model[index].isEditing = true;
};

/**
 * 取消编辑
 * @param index 行索引
 */
const cancelEdit = (index: number) => {
    formRef.value.resetFields();

    // 重置表格结构与行数据
    taskFormModel.value.model[index].formData = {
        ...taskFormModel.value.model[index].data,
    };
    taskFormModel.value.model[index].isEditing = false
};

/**
 * 保存编辑
 * @param index 行索引
 */
const saveEdit = async (index: number) => {
    // 循环表单验证
    let formValid = false;
    await formRef.value.validate((valid: boolean) => {
        formValid = valid;
    });
    // 更新表格行数据
    taskFormModel.value.model[index].data = {
        ...taskFormModel.value.model[index].formData,
    };
    taskFormModel.value.model[index].isEditing = false;
    // formModel.value.model[index].isNew = false;
    RequestAPI.editTask(taskFormModel.value.model[index].data)
    taskTableData.value[index] = taskFormModel.value.model[index].data
};


/**
 * 编辑事件
 */
const taskActions: TaskActions = {
    runRow,
    startEdit,
    cancelEdit,
    saveEdit,
};

/**
 * 页面挂载
 */
onMounted(() => {
    loadData({});
});

// /**
//  * 页面卸载
//  */
// onUnmounted(() => {
//     // 清除轮询
//     clearInterval(timer);
// });

// /**
//  * 监听
//  */
// watchEffect(() => {
//     loadData();
// });

/**
 * 提供
 */
// console.log(taskTableData)
provide<Ref<FormModel>>('taskFormModel', taskFormModel);
provide<TaskActions>('taskActions', taskActions);
provide<Ref<any[]>>('tasktabelData', taskTableData);

/**
 * 暴露的属性与方法
 */
defineExpose({
    resultData,
    taskActions,
});
</script>

<style lang="scss" scoped>
.table {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 10px 10px 10px;

        &__title {
            justify-content: left;

            span {
                font-size: 17px;
                font-weight: bold;
            }

            .icon {
                margin-left: 10px;
                transform: translateY(0.1em);
            }
        }

        &__operation {
            display: flex;
            align-items: center;
        }
    }
    &__main {
        &__loading {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    &__bottom {
        &__pagination {
            padding-top: 10px;
        }

        &__total {
            padding-top: 10px;
            display: flex;
            justify-content: flex-end;
            text-align: right;
            font-size: 14px;
        }
    }
}
</style>
