import type { LLMColumn } from '@/components/LLM/interface';
import type { XFormItemSchema } from '@/components/form/interface';

/**
 * 可编辑表格列配置
 */
export const editColumns: LLMColumn[] = [
    {
        label: 'ID',
        prop: 'id',
        edit: false,
        required: false,
    },
    {
        label: 'Object',
        prop: 'object',
        edit: false,
        required: true,
    },
    {
        label: 'Type',
        prop: 'type',
        required: true,
        edit: false,
    },
    {
        label: 'OwnerBy',
        prop: 'owned_by',
        edit: false,
        required: false,
    },
    {
        label: 'Permission',
        prop: 'permission',
        edit: false,
        required: false,
    },
    {
        label: '创建时间',
        prop: 'created_at',
        edit: false,
        required: false,
    },
    {
        label: '更新时间',
        prop: 'updated_at',
        edit: false,
        required: false,
    },
];

/**
 * 表单配置
 */
export const schemasLLM: XFormItemSchema[] = [
    {
        label: 'Object',
        prop: 'object',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入Object' }],
        },
    },
    {
        label: 'Type',
        prop: 'type',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入Type' }],
        },
    },
    {
        label: 'Permission',
        prop: 'permission',
        components: 'el-input',
        colProps: { span: 80},
        elProps: {
            type: 'textarea',
            placeholder: "请输入Permission",
        },
    },
];

export const newLLMForm = ref<any>({
    object: '',
    type: '',
    permission: '',
});

export interface Form {
    id: string;
    recv: string;
    messages: string;
}
