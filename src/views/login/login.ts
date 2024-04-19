
import type { XFormItemSchema, XFormInstance } from '@/components/form/interface';
// import dropdownAPI from '@/api/dropdown';
import RequestAPI from '@/api/login';
import { ElMessage } from 'element-plus';
import { OPERATION_NOTICE } from '@/constant/base';



export const visible = ref<boolean>(false);
/**
 * 打开弹窗
 */
export function openDialog() {
    // formReg.value.account = '';
    visible.value = true;
}

/**
 * 表单配置
 */
export const schemasReg: XFormItemSchema[] = [
    {
        label: '账号',
        prop: 'account',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入账号-邮件' }],
        },
    },
    {
        label: '密码',
        prop: 'password',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入密码' }],
        },
    },
    {
        label: '用户名',
        prop: 'username',
        components: 'el-input',
        colProps: { span: 24 },
        elFormItemProps: {
            rules: [{ required: false, message: '请输入用户名' }],
        },
    },
];

/**
 * form ref
 */
export const formRef2 = ref<XFormInstance>();

export const formReg = ref<Record<string, string>>({
        account: '',
        username: '',
        password: '',
    });

// const visible = ref<boolean>(false);
// /**
//  * 打开弹窗
//  */
// export function openDialog() {
//     // formReg.value.account = '';
//     visible.value = true;
// }


/**
 * 注册
 */
export async function register(): Promise<void> {
    // 表单校验
    // const valid = await formRef2.value?.validate();

    // if (!valid) {
    //     return;
    // }

    // loading.value = true;
    const res = await RequestAPI.register(formReg.value);

    if (!res) {
        ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
        // loading.value = false;
        return;
    }

    ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
    // loading.value = false;
    visible.value = false;

}