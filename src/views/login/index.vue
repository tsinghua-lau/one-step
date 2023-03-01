<template>
    <div id="login">
        <div class="login-left">
            <div class="logo" ref="logo">
                <img src="../../assets/svg/icons/case.svg" alt="" />
                <div class="logo-title">one-step 开箱即用</div>
            </div>
            <Motion :delay="100" class="computer-bg">
                <div>
                    <LottieAni :src="dataJson" />
                </div>
            </Motion>
            <Motion :delay="300" class="summary">
                <typewriter :text="'Vue3 + Vite3 + Typescript + Pinia + Ant-design'" />
            </Motion>
        </div>
        <div class="login-right">
            <a-form ref="formRef" :rules="rules" class="login-form" :model="formState">
                <Motion :delay="100">
                    <p class="form-title">登录</p>
                </Motion>
                <Motion :delay="150">
                    <a-form-item ref="name" label="" name="name">
                        <a-input v-model:value="formState.name" :maxlength="10" size="large" placeholder="账号" />
                    </a-form-item>
                </Motion>

                <Motion :delay="200">
                    <a-form-item ref="name" label="" name="password">
                        <a-input-password v-model:value="formState.password" size="large" placeholder="密码" />
                    </a-form-item>
                </Motion>

                <Motion :delay="250">
                    <a-row type="flex" justify="center" align="top">
                        <a-col :span="12">
                            <a-form-item>
                                <a-input v-model:value="formState.code" @keyup.enter="onSubmit" size="large" placeholder="验证码" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="10" :offset="2"> <PicCode ref="CODE" /></a-col>
                    </a-row>
                </Motion>
                <Motion :delay="300">
                    <a-row type="flex" justify="space-between" align="top">
                        <a-col :span="12">
                            <a-form-item>
                                <a-checkbox v-model:checked="formState.rememberPassword">记住密码</a-checkbox>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" class="forgot-password"> <a href="javascript:void(0)">忘记密码?</a></a-col>
                    </a-row>
                </Motion>
                <Motion :delay="350">
                    <a-form-item>
                        <a-button type="primary" style="width: 100%" @click="onSubmit" size="large">登录</a-button>
                    </a-form-item>
                </Motion>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { UnwrapRef } from 'vue';
import { useMotion } from '@vueuse/motion';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { notification } from 'ant-design-vue';
import { setCookie } from '@/untils/commonfn';
import { useStore } from '@/store/index';
import { Base64 } from 'js-base64';
import router from '@/router/router';
import Cookies from 'js-cookie';
import Motion from '@/untils/motion';
import PicCode from '@/components/PicCode/index.vue';
import typewriter from '@/components/typewriter/index.vue';
import LottieAni from '@/components/lottie/index.vue';
import dataJson from '@/assets/json/data.json';

const store = useStore();

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
    name: '',
    password: '',
    code: '',
    rememberPassword: true,
});
const CODE = ref();
const logo = ref();

const rules = {
    name: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
    password: [{ required: true, message: '请输入账号密码', trigger: 'blur' }],
};

const onSubmit = (): void => {
    formRef.value
        .validate()
        .then(() => {
            if (formState.code.toLowerCase() !== CODE.value.state.imgCode.toLowerCase()) {
                notification['error']({
                    message: '',
                    description: '验证码错误',
                });
            } else {
                setCookie('haslogin', 'test', new Date(new Date().getTime() + 60 * 60 * 1000));
                if (formState.rememberPassword) {
                    setCookie('rememberPassword', 'rememberPassword', new Date(new Date().getTime() + 60 * 60 * 1000));
                    setCookie('nm', Base64.encode(formState.name), new Date(new Date().getTime() + 60 * 60 * 1000));
                    setCookie('pw', Base64.encode(formState.password), new Date(new Date().getTime() + 60 * 60 * 1000));
                } else {
                    Cookies.remove('rememberPassword');
                }
                store.changeSelectedKeys(['echarts']);
                store.changeActiveKey('echarts');
                store.changeUsername(formState.name);
                store.ROUTE_INFO = [
                    {
                        name: 'echarts',
                        path: '/echarts',
                        title: 'echarts',
                        icon: 'iconpie-chart_sharp',
                    },
                ];
                router.push({ path: '/echarts' });
            }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
            console.log('error', error);
        });
};

onMounted(() => {
    const { variant } = useMotion(logo, {
        initial: {
            y: 100,
            opacity: 0,
        },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 350,
                damping: 20,
                delay: 2 * 50,
                onComplete: () => {
                    variant.value = 'levitate';
                },
            },
        },
        levitate: {
            y: 15,
            transition: {
                duration: 2000,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
            },
        },
    });

    if (Cookies.get('rememberPassword')) {
        formState.rememberPassword = true;
        formState.name = Base64.decode(Cookies.get('nm'));
        formState.password = Base64.decode(Cookies.get('pw'));
    } else formState.rememberPassword = false;
});
</script>
<style lang="scss" scoped>
#login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    .login-left,
    .login-right {
        width: 50%;
        height: 100%;
    }

    .login-left {
        position: relative;
        .logo {
            position: absolute;
            top: 50px;
            left: 5vw;
            display: flex;
            width: 60%;
            height: 80px;
            display: flex;
            align-items: center;
            padding-left: 7px;
            cursor: pointer;
            transition: all 0.2s ease;
            img {
                width: 36px;
                height: 36px;
            }
            .logo-title {
                margin-left: 10px;
                font-weight: 600;
                font-size: 24px;
                color: #fff;
            }
        }
        .computer-bg {
            position: absolute;
            width: 25vw;
            height: 25vh;
            top: 24vh;
            left: 15%;
        }
        .summary {
            position: absolute;
            font-size: 15px;
            color: #eee;
            bottom: 10%;
            left: 10%;
        }
    }
    .login-left::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/login-bg.svg');
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        content: '';
    }
    .login-right {
        position: relative;
        .login-form {
            width: 300px;
            text-align: left;
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            .form-title {
                font-weight: 600;
                font-size: 30px;
            }
            .forgot-password {
                height: 32px;
                line-height: 32px;
                text-align: right;
            }
        }
    }
}
</style>
