import { get } from '@/api/index';

/**
 * @description 字典表查询
 */
export function getDictionaryListByKey(dictKey: string, dictTitle: string): Promise<any> {
    return get('/common/dropDown', {
        params: {
            dictKey,
            dictTitle,
        },
    });
}

/**
 * @description 公共下拉内容 -单个查询
 * @param type 类型
 * @param field 字段值
 */
export function getSelectListByParams(params: Record<string, any>): Promise<any> {
    return get('/common/getPullDownOne', {
        params: params,
    });
}

/**
 * @description 公共下拉内容 - 多个查询 (应用场景：一个页面中很多下拉查询）
 */
export function getAllSelectListByParams(params: Record<string, any>): Promise<any> {
    return get('/common/getPullDown', {
        params: params,
    });
}
