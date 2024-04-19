import { post } from '@/api/index';

/**
 * 上传文件接口
 */
export default {
    upload: (data: unknown): Promise<any> =>
        post('/api/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};
