<script lang="ts" setup>
import { reactive } from 'vue';

let textColor = '#000';
const state = reactive({
    show: false,
    tip: '',
});

const reload = (show: boolean, tip = '加载中...', textColorPs?: any) => {
    state.show = show;
    state.tip = tip;
    textColor = textColorPs;
};
defineExpose({
    reload,
});
</script>

<template>
    <div class="loading" v-show="state.show">
        <!-- <a-spin :tip="state.tip" size="large" /> -->
    </div>
</template>

<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100%;
    z-index: 9999 !important;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgb(248 253 255 / 50%);
    :deep(.ant-spin) {
        .ant-spin-text {
            color: v-bind(textColor);
        }
    }
}
</style>
