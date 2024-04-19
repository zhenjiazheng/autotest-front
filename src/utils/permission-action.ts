import { usePermissionStore } from '@/store/permission';
import type { XTableActionButton } from '@/components/Table/interface';

/**
 * 操作按钮权限
 * @param actionList 操作按钮列表
 * @param permission 权限数组
 * @returns 存在权限的操作按钮
 */
export function getPermissionAction(actionList: any[], permission?: any): XTableActionButton[] {
    const { usable } = usePermissionStore();

    if (usable && permission?.length) {
        return actionList.filter(btn => permission?.includes(btn.permission) || !btn?.permission);
    } else {
        return actionList;
    }
}
