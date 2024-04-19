# web 端常见文件预览（word/excel）

前端开发的 web 页面中常常需要上传附件，而针对附件预览我们往往都是直接下载打开，其实我们也可以提前预览让客户选择性下载，体验上肯定是更加友好的。当然了，不可避免的要借助一些第三方的库进行解析与渲染，主打的就是一个贯彻CV开发的理念。

## 一、Word

- [docx-preview](https://github.com/VolodymyrBaydalka/docxjs#readme)

```html
<div ref="wordRef"></div>
```

```typescript
import axios from 'axios';
import { renderAsync } from 'docx-preview';
import { ElMessage } from 'element-plus';

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
        url: 'http://......',
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
            // ......
        });
    });
}
```

## 二、Excel

- [luckyexcel](https://mengshukeji.gitee.io/luckysheetdocs/zh/)

```html
<div id="luckysheetId" class="luckysheet"></div>
```

```typescript
import { transformExcelToLuckyByUrl } from 'luckyexcel';

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
            // ......
        });
    });
}
```

```scss
<style lang='scss' scoped> 
.luckysheet {
    width: 100%;
    height: 100%;
}
</style> 
```

以上就是常用文件类型的预览，可以根据自己的需求封装在组件中从而实现多类型的预览。
