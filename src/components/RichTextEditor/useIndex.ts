import type { XRichTextEditorProps } from './interface';

/**
 * @description useIndex
 * @param props 组件传参
 * @param emit 自定义事件
 */
export default function useIndex(props: XRichTextEditorProps, emits: any) {
    /**
     * 编辑器实例
     * 必须用 shallowRef
     */
    const editorRef = shallowRef();

    /**
     * 编辑器内容 HTML
     */
    const editorValue = computed<string>({
        get: () => props.modelValue,
        set: value => emits('update:modelValue', value),
    });

    /**
     * 工具栏配置项
     */
    const toolbarConfig = {
        excludeKeys: [],
    };

    /**
     * 编辑器的菜单配置项
     */
    const menuConfig = {
        uploadImage: {
            // 上传地址
            server: props.uploadUrl,
            // 上传文件名
            fieldName: props.fileName,
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 5 * 1024,
            // 自定义插入图片
            customInsert(res: any, insertFn: any) {
                const { data } = res;

                if (data) {
                    insertFn(data);
                }
            },
        },
        uploadVideo: {
            // 上传地址
            server: props.uploadUrl,
            // 上传文件名
            fieldName: props.fileName,
            // 自定义插入图片
            customInsert(res: any, insertFn: any) {
                const { data } = res;

                if (data) {
                    insertFn(data);
                }
            },
        },
    };

    /**
     * 编辑器配置项
     */
    const editorConfig = {
        placeholder: '请输入内容',
        autoFocus: true,
        MENU_CONF: menuConfig,
    };

    /**
     * 编辑器创建完毕的回调
     */
    function handleCreated(editor: any) {
        editorRef.value = editor;
    }

    /**
     * 编辑器内容、选区变化的回调
     */
    function handleChange(editor: any) {
        emits('change', editor.children);
    }

    /**
     * 禁用
     */
    function disable() {
        editorRef.value.disable();
    }

    /**
     * 使用
     */
    function enable() {
        editorRef.value.enable();
    }

    /**
     * 清空
     */
    function clear() {
        editorRef.value.clear();
    }

    /**
     * 确认
     */
    function confirm() {
        const content = {
            text: editorRef.value.getText(),
            html: editorRef.value.getHtml(),
        };

        return content;
    }

    /**
     * 页面卸载之前
     */
    onBeforeUnmount(() => {
        // 销毁编辑器
        editorRef.value.destroy();
    });

    return {
        editorRef,
        editorValue,
        toolbarConfig,
        editorConfig,
        handleCreated,
        handleChange,
        disable,
        enable,
        clear,
        confirm,
    };
}
