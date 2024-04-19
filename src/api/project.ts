import { get, post, put, del } from '@/api/index';

export default {
/**
 * @description 获取项目列表
 */
    getProjectList(params: Record<string, any>): Promise<any> {
        return get('/autotest/projects', {
            params: params,
        });
    },

    /**
     * 创建项目
     */
    createProject(data: Record<string, any>): Promise<any> {
        return post('/autotest/projects', data);
    },

    /**
     * 更新项目
     */
    updateProject(data: Record<string, any>): Promise<any> {
        return put('/autotest/projects', data);
    },

    /**
     * 删除项目
     */
    deleteProject(data: Record<string, any>): Promise<any> {
        const index = data.id
        return del('/autotest/projects/' + index);
    },
};
