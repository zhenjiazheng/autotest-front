import { type FormProps, type ColProps } from 'element-plus';
import type { XFormItemSchema } from '@/components/form/interface';
import dayjs from 'dayjs';

/**
 * search-form 表单类型
 */
export interface SearchForm {
    text: string;
    number: number;
    select: string | number;
    daterange: string[];
}

/**
 * form 表单类型
 */
export interface Form {
    text: string;
    number: number | undefined;
    radio: string | number | undefined;
    select: string | number;
    selectLabel: string;
    switch: boolean;
    date: string;
    datetime: string;
}

/**
 * form props
 */
export const elFromProps: Partial<FormProps> = {
    labelWidth: '100px',
};

/**
 * 查询表单配置
 */
const searchProps: Partial<ColProps> = {
    span: 6,
};
export const searchSchemas: XFormItemSchema[] = [
    {
        label: '日期范围',
        prop: 'daterange',
        components: 'el-date-picker',
        colProps: {
            span: 12,
        },
        elProps: {
            type: 'daterange',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
        },
    },
    {
        label: '文本',
        prop: 'text',
        components: 'el-input',
        colProps: searchProps,
    },
    {
        label: '数字',
        prop: 'number',
        components: 'el-input-number',
        colProps: searchProps,
        elProps: {
            controlsPosition: 'right',
        },
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        colProps: searchProps,
        elProps: {
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
        },
    },
];

/**
 * 表单配置
 */
const colProps: Partial<ColProps> = {
    span: 12,
};
export const schemas: XFormItemSchema[] = [
    {
        label: '文本',
        prop: 'text',
        components: 'el-input',
        colProps,
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '文本不能为空',
                },
            ],
        },
    },
    {
        label: '数字',
        prop: 'number',
        components: 'el-input-number',
        colProps,
        elProps: {
            controlsPosition: 'right',
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '数字不能为空',
                },
            ],
        },
    },
    {
        label: '单选',
        prop: 'radio',
        components: 'x-radio',
        colProps,
        elProps: {
            options: [
                { labelName: '是', label: 1 },
                { labelName: '否', label: 2 },
            ],
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '单选不能为空',
                },
            ],
        },
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        colProps,
        elProps: (form: Record<string, string | number | boolean>) => ({
            labelSchema: 'selectLabel',
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
            onChange: (value: string | number) => {
                if (value === 'value1') {
                    form.switch = true;
                } else {
                    form.switch = false;
                }
            },
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
        label: '日期',
        prop: 'date',
        components: 'el-date-picker',
        colProps,
        elProps: (form: Record<string, string | number | boolean>) => ({
            type: 'date',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
            onChange: (value: string) => {
                form.datetime = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
            },
        }),
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '日期不能为空',
                },
            ],
        },
    },
    {
        label: '日期时间',
        prop: 'datetime',
        components: 'el-date-picker',
        colProps,
        elProps: {
            type: 'datetime',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '日期时间不能为空',
                },
            ],
        },
    },
    {
        label: '开关',
        prop: 'switch',
        components: 'el-switch',
        colProps,
    },
];
