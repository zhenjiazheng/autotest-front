import { get, post } from '@/api/index';

export default {
/**
 * @description 获取任务列表
 */
    getTaskList(params: Record<string, any>): Promise<any> {
        return get('/autotest/tasks', {
            params: params,
        });
    },

    /**
     * 运行任务
     */
    runTask(data: Record<string, any>): Promise<any> {
        return post('/autotest/tasks/run', data);
    },

    /**
     * 编辑任务
     */
    editTask(data: Record<string, any>): Promise<any> {
        return post('/autotest/tasks/edit', data);
    },


    /**
     * 获取任务状态
     */
    getTaskStatus(data: Record<string, any>): Promise<any> {
        return post('/autotest/tasks/status', data);
    },

    /**
     * 获取任务Log
     */
    getTaskLog(params: Record<string, any>): Promise<any> {
        return get('/autotest/tasks/log', {
            params: params,
        });
    },
};
