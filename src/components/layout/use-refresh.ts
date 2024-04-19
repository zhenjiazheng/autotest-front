import { computed, getCurrentInstance, nextTick, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

interface UseRefreshOption {
    /** route matched array index */
    matchedIndex: number;
}

/**
 * refresh
 */
export function useRefresh(option: UseRefreshOption) {
    const route = useRoute();
    const proxy = getCurrentInstance()?.proxy;

    /**
     * key
     */
    const componentKey = ref<string>();

    /**
     * 不包含的列表
     */
    const excludeSets = ref<Set<string>>(new Set());
    const excludeList = computed<string[]>(() => {
        return Array.from<string>(excludeSets.value);
    });

    /**
     * refresh 事件回调
     */
    proxy?.$bus.on('refresh', ({ path, name }: { path: string; name: string }) => {
        if (componentKey.value !== path) {
            return;
        }

        console.log('refresh');
        componentKey.value = '';
        excludeSets.value.add(name);

        nextTick(() => {
            excludeSets.value.delete(name);
            componentKey.value = route.matched.at(option.matchedIndex)?.path;
        });
    });

    /**
     * 监听
     */
    watchEffect(() => {
        componentKey.value = route.matched.at(option.matchedIndex)?.path;

        console.log('matchedIndex', option.matchedIndex);
        console.log('componentKey', componentKey.value);
    });

    return {
        componentKey,
        excludeList,
    };
}
