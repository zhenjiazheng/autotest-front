import { ElMessageBox } from 'element-plus';
import { OPERATION_NOTICE } from '@/constant/base';
import to from '@/utils/await-to';

/**
 * 确认删除弹出提示
 * @returns 是否删除
 */
export async function confirmDeleteMessage(message?: string): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(message ?? OPERATION_NOTICE.DELETE_CONFIRM, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }),
    );

    if (err) {
        return false;
    }

    return true;
}

/**
 * 确认重置弹出提示
 * @returns 是否重置
 */
export async function confirmResetMessage(message?: string): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(message ?? OPERATION_NOTICE.RESET_CONFIRM, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }),
    );

    if (err) {
        return false;
    }

    return true;
}

/**
 * 确认退出弹出提示
 * @returns 是否退出
 */
export async function confirmExitMessage(message?: string): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(message ?? OPERATION_NOTICE.LOGOUT_CONFIRM, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }),
    );

    if (err) {
        return false;
    }

    return true;
}

/**
 * 确认弹出提示
 * @param message: 删除信息
 * @param confirmButtonText: 确定按钮文本
 * @param cancelButtonText: 取消按钮文本
 * @param type: 消息提醒类型
 * @returns { boolean }
 */
export async function confirmMessage(options: {
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    type?: 'info' | 'error' | 'warning' | 'info';
}): Promise<boolean> {
    const [err] = await to(
        ElMessageBox.confirm(options.message ?? '确认？', '提示', {
            confirmButtonText: options.confirmButtonText ?? '确认',
            cancelButtonText: options.cancelButtonText ?? '取消',
            type: options.type ?? 'warning',
        }),
    );

    if (err) {
        return false;
    }

    return true;
}
