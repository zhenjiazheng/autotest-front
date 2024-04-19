import type { XFilePreviewProps } from './interface';
import axios from 'axios';
import { renderAsync } from 'docx-preview';
import { transformExcelToLuckyByUrl } from 'luckyexcel';
import { downloadFileFromURL } from '@/utils/common-methods';
import { ElMessage } from 'element-plus';

/**
 * 文件类型枚举
 */
enum FileType {
    'word' = 1,
    'excel' = 2,
    'other' = 4,
}

/**
 * @description useIndex
 * @param props 组件传参
 * @param emit 自定义事件
 */
export default function useIndex(props: XFilePreviewProps, emits: any) {
    /**
     * 是否展示弹窗
     */
    const dialogVisible = computed<boolean>({
        get: () => props.visible,
        set: visible => {
            emits('update:visible', visible);

            if (!visible) {
                emits('close');
            }
        },
    });

    /**
     * 文件类型
     */
    const fileType = computed(() => {
        let type: number | null;

        if (props.url.indexOf('.docx') !== -1) {
            type = FileType['word'];
        } else if (props.url.indexOf('.xlsx') !== -1) {
            type = FileType['excel'];
        } else {
            type = FileType['other'];
        }

        return type;
    });

    /**
     * word-ref
     */
    const wordRef = ref<HTMLElement>();

    /**
     * word 预览
     */
    function wordPreview() {
        axios({
            method: 'GET',
            responseType: 'blob',
            url: props.url,
        }).then(res => {
            if (!res.data) {
                ElMessage.error('文件读取失败!');
                return;
            }

            renderAsync(res.data, wordRef.value as unknown as HTMLElement, undefined, {
                // 默认和文档样式类的类名/前缀
                className: 'docx',
                // 启用围绕文档内容渲染包装器
                inWrapper: true,
                // 禁止页面渲染宽度
                ignoreWidth: false,
                // 禁止页面渲染高度
                ignoreHeight: false,
                // 禁止字体渲染
                ignoreFonts: false,
                // 在分页符上启用分页
                breakPages: true,
                // 禁用 lastRenderedPageBreak 元素的分页
                ignoreLastRenderedPageBreak: true,
                // 启用实验性功能（制表符停止计算）
                experimental: false,
                // 如果为真，xml 声明将在解析之前从xml文档中删除
                trimXmlDeclaration: true,
                // 启用额外的日志记录
                debug: true,
            });
        });
    }

    /**
     * excel 预览
     */
    function excelPreview() {
        transformExcelToLuckyByUrl(props.url, '', (exportJson: any) => {
            if (exportJson.sheets == null || exportJson.sheets.length == 0) {
                ElMessage.error('文件读取失败!');
                return;
            }

            // 销毁原来的表格
            window.luckysheet.destroy();

            // 重新创建新表格
            window.luckysheet.create({
                // 设定 DOM 容器的 ID
                container: 'luckysheetId',
                // 表格内容
                data: exportJson.sheets,
                // 表格标题
                title: exportJson.info.name,
                // 语言
                lang: 'zh',
                // 是否显示工具栏
                showtoolbar: false,
                // 是否显示公式栏
                sheetFormulaBar: false,
                // 是否显示顶部信息栏
                showinfobar: false,
                // 是否显示底部计数栏
                showstatisticBar: false,
                // 是否允许前台编辑
                allowEdit: false,
                // 是否允许复制
                allowCopy: false,
                // 是否允许增加行
                enableAddRow: false,
                // 是否允许增加列
                enableAddCol: false,
            });
        });
    }



    /**
     * 预览
     */
    function handlePreview() {
        switch (fileType.value) {
            case FileType['word']:
                wordPreview();
                break;

            case FileType['excel']:
                excelPreview();
                break;

            case FileType['other']:
                download();
                break;
        }
    }

    /**
     * 下载
     */
    function download() {
        downloadFileFromURL(props.url);
    }

    /**
     * 页面渲染
     */
    onMounted(() => {
        handlePreview();
    });

    return {
        FileType,
        fileType,
        dialogVisible,
        wordRef,
        download,
    };
}
