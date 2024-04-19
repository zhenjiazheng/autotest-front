export interface XRichTextEditorProps {
    /** 双向绑定 */
    modelValue: string;
    /** 上传地址 */
    uploadUrl?: string;
    /** 文件名 */
    fileName?: string;
    /** 编辑器模式 */
    mode?: 'default' | 'simple';
    /** 编辑器样式 */
    editorStyle?: Record<string, string | number>;
}
