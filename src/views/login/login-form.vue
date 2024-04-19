<template>
    <div class="form">
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="account">
                <el-input v-model="form.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" show-password placeholder="密码"></el-input>
            </el-form-item>
        </el-form>

        <el-button class="form__login-button" type="primary" :loading="loading" @click="login"> 登录 </el-button><br><br>
        <el-button class="form__login-button" type="primary" :loading="loading" @click="openDialog"> 注册</el-button>
        <x-dialog-form
            ref="formRef2"
            v-model="visible"
            v-model:data="formReg"
            title="注册用户"
            width="30%"
            :schemas="schemasReg"
            @submit="register"
        ></x-dialog-form>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { usePermissionStore } from '@/store/permission';
// import dropdownAPI from '@/api/dropdown';
import RequestAPI from '@/api/login';
import { saveBaseUrl, saveUserToken, saveUserInfo } from '@/utils/storage';
import { openDialog, formRef2, visible, formReg, schemasReg, register } from './login'

const router = useRouter();
const { setPermission, setActiveRouteList } = usePermissionStore();

/**
 * 登录提交表单
 */
interface Form {
    account: string;
    password: string;
    // companyId: string;
}

/**
 * form ref
 */
const formRef = ref<FormInstance>();

/**
 * form
 */
const form = reactive<Form>({
    account: '',
    password: '',
});

const rules = {
    account: [{ required: true, message: '账号不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    // companyId: [{ required: true, message: '公司不能为空' }],
};

/**
 * loading
 */
const loading = ref<boolean>(false);

/**
 * 登录
 */
async function login(): Promise<void> {
    // 表单校验
    // const [err] = await to(formRef.value?.validate());
    const valid = await formRef.value?.validate();

    if (!valid) {
        return;
    }

    loading.value = true;
    const res = await RequestAPI.login(form);

    if (!res.data) {
        loading.value = false;
        // return;
    }
    
    if (res.code != 0) {
        // console.log(res)
        loading.value = false;
        return
    }
   
    // loading.value = false;
    saveBaseUrl(import.meta.env.VITE_API_URL);
    saveUserToken(res.data.token);
    saveUserInfo(res.data.user_info);

    setPermission(res.data.perms);
    setActiveRouteList();

    // 重定向
    const redirectPath = router.currentRoute.value.query.redirect;
    if (redirectPath) {
        router.push({ path: redirectPath as string });
    } else {
        router.push({ path: '/' });
    }
}
</script>

<style lang="scss" scoped>
// Extra small screen / phone
$--screen-xs: 480px;
$--screen-xs-min: $--screen-xs;

// Small screen / tablet
$--screen-sm: 576px;
$--screen-sm-min: $--screen-sm;

// Medium screen / desktop
$--screen-md: 768px;
$--screen-md-min: $--screen-md;

// Large screen / wide desktop
$--screen-lg: 992px;
$--screen-lg-min: $--screen-lg;

// Extra large screen / full hd
$--screen-xl: 1200px;
$--screen-xl-min: $--screen-xl;

// Extra extra large screen / large desktop
$--screen-2xl: 1600px;
$--screen-2xl-min: $--screen-2xl;
$--screen-xs-max: ($--screen-sm-min - 1px);
$--screen-sm-max: ($--screen-md-min - 1px);
$--screen-md-max: ($--screen-lg-min - 1px);
$--screen-lg-max: ($--screen-xl-min - 1px);
$--screen-xl-max: ($--screen-2xl-min - 1px);

.form {
    width: 432px;
    padding: 32px;

    &__title {
        width: 100%;
        height: 40px;
        margin-bottom: 22px;
        line-height: 40px;
        text-align: center;
        letter-spacing: 3px;
        font-size: 20px;
    }

    &__login-button {
        width: 100%;
    }

    @media (max-width: $--screen-xl) {
        background-color: #fff;
        border-radius: 5px;
    }
}
</style>
