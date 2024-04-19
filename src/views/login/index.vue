<template>
    <div class="wrap">
        <div class="login">
            <div class="login__left">
                <img src="/svg/login-box-bg.svg" :alt="APP_NAME" class="login__left__image" />
            </div>

            <div class="login__right">
                <div class="login__right__title">
                    <img src="/logo.png" alt="logo" />
                    <h2>{{ APP_NAME }}</h2>
                </div>

                <!-- 登录表单 -->
                <div class="login__right__form">
                    <login-form></login-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { APP_NAME } from '@/constant/global';
import LoginForm from './login-form.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoint.scss';

.wrap {
    height: 100vh;
    padding: 25px;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-left: -48%;
        content: '';
        background-image: url('/svg/login-bg.svg');
        background-repeat: no-repeat;
        background-position: 100%;
        background-size: auto 100%;

        @media (max-width: $--screen-xl) {
            display: none;
        }
    }

    @media (max-width: $--screen-xl) {
        background-color: #293146;
    }
}

.login {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    &__left {
        display: flex;
        flex: 1;
        justify-content: center;

        @media (max-width: $--screen-xl) {
            display: none;
        }

        &__image {
            z-index: 9;
            display: block;
            width: 50%;
            margin-top: -4rem;
            transform: translate(-50px);
            animation: enter-x-animation 0.4s ease-in-out 0.3s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }
    }

    &__right {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 400px;
            height: 80px;
            letter-spacing: 2px;
            flex-direction: column;

            @media (max-width: $--screen-xl) {
                color: #fff;
            }

            img {
                position: relative;
                top: 2px;
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>
