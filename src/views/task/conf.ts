import type { TaskEditColumn } from '@/component/Task/interface';
import type { XFormItemSchema } from '@/components/form/interface';


// /**
//  * 表格列配置
//  */
// export const columns: ProjectEditColumn[] = [
//     {
//         label: '项目名称',
//         prop: 'name',
//     },
//     {
//         label: '描述',
//         prop: 'description',
//     },
//     {
//         label: '创建时间',
//         prop: 'created_time',
//     },
//     {
//         label: '更新时间',
//         prop: 'updated_time',
//     },
//     ];

/**
 * 可编辑表格列配置
 */
export const editColumns: TaskEditColumn[] = [
    // {
    //     label: '项目名称',
    //     prop: 'name',
    //     edit: false,
    //     required: true,
    // },
    // {
    //     label: '序列',
    //     prop: 'pipeline_id',
    //     edit: true,
    //     required: true,
    // },
    {
        label: '镜像',
        prop: 'image',
        edit: true,
        required: true,
    },
    {
        label: '变量',
        prop: 'env',
        edit: true,
        required: false,
    },
    {
        label: 'Mark',
        prop: 'mark',
        edit: true,
        required: false,
    },
    {
        label: '挂载卷',
        prop: 'vol',
        edit: true,
        required: false,
    },

    // {
    //     label: '结果',
    //     prop: 'result',
    //     edit: true,
    //     required: true,
    // },
    // {
    //     label: '报告',
    //     prop: 'report',
    //     edit: true,
    //     required: true,
    // },
    {
        label: '命令',
        prop: 'command',
        edit: true,
        required: false,
    },
    // {
    //     label: '状态',
    //     prop: 'status',
    //     edit: true,
    //     required: true,
    // },
    // {
    //     label: '创建时间',
    //     prop: 'created_time',
    //     required: false,
    //     edit: false,
    // },
    // {
    //     label: '更新时间',
    //     prop: 'updated_time',
    //     edit: false,
    //     required: false,
    // },
];

/**
 * 表单配置
 */
export const schemasTask: XFormItemSchema[] = [
    // {
    //     label: '项目',
    //     prop: 'name',
    //     components: 'el-input',
    //     colProps: { span: 24 },
    //     elFormItemProps: {
    //         rules: [{ required: false, message: '请输入项目名称' }],
    //     },
    // },
    {
        label: '镜像',
        prop: 'image',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入镜像' }],
        },
    },
    {
        label: '变量',
        prop: 'env',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            // rules: [{ required: false, message: '请输入变量' }],
        },
    },
    {
        label: 'Mark',
        prop: 'mark',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            // rules: [{ required: false, message: '请输入Mark' }],
        },
    },
    {
        label: '挂载卷',
        prop: 'vol',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            // rules: [{ required: false, message: '请输入挂载卷' }],
        },
    },
    {
        label: '命令',
        prop: 'command',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            // rules: [{ required: false, message: '请输入命令' }],
        },
    },
];

export const newTaskForm = ref<any>({
    // project_id: '',
    image: '',
    env: '',
    mark: '',
    vol: '',
    command: '',
});