import { post } from '@/api/index';
import { EncryptECB } from '@/utils/crypto';

export default {
    /**
     * 登录
     */
    login(data: Record<string, string>): Promise<any> {
        data.password =  EncryptECB(data.password)
        // console.log(data)
        return post('/autotest/user/login', data);
    },

    /**
     * 退出登录
     */
    logout(): Promise<boolean> {
        return post('/autotest/user/logout');
    },

    /**
     * 注册
     */
    register(data: Record<string, string>): Promise<any> {
        data.password =  EncryptECB(data.password)
        return post('/autotest/user/register', data);
    },

    /**
     * 修改密码
     */
    updatePassword(data: Record<string, string>): Promise<any> {
        data.password = EncryptECB(data.password)
        data.new_password = EncryptECB(data.new_password)
        return post('/autotest/user/update_password', data);
    },
};
