import { ElMessage } from 'element-plus';
import { OPERATION_NOTICE } from '@/constant/base';
import type { XFormItemSchema, XFormInstance } from '@/components/form/interface';
import { getBaseUrl, getUserToken, getUserInfo, saveBaseUrl } from '@/utils/storage';
import { confirmExitMessage } from '@/utils/confirm-message';
import router from '@/router';
import RequestAPI from '@/api/login';
import { clearStorage } from '@/utils/local-storage';

export default function useIndex() {
    const baseUrl = ref<string>(getBaseUrl());
    const token = getUserToken();
    const userInfo = getUserInfo();

    /**
     * 改变 base-url
     */
    function handleBlur(e: any) {
        if (!e.target.value) {
            return;
        }

        saveBaseUrl(e.target.value);
    }

    /**
     * 下拉列表
     */
    const dropdownItems = [
        { title: '修改密码', onClick: openDialog },
        { title: '注销', onClick: logout },
    ];

    /**
     * 表单配置
     */
    const schemas: XFormItemSchema[] = [
        {
            label: '旧密码',
            prop: 'password',
            components: 'el-input',
            colProps: { span: 24 },
            elFormItemProps: {
                rules: [{ required: true, message: '请输入旧密码' }],
            },
        },
        {
            label: '新密码',
            prop: 'new_password',
            components: 'el-input',
            colProps: { span: 24 },
            elFormItemProps: {
                rules: [{ required: true, message: '请输入新密码' }],
            },
        },
    ];

    /**
     * form ref
     */
    const formRef = ref<XFormInstance>();

    /**
     * form
     */
    const form = ref<Record<string, string>>({
        password: '',
        new_password: '',
        user_id: '',
    });

    /**
     * 弹窗是否展示
     */
    const visible = ref<boolean>(false);

    /**
     * 打开弹窗
     */
    function openDialog() {
        form.value.user_id = userInfo.id as string;
        visible.value = true;
    }

    /**
     * loading
     */
    const loading = ref<boolean>(false);

    /**
     * 修改密码
     */
    async function changePassword(): Promise<void> {
        // 表单校验
        const valid = await formRef.value?.validate();

        if (!valid) {
            return;
        }

        loading.value = true;
        const res = await RequestAPI.updatePassword(form.value);

        if (!res) {
            ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
            loading.value = false;
            return;
        }

        ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
        loading.value = false;
        visible.value = false;

        // 退出登录
        const result = await RequestAPI.logout();

        if (result) {
            clearStorage();
            router.push(`/login`);
        }
    }

    /**
     * 退出登录
     */
    async function logout() {
        const confirm = await confirmExitMessage();

        if (!confirm) {
            return;
        }

        if (!token) {
            return;
        }

        const res = await RequestAPI.logout();
        // console.info(res)
        if (res) {
            clearStorage();
            router.push(`/login`);
        }
    }

    return {
        baseUrl,
        userInfo,
        dropdownItems,
        schemas,
        visible,
        formRef,
        loading,
        form,
        handleBlur,
        changePassword,
    };
}
