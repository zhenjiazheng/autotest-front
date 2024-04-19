import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router/index';
import { setupRouterGuard } from '@/router/route-guard';
import { setPermissionRoute } from '@/store/permission';
import permission from '@/directive/permission';
import { registerComponents } from '@/components/register';

// 引入组件样式
import 'element-plus/dist/index.css';
import 'nprogress/nprogress.css';
import '@wangeditor/editor/dist/css/style.css';

(() => {
    const app = createApp(App);

    // 注册状态管理器
    app.use(createPinia());

    // 注册路由
    app.use(router);

    // 注册权限指令
    app.use(permission);

    // 全局引入 ==> 按需引入
    // app.use(ElementPlus);

    // 统一注册组件
    registerComponents(app);

    // 设置权限路由
    setPermissionRoute();

    // 路由守卫
    setupRouterGuard(router);

    // 事件通讯
    app.config.globalProperties.$bus = mitt();

    // 挂载
    app.mount('#app');
})();
