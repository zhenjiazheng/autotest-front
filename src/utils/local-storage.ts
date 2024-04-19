/**
 * 字符串是否为 JSON 字符串
 */
function judgeIsJSON(params?: string): boolean {
    if (!params) {
        return false;
    }

    try {
        JSON.parse(params);
    } catch {
        return false;
    }

    return true;
}

/**
 * local storage 是否可用
 */
function judgeStorageUseful(): boolean {
    if (window && window.localStorage) {
        return true;
    }

    throw new Error('当前环境 localstorage 不可用');
}

/**
 * 存储字段到 local storage
 * @param key 存储字段
 * @param value 存储值
 */
export function saveStorage(key: string, value: unknown): void {
    if (judgeStorageUseful()) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * 获取存储字段的值
 * @param key 存储字段
 */
export function getStorage(key: string): any {
    if (!judgeStorageUseful()) {
        return null;
    }

    const value = window.localStorage.getItem(key);

    if (value === null || !judgeIsJSON(value)) {
        return null;
    }

    return JSON.parse(value);
}

/**
 * 删除存储字段
 * @param key 存储字段
 */
export function removeStorage(key: string): void {
    if (judgeStorageUseful()) {
        window.localStorage.removeItem(key);
    }
}

/**
 * 清空所有存储字段
 */
export function clearStorage(): void {
    if (judgeStorageUseful()) {
        window.localStorage.clear();
    }
}
