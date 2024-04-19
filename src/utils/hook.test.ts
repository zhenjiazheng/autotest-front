import { describe, it } from 'vitest';
import { checkNumberFormat, keepDecimalPrecision, transformEnumToOptions, handleToHumpFormat } from './hooks';

enum STATUS {
    '在用' = 1,
    '停用' = 2,
}

const statusList = [
    {
        label: '在用',
        value: 1,
    },
    {
        label: '停用',
        value: 2,
    },
];

/**
 * concurrent 并发运行
 * 还可以将 .skip、.only 以及 .todo 用于并发测试套件和测试用例
 */
describe('hooks', () => {
    /**
     * checkNumberFormat
     */
    it.concurrent('是否为数字格式', async ({ expect }) => {
        expect(JSON.stringify(checkNumberFormat('3.1415'))).toBe(JSON.stringify(3.1415));
        expect(JSON.stringify(checkNumberFormat('3.14.15'))).toBe(JSON.stringify(null));
    });

    /**
     * keepDecimalPrecision
     */
    it.concurrent('强制保留精度', async ({ expect }) => {
        expect(JSON.stringify(keepDecimalPrecision(1, 5))).toBe(JSON.stringify('1.00000'));
        expect(JSON.stringify(keepDecimalPrecision(3.1415, 5))).toBe(JSON.stringify('3.14150'));
    });

    /**
     * transformEnumToOptions
     */
    it.concurrent('枚举转下拉列表', async ({ expect }) => {
        expect(JSON.stringify(transformEnumToOptions(STATUS))).toBe(JSON.stringify(statusList));
    });

    /**
     * handleToHumpFormat
     */
    it.concurrent('"-"字符串拼接转驼峰', async ({ expect }) => {
        expect(handleToHumpFormat('x-table', 'min')).toBe('xTable');
        expect(handleToHumpFormat('x-table', 'max')).toBe('XTable');
    });
});
