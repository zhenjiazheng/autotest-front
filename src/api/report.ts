import { get } from '@/api/index';

export default {

    /**
     * 获取报告
     */
    getReport(data: Record<string, any>): Promise<any> {
        return get('/autotest/report', data);
    },
};
