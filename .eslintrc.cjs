#!/usr/bin/env node
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    /**
     * 使用此文件作为起始位置来查找其他配置文件
     */
    root: true,

    /**
     * 指定用于解析 JavaScript 代码的解析器
     *   - esprima：默认的解析器，用于解析 ECMAScript 5 到 ECMAScript 2021 之间的 JavaScript 代码
     *   - @babel/eslint-parser：由Babel项目提供的解析器，用于解析ES6+代码
     *   - @typescript-eslint/parser：由 TypeScript 团队提供的解析器，用于解析 TypeScript 代码
     *   - eslint-plugin-html：用于解析HTML文件中的JavaScript代码
     *   - vue-eslint-parser：用于解析Vue单文件组件中的JavaScript代码
     */
    parser: 'vue-eslint-parser',

    /**
     * 给配置的解析器添加可选配置项
     * parser：解析器
     * ecmaVersion：指定要解析的 ECMAScript 版本
     * sourceType：指定要解析的模块系统类型。可选值为 "script"（默认）或 "module"
     */
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },

    /**
     * extends 继承的规则，来源可以是以下几种：
     * 1.ESLint 内置规则集 的一个子集
     *   - 'eslint:recommended'
     * 2.共享配置包
     *   - 'eslint-config-prettier'：关闭 eslint 与 prettier 冲突的规则
     * 3.插件导出的命名配置（plugin:插件包名/配置名）
     *   - 'plugin:vue/vue3-recommended'：vue 推荐的规则
     *   - 'plugin:@typescript-eslint/recommended'：ts 推荐的规则
     *   - 'plugin:prettier/recommended'：prettier 推荐的规则
     */
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        '@vue/typescript/recommended',
        'eslint-config-prettier',
    ],

    /**
     * rules 用于设置 ESLint 的规则和规则的错误等级
     * 配置项是一个对象，它的每个属性表示一个规则，属性值表示该规则的错误等级
     *   - 'off' <==> 0 关闭告警
     *   - 'warn' <==> 1 警告级别
     *   - 'error' <==> 2 错误级别
     */
    rules: {
        'prettier/prettier': 'error',
        'no-var': ['error'],
        // 不要重复引入一个模块
        'no-duplicate-imports': ['warn'],
        // 组件名称以驼峰格式命名
        'vue/multi-word-component-names': ['off'],
        // 组件名在模板中的命名方式的规则
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        // 声明但未使用的变量
        '@typescript-eslint/no-unused-vars': ['warn'],
        // any
        '@typescript-eslint/no-explicit-any': ['warn'],
        // 箭头函数
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: false,
            },
        ],
    },
});
