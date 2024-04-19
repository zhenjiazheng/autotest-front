import type { XFormItemSchema } from '@/components/form/interface';
import {ReqMethodsOption} from '@/constant/base'

/**
 * form 表单类型
 */
export interface Form {
    method: any,
    url: string;
    headers: string;
    params: string;
    files: string;
    cert: string;
    resp_data: string;
}   

export const schemas: XFormItemSchema[] = [
    {
            label: 'Method',
            prop: 'method',
            components: 'el-select-v2',
            // colProps,
            elProps: (form: Record<string, string | number | boolean>) => ({
                labelSchema: 'Method',
                options: ReqMethodsOption,
                placeholder: "请求方式",
            }),
            elFormItemProps: {
                rules: [
                    {
                        required: true,
                        message: '下拉不能为空',
                    },
                ],
            },
        },
        {
            label: 'Url',
            prop: 'url',
            components: 'el-input',
            elFormItemProps: {
                rules: [
                    {
                        required: true,
                        message: '文本不能为空',
                    },
                ],
            },
            elProps: {
                placeholder: "请求地址",
            },
        },
        {
            label: 'Headers',
            prop: 'headers',
            components: 'el-input',
            elProps: {
                type: 'textarea',
                placeholder: "请求头",
            },
        },
    ];