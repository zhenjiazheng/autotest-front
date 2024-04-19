import { get, post } from '@/api/index';

export default {

    /**
     * LLM 模型列表
     */
    getLLmModelsList(data: Record<string, any>): Promise<any> {
        return get('/autotest/llm/models', data);
    },

    /**
     * LLM 模型详情
     */
    getLLmModelsDetail(params: Record<string, any>): Promise<any> {
        return get('/autotest/llm/models/detail', {
            params: params,
        });
    },

    /**
     * chat_completions
     */
    postLLmChatCompletions(data: Record<string, any>): Promise<any> {
        return post('/autotest/llm/chat_completions', data);
    },
};
