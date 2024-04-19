import { get, post } from '@/api/index';

export default {

    /**
     * @description 工具任务列表
     */
    getToolTask(params: any): Promise<any> {
        return get('/autotest/tools', {
            params: params,
        });
    },

        
    /**
     * @description 运行硬件资源监控任务
     */
    runHwMonitorTask(data: any): Promise<any> {
        return post('/autotest/tools/hw_monitor', data);
    },

    /**
     * 停止硬件资源监控任务
     */
    stopHwMonitorTask(data: any): Promise<any> {
        return post('/autotest/tools/hw_monitor/stop', data);
    },

    /**
     * 运行IEC104测试工具
     */
    runIEC104Task(data: any): Promise<any> {
        return post('/autotest/tools/iec104/send', data);
    },

    /**
     * 获取任务Log
     */
    runBProtocolTestTask(data: any): Promise<any> {
        return post('/autotest/tools/b_protocol/send', data);
    },

    /**
     * 获取任务Log
     */
    runApiTest(data: any): Promise<any> {
            return post('/autotest/request', data);
        },
};
