import store from 'store2';
import { LOCAL_BASE_URL_KEY, LOCAL_PERMISSION_KEY, LOCAL_TOKEN_KEY, LOCAL_USER_INFO_KEY } from '@/constant/global';

/**
 * 保存后端地址
 */
export function saveBaseUrl(url: string): void {
    store.local.set(LOCAL_BASE_URL_KEY, url);
}

/**
 * 获取后端地址
 */
export function getBaseUrl(): string {
    return store.local.get(LOCAL_BASE_URL_KEY) as string;
}

/**
 * 保存用户 token
 */
export function saveUserToken(token: string): void {
    store.local.set(LOCAL_TOKEN_KEY, token);
}

/**
 * 获取用户 token
 */
export function getUserToken(): string {
    return store.local.get(LOCAL_TOKEN_KEY) as string;
}

/**
 * 保存用户信息
 */
export function saveUserInfo(userInfo: any): void {
    store.local.set(LOCAL_USER_INFO_KEY, userInfo);
}

/**
 * 获取用户信息
 */
export function getUserInfo(): any {
    return store.local.get(LOCAL_USER_INFO_KEY) as any;
}

/**
 * 保存权限信息
 */
export function savePermission(permission: any): void {
    store.local.set(LOCAL_PERMISSION_KEY, permission);
}

/**
 * 获取权限信息
 */
export function getPermission(): any {
    return store.local.get(LOCAL_PERMISSION_KEY) as any;
}
