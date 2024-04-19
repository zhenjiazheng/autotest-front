import type { App, Component } from 'vue';
import XLayout from './layout/XLayout.vue';
import XLogo from './layout/XLogo.vue';
import XUser from './layout/XUser.vue';
import ParentView from './layout/ParentView.vue';
import ParentMenuView from './layout/ParentMenuView.vue';
import Project from './Project/index.vue';
import ProjectItem from './Project/ProjectItem.vue';
import LLM from './LLM/index.vue';
import LLMItem from './LLM/LLMItem.vue';
import Tool from './Tool/index.vue';
import ToolItem from './Tool/ToolItem.vue';
import Task from './Task/index.vue';
import TaskItem from './Task/TaskItem.vue';
import XSearchForm from './form/XSearchForm.vue';
import XDialogForm from './form/XDialogForm.vue';
import XForm from './form/XForm.vue';
import XRadio from './form/XRadio.vue';
import XCheckbox from './form/XCheckbox.vue';
import XSelect from './form/XSelect.vue';
import XDescription from './description/index.vue';
import XFilePreview from './FilePreview/index.vue';
import XRichTextEditor from './RichTextEditor/index.vue';

interface ComponentItem {
    name: string;
    component: Component;
}

/**
 * 组件列表
 */
const componentList: ComponentItem[] = [
    {
        name: 'XLayout',
        component: XLayout,
    },
    {
        name: 'XLogo',
        component: XLogo,
    },
    {
        name: 'XUser',
        component: XUser,
    },
    {
        name: 'ParentView',
        component: ParentView,
    },
    {
        name: 'ParentMenuView',
        component: ParentMenuView,
    },
    {
        name: 'Project',
        component: Project,
    },
    {
        name: 'ProjectItem',
        component: ProjectItem,
    },
    {
        name: 'LLM',
        component: LLM,
    },
    {
        name: 'LLMItem',
        component: LLMItem,
    },
    {
        name: 'Tool',
        component: Tool,
    },
    {
        name: 'ToolItem',
        component: ToolItem,
    },
    {
        name: 'Task',
        component: Task,
    },
    {
        name: 'TaskItem',
        component: TaskItem,
    },
    {
        name: 'XDialogForm',
        component: XDialogForm,
    },
    {
        name: 'XSearchForm',
        component: XSearchForm,
    },
    {
        name: 'XForm',
        component: XForm,
    },
    {
        name: 'XRadio',
        component: XRadio,
    },
    {
        name: 'XCheckbox',
        component: XCheckbox,
    },
    {
        name: 'XSelect',
        component: XSelect,
    },
    {
        name: 'XDescription',
        component: XDescription,
    },
    {
        name: 'XFilePreview',
        component: XFilePreview,
    },
    {
        name: 'XRichTextEditor',
        component: XRichTextEditor,
    },
];

/**
 * 收集组件后统一注册组件
 * @param app 实例
 */
export function registerComponents(app: App) {
    componentList.forEach(({ name, component }) => {
        app.component(name, component);
    });
}
