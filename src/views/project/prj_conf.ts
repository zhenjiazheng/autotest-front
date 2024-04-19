import type { ProjectEditColumn } from '@/components/Project/interface';
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
export const editColumns: ProjectEditColumn[] = [
    {
        label: '项目名称',
        prop: 'name',
        edit: false,
        required: true,
    },
    {
        label: '描述',
        prop: 'description',
        edit: true,
        required: true,
    },
    {
        label: '创建时间',
        prop: 'created_time',
        required: false,
        edit: false,
    },
    {
        label: '更新时间',
        prop: 'updated_time',
        edit: false,
        required: false,
    },
];

/**
 * 表单配置
 */
export const schemasProject: XFormItemSchema[] = [
    {
        label: '项目名称',
        prop: 'name',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入项目名称' }],
        },
    },
    {
        label: '描述',
        prop: 'description',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入项目描述' }],
        },
    },
];

export const newProjectForm = ref<any>({
    name: '',
    description: '',
});