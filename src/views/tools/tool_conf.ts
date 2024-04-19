import type { ToolColumn } from '@/components/Tool/interface';

export interface Form {
    params: string;
    recv: string;
}

/**
 * 可编辑表格列配置
 */
export const editColumns: ToolColumn[] = [
    {
        label: '工具类型',
        prop: 'type',
        edit:false,
        required: true,
        width: "100",
    },
    {
        label: '参数',
        prop: 'params',
        edit:false,
        required: true,
        width: "900"
    },
    {
        label: '创建时间',
        prop: 'created_time',
        edit:false,
        required: false,
        width: "150"
    },
    {
        label: '更新时间',
        prop: 'updated_time',
        edit:false,
        required: false,
        width: "150"
    },
];

// /**
//  * 表单配置
//  */
// export const schemasTool: XFormItemSchema[] = [
//     {
//         label: '类型',
//         prop: 'type',
//         components: 'el-select-v2',
//         colProps: { span: 17 },
//         elProps: {
//             options: [
//                 { label: '硬件监控', value: '1' },
//                 { label: 'IEC104', value: '2' },
//                 { label: 'B协议', value: '3' },
//             ],
//         },
//     },
//     {
//         label: '参数',
//         prop: 'params',
//         components: 'el-input',
//         colProps: { span: 80},
//         elProps: {
//             type: 'textarea',
//             placeholder: "请输入执行参数",
//         },
//         elFormItemProps: {
//             rules: [{ required: false, message: '请输入执行参数' }],
//         },
//     },
// ];


export const newToolForm = ref<any>({
    type: '',
    params: '',
});