import { getPermission } from '@/utils/storage';
import type { App } from 'vue';

/**
 * 是否拥有权限
 * @param permission
 */
function hasPermission(permission: string) {
    const permissions: string[] = getPermission() ?? [];
    return permissions.includes(permission);
}

/**
 * 注册权限指令
 */
const permission = {
    install(app: App) {
        /**
         * @description 注册全局指令
         * @params { string } name 指令名
         * @params { Function | Object } definition 具有7个生命周期
         */
        app.directive('permission', {
            /**
             * @description 指令是具有一组生命周期的钩子，钩子函数的有3-4个参数，如下：
             * @param el 指令绑定到的元素，这可用于直接操作 DOM。
             * @param binding 一个对象包含一些属性，binding.value 是传递给指令的值。
             * @param vnode 代表绑定元素的底层 VNode。
             * @param prevNode 之前的渲染中代表指令所绑定元素的 VNode，仅在 beforeUpdate 和 updated 钩子中可用。
             */
            mounted(el, binding) {
                if (!binding.value || binding.value.length === 0) {
                    return;
                }

                const isHave = binding.value.some(hasPermission);

                if (!isHave) {
                    // el.style.display = 'none';
                    el.parentNode?.removeChild(el);
                }
            },

            /**
             * FIXME: 性能不是很好，最好应该是侦听指令值的变化修改样式
             */
            updated(el, binding) {
                if (!binding.value || binding.value.length === 0) {
                    return;
                }

                const isHave = binding.value.some(hasPermission);

                if (!isHave) {
                    // el.style.display = 'none';
                    el.parentNode?.removeChild(el);
                } else {
                    // el.style.display = '';
                }
            },
        });
    },
};

export default permission;
export { hasPermission };
