import {
    createVNode,
    render,
    getCurrentInstance,
    type AppContext,
    type Component,
    type ComponentPublicInstance,
    type VNode,
} from 'vue';

interface Options {
    visible?: boolean;
    onClose?: () => void;
    appendTo?: HTMLElement | string;
    [key: string]: unknown;
}

interface CommandComponent {
    (options: Options): VNode;
    close: () => void;
}

/**
 * 选择要挂载的位置
 * @param props 自定义选项
 * @returns 挂载位置
 */
const getAppendToElement = (props: Options): HTMLElement => {
    console.log('props', props);

    let appendTo: HTMLElement | null = document.body;

    if (props.appendTo) {
        if (typeof props.appendTo === 'string') {
            appendTo = document.querySelector<HTMLElement>(props.appendTo);
        }

        if (props.appendTo instanceof HTMLElement) {
            appendTo = props.appendTo;
        }

        if (!(appendTo instanceof HTMLElement)) {
            appendTo = document.body;
        }
    }

    return appendTo;
};

/**
 * 渲染虚拟节点
 * @param Component 要传入的组件
 * @param props 自定义选项
 * @param container 容器
 * @param appContext 组件实例、上下文
 * @returns 虚拟节点
 */
const handleInitInstance = <T extends Component>(
    Component: T,
    props: Options,
    container: HTMLElement,
    appContext: AppContext | null = null,
) => {
    // 渲染函数 <==> h()
    const vNode = createVNode(Component, props);
    vNode.appContext = appContext;

    // 编程式地创建组件虚拟 DOM 树的函数
    render(vNode, container);

    // 挂载组件
    getAppendToElement(props).appendChild(container);
    return vNode;
};

/**
 * 处理组件的挂载和卸载
 * @param Component 要传入的组件
 * @returns 命令式组件实例
 */
const useCommandComponent = <T extends Component>(Component: T): CommandComponent => {
    // 获取当前组件的实例、上下文
    const appContext = getCurrentInstance()?.appContext;

    /**
     * 由于命令式组件无法获取当前组件树的 injection，
     * 可以将当前组件树的 provides 与 appContext.provides 合并，
     * 这样传入的弹窗组件就可以顺利的获取到 app 和当前组件树的 provides
     * Reflect.set() <==> lodash.set()
     */
    if (appContext) {
        const currentProvides = (getCurrentInstance() as any)?.provides;
        Reflect.set(appContext, 'provides', { ...appContext.provides, ...currentProvides });
    }

    // 创建容器
    const container = document.createElement('div');

    // 关闭方法，删除容器节点
    const close = () => {
        render(null, container);
        container.parentNode?.removeChild(container);
    };

    // 声明组件实例
    const commandComponent = (options: Options): VNode => {
        if (!Reflect.has(options, 'visible')) {
            options.visible = true;
        }

        if (typeof options.onClose !== 'function') {
            options.onClose = close;
        } else {
            const originOnClose = options.onClose;
            options.onClose = () => {
                originOnClose();
                close();
            };
        }

        const vNode = handleInitInstance<T>(Component, options, container, appContext);
        const vm = vNode.component?.proxy as ComponentPublicInstance<Options>;

        // 将选项中的属性赋值到创建的节点上
        for (const prop in options) {
            // Reflect.has() <==> lodash.set()
            if (!Reflect.has(vm.$props, prop)) {
                // ComponentPublicInstance 组件类型，只会包含所有组件都共享的属性
                vm[prop as keyof ComponentPublicInstance] = options[prop];
            }
        }

        return vNode;
    };

    commandComponent.close = close;
    return commandComponent;
};

export { type CommandComponent, useCommandComponent };
