import { ElImage, ElLink, ElPopover } from 'element-plus';
import { h, type VNode } from 'vue';
import { isString } from 'lodash-es';

/**
 * 表格图片渲染函数 - 单张
 */
export function tableImageFormatter(
    row: Record<string, string>,
    column: Record<string, string>,
    cellValue: string,
): VNode | string {
    if (!cellValue) {
        return '暂无图片';
    }

    return h(
        ElImage,
        {
            src: cellValue,
            style: {
                maxWidth: '30px',
                maxHeight: '30px',
            },
            previewSrcList: [cellValue],
            previewTeleported: true,
        },
        '',
    );
}

/**
 * 表格图片渲染函数 - 多张
 */
export function tableImagesFormatter(
    row: Record<string, string>,
    column: Record<string, string>,
    cellValue: string | string[],
): VNode | string {
    if (!cellValue) {
        return '暂无图片';
    }

    // 判断是字符串还是数组，统一处理成数组
    let imgs: string[] = [];
    if (isString(cellValue)) {
        imgs = cellValue.split(',');
    } else {
        imgs = cellValue;
    }

    return h(
        'div',
        {},
        imgs.map((url: string) =>
            h(
                ElImage,
                {
                    src: url,
                    style: {
                        maxWidth: '30px',
                        maxHeight: '30px',
                        marginRight: '5px',
                    },
                    previewSrcList: [url],
                    previewTeleported: true,
                },
                '',
            ),
        ),
    );
}

/**
 * 表格图片渲染函数 - map
 * format => "{ name: 'xx', value: 'http://...'}"
 */
export function tableImagesMapFormatter(
    row: Record<string, string>,
    column: Record<string, string>,
    cellValue: string,
): VNode | string {
    if (!cellValue) {
        return '暂无图片';
    }

    const imgs: string[] = JSON.parse(cellValue).value.split(',');

    return h(
        'div',
        {},
        imgs.map((url: string) =>
            h(
                ElImage,
                {
                    src: url,
                    style: {
                        maxWidth: '30px',
                        maxHeight: '30px',
                        marginRight: '5px',
                    },
                    previewSrcList: [url],
                    previewTeleported: true,
                },
                '',
            ),
        ),
    );
}

/**
 * 点击查看附件，显示全部上传的文件名
 */
export function tableLinksFormatter(
    row: Record<string, string>,
    column: Record<string, string>,
    cellValue: string | null,
): VNode | string {
    if (!cellValue) {
        return '暂无文件';
    }

    // 判断是字符串还是数组，统一处理成数组
    let fileList: string[] = [];
    if (isString(cellValue)) {
        fileList = cellValue.split(',');
    } else {
        fileList = cellValue;
    }

    const files = fileList
        .filter(item => item)
        .map(url => {
            return h(
                ElLink,
                {
                    href: url,
                    type: url ? 'primary' : 'info',
                    style: { marginRight: '8px' },
                },
                {
                    default: () => (url ? url.split('_').splice(1).join('_') : '未上传'),
                },
            );
        });

    if (files.length === 0) {
        return h('span', {}, '未上传');
    }

    return h(
        ElPopover,
        {
            placement: 'top',
            trigger: 'click',
        },
        {
            reference: () =>
                h(
                    'span',
                    {
                        style: {
                            textDecoration: 'underline',
                            color: '#409eff',
                            cursor: 'pointer',
                        },
                    },
                    '查看附件',
                ),
            default: () => h('div', {}, files),
        },
    );
}
