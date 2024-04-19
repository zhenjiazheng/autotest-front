module.exports = {
    /**
     * 可选类型，与 commitlint.config.js 配置的规则对应
     */
    types: [
        { value: 'feat', name: 'feat: 新功能' },
        { value: 'fix', name: 'fix: 修复' },
        { value: 'perf', name: 'perf: 性能优化' },
        { value: 'refactor', name: 'refactor: 代码重构' },
        { value: 'style', name: 'style: 代码格式修改, 注意不是 css 修改' },
        { value: 'docs', name: 'docs: 文档变更' },
        { value: 'test', name: 'test: 测试用例新增、修改' },
        { value: 'chore', name: 'chore: 构建过程或辅助工具的变动' },
        { value: 'build', name: 'build: 影响项目构建或依赖项修改' },
        { value: 'ci', name: 'ci: 持续集成相关文件修改' },
        { value: 'workflow', name: 'workflow: 工作流相关文件修改' },
        { value: 'release', name: 'release: 发布新版本' },
        { value: 'revert', name: 'revert: 版本回退' },
    ],

    /**
     * scope
     */
    scopes: ['vue-app'],

    /**
     * 消息步骤
     */
    messages: {
        type: '请选择提交类型(必填):',
        scope: '请输入修改范围(必填):',
        customScope: '请输入自定义修改范围(可选):',
        subject: '请简要描述提交(必填):',
        body: '请输入详细描述(可选):',
        footer: '请输入不兼容变动或者要关闭的 issue (可选):',
        confirmCommit: '确认使用以上信息提交？(y/n)',
    },

    /**
     * 跳过问题：自定义修改范围，详细描述，issue 相关
     */
    skipQuestions: ['customScope', 'body', 'footer'],

    /**
     * 描述文字长度限制
     */
    subjectLimit: 50,
};
