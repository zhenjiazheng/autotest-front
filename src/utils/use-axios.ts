import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';
import { throttle } from 'lodash-es';
import { HTTP_ERROR_NOTICE } from '@/constant/base';
import { getStorage } from '@/utils/local-storage';
import { LOCAL_TOKEN_KEY } from '@/constant/global'

/**
 * 后端返回数据格式
 */
interface responseData {
    code: number;
    msg: string | null;
    data: any;
}

/**
 * 拦截器配置函数参数
 */
interface Options {
    /** url */
    url?: string;
    /** 超时时间 ms */
    timeout?: number;
    /** 保存在 local storage 里的 token 的 key 值 */
    storageTokenKey?: string;
    /** 保存在 local storage 里的 baseUrl 的 key 值 */
    storageUrlKey?: string;
    /** 请求头携带 token 的 key 值 */
    requestHeaderTokenKey?: string;
    /** 过期码 */
    expireCode?: number;
    /** 过期回调 */
    expireCallback?: () => void;
    /** get 请求携带的参数 */
    getMethodsParams?: Record<string, any>;
    /** post 请求携带的参数 */
    postMethodsParams?: Record<string, any>;
    /** 成功响函数 */
    successValidate?: (responseData: responseData) => boolean;
}

/**
 * 拦截器配置函数
 * @param {Options} options 配置项
 * @returns 接口函数
 */
export default function useAxiosInterceptors(options: Options) {
    if (!options.url) {
        throw new Error('未设置 url');
    }

    /**
     * axios实例
     */
    const service = axios.create({
        baseURL: options.url || '',
        timeout: options.timeout || 60000,
        headers: {
            'Content-Type': 'application/json',
            'Token': window.localStorage.getItem(LOCAL_TOKEN_KEY)
        },
    });

    /**
     * 请求拦截
     */
    service.interceptors.request.use(
        (config: any) => {

            const token = getStorage(options.storageTokenKey || 'token') as string;
            const baseUrl = getStorage(options.storageUrlKey || 'baseUrl') as string;

            // 设置 token
            if (token && config.headers) {
                config.headers[options.requestHeaderTokenKey || 'token'] = token;
            }

            // 更新 base-url
            if (baseUrl) {
                config.url = baseUrl + config.url;
            }

            // 将配置的全局参数更新到请求参数
            if (options.getMethodsParams && config.params) {
                config.params = {
                    ...options.getMethodsParams,
                    ...config.params,
                };
            }

            if (options.postMethodsParams && config.data) {
                config.data = {
                    ...options.postMethodsParams,
                    ...config.data,
                };
            }

            return config;
        },

        error => {
            return Promise.reject(error);
        },
    );

    /**
     * 节流处理响应错误信息
     */
    const handleResponseError = throttle(
        (options: any) => {
            ElNotification(options);
        },
        500,
        {
            leading: false,
            trailing: true,
        },
    );

    /**
     * 节流处理错误信息
     */
    const handleNetworkError = throttle(
        (message: string) => {
            ElNotification({
                type: 'error',
                message,
                zIndex: 9999,
            });
        },
        500,
        {
            leading: false,
            trailing: true,
        },
    );

    /**
     * 响应拦截
     */
    service.interceptors.response.use(
        (response: AxiosResponse): any => {
            const responsedata = response.data;

            // 是否响应成功
            const successStatus = options.successValidate
                ? options.successValidate(responsedata)
                : responsedata.code === 0;

            if (successStatus) {
                return Promise.resolve(responsedata || true);
            } else {
                switch (responsedata.code) {
                    case options.expireCode || 401: {
                        handleResponseError({
                            type: 'warning',
                            message: HTTP_ERROR_NOTICE.EXPIRE,
                            onClose: () => {
                                if (options.expireCallback) {
                                    options.expireCallback();
                                }
                            },
                        });

                        return Promise.resolve(false);
                    }

                    default: {
                        const { message } = responsedata.msg as { message: string };

                        ElNotification({
                            type: 'error',
                            message: message || HTTP_ERROR_NOTICE.UNKNOWN,
                            zIndex: 3,
                        });

                        return Promise.resolve(false);
                    }
                }
            }
        },
        (error: AxiosError) => {
            const statusCode = error.response?.status;

            // 响应错误
            if (!statusCode) {
                console.log('response error', error.toJSON());

                if (error.message.indexOf('timeout') !== -1) {
                    handleNetworkError(HTTP_ERROR_NOTICE.TIME_OUT);
                } else if (error.message.indexOf('Network Error') !== -1) {
                    handleNetworkError(HTTP_ERROR_NOTICE.NETWORK_ERROR);
                } else {
                    handleNetworkError(HTTP_ERROR_NOTICE.UNKNOWN);
                }

                return Promise.resolve(false);
            }

            // 非响应错误处理
            switch (statusCode) {
                case 404:
                    handleNetworkError(HTTP_ERROR_NOTICE.NOT_FOUND);
                    break;
                case 500:
                    handleNetworkError(HTTP_ERROR_NOTICE.SERVER_ERROR);
                    break;
                default:
                    handleNetworkError(HTTP_ERROR_NOTICE.UNKNOWN);
                    break;
            }

            return Promise.resolve(false);
        },
    );

    return {
        get: service.get,
        post: service.post,
        put: service.put,
        del: service.delete,
    };
}
